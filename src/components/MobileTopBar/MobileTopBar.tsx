import React from "react";
import {Link, useLocation} from "react-router-dom";
import {useModal} from "../../context/ModalContext";
import Logo from "../../assets/logos/logo.png";
import Toggle from "../../assets/icons/menu.svg?react";
import Arrow from "../../assets/icons/Vector.svg?react";
import Check from "../../assets/icons/Check.svg?react";
import Spelling from "../../assets/icons/Spelling.svg?react";
import Mic from "../../assets/icons/Mic.svg?react";
import Voice from "../../assets/icons/align-center.svg?react";
import Pdf from "../../assets/icons/programming-code-document.svg?react";

const menuItems = [
    {icon: Check, label: "მართლმწერი", path: "/check"},
    {icon: Spelling, label: "ტექსტის შედარება", path: "/textcompare"},
    {icon: Mic, label: "ხმა", path: "/voice"},
    {icon: Voice, label: "ხმა ტექსტი", path: "/voice-text"},
    {icon: Pdf, label: "PDF კონვერტაცია", path: "/pdf"},
];

const MobileTopBar: React.FC = () => {
    const {openModal} = useModal();
    const location = useLocation();
    const activeItem = menuItems.find(item => item.path === location.pathname);

    const IconComponent = activeItem?.icon;

    return (
        <>
            <div className="lg:hidden flex justify-between items-center bg-[#132450] p-3 h-[60px]">
                <Link to="/textcompare" className="flex items-center gap-2">
                    <img src={Logo} alt="logo" width="35" height="36"/>
                    <span className="text-white text-sm">ENAGRAM</span>
                </Link>

                <button className="p-2">
                    <Toggle className="transition-transform duration-300"/>
                </button>
            </div>

            <button
                className="lg:hidden mt-2 px-4 py-2 flex items-center justify-between text-gray-700 font-bold w-fit"
                onClick={openModal}
            >
                <div className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="stroke-[#132450]"/>}
                    <span>{activeItem?.label || ""}</span>
                </div>
                <Arrow className="w-[14px] h-[14px] ml-2"/>
            </button>
        </>
    );
};

export default MobileTopBar;
