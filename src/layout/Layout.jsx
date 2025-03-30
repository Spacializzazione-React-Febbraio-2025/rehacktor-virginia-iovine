import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function Layout() {
    return (
        <div className="style-layout-system">

            <Sidebar />

            <Header />

            <div className="style-main-content">
                {/*slot da riempire con la rotta nnidata */}
                <Outlet />
            </div>

            <Footer />

        </div>
    );
};