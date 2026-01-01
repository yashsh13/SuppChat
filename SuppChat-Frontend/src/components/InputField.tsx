interface InputFieldProps{
    placeHolderValue: string,
    reference?: any
}

export default function InputField({ placeHolderValue, reference}: InputFieldProps){
    return(
        <input type="text" placeholder={placeHolderValue} ref={reference} className="w-full bg-white px-5 py-2 text-xl border border-darkest-green rounded-md"/>
    )
}