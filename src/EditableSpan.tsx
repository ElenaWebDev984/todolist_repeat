import {ChangeEvent, useState} from "react";

type EditableSpanTypes = {
    title: string
};

export const EditableSpan = ({title}: EditableSpanTypes) => {
    const [itemTitle, setItemTitle] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    return (
        isEditMode
            ? <input
                value={itemTitle}
                onChange={onChangeItemTitleHandler}
            />
            : <span>{title}</span>
    );
};