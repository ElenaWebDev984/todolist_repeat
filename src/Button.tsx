type ButtonTypes = {
    title: string
    onClick: () => void
}

export const Button = ({title, onClick}: ButtonTypes) => {
    return <button onClick={onClick}>{title}</button>
};

