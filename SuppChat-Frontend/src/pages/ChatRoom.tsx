import SideBar from "../components/SideBar";
import ChatIcon from "../icons/ChatIcon";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { userGlobalStateAtom, peopleInRoomAtom, chatHistoryAtom } from "../atoms/atoms";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function ChatRoom(){
    const userGlobalState = useAtomValue(userGlobalStateAtom);
    const [chatHistory,setChatHistory] = useAtom(chatHistoryAtom);
    const setPeopleInRoom = useSetAtom(peopleInRoomAtom); 
    //@ts-ignore
    const messageRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    useEffect(()=>{
        if(userGlobalState.roomid == ''){
            navigate('/');
        }

        userGlobalState['ws'].addEventListener('message',(e)=>{
            const data = JSON.parse(e.data);

            if(data.type=='chat'){
                setChatHistory([{
                username: data?.username,
                message: data?.message
                },...chatHistory])
            }

            if(data.type=='join'){
                setPeopleInRoom(data.peopleInRoom);
            }
        })
    },[chatHistory]);

    function sendMessage(){
        userGlobalState['ws'].send(JSON.stringify({
            type:'chat',
            payload:{
                message: messageRef.current.value
            }
        }))
        messageRef.current.value='';
    }

    return(
        <>
            <SideBar />
            <div className="w-[75%] h-screen flex flex-col gap-5 bg-lightest-green absolute left-[25%] p-5">
                <div className="flex items-center gap-2 text-4xl text-dark-green font-semibold">
                    <p>SuppChat</p>
                    <ChatIcon />
                </div>
                <div className="h-[80%] w-full flex flex-col bg-white border border-darkest-green rounded-md p-2">
                    <div className="flex flex-col-reverse overflow-y-auto">
                        {chatHistory?.map(x =>{
                            return (x.username == userGlobalState['username'])?(
                            <div className="flex justify-end">
                                <p className="text-xl bg-lightest-green px-5 py-1 border border-darkest-green rounded-md m-2">{x.message}</p>
                            </div>):(
                            <div className="flex justify-start">
                                <div>
                                    <p className="text-normal-green mx-2">{x.username}</p>
                                    <p className="text-xl bg-light-green px-5 py-1 border border-darkest-green rounded-md mx-2">{x.message}</p>
                                </div>  
                            </div>
                            )
                        })}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <InputField placeHolderValue="Send Message" reference={messageRef}/>
                    <Button title={"Send"} size={"md"} onClickHandler={sendMessage} />
                </div>
            </div>
        </>
    )
}