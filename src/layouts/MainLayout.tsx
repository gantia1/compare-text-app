import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import MobileTopBar from "../components/MobileTopBar/MobileTopBar";
import MobileModal from "../components/MobileModal/MobileModal";

const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row relative">
            <Sidebar />
            <MobileTopBar />
            <main className="flex-1 p-4">
                <Outlet />
            </main>
            <MobileModal />
        </div>
    );
};

export default MainLayout;
