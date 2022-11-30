import React from 'react';
import Spinner from '../Spinner';
import UserForm from '../UserForm';

// Service
import AdminService from '../../service/AdminService'
import RoleService from '../../service/RoleService'

const ViewRecord = (props) => {
    const [state, setstate] = React.useState({
        data: {},
        isLoading: true,
        message: null
    });

    React.useEffect(() => {
        new AdminService().
            getEmployeeById(props.userId)
            .then(
                (response) => {
                    let user = response.data.data
                    user.dob = new Date(user.dob).toISOString().slice(0, 10);

                    console.log(user);
                    setstate({ isSubmitting: false, isLoading: false, data: user })
                }
            ).catch((err) => {
                console.log(err);
            })
    }, []);

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

    return (<div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        {
            state.isLoading ?
                <Spinner />
                :
                <UserForm
                    title={"View Details"}
                    onSubmit={(data) => { }}
                    editable={false}
                    roles={[{ title: state.data?.role.join() }]}
                    onCloseCallback={props.onCloseCallback}
                    Snackbar={
                        renderSnackbar(state.message)
                    }

                    data={state.data}
                />
        }

    </div>)
}

export default ViewRecord;