import { forwardRef } from "react";

interface EditableDivProps {
    onInput: () => void;
}

const EditableDiv = forwardRef<HTMLDivElement, EditableDivProps>(
    ({ onInput }, ref) => (
        <div
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            onInput={onInput}
            className="
        outline-none
        bg-[#F0F7FF]
        h-[432px] w-full
        p-3
        rounded-lg
        text-sm
        leading-[22px]
        overflow-auto
        md: h-[200px]
        scrollbar-thin
        scrollbar-thumb-[#4571E4]
        scrollbar-track-gray-200
      "
        />
    )
);

export default EditableDiv;
