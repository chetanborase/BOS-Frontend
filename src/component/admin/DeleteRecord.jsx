import React from 'react';

import ActionModal from '../../component/ActionModal'
// Service
import AdminService from '../../service/AdminService'


const DeleteRecord = (props) => {
    const [state, setstate] = React.useState({
        isLoading: false,
    });

    const onConfirm = () => {
        setstate({ isLoading: true })
        new AdminService().
            deleteEmployeeById(props.userId)
            .then(
                (response) => {
                    if (!alert("Record deleted successfully.")) {
                        props.onCloseCallback()
                    }
                    setstate({ isLoading: false })
                }
            ).catch((err) => {
                if (!alert(err.response.data.message)) {
                    props.onCloseCallback()
                }
                setstate({ isLoading: false })
                console.log(err);
            })
    }


    const Actionomponent = <div className="flex items-start justify-between text-md">
        {/* Cancel button */}
        <button
            className="bg-gray-200 p-2 px-2 rounded-md text-black border border-gray-600 dark:text-white"
            onClick={props.onCloseCallback}>
            Cancel
        </button>
        {/* Second button */}
        <button
            className="flex bg-red-500 border border-red-700 p-2 px-2 rounded-md text-white dark:text-white  "
            onClick={onConfirm}>
            {
                state.isLoading ?
                    <>
                        <svg className="w-5 h-5 mr-1 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <>Deleting...</>
                    </> : <>Delete</>
            }
        </button>
    </div>

    return <>
        <ActionModal
            title="Confirm"
            message="Are you sure you want to delete this record?"
            onCloseCallback={props.onCloseCallback}
            ActionComponent={Actionomponent}
        />
    </>
}

export default DeleteRecord;