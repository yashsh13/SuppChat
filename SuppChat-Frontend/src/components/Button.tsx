interface ButtonProps{
    title: String,
    size: 'md'|'lg',
    onClickHandler?: ()=>void
}

const defaultStyles = "bg-normal-green text-lightest-green font-medium rounded-md border-1 border-darkest-green cursor-pointer hover:bg-dark-green";
const sizeStyles ={
    'md':'text-lg px-2 py-1',
    'lg':'text-2xl px-4 py-2'
}

export default function Button({ title,size,onClickHandler }: ButtonProps){
    return (
        <button className={`${defaultStyles} ${sizeStyles[size]}`} onClick={onClickHandler}>
            {title}
        </button>
    )
}