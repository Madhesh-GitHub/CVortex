import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, TrendingUp, Users } from 'lucide-react';

const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Invoices from MongoDB
    useEffect(() => {
        fetch('http://localhost:5000/api/invoices')
            .then(res => res.json())
            .then(data => {
                setInvoices(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    // Calculate Totals
    const totalRevenue = invoices.reduce((acc, inv) => {
        const invTotal = inv.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
        return acc + invTotal;
    }, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-500">Welcome back, Sanjay</p>
                    </div>
                    <Link
                        to="/create"
                        className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition shadow-lg"
                    >
                        <Plus size={20} /> Create New Invoice
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Invoices</p>
                            <h3 className="text-2xl font-bold text-gray-800">{invoices.length}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-gray-800">₹{totalRevenue.toLocaleString()}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Clients</p>
                            <h3 className="text-2xl font-bold text-gray-800">{new Set(invoices.map(i => i.billTo)).size}</h3>
                        </div>
                    </div>
                </div>

                {/* Recent Invoices List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800">Recent Invoices</h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading invoices...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Invoice ID</th>
                                    <th className="px-6 py-4 font-semibold">Client</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 text-right font-semibold">Amount</th>
                                    <th className="px-6 py-4 text-center font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {invoices.map((inv) => {
                                    const invTotal = inv.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
                                    return (
                                        <tr key={inv._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 font-medium text-gray-900">{inv.invoiceNumber}</td>
                                            <td className="px-6 py-4 text-gray-600">{inv.billTo}</td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">{inv.issuedDate}</td>
                                            <td className="px-6 py-4 text-right font-bold text-gray-800">₹{invTotal.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                    Saved
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {invoices.length === 0 && !loading && (
                        <div className="p-8 text-center text-gray-500">
                            No invoices found. Create your first one!
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;