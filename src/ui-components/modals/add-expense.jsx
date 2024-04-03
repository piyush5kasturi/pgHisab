import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { usePayAll } from "../../components/create/pay-all.services";

export default function AddExpense({ toggle, isOpen = false }) {
  const ref = useRef(null);
  const [message, setMessage] = useState("");
  const { payAllMutation, isLoading, error, data } = usePayAll();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Arshdeep Singh",
      amount: "",
    },
  });

  const onSubmit = async (data) => {
    const { name, amount } = data;
    await payAllMutation({
      payAmount: Number(amount),
      discription: name,
    });
    reset();
  };
  useEffect(() => {
    console.log(data, ";;;;;", isLoading);
  }, [data]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          /* empty*/
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-light/40 backdrop-blur-[2px]" />
        </Transition.Child>

        <div className="flex min-h-full items-center justify-center p-5 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[564px] rounded-lg max-w-2xl transform bg-[#FFFFFF] text-left shadow-[0px_16px_32px_-12px_#00000033] transition-all dark:bg-dark">
              <div className="flex justify-between mx-6 mt-6 mb-4 items-center">
                <p className="text-lg font-montserratBold text-[#3D3D3D] dark:text-[#E7E7E7]">
                  Add Expense
                </p>
                <div
                  className="cursor-pointer dark:fill-[#888888] fill-[#6D6D6D] h-3 w-3"
                  onClick={() => toggle(false)}
                >
                  Close
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center px-4 py-3 md:py-0 ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4"
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Name*
                    </label>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field: { value, onChange } }) => (
                        <select
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-state"
                        >
                          <option value="Arshdeep Singh">Arshdeep Singh</option>
                          <option value="Tarun Mittal">Tarun Mittal</option>
                          <option value="Piyush Kasturi">Piyush Kasturi</option>
                        </select>
                      )}
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Amount*
                    </label>
                    <Controller
                      control={control}
                      name="amount"
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <input
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                            errors?.amount && "border border-red-500"
                          }`}
                          id="password"
                          type="number"
                          min={0}
                          placeholder="Enter Amount"
                        />
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
