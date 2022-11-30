// import { format } from 'date-fns'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ACTION_NAME } from '../../constant/adminConstant'

// Genetal Components
import RecordsTable from '../../component/RecordsTable'
import Spinner from '../../component/Spinner'

// Service
import AdminService from '../../service/AdminService'
import RoleService from '../../service/RoleService'

// Admin component
import ViewRecord from '../../component/admin/ViewRecord'
import CreateRecord from '../../component/admin/CreateRecord'
import UpdateRecord from '../../component/admin/UpdateRecord'
import DeleteRecord from '../../component/admin/DeleteRecord'
import { useTable } from 'react-table'
import { setAuth } from '../../service/Auth'

const ListRecord = (props) => {
    const [state, setstate] = React.useState({
        data: [],
        search: "",
        page: 0,
        totalPages: 10,
        isLoading: true,
        isError: null,
        fetchRecord: true
    });

    // const [fetchRecord, setfetchRecord] = React.useState(true);

    const COLUMNS = [
        {
            Header: 'Id',
            Footer: 'Id',
            accessor: 'userId',
            disableFilters: true,
            sticky: 'left'
        },
        {
            Header: 'First Name',
            Footer: 'First Name',
            accessor: 'firstName',
            sticky: 'left'
        },
        {
            Header: 'Last Name',
            Footer: 'Last Name',
            accessor: 'lastName',
            sticky: 'left'
        },
        {
            Header: 'Email',
            Footer: 'Email',
            accessor: 'email'
        },

        {
            Header: 'Department',
            Footer: 'Department',
            accessor: 'department'
        },

        {
            Header: 'Role',
            Footer: 'Role',
            accessor: 'role'
        },

        {
            Header: 'Action',
            Footer: 'Action',
            Cell: (cell) => {
                const { row, data } = cell
                const rowId = data[row.index].userId
                return (<div className='flex'>
                    <button
                        className='text-black dark:text-white hover:bg-green-200 flex items-center justify-center rounded-xl p-2'
                        onClick={() => { props.ActionClickCallback(ACTION_NAME.VIEW, rowId) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>

                    <button
                        className='text-black dark:text-white hover:bg-yellow-100 flex items-center justify-center rounded-xl p-2'
                        onClick={() => { props.ActionClickCallback(ACTION_NAME.UPDATE, rowId) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button
                        className='text-black dark:text-white hover:bg-red-200 flex items-center justify-center rounded-xl p-2'
                        onClick={() => { props.ActionClickCallback(ACTION_NAME.DELETE, rowId) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
                )
            }
        }
    ]

    const navigate = useNavigate()

    const fetchRecords = () => {
        console.log("fetching records.");
        new AdminService().searchEmployee(state.search, state.page).then(
            (response) => {
                console.log(response.data?.data);
                // console.log(response.data?.data?.totalPages);
                setstate({ isLoading: false, totalPages: response.data?.data?.totalPages - 1, data: response.data?.data?.content })
            }).catch((err) => {
                state.isLoading = false;
                if (err.response?.status == "403") {
                    alert("You are not authorised to access this page.")
                    setAuth('')
                    navigate("/")
                }
                else {
                    if (err.response?.data?.message && !alert(err.response?.data.message)) {
                    } else {
                        alert("Something unexpected happened.")
                    }
                    setAuth('')
                    navigate("/")
                }
                console.log("Error : ", err);
            }
            )
    }
    if (state.fetchRecord) {
        state.fetchRecord = false
        fetchRecords()
    }

    const columns = React.useMemo(() => COLUMNS, [])
    const data = React.useMemo(() => {
        if (state.isLoading) {
            return []
        }

        return state.data || []
    }, [state.isLoading])

    // console.log(state.data);


    const tableProps = useTable({
        columns, data
    })

    return (<>
        <div
            className='w-full h-full flex flex-col justify-center  items-center '>

            {/* this is card */}
            <div className=' flex flex-col gap-2 divide-y-2 bg-white shadow-sm rounded-xl w-[100%] h-full justify-items-stretch grow '>

                {/* Action Secion */}
                <div className={'justify-self-start p-3 pt-2 pb-0 flex  justify-between'}>
                    <form className='flex gap-2 justify-between'
                        onSubmit={(e) => {
                            e.preventDefault()
                            setstate({ fetchRecord: true, search: e.target.search.value })
                        }}
                    >
                        <input
                            type='text'
                            name="search"
                            placeholder='Search Text'
                            className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  my-1 '}>
                        </input>
                        <button type='submit' className='bg-blue-700 p-2 px-2 rounded-md text-white text-sm mx-2'
                        >
                            Search</button>
                    </form>
                    {/* Pagination Section */}
                    {/* <div className={' p-3 pt-2 '}> */}
                    <form className='flex gap-2 justify-left '
                        onSubmit={(e) => {
                            e.preventDefault()
                            setstate({ fetchRecord: true, page: e.target.page.value })
                        }}         >
                        <input
                            type='number'
                            placeholder={`0 - ${state.totalPages}`}
                            id="page"
                            name="page"
                            className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  my-1 px-3'}>
                        </input>
                        <button type='submit'
                            className='bg-blue-700 p-2 px-3 rounded-md text-white text-sm mx-2 '>
                            go</button>
                    </form>
                    {/* </div> */}
                </div>

                {/* Table Secion */}
                <div className={'p-3  flex-1  relative overflow-scroll  '}>
                    {/* <div className='bg-purple-400 min-w-fit max-w-fit '> */}
                    <div
                        className='hidden content-start divide-black '>
                    </div>
                    {
                        state.isLoading ? <Spinner /> :

                            data.length < 1 ? <div className='flex justify-center text-black font-bold dark:text-white '>
                                No Records found
                            </div> :
                                <RecordsTable
                                    tableProps={tableProps}
                                    style={{
                                        table: 'text-black w-full dark:text-white  text-md',
                                        headerRow: 'p-2 content-start shadow-sm text-md',
                                        headerCell: 'p-2 text-left text-md',
                                        bodyRow: 'p-2 content-start  shadow-sm text-md',
                                        bodyCell: 'p-2 text-left ',
                                    }} />
                    }
                </div>


            </div>

        </div >
    </>
    )
}

export default ListRecord;

