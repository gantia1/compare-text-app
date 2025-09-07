import React from "react";
import Vector6 from "../../assets/icons/Vector 6.svg?react";
import Vector7 from "../../assets/icons/Vector 7.svg?react";

interface SidebarItemProps {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    active?: boolean;
    collapsed?: boolean;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({Icon, label, active, collapsed, onClick}) => {
    return (
        <div
            onClick={onClick}
            className={`relative flex items-center gap-3 p-3 rounded-tl-[30px] rounded-bl-[30px] cursor-pointer transition-colors
                ${collapsed ? "justify-center" : ""}
                ${active ? "bg-white text-[#132450]" : "text-white"}
            `}
        >
            <Vector6
                className={`absolute right-0 -top-2.5 w-[15px] h-[10px] transition-opacity duration-300
                    ${active ? "opacity-100" : "opacity-0"}
                `}
            />

            <Icon
                className={`transition-colors w-6 h-6 ${active ? "stroke-[#132450]" : "stroke-white"}`}
            />

            {!collapsed && <span className="text-sm font-medium">{label}</span>}

            <Vector7
                className={`absolute right-0 -bottom-2.5 w-[15px] h-[10px] transition-opacity duration-300
                    ${active ? "opacity-100" : "opacity-0"}
                `}
            />
        </div>
    );
};

export default SidebarItem;
