import React from 'react';

const ClientDetails = ({ data, onChange }) => {
    return (
        <div className="flex justify-between items-end mb-12 border-t pt-8 border-gray-100">
            <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Bill To</label>
                <input
                    value={data.billTo}
                    onChange={(e) => onChange('billTo', e.target.value)}
                    className="text-xl font-bold text-gray-900 bg-transparent focus:outline-none w-64 placeholder-gray-300"
                    placeholder="Client Name"
                />
            </div>
            <div className="text-right space-y-2">
                <div className="flex justify-end gap-8 items-center">
                    <span className="text-gray-500 font-medium text-sm">Issued:</span>
                    <input
                        type="date"
                        value={data.issuedDate}
                        onChange={(e) => onChange('issuedDate', e.target.value)}
                        className="text-gray-900 font-medium text-right bg-transparent focus:outline-none font-mono"
                    />
                </div>
                <div className="flex justify-end gap-8 items-center">
                    <span className="text-gray-500 font-medium text-sm">Due:</span>
                    <input
                        type="date"
                        value={data.dueDate}
                        onChange={(e) => onChange('dueDate', e.target.value)}
                        className="text-gray-900 font-medium text-right bg-transparent focus:outline-none font-mono"
                    />
                </div>
            </div>
        </div>
    );
};

export default ClientDetails;