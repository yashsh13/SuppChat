import CrossIcon from "../icons/CrossIcon";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { createRoomAtom, joinRoomAtom, userGlobalStateAtom, peopleInRoomAtom, errorDisplayAtom } from '../atoms/atoms';

export default function RoomForm(){
    
    const [createRoom,setCreateRoom] = useAtom(createRoomAtom);
    const [joinRoom,setJoinRoom] = useAtom(joinRoomAtom);
    const [errorDisplay,setErrorDisplay] = useAtom(errorDisplayAtom);
    const [userGlobalState,setUserGlobalState] = useAtom(userGlobalStateAtom);
    const setPeopleInRoom = useSetAtom(peopleInRoomAtom);

    const navigate = useNavigate();
    //@ts-ignore
    const usernameRef = useRef<HTMLInputElement>();
    //@ts-ignore
    const roomIdRef = useRef<HTMLInputElement>();

    function buttonClick(){

        userGlobalState['ws']?.send(JSON.stringify({
                    type:createRoom?'create':'join',
                    payload:{
                        username: usernameRef.current.value,
                        roomid: roomIdRef.current.value
                    }
                }
            )
        )

        userGlobalState['ws']?.addEventListener('message',(e)=>{
            const data = JSON.parse(e.data);
            if(data.type=='Enter Room'){

                setUserGlobalState({
                    ...userGlobalState,
                    username: usernameRef.current.value,
                    roomid: roomIdRef.current.value
                })
                setPeopleInRoom(data.peopleInRoom);

                navigate('/chat');
                createRoom?setCreateRoom(false):setJoinRoom(false);
                return
            }

            if(data.type=='error'){
                console.log('Error while entering room: '+ data.error);
                setErrorDisplay(data.error);
            }
        })
    }

    return(
        <>
            {(createRoom||joinRoom) &&
            <div className="h-screen w-screen fixed bg-slate-300/65 flex justify-center items-center">
                <div className="bg-light-green p-5 rounded-xl border border-darkest-green">
                    <div className="w-xs flex justify-between items-center text-3xl text-dark-green font-medium mb-10">
                        <p>{(createRoom)?"Create Room":"Join Room"}</p>
                        <CrossIcon onClickHandler={()=>{
                            createRoom?setCreateRoom(false):setJoinRoom(false);
                            setErrorDisplay('');
                        }}/>
                    </div>
                    <div className="w-xs flex flex-col justify-center items-center gap-5">
                        <InputField placeHolderValue={"Set Username"} reference={usernameRef}/>
                        <InputField placeHolderValue={(createRoom)?"Set Room ID":"Enter Room ID"} reference={roomIdRef}/>
                        <Button title={(createRoom)?"Create Room":"Join Room"} size={"lg"} onClickHandler={buttonClick}/>
                        <p className="text-red-500 text-center">{errorDisplay}</p>
                    </div>
                </div>
            </div>
            }
        </>
    )
}