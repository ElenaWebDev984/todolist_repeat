type ButtonTypes = {
    title: string
    onClickHandler: () => void
    disabled?: boolean
    classNames?: string
}

export const Button = ({title, onClickHandler, disabled, classNames}: ButtonTypes) => {
    return (
        <button onClick={onClickHandler}
                disabled={disabled}
                className={classNames}>
            {title}
        </button>
    )
};

