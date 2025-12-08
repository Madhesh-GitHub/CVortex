import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, FileClock, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    // Helper for link styling
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <div className="h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0">

            {/* 1. Logo Section */}
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    EDIT<span className="text-blue-500">LAB</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1">Workspace</p>
            </div>

            {/* 2. Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 px-4">Menu</p>

                <NavLink to="/" className={linkClasses}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/create" className={linkClasses}>
                    <PlusCircle size={20} />
                    <span>New Invoice</span>
                </NavLink>

                <NavLink to="/history" className={linkClasses}>
                    <FileClock size={20} />
                    <span>History</span>
                </NavLink>
            </nav>

            {/* 3. Bottom Actions */}
            <div className="p-4 border-t border-slate-800">
                <NavLink to="/settings" className={linkClasses}>
                    <Settings size={20} />
                    <span>Settings</span>
                </NavLink>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition mt-1">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;