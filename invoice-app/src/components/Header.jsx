import React from 'react';

const Header = ({ data, onChange }) => {
    return (
        <div className="flex justify-between items-start mb-12">
            <div className="w-1/2">
                <input
                    value={data.companyName}
                    onChange={(e) => onChange('companyName', e.target.value)}
                    className="text-4xl font-black text-blue-950 uppercase w-full bg-transparent focus:outline-none placeholder-gray-300"
                    placeholder="YOUR COMPANY"
                />
                <div className="text-blue-500 font-medium text-lg">
                    <input
                        value={data.companySubtitle}
                        onChange={(e) => onChange('companySubtitle', e.target.value)}
                        className="bg-transparent focus:outline-none w-full placeholder-blue-300"
                        placeholder="Subtitle"
                    />
                </div>
                <input
                    value={data.companyRole}
                    onChange={(e) => onChange('companyRole', e.target.value)}
                    className="text-gray-500 text-sm tracking-wider uppercase mt-1 w-full bg-transparent focus:outline-none"
                    placeholder="ROLE / DESIGNATION"
                />
            </div>
            <div className="text-right w-1/2">
                <h2 className="text-4xl font-bold text-gray-300 mb-2 uppercase">Invoice</h2>
                <div className="text-gray-600 font-mono text-lg flex justify-end items-center gap-2">
                    <span>#</span>
                    <input
                        value={data.invoiceNumber}
                        onChange={(e) => onChange('invoiceNumber', e.target.value)}
                        className="text-right bg-transparent focus:outline-none w-40"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;