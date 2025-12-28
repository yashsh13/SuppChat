import ChatIcon from "../icons/ChatIcon";
import Button from "../components/Button";
import CreateRoomForm from "../components/CreateRoomForm";
import { useState } from "react";

export default function SelectRoom(){
    const [createRoomVisible,setCreateRoomVisible] = useState(false);

    return (
        <>
            <CreateRoomForm visible={createRoomVisible} onClose={()=>setCreateRoomVisible(false)} />
            <div className="h-screen w-screen bg-lightest-green flex justify-center items-center">
                <div>
                    <div className="flex justify-center items-center gap-2 font-semibold text-dark-green mb-5">
                        <p className="text-4xl">SuppChat</p>
                        <ChatIcon />
                    </div>
                    <div className="flex flex-col justify-between items-center gap-5 bg-light-green border-2 border-darkest-green rounded-xl px-12 py-16">
                        <Button title={"Create Room"} size={"lg"} onClickHandler={()=>setCreateRoomVisible(true)}/>
                        <p className="text-lg text-darkest-green">or</p>
                        <Button title={"Join Room"} size={"lg"} />
                    </div>
                </div>
            </div>
        </>
    )
}