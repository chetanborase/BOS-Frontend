
import Spinner from '../Spinner';
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// Service
import RoleService from '../../service/RoleService'
import UserService from '../../service/UserService';
import { getAuth } from '../../service/Auth';
import { useNavigate } from 'react-router-dom';

const styles = {
    label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
    error: 'block mb-2 text-sm font-medium text-gray-900 text-red-600',
    success: 'block mb-2 text-sm font-medium text-gray-900 text-green-600',
    inputTextElements: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
}


const validations = {
    firstName: yup.string().required("First Name is required.")
        .max(80, "Exceeds length limit."),
    lastName: yup.string().required("Last name is required.")
        .max(80, "Exceeds length limit."),
    dob: yup.date().required("Date of birth is required."),
    email: yup.string().email().required("Email is required.")
        .max(80, "Exceeds length limit."),
    phone: yup.number().required("Phone number is required."),
    address: yup.string().required("Address is required.")
        .max(200, "Exceeds length limit."),
    city: yup.string().required("City is required.")
        .max(80, "Exceeds length limit."),
    state: yup.string().required("State is required.")
        .max(80, "Exceeds length limit."),

    zipCode: yup.string().required("Zip code is required.")
        .min(6, "Zip code should have atleast 6 digits.")
        .max(6, "Exceeds length limit."),

    password: yup.string().required("Password is required.").min(6),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], "Password does not match!")
        .required('This field is Required')
}
const UpdateUser = () => {
    const [state, setstate] = React.useState({
        data: {},
        isLoading: true,
        isSubmitting: false,
        message: null,
    });

    const schema = yup.object(validations).required();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate()

    React.useEffect(() => {
        const authUser = getAuth()
        if (authUser && authUser.user) {
            new UserService().
                getUserDetails(authUser.user.userId)
                .then(
                    (response) => {
                        let user = response.data.data
                        user.dob = new Date(user.dob).toISOString().slice(0, 10);

                        setstate({ isSubmitting: false, isLoading: false, data: user })
                    }
                ).catch((err) => {
                    if (!alert(err.message)) {
                        //take action
                    }

                    console.log(err);
                })
        }
        else {
            console.log("not logged in", authUser);
        }

    }, []);

    const onFormSubmit = (data) => {
        delete data["confirmPassword"]
        // e.preventDefault()
        setstate({ isSubmitting: true })
        const authUser = getAuth()
        if (authUser && authUser.user) {
            let requestBody = {
                ...data,
                userId: authUser.user.userId,
                department: authUser.user.department,
                role: authUser.user.role
            }
            new UserService().
                updateUserDetails(authUser.user.userId, requestBody)
                .then(
                    (response) => {
                        if (!alert("Record updated successfully !!!")) {
                            navigate(-1)
                            setstate({isLoading :false,isSubmitting:false})
                            // let user = response.data.data
                            // user.dob = new Date(user.dob).toISOString().slice(0, 10);
                            // setstate({ isLoading: false, data: user, message: { success: "Data updated successfully!!!" } })
                        }
                    }
                ).catch((err) => {
                    console.log("error occured");
                    setstate({ isLoading: false, message: { error: err.message } })
                })
        }
    }

    console.log(errors);
    return (<>
        {
            state.isLoading ? <Spinner/> :
                <form onSubmit={handleSubmit(onFormSubmit)}
                    className='bg-white rounded-lg shadow-2xl  '>
                    <fieldset
                        className=" flex flex-col p-5 px-10">
                        <div className="pt-0 pb-2 w-full flex justify-center items-center">
                            <div className="text-2xl font-bold text-black dark:text-white">
                                Update Details
                            </div>
                        </div>
                        <hr className="mb-7"></hr>
                        <div
                            className="grid gap-6 mb-6 md:grid-cols-2 md:file:divide-x-2 pr-5 ">
                            <div>
                                <div
                                    className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="firstName"
                                            className={styles.label}>First name*</label>
                                        <input type="text" id="firstName"
                                            defaultValue={state.data?.firstName}
                                            className={styles.inputTextElements} placeholder="John"

                                            {...register("firstName")}

                                        />
                                        <p className={styles.error}>{errors.firstName?.message}</p>

                                    </div>


                                    <div>
                                        <label htmlFor="lastName"
                                            className={styles.label}>Last name*</label>
                                        <input type="text" id="lastName"
                                            defaultValue={state.data?.lastName}
                                            className={styles.inputTextElements} placeholder="Doe"
                                            {...register("lastName")} />
                                        <p className={styles.error}>{errors.lastName?.message}</p>
                                    </div>

                                </div>

                                <div
                                    className="mb-6">
                                    <label htmlFor="dob"
                                        className={styles.label}>Date of Birth*</label>
                                    <input type="date" id="dob"
                                        className={styles.inputTextElements} placeholder="dd/MM/yyyy"
                                        defaultValue={state.data?.dob}

                                        {...register("dob")} />
                                    <p className={styles.error}>{errors.dob?.message}</p>

                                </div>

                                <div
                                    className="mb-6">
                                    <label htmlFor="email"
                                        className={styles.label}>Email address*</label>
                                    <input type="email" id="email"
                                        className={styles.inputTextElements} placeholder="john.doe@company.com"
                                        defaultValue={state.data?.email}
                                        {...register("email")} />
                                    <p className={styles.error}>{errors.email?.message}</p>

                                </div>

                                <div
                                    className="mb-6">
                                    <label htmlFor="phone"
                                        className={styles.label}>Phone Number*</label>
                                    <input type="tel" id="phone"
                                        className={styles.inputTextElements} placeholder="1234567890"
                                        defaultValue={state.data?.phone}
                                        {...register("phone")}
                                    />
                                    <p className={styles.error}>{errors.phone?.message}</p>

                                </div>


                                <div
                                    className="grid gap-6 mb-6 md:grid-cols-3">
                                    <div
                                        className="mb-6">
                                        <label htmlFor="Department"
                                            className={styles.label}>Department</label>
                                        <input type="text" id="department"
                                            defaultValue={state.data?.department}
                                            className={styles.inputTextElements} placeholder="Marketing"
                                            disabled
                                        />

                                    </div>
                                    <div>
                                        <label htmlFor="userId"
                                            className={styles.label}>User Id</label>
                                        <input type="text" id="userId"
                                            defaultValue={state.data?.userId}
                                            className={styles.inputTextElements} placeholder="Doe"
                                            disabled
                                        />

                                    </div>
                                    <div>
                                        <label htmlFor="role"
                                            className={styles.label}>Role</label>
                                        <input type="text" id="role"
                                            defaultValue={state.data?.role?.join()}
                                            className={styles.inputTextElements} placeholder="Doe"
                                            disabled
                                        />

                                    </div>

                                </div>
                            </div>
                            <div
                                className='pl-5'>
                                <div
                                    className="mb-6">
                                    <label htmlFor="address"
                                        className={styles.label}>Address*</label>
                                    <input type="address" id="address"
                                        className={styles.inputTextElements} placeholder="4823 Roosevelt Wilson Lane"
                                        defaultValue={state.data?.address}
                                        {...register("address")} />
                                    <p className={styles.error}>{errors.address?.message}</p>

                                </div>

                                <div
                                    className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="city"
                                            className={styles.label}>City*</label>
                                        <input type="text" id="city"
                                            defaultValue={state.data?.city}
                                            className={styles.inputTextElements} placeholder="New York"
                                            {...register("city")} />
                                        <p className={styles.error}>{errors.city?.message}</p>

                                    </div>
                                    <div>
                                        <label htmlFor="state"
                                            className={styles.label}>State*</label>
                                        <input type="text" id="state"
                                            defaultValue={state.data?.state}
                                            className={styles.inputTextElements} placeholder="Ohio"
                                            {...register("state")}
                                        />
                                        <p className={styles.error}>{errors.state?.message}</p>

                                    </div>
                                    <div>
                                        <label htmlFor="zipCode"
                                            className={styles.label}>ZipCode*</label>
                                        <input type="text" id="zipCode"
                                            defaultValue={state.data?.zipCode}
                                            className={styles.inputTextElements} placeholder="400010"
                                            {...register("zipCode")}
                                        />
                                        <p className={styles.error}>{errors.zipCode?.message}</p>

                                    </div>

                                </div>
                                <div
                                    className="mb-6">
                                    <label htmlFor="password"
                                        className={styles.label}>Password*</label>
                                    <input type="password" id="password"
                                        className={styles.inputTextElements} placeholder="•••••••••"
                                        {...register("password")} />
                                    <p className={styles.error}>{errors.password?.message}</p>

                                </div>
                                <div
                                    className="mb-6">
                                    <label htmlFor="password"
                                        className={styles.label}>Confirm Password*</label>
                                    <input type="password" id="confirmPassword"
                                        className={styles.inputTextElements} placeholder="•••••••••"
                                        {...register("confirmPassword")} />
                                    <p className={styles.error}>{errors.confirmPassword?.message}</p>

                                </div>
                            </div>
                        </div>
                        <button type="submit"
                            className="flex self-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "                        >
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
                    </fieldset>
                </form>
        }
    </>
    )
}

export default UpdateUser;