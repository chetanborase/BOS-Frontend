import React from 'react'
import { useState } from 'react'
import Spinner from '../../component/Spinner'
import ViewProfile from '../../component/user/ViewProfile'
import UserService from '../../service/UserService'
import { getAuth, setAuth } from '../../service/Auth'
import { useNavigate } from 'react-router-dom'

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

const UserPage = (props) => {
    const [state, setstate] = useState({ data: {}, isLoading: false });
    const navigate = useNavigate()

    React.useEffect(() => {
        const authUser = getAuth();
        if (authUser && authUser.accessToken) {
            new UserService().
                getUserDetails(authUser.user.userId)
                .then(
                    (response) => {
                        console.log(response.data.data);
                        setstate({ isLoading: false, data: response.data.data })
                    }
                ).catch(
                    (err) => {
                        console.log("response :",err.response);
                        if(err.response?.data?.message && !(alert("Error : ",err.response.data.message))){
                            redirectToLoginPage()
                        }
                        else if (alert(err.message)) {
                        
                        } else{}
                    }
                )
        }
        else {
            redirectToLoginPage()
        }

    }, []);

    const redirectToLoginPage = () => {
        setAuth('')
        alert("Please login first.")
        navigate("/")
    }

    return (
        <section
            className='h-full w-full flex justify-center items-center  '>

            <div className='sm:w-screen h-[80%] md:w-[60%]  bg-white border shadow-lg'>
                {
                    state.isLoading ?
                        <Spinner />
                        :
                        <>
                            <div className="grid grid-cols-[minmax(0,1fr),auto,minmax(0,1fr)] items-center ">
                                <div></div>
                                <div className="text-2xl pt-2 font-semibold">
                                    User Information
                                </div>
                                <div className=" ml-auto px-8 pt-2">
                                    <Menu
                                        animate={{
                                            mount: { y: 0 },
                                            unmount: { y: 25 },
                                        }}
                                    >
                                        <MenuHandler>
                                            <Button variant="gradient">
                                                <div className='w-10 bg-gray-400 flex items-center justify-center rounded-md p-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                                    </svg>
                                                </div>
                                            </Button>
                                        </MenuHandler>
                                        <div className="cursor-pointer">
                                            <MenuList>
                                                <div className="my-2 bg-gray-300 rounded-md p-1 text-black font-semibold">
                                                    <MenuItem onClick={() => { navigate("/user/update") }}>Edit</MenuItem>
                                                </div>
                                                <div className="bg-red-500 rounded-md pt-1 text-white">
                                                    <MenuItem onClick={() => {
                                                        setAuth('')
                                                        navigate('/')
                                                     }}>Log out</MenuItem>
                                                </div >
                                            </MenuList>
                                        </div>
                                    </Menu>
                                </div>
                            </div>

                            <ViewProfile data={state.data} />
                        </>

                }
            </div >
        </section>

    )
}





export default UserPage;