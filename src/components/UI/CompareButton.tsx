import type {FC, SVGProps} from "react";

interface Props {
    onClick: () => void;
    disabled: boolean;
    label: string;
    Icon?: FC<SVGProps<SVGSVGElement>>;
    PlusIcon?: boolean;
    ReloadIcon?: boolean;
    fullWidthOnMd?: boolean;
}

const CompareButton: FC<Props> = ({
                                      onClick,
                                      disabled,
                                      label,
                                      Icon,
                                      PlusIcon = false,
                                      ReloadIcon = false,
                                      fullWidthOnMd = false,
                                  }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`
            text-white 
            ${disabled ? "bg-[#383A4899] cursor-not-allowed" : "bg-[#4571E4] cursor-pointer"}
            ${PlusIcon ? "md:w-[142px] h-[48px]" : "h-[48px]"} 
            ${ReloadIcon ? "w-[142px] h-[48px]" : "h-[48px]"} 
            rounded-[6px] border-none self-center
            inline-flex items-center justify-center gap-1.5
            ${fullWidthOnMd ? "w-full" : ""}
        `}
    >
        {!disabled && ReloadIcon && Icon && <Icon/>}
        {PlusIcon && Icon && <Icon/>}
        {label}
    </button>
);

export default CompareButton;
