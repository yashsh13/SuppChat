interface InputFieldProps{
    placeHolderValue: string,
    reference?: any,
    onKeyUpHandler?: React.KeyboardEventHandler<HTMLInputElement>
}

export default function InputField({ placeHolderValue, reference, onKeyUpHandler}: InputFieldProps){
    return(
        <input type="text" placeholder={placeHolderValue} ref={reference} onKeyUp={onKeyUpHandler} className="w-full bg-white px-5 py-2 text-xl border border-darkest-green rounded-md"/>
    )
}