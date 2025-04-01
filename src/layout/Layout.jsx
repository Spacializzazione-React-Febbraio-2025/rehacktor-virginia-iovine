import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout() {
    return (
        <div className="style-layout-system">
        
            <div className="style-sidebar-filters">
                <Sidebar />
            </div>

            <Header />

            <div className="style-main-content">
                <Outlet />
            </div>

            <Footer />
        
        </div>
    );
}
