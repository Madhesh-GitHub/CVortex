import React, { useState, useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, Plus, Trash2, ArrowLeft, Save, Mail } from 'lucide-react'; // Added Mail Icon
import { useNavigate } from 'react-router-dom';

export default function CreateInvoice() {
    const navigate = useNavigate();
    const componentRef = useRef();

    // --- 1. STATE MANAGEMENT ---
    const [invoiceData, setInvoiceData] = useState({
        clientName: "ABC Media Pvt Ltd",
        invoiceNo: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        issueDate: new Date().toISOString().substring(0, 10),
        paymentDetails: "UPI: sanjay@oksbi\nPhonePe: 98763xxxx\nBank: SBI ***1234",
        notes: "Thank you for choosing EditLab by Sanjay. Kindly complete payment within the due date."
    });

    const [items, setItems] = useState([
        { id: 1, description: "Long-form video edit", qty: 1, rate: 2500 },
        { id: 2, description: "YouTube thumbnail", qty: 1, rate: 200 },
    ]);

    // --- 2. CALCULATIONS ---
    const subtotal = useMemo(() =>
        items.reduce((sum, item) => sum + (Number(item.qty) || 0) * (Number(item.rate) || 0), 0),
        [items]
    );
    const total = subtotal;

    // --- 3. HANDLERS ---
    const handleMetaChange = (field, value) => {
        setInvoiceData(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { id: Date.now(), description: "", qty: 1, rate: 0 }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    // --- 4. SAVE TO DATABASE ---
    const saveInvoice = async () => {
        try {
            const payload = {
                ...invoiceData,
                items,
                billTo: invoiceData.clientName,
                invoiceNumber: invoiceData.invoiceNo,
                issuedDate: invoiceData.issueDate
            };

            const response = await fetch('http://localhost:5000/api/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Invoice Saved Successfully!');
                navigate('/history');
            } else {
                alert('Failed to save invoice.');
            }
        } catch (error) {
            console.error("Error saving:", error);
            alert('Error connecting to server.');
        }
    };

    // --- 5. SEND EMAIL FUNCTION (NEW!) ---
    const sendEmail = async () => {
        const emailPrompt = prompt("Enter Client Email Address:", "client@example.com");
        if (!emailPrompt) return;

        try {
            const response = await fetch('http://localhost:5000/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: emailPrompt,
                    clientName: invoiceData.clientName,
                    invoiceNo: invoiceData.invoiceNo,
                    total: total,
                    items: items
                })
            });

            if (response.ok) {
                alert(`Email sent successfully to ${emailPrompt}!`);
            } else {
                alert("Failed to send email. Check server console.");
            }
        } catch (error) {
            console.error(error);
            alert("Error sending email. Is the server running?");
        }
    };

    // --- 6. PRINT FUNCTION ---
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Invoice-${invoiceData.invoiceNo}`,
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-8 font-sans">
            {/* Top Navigation Bar */}
            <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center print:hidden">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">New Invoice</h1>
                </div>
                <div className="flex gap-3">

                    {/* EMAIL BUTTON (Added Here) */}
                    <button
                        onClick={sendEmail}
                        className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition shadow-lg"
                    >
                        <Mail size={18} /> Email
                    </button>

                    {/* SAVE BUTTON */}
                    <button
                        onClick={saveInvoice}
                        className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition shadow-lg"
                    >
                        <Save size={18} /> Save
                    </button>

                    {/* PRINT BUTTON */}
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition shadow-lg"
                    >
                        <Printer size={18} /> Print
                    </button>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr,1.3fr] max-w-7xl mx-auto">
                {/* --- LEFT COLUMN: EDITOR FORM --- */}
                <div className="space-y-6 print:hidden">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Invoice Details</h2>
                        <div className="grid gap-4">
                            <InputGroup label="Client Name" value={invoiceData.clientName} onChange={e => handleMetaChange('clientName', e.target.value)} />
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Invoice No" value={invoiceData.invoiceNo} onChange={e => handleMetaChange('invoiceNo', e.target.value)} />
                                <InputGroup label="Issue Date" type="date" value={invoiceData.issueDate} onChange={e => handleMetaChange('issueDate', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Items</h2>
                            <button onClick={addItem} className="text-xs flex items-center gap-1 bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded hover:bg-blue-100 transition">
                                <Plus size={14} /> Add Item
                            </button>
                        </div>
                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-[1fr,4rem,5rem,2rem] gap-2 items-start group">
                                    <input placeholder="Description" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm outline-none" value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} />
                                    <input type="number" placeholder="Qty" className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-2 text-sm text-center outline-none" value={item.qty} onChange={(e) => handleItemChange(index, "qty", e.target.value)} />
                                    <input type="number" placeholder="Rate" className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-2 text-sm text-right outline-none" value={item.rate} onChange={(e) => handleItemChange(index, "rate", e.target.value)} />
                                    <button onClick={() => removeItem(index)} className="text-gray-300 hover:text-red-500 pt-2 flex justify-center transition"><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Footer Details</h2>
                        <TextAreaGroup label="Payment Info" value={invoiceData.paymentDetails} onChange={e => handleMetaChange('paymentDetails', e.target.value)} />
                        <TextAreaGroup label="Notes" value={invoiceData.notes} onChange={e => handleMetaChange('notes', e.target.value)} />
                    </div>
                </div>

                {/* --- RIGHT COLUMN: PREVIEW --- */}
                <div className="print:absolute print:top-0 print:left-0 print:w-full">
                    <div ref={componentRef} className="bg-slate-900 text-slate-100 p-8 rounded-2xl shadow-2xl min-h-[800px] border border-slate-700 print:bg-white print:text-black print:p-0 print:shadow-none print:border-none print:rounded-none">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-indigo-400 print:text-black">EDITLAB</h1>
                                <p className="text-sm text-slate-300 print:text-gray-600">by Sanjay</p>
                                <p className="mt-2 text-xs text-slate-500 print:text-gray-500 uppercase tracking-wider">Freelance Video Editor</p>
                                <p className="text-xs text-indigo-300 mt-1 print:text-gray-500 italic">GST Not Applicable – Freelancer not registered under GST Act</p>
                            </div>
                            <div className="text-right text-sm space-y-1 text-slate-300 print:text-gray-800">
                                <p>Invoice #: <span className="font-semibold text-slate-100 print:text-black">{invoiceData.invoiceNo}</span></p>
                                <p>Date: <span className="font-semibold text-slate-100 print:text-black">{invoiceData.issueDate}</span></p>
                                <div className="mt-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Bill To</p>
                                    <p className="text-lg font-bold text-white print:text-black">{invoiceData.clientName || "Client Name"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-slate-700 print:border-gray-300 pt-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-slate-500 border-b border-slate-700 print:border-gray-300 print:text-gray-600">
                                        <th className="py-3 text-left font-normal uppercase text-xs tracking-wider">Description</th>
                                        <th className="py-3 text-right font-normal uppercase text-xs tracking-wider">Qty</th>
                                        <th className="py-3 text-right font-normal uppercase text-xs tracking-wider">Rate</th>
                                        <th className="py-3 text-right font-normal uppercase text-xs tracking-wider">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 print:divide-gray-100 text-slate-200 print:text-gray-800">
                                    {items.map((item, i) => (
                                        <tr key={i}>
                                            <td className="py-4">{item.description}</td>
                                            <td className="py-4 text-right">{item.qty}</td>
                                            <td className="py-4 text-right">₹{Number(item.rate).toLocaleString()}</td>
                                            <td className="py-4 text-right font-medium">₹{(Number(item.qty) * Number(item.rate)).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 grid gap-8 md:grid-cols-2">
                            <div className="space-y-6 text-xs text-slate-400 print:text-gray-600">
                                <div>
                                    <p className="font-semibold text-slate-300 uppercase tracking-wider mb-2 print:text-gray-800">Re-work Policy</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>2 rounds of revisions included</li>
                                        <li>Additional revisions charged at ₹200 per change</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-300 uppercase tracking-wider mb-2 print:text-gray-800">Notes</p>
                                    <p className="leading-relaxed">{invoiceData.notes}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 print:bg-gray-50 print:border-gray-200">
                                    <div className="space-y-2 text-sm text-slate-300 print:text-gray-600">
                                        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                                        <div className="border-t border-slate-600 mt-3 pt-3 flex justify-between text-lg font-bold text-white print:text-black"><span>Total</span><span className="text-indigo-400 print:text-black">₹{total.toLocaleString()}</span></div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2 print:text-gray-800">Payment Details</p>
                                    <p className="text-xs text-slate-400 whitespace-pre-line leading-relaxed print:text-gray-600">{invoiceData.paymentDetails}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-6 border-t border-slate-800 print:border-gray-200 text-center text-xs text-slate-600 print:text-gray-400">Generated via EditLab Invoice System</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InputGroup = ({ label, type = "text", value, onChange }) => (
    <div><label className="text-xs font-bold text-gray-500 mb-1 block">{label}</label><input type={type} value={value} onChange={onChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none" /></div>
);
const TextAreaGroup = ({ label, value, onChange }) => (
    <div><label className="text-xs font-bold text-gray-500 mb-1 block">{label}</label><textarea rows={3} value={value} onChange={onChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none resize-none" /></div>
);