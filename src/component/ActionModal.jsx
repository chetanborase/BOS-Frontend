

const ActionModal = (props) => {
    return <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
                        <h3 className="text-2xl font-semibold">
                            {props.title}
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => props.onCloseCallback}
                        >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            {props.message}
                        </p>
                    </div>
                    {/*footer*/}
                    {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"> */}
                    <div className="p-3 border-t border-solid border-slate-200 rounded-b">
                        {props.ActionComponent}
                    </div>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
}

export default ActionModal;