import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import Check from "../../assets/icons/Check.svg?react";
import Spelling from "../../assets/icons/Spelling.svg?react";
import Mic from "../../assets/icons/Mic.svg?react";
import Voice from "../../assets/icons/align-center.svg?react";
import Pdf from "../../assets/icons/programming-code-document.svg?react";
import Close from "../../assets/icons/close.svg?react";

const categories = [
    { label: "მართლმწერი", icon: Check, path: "/check" },
    { label: "ტექსტის შედარება", icon: Spelling, path: "/textcompare" },
    { label: "ხმა", icon: Mic, path: "/voice" },
    { label: "ხმა ტექსტი", icon: Voice, path: "/voice-text" },
    { label: "PDF კონვერტაცია", icon: Pdf, path: "/pdf" },
];

const MobileModal: React.FC = () => {
    const { isOpen, closeModal } = useModal();
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        if (isOpen) {
            setVisible(true);
            setTimeout(() => setAnimate(true), 10);
        } else {
            setAnimate(false);
            setTimeout(() => setVisible(false), 300);
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!visible) return null;

    const handleClick = (path: string) => {
        navigate(path);
        closeModal();
    };

    return (
        <div
            className={`fixed inset-0 bg-[rgba(19,36,80,0.5)] flex justify-center items-center z-50 transition-opacity duration-300 ${
                animate ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeModal}
        >
            <div
                className={`bg-white rounded-lg p-6 w-[90%] max-w-[484px] transform transition-transform duration-300 ${
                    animate ? "scale-100" : "scale-90"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-3 right-3 text-gray-500"
                    onClick={closeModal}
                >
                    <Close />
                </button>

                <h2 className="text-lg font-bold mb-4 text-gray-400">
                    აირჩიე ხელსაწყო
                </h2>

                <ul className="flex flex-col gap-2">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <li
                                key={idx}
                                className="py-2 cursor-pointer flex items-center gap-2 border-b border-gray-300 last:border-b-0"
                                onClick={() => handleClick(cat.path)}
                            >
                                {Icon && <Icon className="stroke-[#132450]" />}
                                <span>{cat.label}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default MobileModal;
