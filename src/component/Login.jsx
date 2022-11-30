import React from 'react'

const Login = (props) => {

    const [state,setState] = React.useState({warning:false})
    const onFormChange=(e)=>{
        
    }
    const onKeyDown = keyEvent => {
        if (keyEvent.getModifierState("CapsLock")) {
          setState({ warning: true });
        } else {
          setState({ warning: false });
        }
      };
    
      console.log(state);

    return (
        <section className="h-full w-full flex flex-col ">
            <div className="flex flex-1 items-center justify-center">
                <div className="rounded-lg sm:border-2 px-10 m-10  lg:px-10 py-16 lg:max-w-xl sm:max-w-md w-full text-center bg-white">
                    <form className="text-center" onSubmit={props.onSubmit}
                    onKeyDown={onKeyDown}
                    >
                        <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                            Login here !!!
                        </h1>
                        <div className="py-2 text-left">
                            <input type="text" className=" border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                                name="username"
                                placeholder="Username" />
                        </div>
                        <p className={" block mb-2 text-sm font-medium text-red-600 text-left ml-1"}>{props.errors?.username}</p>

                        <div className="py-2 text-left">
                            <input type="password" className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                                name="password"
                                placeholder="Password" />
                        </div>
                        <p className={" block mb-2 text-sm font-medium text-red-600 text-left ml-1"}>{props.errors?.password}</p>
                        <p className={" block mb-2 text-sm font-medium text-red-600 text-left ml-1"}>{props.errors?.common}</p>
                        {
                            state.warning && <p className={" block mb-2 text-sm font-medium text-red-600 text-left ml-1"}>Warning: Caps lock is on.</p>
                        }
                        <div className="py-2">
                            <button type="submit" className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                                Log In
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <a href="#" className="hover:underline"
                            onClick={() => { alert("Contact system admin to reset password.") }}
                        >Forgot password?</a>
                    </div>

                </div>
            </div>
        </section>
    )
}


export default Login;