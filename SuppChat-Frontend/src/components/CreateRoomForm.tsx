import CrossIcon from "../icons/CrossIcon";
import Button from "../components/Button";
import InputField from "../components/InputField";

interface CreateRoomFormProps{
    visible: boolean,
    onClose: ()=>void
}

export default function CreateRoomForm({ visible, onClose}: CreateRoomFormProps){
    return(
        <>
            {visible &&
            <div className="h-screen w-screen fixed bg-slate-300/65 flex justify-center items-center">
                <div className="bg-light-green p-5 rounded-xl border border-darkest-green">
                    <div className="w-xs flex justify-between items-center text-3xl text-dark-green font-medium mb-10">
                        <p>Create Room</p>
                        <CrossIcon onClickHandler={onClose}/>
                    </div>
                    <div className="w-xs flex flex-col justify-center items-center gap-5">
                        <InputField placeHolderValue={"Set Username"} />
                        <InputField placeHolderValue={"Set Room ID"} />
                        <Button title={"Create Room"} size={"lg"} />
                    </div>
                </div>
            </div>
            }
        </>
    )
}