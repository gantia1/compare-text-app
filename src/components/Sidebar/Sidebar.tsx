import React, {useState} from "react";
import SidebarItem from "./SidebarItem";
import User from "../../assets/icons/user.svg?react";
import Check from "../../assets/icons/Check.svg?react";
import Spelling from "../../assets/icons/Spelling.svg?react";
import Mic from "../../assets/icons/Mic.svg?react";
import Voice from "../../assets/icons/align-center.svg?react";
import Pdf from "../../assets/icons/programming-code-document.svg?react";
import Arrows from "../../assets/icons/Arrows.svg?react";
import Dots from "../../assets/icons/dots-menu.svg?react";
import logo from "../../assets/logos/logo.png";
import {useNavigate, useLocation, Link} from "react-router-dom";
import Arrow from "../../assets/icons/arrow-right.svg?react";

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {icon: Check, label: "მართლმწერი", path: "/check"},
        {icon: Spelling, label: "ტექსტის შედარება", path: "/textcompare"},
        {
            icon: () => (
                <div className="flex items-center gap-1">
                    <Mic className="w-6 h-6"/>
                    {!collapsed && (
                        <>
                            <span>ხმა</span>
                            <Arrow className="w-4 h-4"/>
                            <span>ტექსტი</span>
                        </>
                    )}
                </div>
            ),
            label: "",
            path: "/voice"
        },
        {
            icon: () => (
                <div className="flex items-center gap-1">
                    <Voice className="w-6 h-6"/>
                    {!collapsed && (
                        <>
                            <span>ტექსტი</span>
                            <Arrow className="w-4 h-4"/>
                            <span>ხმა</span>
                        </>
                    )}
                </div>
            ),
            label: "",
            path: "/voice-text"
        },
        {icon: Pdf, label: "PDF კონვერტაცია", path: "/pdf"},
    ];

    return (
        <div
            className={`lg:flex hidden flex-col justify-between bg-[#132450] h-screen transition-all duration-300 ${collapsed ? "w-20" : "w-60"}`}>
            <div className={`flex flex-col gap-6 pt-[12px] ${collapsed ? "items-center" : "items-start"}`}>
                <div className="relative w-full flex justify-end pr-[27px]">
                    <button onClick={() => setCollapsed(!collapsed)} className="cursor-pointer">
                        <Arrows
                            className={`${collapsed ? "rotate-180" : "rotate-0"} transition-transform duration-300`}/>
                    </button>
                </div>

                <Link
                    to="/textcompare"
                    className={`${collapsed ? "items-center" : "pl-6"} flex gap-x-2.5 items-center`}
                >
                    <img src={logo} alt="logo" width="43" height="44"/>
                    {!collapsed && <span className="text-white text-xs">ENAGRAM</span>}
                </Link>

                <div className="flex flex-col gap-2 w-full pl-[12px]">
                    {menuItems.map((item, idx) => (
                        <SidebarItem
                            key={idx}
                            Icon={item.icon}
                            label={item.label}
                            collapsed={collapsed}
                            active={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2 mb-4 w-full">
                <hr className="border border-[#9EB9FF33] w-full"/>
                <div className="flex justify-between items-center pr-[18px]">
                    <SidebarItem Icon={User} label="თამარ ონიანი" collapsed={collapsed}/>
                    <Dots/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
