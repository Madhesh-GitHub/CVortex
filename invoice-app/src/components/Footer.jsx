import React from 'react';

const Footer = ({ data, onChange, subtotal, total }) => {
    return (
        <div className="grid grid-cols-2 gap-12">
            {/* Left Column: Payment & Notes */}
            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Details</h3>
                <div className="text-gray-600 text-sm space-y-2 mb-8">
                    <div className="flex gap-2 items-center">
                        <span className="font-semibold text-gray-800 w-12">UPI:</span>
                        <input
                            value={data.paymentUpi}
                            onChange={(e) => onChange('paymentUpi', e.target.value)}
                            className="bg-transparent focus:outline-none flex-1 placeholder-gray-300"
                            placeholder="upi@bank"
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-semibold text-gray-800 w-12">Bank:</span>
                        <input
                            value={data.bankName}
                            onChange={(e) => onChange('bankName', e.target.value)}
                            className="bg-transparent focus:outline-none flex-1 placeholder-gray-300"
                            placeholder="Bank Name"
                        />
                    </div>
                </div>

                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notes</h3>
                <textarea
                    value={data.notes}
                    onChange={(e) => onChange('notes', e.target.value)}
                    className="w-full text-sm text-gray-600 bg-transparent focus:outline-none resize-none leading-relaxed"
                    rows="4"
                    placeholder="Add thank you note or terms here..."
                />
            </div>

            {/* Right Column: Totals */}
            <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex justify-between mb-4 text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium font-mono">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-600">
                    <span>GST</span>
                    <span className="bg-gray-200 text-gray-500 px-2 py-1 rounded text-xs">N/A</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-4 flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-900">Total</span>
                    <span className="text-xl font-bold text-blue-900 font-mono">₹{total.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;