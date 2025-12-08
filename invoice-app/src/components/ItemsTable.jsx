import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ItemsTable = ({ items, onAdd, onDelete, onUpdate, calculateAmount }) => {
    return (
        <div className="mb-12">
            {/* Table Headers */}
            <div className="grid grid-cols-12 border-b-2 border-gray-100 pb-4 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Rate</div>
                <div className="col-span-2 text-right">Amount</div>
            </div>

            {/* Rows */}
            {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 items-center py-4 border-b border-gray-50 group hover:bg-gray-50 transition-colors">
                    <div className="col-span-6 flex items-center gap-2">
                        <button
                            onClick={() => onDelete(item.id)}
                            className="text-red-400 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-50 rounded print:hidden"
                            title="Delete Item"
                        >
                            <Trash2 size={16} />
                        </button>
                        <input
                            value={item.description}
                            onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                            className="w-full bg-transparent focus:outline-none text-gray-800 font-medium placeholder-gray-300"
                            placeholder="Item description"
                        />
                    </div>
                    <div className="col-span-2 text-center">
                        <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => onUpdate(item.id, 'qty', parseInt(e.target.value) || 0)}
                            className="w-full text-center bg-transparent focus:outline-none text-gray-600"
                        />
                    </div>
                    <div className="col-span-2 text-right text-gray-600 font-medium flex justify-end items-center gap-1">
                        <span>₹</span>
                        <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => onUpdate(item.id, 'rate', parseFloat(e.target.value) || 0)}
                            className="w-20 text-right bg-transparent focus:outline-none"
                        />
                    </div>
                    <div className="col-span-2 text-right font-bold text-gray-900">
                        ₹{calculateAmount(item.qty, item.rate).toLocaleString()}
                    </div>
                </div>
            ))}

            <button
                onClick={onAdd}
                className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 print:hidden transition"
            >
                <Plus size={16} /> Add Item
            </button>
        </div>
    );
};

export default ItemsTable;