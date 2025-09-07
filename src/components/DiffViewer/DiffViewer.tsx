import React, {useCallback, useRef, useState} from "react";
import Arrow from "../../assets/icons/Arrow.svg?react";
import Plus from "../../assets/icons/Plus.svg?react";
import {generateDiff, renderDiff} from "./DiffUtils";
import CompareButton from "../UI/CompareButton.tsx";
import EditableDiv from "../EditableDiv/EditableDiv.tsx";
import Reload from "../../assets/icons/Reload.svg?react";
import LanguageSelect from "../UI/LanguageSelect.tsx";
import LoadingOverlay from "../UI/LoadingOverlay.tsx";

const DiffViewer: React.FC = () => {
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const [canCompare, setCanCompare] = useState(false);
    const [canAddNew, setCanAddNew] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateRaw = useCallback((el: HTMLDivElement) => {
        const text = el.innerText;
        el.setAttribute("data-raw", text);
        return text;
    }, []);

    const handleInput = useCallback(() => {
        if (!div1Ref.current || !div2Ref.current) return;
        const text1 = updateRaw(div1Ref.current);
        const text2 = updateRaw(div2Ref.current);

        const hasText1 = text1.trim() !== "";
        const hasText2 = text2.trim() !== "";

        setCanCompare(hasText1 && hasText2);
        setCanAddNew(hasText1 || hasText2);
    }, [updateRaw]);

    const compareTexts = useCallback(async () => {
        if (!canCompare || !div1Ref.current || !div2Ref.current) return;

        setLoading(true);
        setCanCompare(false);

        await new Promise(res => setTimeout(res, 150));

        const text1 = div1Ref.current.getAttribute("data-raw") || "";
        const text2 = div2Ref.current.getAttribute("data-raw") || "";

        const [diffA, diffB] = generateDiff(text1, text2);

        div1Ref.current.innerHTML = renderDiff(diffA);
        div2Ref.current.innerHTML = renderDiff(diffB);

        await new Promise(res => setTimeout(res, 2000));

        setLoading(false);
        setCanCompare(true);
    }, [canCompare]);

    const clearAll = () => {
        if (div1Ref.current) {
            div1Ref.current.innerText = "";
            div1Ref.current.setAttribute("data-raw", "");
        }
        if (div2Ref.current) {
            div2Ref.current.innerText = "";
            div2Ref.current.setAttribute("data-raw", "");
        }
        setCanAddNew(false);
        setCanCompare(false);
    };

    return (
        <div className="flex flex-col gap-y-2 py-4 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="w-full md:w-[155px]">
                        <LanguageSelect/>
                    </div>
                    <div className="w-full self-center md:w-auto">
                        <label className="flex gap-2">
                            <input type="checkbox"/>
                            ფორმატის შენარჩუნება
                        </label>
                    </div>
                </div>

                <CompareButton
                    onClick={clearAll}
                    disabled={!canAddNew}
                    label="ახლის გახსნა"
                    Icon={Plus}
                    PlusIcon
                    fullWidthOnMd
                />
            </div>

            <hr className="border border-gray-200 w-full m-0"/>
            <div className="relative w-full">
                <div
                    className={`${loading ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity duration-200 flex gap-x-4 justify-between items-center flex-col lg:flex-row w-full`}>
                    <EditableDiv ref={div1Ref} onInput={handleInput}/>
                    <Arrow className="w-full max-w-[32px] lg:rotate-0 rotate-90"/>
                    <EditableDiv ref={div2Ref} onInput={handleInput}/>
                </div>

                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <LoadingOverlay start={loading} onComplete={() => setLoading(false)}/>
                    </div>
                )}
            </div>

            <CompareButton
                onClick={compareTexts}
                disabled={!canCompare}
                label="შედარება"
                Icon={Reload}
                ReloadIcon
            />
        </div>
    );
}

export default DiffViewer;
