import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Fixed Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            {/* ml-64 pushes content to the right so it doesn't hide behind the sidebar */}
            <main className="flex-1 ml-64 p-8">
                {/* <Outlet /> is a placeholder where the child route (Dashboard/Create) renders */}
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;