import CrossIcon from "../icons/CrossIcon";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { createRoomAtom, joinRoomAtom, userGlobalStateAtom } from '../atoms/atoms';


export default function RoomForm(){
    
    const [createRoom,setCreateRoom] = useAtom(createRoomAtom);
    const [joinRoom,setJoinRoom] = useAtom(joinRoomAtom);
    const [userGlobalState,setUserGlobalState] = useAtom(userGlobalStateAtom);

    const navigate = useNavigate();
    //@ts-ignore
    const usernameRef = useRef<HTMLInputElement>();
    //@ts-ignore
    const roomIdRef = useRef<HTMLInputElement>();

    function buttonClick(){

        setUserGlobalState({
            ...userGlobalState,
            username: usernameRef.current.value,
            roomid: roomIdRef.current.value
        })

        userGlobalState['ws']?.send(JSON.stringify({
                    type:'join',
                    payload:{
                        username: usernameRef.current.value,
                        roomid: roomIdRef.current.value
                    }
                }
            )
        )
        navigate('/chat')
    }

    return(
        <>
            {(createRoom||joinRoom) &&
            <div className="h-screen w-screen fixed bg-slate-300/65 flex justify-center items-center">
                <div className="bg-light-green p-5 rounded-xl border border-darkest-green">
                    <div className="w-xs flex justify-between items-center text-3xl text-dark-green font-medium mb-10">
                        <p>{(createRoom)?"Create Room":"Join Room"}</p>
                        <CrossIcon onClickHandler={()=>{
                            createRoom?setCreateRoom(false):setJoinRoom(false)
                        }}/>
                    </div>
                    <div className="w-xs flex flex-col justify-center items-center gap-5">
                        <InputField placeHolderValue={"Set Username"} reference={usernameRef}/>
                        <InputField placeHolderValue={(createRoom)?"Set Room ID":"Enter Room ID"} reference={roomIdRef}/>
                        <Button title={(createRoom)?"Create Room":"Join Room"} size={"lg"} onClickHandler={buttonClick}/>
                    </div>
                </div>
            </div>
            }
        </>
    )
}