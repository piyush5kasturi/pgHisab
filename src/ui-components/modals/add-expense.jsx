import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { usePayAll } from "../../components/create/pay-all.services";
import Input from "../input";
import Close from "../../assets/ui-icons/close.svg?react";
import classNames from "classnames";
import Button from "../button";
export default function AddExpense({ toggle, isOpen = false }) {
  const { payAllMutation, isLoading, error, data } = usePayAll();
  const {
    control,
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
  };
  useEffect(() => {
    if (data) {
      toggle(false);
    }
  }, [data, toggle]);
  console.log(error,";;;ss")
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
                <Close
                  className={classNames(
                    "dark:fill-gray-500 cursor-pointer transition-all fill-[#8F8F8F]"
                  )}
                  onClick={() => toggle(false)}
                />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6">
                  <Controller
                    control={control}
                    name="amount"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        type="number"
                        label="Amount"
                        value={value}
                        onChange={onChange}
                        placeholder="Enter Amount"
                        errors={errors?.amount}
                        required
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 w-full p-6 border-t-[1px] border-[#E7E7E7] dark:border-light-color  gap-4">
                  <>
                    <Button
                      variant="secondary"
                      text="Cancel"
                      onClick={() => toggle(false)}
                      size="medium"
                      full
                    />
                    <Button
                      text="Save"
                      isLoading={isLoading}
                      disabled={isLoading}
                      type="submit"
                      size="medium"
                      full
                    />
                  </>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
