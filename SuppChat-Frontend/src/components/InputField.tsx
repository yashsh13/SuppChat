export default function InputField({placeHolderValue}: {placeHolderValue: string}){
    return(
        <input type="text" placeholder={placeHolderValue} className="w-full bg-white px-5 py-2 text-xl border border-darkest-green rounded-md"/>
    )
}