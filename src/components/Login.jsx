import axios from 'axios';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const Login = () => {
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            password: '',
        }
    });
    const onSubmit = async (data) => {
        // setIsLoading(true);
        console.log(data, ";;;;")
        await axios.post('https://pghisab.bsite.net/login', data)
            .then(res => {
                console.log(res)
            })
            .catch((e) => { console.log(e) })
        // setIsLoading(false);
        reset();

    }
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">PG HISAB</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                            UserName
                                        </label>
                                        <Controller
                                            control={control}
                                            name="userName"
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <input value={value} onChange={(e) => onChange(e.target.value)} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors?.userName && 'border border-red-500'}`} type="text" placeholder="Enter Username" />
                                            )} />   </div>
                                    <div className="relative">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <Controller
                                            control={control}
                                            name="password"
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <input value={value} onChange={(e) => onChange(e.target.value)} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors?.password && 'border border-red-500'}`} type="password" placeholder="Enter Password" />
                                            )} />   </div>
                                    <div className="relative">
                                        <button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login