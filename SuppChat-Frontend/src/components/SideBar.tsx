import Button from "../components/Button";
import { peopleInRoomAtom,userGlobalStateAtom } from '../atoms/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from "react-router-dom";

export default function SideBar(){
    const peopleInRoom = useAtomValue(peopleInRoomAtom);
    const [userGlobalState,setUserGlobalState] = useAtom(userGlobalStateAtom);
    const navigate = useNavigate();

    function leaveRoom(){
        
        userGlobalState['ws']?.send(JSON.stringify({
            type:'leave',
            payload:{
                roomid: userGlobalState.roomid,
                username: userGlobalState.username 
            }
        }));

        setUserGlobalState({...userGlobalState,
            username:'',
            roomid:''
        })
        navigate('/');
    }
    
    return(
        <div className="w-[25%] h-screen fixed top-0 left-0 bg-light-green border-r border-darkest-green flex flex-col justify-evenly items-center">
            <div className="flex flex-col justify-center items-center gap-10">
                <p className="text-3xl text-normal-green font-bold">Room ID: {userGlobalState.roomid}</p>
                <div className="flex flex-col justify-center items-left gap-3 bg-white border border-darkest-green px-5 py-5">
                    <p className="text-2xl text-normal-green font-bold">People in the room</p>
                    <ul className="list-disc list-inside text-xl text-normal-green font-bold">
                        {peopleInRoom?.map(x => (userGlobalState.username==x.username)?(<li key={x.userid}>{x.username + ' (You)'}</li>):(<li key={x.userid}>{x.username}</li>))} 
                    </ul>
                </div>
            </div>
            <div>
                <Button title={"Leave Room"} size={"lg"} onClickHandler={leaveRoom}/>
            </div>
        </div>
    )
}