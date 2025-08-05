import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanTypes = {
    title: string
    className?: string
    changeItemTitle: (newTitle: string) => void
};

export const EditableSpan = ({title, className, changeItemTitle}: EditableSpanTypes) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState(title);
    const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    const onEditeMode = () => setIsEditMode(true)
    const offEditeMode = () => {
        setIsEditMode(false)
        changeItemTitle(itemTitle)
    }


    return (
        isEditMode
            ? <TextField
                variant="outlined"
                size="small"
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