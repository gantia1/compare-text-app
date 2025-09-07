import React from "react";
import Arrow from "../../assets/icons/arrow-down.svg?react"

const LanguageSelect: React.FC = () => {
    return (
        <div className="relative">
            <select
                id="language"
                name="language"
                className="border border-gray-300 rounded-lg px-4 py-2 outline-none w-full appearance-none"
            >
                <option value="ka">ქართული</option>
                <option value="ka">ქართული</option>
                <option value="ka">ქართული</option>
            </select>
            <Arrow className="absolute right-3 top-1/2 -translate-y-1/2"/>
        </div>
    );
};

export default LanguageSelect;
