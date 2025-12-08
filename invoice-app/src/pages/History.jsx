import React, { useEffect, useState } from 'react';
import { Trash2, Eye, Search, FileX } from 'lucide-react';

const History = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // 1. Fetch Data on Load
    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/invoices');
            const data = await res.json();
            setInvoices(data.reverse()); // Show newest first
            setLoading(false);
        } catch (error) {
            console.error("Error fetching invoices:", error);
            setLoading(false);
        }
    };

    // 2. Delete Handler
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this invoice?")) return;

        try {
            await fetch(`http://localhost:5000/api/invoices/${id}`, { method: 'DELETE' });
            // Remove from UI immediately
            setInvoices(invoices.filter(inv => inv._id !== id));
        } catch (error) {
            alert("Error deleting invoice");
        }
    };

    // 3. Calculate Invoice Total (Helper)
    const calculateTotal = (items) => {
        if (!items) return 0;
        return items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    };

    // 4. Filter Logic
    const filteredInvoices = invoices.filter(inv => {
        // Handle both naming conventions (New vs Old)
        const client = inv.billTo || inv.clientName || "";
        const id = inv.invoiceNumber || inv.invoiceNo || "";
        return client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            id.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="font-sans text-slate-800">

            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Invoice History</h1>
                    <p className="text-sm text-slate-500">Manage and track your past bills</p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search client or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-slate-500">Loading your invoices...</div>
                ) : filteredInvoices.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center text-slate-400">
                        <FileX size={48} className="mb-4 opacity-50" />
                        <p>No invoices found.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Invoice No</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredInvoices.map((inv) => (
                                <tr key={inv._id} className="hover:bg-slate-50 transition">
                                    {/* FIX: Use 'invoiceNumber' (DB name) OR 'invoiceNo' (State name) */}
                                    <td className="px-6 py-4 font-medium text-blue-600">
                                        {inv.invoiceNumber || inv.invoiceNo}
                                    </td>

                                    {/* FIX: Use 'billTo' (DB name) OR 'clientName' (State name) */}
                                    <td className="px-6 py-4 text-slate-700 font-medium">
                                        {inv.billTo || inv.clientName}
                                    </td>

                                    {/* FIX: Use 'issuedDate' (DB name) OR 'issueDate' (State name) */}
                                    <td className="px-6 py-4 text-slate-500">
                                        {inv.issuedDate || inv.issueDate}
                                    </td>

                                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                                        ₹{calculateTotal(inv.items).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-3">
                                        <button className="text-slate-400 hover:text-blue-600 transition" title="View">
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(inv._id)}
                                            className="text-slate-400 hover:text-red-600 transition"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default History;