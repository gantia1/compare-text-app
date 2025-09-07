import React, {useEffect, useState} from "react";
import LoadingIcon from "../../assets/icons/Loading.svg?react";

interface Props {
    start: boolean;
    onComplete?: () => void;
}

const LoadingOverlay: React.FC<Props> = ({start, onComplete}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!start) return;

        setProgress(1);
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 3 + 1;
                if (next >= 100) {
                    clearInterval(interval);
                    onComplete?.();
                    return 100;
                }
                return next;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [start, onComplete]);

    return (
        <div className="w-[280px] h-[80px] bg-white rounded-lg shadow-md p-4 flex items-center gap-3">

            <LoadingIcon className="w-12 h-12 flex-shrink-0"/>

            <div className="flex flex-col flex-1">
        <span className="text-sm font-medium mb-2">
          Converting... Thank you For your Patience
        </span>

                <div className="flex items-center gap-2">
                    <div className="bg-gray-200 rounded h-2 w-[63px] relative overflow-hidden">
                        <div
                            className="bg-[#4571E4] h-full transition-all duration-100 ease-linear"
                            style={{width: `${(progress / 100) * 63}px`}}
                        />
                    </div>
                    <span className="text-xs w-8">{Math.floor(progress)}%</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
