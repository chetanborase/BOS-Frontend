import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Spinner from '../Spinner';

const styles = {
    label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
    error: 'block mb-2 text-sm font-medium text-gray-900 text-red-600',
    inputTextElements: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
}

const ViewProfile = (props) => {
    console.log("data :::", props.data);

    if (!(props.data?.userId)){
        return <Spinner/>
    }

    return (
        <form
            className='bg-white rounded-lg flex flex-col  p-10 py-2 '
            onSubmit={() => { }}
            disabled >
            <hr className="mb-7"></hr>
            <div

                className="grid gap-6 mb-6 md:grid-cols-2 md:file:divide-x-2 pr-5 ">
                <div>
                    <div
                        className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="firstName"
                                className={styles.label}>First name*</label>
                            <input disabled type="text" id="firstName"
                                value={props.data.firstName}
                                className={styles.inputTextElements}

                            />


                        </div>


                        <div>
                            <label htmlFor="lastName"
                                className={styles.label}>Last name*</label>
                            <input disabled type="text" id="lastName"
                                value={props.data.lastName}
                                className={styles.inputTextElements}
                            />

                        </div>

                    </div>

                    <div
                        className="mb-6">
                        <label htmlFor="dob"
                            className={styles.label}>Date of Birth*</label>
                        <input disabled type="text" id="dob"
                            value={new Date(props.data.dob).toLocaleDateString()}
                            className={styles.inputTextElements}
                        />


                    </div>

                    <div
                        className="mb-6">
                        <label htmlFor="Department"
                            className={styles.label}>Department*</label>
                        <input disabled type="text" id="department"
                            value={props.data.department}
                            className={styles.inputTextElements}
                        />


                    </div>
                    <div
                        className="mb-6">

                        <label htmlFor="userId"
                            className={styles.label}>User Id*</label>
                        <input disabled type="text" id="userId"
                            value={props.data.userId}
                            className={styles.inputTextElements}
                        />


                    </div>

                    <div
                        className="mb-6">
                        <label htmlFor="role"
                            className={styles.label}>Role*</label>
                        <input disabled type="text" id="role"
                            value={props.data.role?.join(" ")}
                            className={styles.inputTextElements}
                        />


                    </div>

                </div>
                <div
                    className='pl-5'>
                    <div
                        className="mb-6">
                        <label htmlFor="address"
                            className={styles.label}>Address*</label>
                        <input disabled type="address" id="address"
                            value={props.data.address}
                            className={styles.inputTextElements}
                        />


                    </div>

                    <div
                        className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="city"
                                className={styles.label}>City*</label>
                            <input disabled type="text" id="city"
                                value={props.data.city}
                                className={styles.inputTextElements}
                            />


                        </div>
                        <div>
                            <label htmlFor="state"
                                className={styles.label}>State*</label>
                            <input disabled type="text" id="state"
                                value={props.data.state}
                                className={styles.inputTextElements}
                            />


                        </div>
                        <div>
                            <label htmlFor="zipCode"
                                className={styles.label}>ZipCode*</label>
                            <input disabled type="text" id="zipCode"
                                value={props.data.zipCode}
                                className={styles.inputTextElements}
                            />


                        </div>

                    </div>

                    <div
                        className="mb-6">
                        <label htmlFor="email"
                            className={styles.label}>Email address*</label>
                        <input disabled type="email" id="email"
                            value={props.data.email}
                            className={styles.inputTextElements}
                        />


                    </div>
                    <div
                        className="mb-6">
                        <label htmlFor="phone"
                            className={styles.label}>Phone Number*</label>
                        <input disabled type="tel" id="phone"
                            value={props.data.phone}
                            className={styles.inputTextElements}
                        />


                    </div>

                </div>
            </div>
        </form>
    )
}

export default ViewProfile;