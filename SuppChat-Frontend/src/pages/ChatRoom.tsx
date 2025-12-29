import SideBar from "../components/SideBar";
import ChatIcon from "../icons/ChatIcon";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function ChatRoom(){
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
                        <div className="flex justify-end">
                            <p className="text-xl bg-lightest-green px-5 py-1 border border-darkest-green rounded-md m-2">I am good, wby?</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-xl bg-lightest-green px-5 py-1 border border-darkest-green rounded-md m-2">Hi bro</p>
                        </div>
                        <div className="flex justify-start">
                            <div>
                                <p className="text-normal-green mx-2">Sunil</p>
                                <p className="text-xl bg-light-green px-5 py-1 border border-darkest-green rounded-md mx-2">Hey Bro</p>
                            </div>  
                        </div>
                        <div className="flex justify-start">
                            <div>
                                <p className="text-normal-green mx-2">Sunil</p>
                                <p className="text-xl bg-light-green px-5 py-1 border border-darkest-green rounded-md mx-2">How are you?</p>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <InputField placeHolderValue="Send Message"/>
                    <Button title={"Send"} size={"md"}/>
                </div>
            </div>
        </>
    )
}