
type EditableSpanTypes = {
    title: string
};

export const EditableSpan = ({title}: EditableSpanTypes) => {
    return (
        <span>{title}</span>
    );
};