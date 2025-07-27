type ButtonTypes = {
    title: string
    onClick: () => void
    disabled?: boolean
}

export const Button = ({title, onClick, disabled}: ButtonTypes) => {
    return (
        <button onClick={onClick}
                disabled={disabled}>
            {title}
        </button>
    )
};

