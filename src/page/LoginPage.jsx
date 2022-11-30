import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../component/Login'
import { getAuth, loginHandler, setAuth } from '../service/Auth'
import Spinner from '../component/Spinner'
import UserService from '../service/UserService'

 function LoginPage() {
    const [state, setState] = useState({ isLoading: false, errors: {} })
    const navigate = useNavigate()

console.log("LoginPage");
    useEffect(() => {
        const authUser = getAuth();
        if (authUser == null || authUser.acceToken == null) {
            return
        }

        new UserService().
            getUserDetails(authUser.user.userId)
            .then(
                (response) => {
                    setAuth(JSON.stringify(response.data))
                    if(!alert(`Welcome back ${response.data.user.firstName}`)){
                        redirectMe()
                    }
                }
            ).catch(
                (err) => {
                    console.log(" error while getting user ", err);
                }
            )

    }, []);

    const redirectMe = () => {
        if (getAuth()?.user?.role?.includes("Admin")) {
            navigate("/admin")
        }
        else if (getAuth()?.user?.role?.includes("Employee")) {
            navigate("/user")
        }
        else{
            alert("You haven't assigned any role. contact system admin")
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const username = e.target.username?.value.trim()
        const password = e.target.password?.value.trim()
        let errors = {}
        if (!username) {
            errors["username"] = "Invalid username length"
        }
        if (!password || password.length < 6) {
            errors["password"] = "Invalid password length"
        }
        if (Object.keys(errors).length !== 0) {
            //it means form is incomplete
            state.errors = errors
            setState({ ...state })
    
        } else {
            loginHandler(username, password).then(
                (response) => {
                    // Store Auth Repsonse to local storage
                    console.log(JSON.stringify(response.data));
                    setAuth(JSON.stringify(response.data))
                    
                    if(!alert(`Welcome back ${response.data.user.firstName}`)){
                        redirectMe()
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                    setState({ ...state, errors: { "common": "User Id Does not exists!!!" } })
                }
            )
        }
    }

    return (
        <div
        className='h-full w-screen bg-gradient-to-r from-purple-800 via-purple-500 to-pink-400 sm:h-screen overflow-y-visible flex justify-center items-center'>
            {
                state.isLoading ?
                    <Spinner /> :
                    <div className='h-[550px] w-[450px]'>
                        <Login onSubmit={onSubmit} errors={state.errors} />
                    </div>
            }
        </div>)
}


export default LoginPage;