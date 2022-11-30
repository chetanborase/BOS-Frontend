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
import ListRecord from '../../component/admin/ListRecord'
import CreateRecord from '../../component/admin/CreateRecord'
import UpdateRecord from '../../component/admin/UpdateRecord'
import DeleteRecord from '../../component/admin/DeleteRecord'
import DropdownRender from '../../component/DropDown'
import AdminMenu from '../../component/DropDown'

const AdminPage = () => {
  const [actionState, setActionState] = React.useState({
    actionName: null,
    actionUserId: null
  });

  const onCloseCallback = () => {
    console.log("On Close Callback");
    setActionState({})
  }

  const actionCallback = (actionId, data) => {
    console.log("Render mdoal", actionId);
    setActionState({ actionName: actionId, actionUserId: data })
  }
  console.log("Admin Page");

  const renderModal = (action, userId) => {

    switch (action) {
      case ACTION_NAME.VIEW: return (<>
        <ViewRecord
          userId={userId}
          onCloseCallback={onCloseCallback} />
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>)
      case ACTION_NAME.CREATE: return (<>
        <CreateRecord
          onCloseCallback={onCloseCallback} />
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>)
      case ACTION_NAME.UPDATE: return (<>
        <UpdateRecord
          userId={userId}
          onCloseCallback={onCloseCallback} />
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>)

      case ACTION_NAME.DELETE: return (<>
        <DeleteRecord
          userId={userId}
          onCloseCallback={onCloseCallback} />
      </>)

      default: <>
      </>
    }
  }

  return (
    <div
      className='h-full w-screen flex flex-col sm:flex-col md:flex-col justify-center items-center  '>
      <div className='w-[90%] h-[90%] bg-white relative rounded-lg shadow-lg divide-y-2'>
        <div className='h-[10%]'>
          <div className='w-full rounded-sm p-3 h-15 flex justify-between '>
            <button className='bg-blue-700 p-2 px-2 rounded-md text-white text-sm mx-2'
              onClick={() => { actionCallback(ACTION_NAME.CREATE, null) }}
            >
              Add Record</button>
            <div className='p-2 px-3 mx-5 bg-blue-700 rounded-md text-white text-sm'>
              <AdminMenu />
            </div>
            {/* <button className='bg-blue-700 p-2 px-2 rounded-md text-white text-sm mx-2'>
              Menu</button> */}
          </div>
        </div>
        <div className='h-[90%]'>
          {/* <div className='w-full h-full grow bg-gray-500 px-2 py-10'> */}
          <ListRecord
            ActionClickCallback={actionCallback} />
          {/* </div> */}
        </div>

        <div>
          {
            renderModal(actionState.actionName, actionState.actionUserId)
          }
        </div >
      </div>
    </div>
  )
}

export default AdminPage;

