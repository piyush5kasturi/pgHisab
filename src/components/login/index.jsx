
import { Controller, useForm } from 'react-hook-form'
import { useSignIn } from './login.services';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { setUser } from '../../reducers/auth';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            password: '',
        }
    });

    const { signInMutation, isLoading, error, data } = useSignIn();

    const onSubmit = async (data) => {
        signInMutation(data);
    }

    useEffect(() => {
        if (data && data?.userData?.autoID) {
            dispatch(setUser(data?.userData));
            navigate('/create')
        }
    }, [data, dispatch])
    
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    {error && <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <div className="ms-3 text-sm font-medium">
                            {error}
                        </div>
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>}
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
                                        <button className={classNames("bg-blue-500 text-white rounded-md px-2 py-1", { '!bg-light text-[#B0B0B0]': isLoading })}> {isLoading ? <div role="status">
                                            <svg aria-hidden="true" className="w-5 h-5 mx-4 my-1 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div> : "Submit"}</button>
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
