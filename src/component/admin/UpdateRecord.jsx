import React from 'react';
import Spinner from '../Spinner';
import UserForm from '../UserForm';

// Service
import AdminService from '../../service/AdminService'
import RoleService from '../../service/RoleService'

const UpdateRecord = (props) => {
    const [roleState, setroleState] = React.useState(null);
    const [state, setstate] = React.useState({
        data: {},
        editable: props.editable,
        isLoading: true,
        isSubmitting: false,
        message: null,
    });

    React.useEffect(() => {
        console.log("Inside use effect : ", props.userId);

        new RoleService().
            getRoles()
            .then(
                (response) => {
                    console.log("roles recieved", [...response.data]);
                    setroleState([...response.data])
                }
            ).catch((err) => {
                if (!alert("Failed to load user roles.")) {
                    props.onCloseCallback ? props.onCloseCallback() : null
                }
                console.log(err);
            })

        new AdminService().
            getEmployeeById(props.userId)
            .then(
                (response) => {
                    let user = response.data.data
                    user.dob = new Date(user.dob).toISOString().slice(0, 10);

                    setstate({ isSubmitting: false, isLoading: false, data: user })
                }
            ).catch((err) => {
                const msg = err.response?.data?.message?err.response?.data?.message:"Something unexpected happened, please try again !!!";
                setstate({ isLoading: false, message: { error: msg } })
            })
    }, []);

    const onFormSubmit = (data) => {
        // e.preventDefault()
        let requestBody = {
            ...data,
            role: [data.role]
        }

        alert(JSON.stringify(requestBody))
        console.log("form data is :", props.userId);

        setstate({ isSubmitting: true })

        new AdminService().
            updateEmployee(props.userId, requestBody)
            .then(
                (response) => {

                    let user = response.data.data
                    user.dob = new Date(user.dob).toISOString().slice(0, 10);

                    setstate({ isLoading: false, data: user, message: { success: "Data updated successfully!!!" } })
                }
            ).catch((err) => {
                const msg = err.response?.data?.message?err.response?.data?.message:"Something unexpected happened, please try again !!!";
                setstate({ isLoading: false, message: { error: msg } })

            })
    }

    const renderSnackbar = (message) => {
        if (!message) {
            return <></>
        }
        if (message.success) {
            return <>
                <div className="bg-green-300 p-4 mb-5 rounded-lg ">
                    <p className="opacity-100"> {message.success}</p>
                </div>
            </>

        }
        if (message.error) {
            return <>
                <div className="bg-red-300 p-4 mb-5 rounded-lg ">
                    <p className="opacity-100"> {message.error}</p>
                </div>
            </>

        }
        return <></>
    }

    console.log("State.Roles :", roleState);

    return (<div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">

        {
            state.isLoading || !roleState ?
                <Spinner /> :
                <UserForm
                    title={"Update Details"}
                    onSubmit={onFormSubmit}
                    editable={true}
                    roles={roleState}
                    onCloseCallback={props.onCloseCallback}
                    Snackbar={
                        renderSnackbar(state.message)
                    }
                    ActionComponent={<>
                        <button type="submit"
                            className="flex self-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            {
                                state.isSubmitting ?
                                    <>
                                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        <>Saving...</>
                                    </> : <>Save</>
                            }
                        </button>
                    </>}
                    data={state.data}
                />

        }

    </div>)
}

export default UpdateRecord;