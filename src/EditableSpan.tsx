import {ChangeEvent, useState} from "react";

type EditableSpanTypes = {
    title: string
    className?: string
};

export const EditableSpan = ({title, className}: EditableSpanTypes) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState(title);
    const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    const onEditeMode = () => setIsEditMode(true)
    const offEditeMode = () => setIsEditMode(false)


    return (
        isEditMode
            ? <input
                value={itemTitle}
                autoFocus
                onBlur={offEditeMode}
                onChange={onChangeItemTitleHandler}
            />
            : <span onDoubleClick={onEditeMode}
                    className={className}>
                {title}
            </span>
    );
};