import Button from "../components/Button";

export default function SideBar(){
    return(
        <div className="w-[25%] h-screen fixed top-0 left-0 bg-light-green border-r border-darkest-green flex flex-col justify-evenly items-center">
            <div className="flex flex-col justify-center items-center gap-10">
                <p className="text-3xl text-normal-green font-bold">Room ID: hfs74r</p>
                <div className="flex flex-col justify-center items-left gap-3 bg-white border border-darkest-green px-5 py-5">
                    <p className="text-2xl text-normal-green font-bold">People in the room</p>
                    <ul className="list-disc list-inside text-xl text-normal-green font-bold">
                        <li>yashsh</li>
                        <li>Sunil</li>
                    </ul>
                </div>
            </div>
            <div>
                <Button title={"Leave Room"} size={"lg"} />
            </div>
        </div>
    )
}