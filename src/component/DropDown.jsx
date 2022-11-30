import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getAuth, setAuth } from "../service/Auth";

export default function AdminMenu() {
    const navigate = useNavigate()
    const logOutHandler = () => {
        setAuth("")
        navigate("/")
    }
    return (
        <Menu
            animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
            }}
        >
            <MenuHandler>
                <Button variant="gradient">Menu</Button>
            </MenuHandler>
            <div className="cursor-pointer">
                <MenuList>
                    <div className="my-2 bg-gray-300 rounded-md p-1 text-black font-semibold">
                        <MenuItem onClick={() => { navigate("/user") }}>Profile</MenuItem>
                    </div>
                    <div className="bg-red-500 rounded-md p-1 text-white">
                        <MenuItem onClick={logOutHandler}>Log out</MenuItem>
                    </div >
                </MenuList>
            </div>
        </Menu>
    );
}