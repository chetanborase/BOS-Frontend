import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const styles = {
    label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
    error: 'block mb-2 text-sm font-medium text-red-600',
    success: 'block mb-2 text-sm font-medium text-gray-900 text-green-600',
    inputTextElements: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
}


let validations = {
    firstName: yup.string().required("First Name is required.")
        .max(80, "Exceeds length limit."),
    lastName: yup.string().required("Last name is required.")
        .max(80, "Exceeds length limit."),
    dob: yup.date().required("Date of birth is required."),
    email: yup.string().email().required("Email is required.")
        .max(80, "Exceeds length limit."),
    phone: yup.number().required("Phone number is required."),
    department: yup.string().required("Department is required.")
        .max(80, "Exceeds length limit."),
    userId: yup.string().required("User id is required.")
        .max(80, "Exceeds length limit."),
    address: yup.string().required("Address is required.")
        .max(200, "Exceeds length limit."),
    city: yup.string().required("City is required.")
        .max(80, "Exceeds length limit."),
    state: yup.string().required("State is required.")
        .max(80, "Exceeds length limit."),
    role: yup.string().required("Role is required.")
        .max(80, "Exceeds length limit."),
    zipCode: yup.string().required("Zip Code is required.").min(6).max(7, "Zip code must have only 6 digits"),
}
const UserForm = (props) => {
    if (!props.data?.userId) {
        validations.password = yup.string().required("Password is required.")
            .max(200, "Exceeds length limit.")
    }
    
    const schema = yup.object(validations).required();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    // console.log("YSe fiormivbfwier vrev",props);

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}
            className='bg-white rounded-lg shadow-2xl  '>
            <fieldset
                className=" flex flex-col p-5 px-10"
                disabled={!props.editable}>

                <div className="pt-0 pb-2 flex w-full justify-center">
                    <div className="ml-auto text-2xl font-bold text-black dark:text-whiter">
                        {props.title}
                    </div>
                    <div className="ml-auto w-10 h-10 hover:bg-gray-300 hover:shadow-lg overflow-hidden flex justify-center items-center rounded-lg"
                        onClick={props.onCloseCallback}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
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
                                    defaultValue={props.data?.firstName}
                                    className={styles.inputTextElements} placeholder="John"

                                    {...register("firstName")}

                                />
                                <p className={styles.error}>{errors.firstName?.message}</p>

                            </div>


                            <div>
                                <label htmlFor="lastName"
                                    className={styles.label}>Last name*</label>
                                <input type="text" id="lastName"
                                    defaultValue={props.data?.lastName}
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
                                defaultValue={props.data?.dob}

                                {...register("dob")} />
                            <p className={styles.error}>{errors.dob?.message}</p>

                        </div>

                        <div
                            className="mb-6">
                            <label htmlFor="email"
                                className={styles.label}>Email address*</label>
                            <input type="email" id="email"
                                className={styles.inputTextElements} placeholder="john.doe@company.com"
                                defaultValue={props.data?.email}
                                {...register("email")} />
                            <p className={styles.error}>{errors.email?.message}</p>

                        </div>

                        <div
                            className="mb-6">
                            <label htmlFor="phone"
                                className={styles.label}>Phone Number*</label>
                            <input type="tel" id="phone"
                                className={styles.inputTextElements} placeholder="1234567890"
                                defaultValue={props.data?.phone}
                                {...register("phone")}
                            />
                            <p className={styles.error}>{errors.phone?.message}</p>

                        </div>

                        <div
                            className="mb-6">
                            <label htmlFor="Department"
                                className={styles.label}>Department*</label>
                            <input type="text" id="department"
                                defaultValue={props.data?.department}
                                className={styles.inputTextElements} placeholder="•••••••••"
                                {...register("department")}
                            />
                            <p className={styles.error}>{errors.department?.message}</p>

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
                                defaultValue={props.data?.address}
                                {...register("address")} />
                            <p className={styles.error}>{errors.address?.message}</p>

                        </div>

                        <div
                            className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="city"
                                    className={styles.label}>City*</label>
                                <input type="text" id="city"
                                    defaultValue={props.data?.city}
                                    className={styles.inputTextElements} placeholder="New York"
                                    {...register("city")} />
                                <p className={styles.error}>{errors.city?.message}</p>

                            </div>
                            <div>
                                <label htmlFor="state"
                                    className={styles.label}>State*</label>
                                <input type="text" id="state"
                                    defaultValue={props.data?.state}
                                    className={styles.inputTextElements} placeholder="Ohio"
                                    {...register("state")}
                                />
                                <p className={styles.error}>{errors.state?.message}</p>

                            </div>
                            <div>
                                <label htmlFor="zipCode"
                                    className={styles.label}>ZipCode*</label>
                                <input type="text" id="zipCode"
                                    defaultValue={props.data?.zipCode}

                                    className={styles.inputTextElements} placeholder="400010"
                                    {...register("zipCode")} />
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
                            className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="userId"
                                    className={styles.label}>User Id*</label>
                                <input type="text" id="userId"
                                    defaultValue={props.data?.userId}
                                    className={styles.inputTextElements} placeholder="Doe"
                                    {...register("userId")}
                                />
                                <p className={styles.error}>{errors.userId?.message}</p>

                            </div>

                            <div>
                                <label htmlFor="role"
                                    className={styles.label}>Role*
                                </label>
                                <select name="role"
                                    className={styles.inputTextElements}
                                    id="role"
                                    {...register("role")}
                                    defaultValue={props.data?.role[0]}
                                    onChange={(e) => { setValue('role', e.target.value, { shouldValidate: true }) }}
                                >
                                    {props.roles?.map((role) => {

                                        return (
                                            <option key={role.title}
                                                onChange={() => { alert("selected") }}
                                                className={"m-[50px]"}
                                                value={role.title}>{role.title}</option>)
                                    })}
                                </select>
                                <p className={styles.error}>{errors.role?.message}</p>
                            </div>
                        </div>

                    </div>
                </div>
                {props.Snackbar}
                {props.ActionComponent}
            </fieldset>

        </form>
    )
}

export default UserForm;