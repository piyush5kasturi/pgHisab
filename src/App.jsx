import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');
  const [allData, setAllData] = useState(null);
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
      name: 'Arshdeep Singh',
      amount: '',
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { name, amount, code } = data;
    await axios.post(`https://pghisab.bsite.net/api/user`, {
      "autoID": 0,
      "insertUserId": 0,
      "insertDate": "2024-03-24T05:37:39.405Z",
      "updateUserId": 0,
      "updateDate": "2024-03-24T05:37:39.405Z",
      "isActive": true,
      "name": "string",
      "email": "string",
      "userName": "string",
      "password": "string"
    })
      .then(res => {
        setData(res);
        setMessage('success');
        getData();
      })
      .catch((e) => { setData(e); setMessage('error'); })
    setIsLoading(false);
    reset();

  }

  const getData = async () => {
    setIsLoading(true);
    await axios.get('https://script.google.com/macros/s/AKfycbz8gqLuCwHCR0S8Q3NHABLNlhh6jRt58_iOpwvlwX0au_f27wwkDp2Rw6szEApBxPsE/exec').then(res => setAllData(res?.data)).catch((e) => { setData(e); setMessage('error'); setIsLoading(false) })
    setIsLoading(false);
  }
  useEffect(() => { getData(); }, [])
  return (
    <>
      {/* <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login Form with Floating Labels</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input autocomplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                    <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                  </div>
                  <div className="relative">
                    <input autocomplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                    <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  <div className="relative">
                    <button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="w-full flex flex-col justify-center items-center px-4 py-3 md:py-0 md:h-screen">

        {isLoading ? <div role="status">
          <svg aria-hidden="true" className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div> :
          <>
            {message === 'success' && <div id="alert-3" className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <div className="ms-3 text-sm font-medium">
                {data?.data}
              </div>
              <button type="button" onClick={() => setMessage('')} className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>}
            {message === 'error' && <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <div className="ms-3 text-sm font-medium">
                {data?.message}
              </div>
              <button type="button" onClick={() => setMessage('')} className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>}
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6'>
              {allData?.map(({ name, totalPrice }, index) => {
                return <div key={index} className=" flex flex-col text-white min-w-0 break-words bg-gradient-to-tl from-purple-700 to-pink-500  shadow-soft-xl rounded-2xl bg-clip-border">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap ">
                      <div className="flex-none  max-w-full px-3">
                        <div>
                          <p className="mb-0 font-sans font-semibold leading-normal text-sm">{name}</p>
                          <h5 className="mb-0 font-bold">
                            {totalPrice}
                          </h5>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              })}
              {allData && <div className=" flex flex-col text-white min-w-0 break-words bg-gradient-to-tl from-purple-700 to-pink-500  shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap ">
                    <div className="flex-none  max-w-full px-3">
                      <div>
                        <p className="mb-0 font-sans font-semibold leading-normal text-sm">Total</p>
                        <h5 className="mb-0 font-bold">
                          {allData?.[0]?.total}
                        </h5>
                      </div>
                    </div>

                  </div>
                </div>
              </div>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4">
              <div className="mb-1">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Code*
                </label>
                <Controller
                  control={control}
                  name="code"
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <input value={value} onChange={(e) => onChange(e.target.value)} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors?.code && 'border border-red-500'}`} id="password" type="text" placeholder="Enter Code" />
                  )} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Name*
                </label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <select value={value} onChange={(e) => onChange(e.target.value)} className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                      <option value="Arshdeep Singh">Arshdeep Singh</option>
                      <option value="Tarun Mittal">Tarun Mittal</option>
                      <option value="Piyush Kasturi">Piyush Kasturi</option>
                    </select>
                  )} />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Amount*
                </label>
                <Controller
                  control={control}
                  name="amount"
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <input value={value} onChange={(e) => onChange(e.target.value)} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors?.amount && 'border border-red-500'}`} id="password" type="number" min={0} placeholder="Enter Amount" />
                  )} />
              </div>

              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </>}
      </div> */}
    </>
  );
};

export default App;
