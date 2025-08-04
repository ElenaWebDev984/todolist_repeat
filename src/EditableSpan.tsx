import {ChangeEvent, useState} from "react";

type EditableSpanTypes = {
    title: string
};

export const EditableSpan = ({title}: EditableSpanTypes) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState('');
    const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    const onEditeMode = () => setIsEditMode(true)
    const offEditeMode = () => setIsEditMode(false)


    return (
        isEditMode
            ? <input
                value={itemTitle}
                onChange={onChangeItemTitleHandler}
            />
            : <span onDoubleClick={onEditeMode}>{title}</span>
    );
};