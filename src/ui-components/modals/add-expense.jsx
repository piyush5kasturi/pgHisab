import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { usePayAll } from "../../components/create/pay-all.services";
import Input from "../input";
import Close from "../../assets/ui-icons/close.svg?react";
import classNames from "classnames";
import Button from "../button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Dropdown from "../dropdown";
import {
  fetchUser,
  usePaySingle,
} from "../../components/create/pay-one.services";
import { useSelector } from "react-redux";
import Label from "../label";
import RadioThemeOne from "../radio";
import Alert from "../alert";
import { placeholderElBtn, placeholderElInput } from "../../utils/placeholders";
export default function AddExpense({
  toggle,
  isOpen = false,
  singlePerson = false,
  editData = null,
}) {
  const queryClient = useQueryClient();
  const auth = useSelector((state) => state?.auth?.user);
  const { payAllMutation, isLoading, error, data, isError } = usePayAll();
  const {
    paySingleMutation,
    isLoading: paySingleLoading,
    error: paySingleError,
    data: paySingleData,
    isError: paySingleIsError,
  } = usePaySingle();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      discription: "",
      amount: "",
      user: "",
      split: "false",
    },
  });

  const {
    isLoading: userLoading = false,
    isError: userIsError,
    error: userError,
    data: userData = [],
    isFetching,
  } = useQuery({
    queryKey: ["user", "list"],
    queryFn: () => fetchUser(),
    enabled: singlePerson,
  });

  const updatedUserData = useMemo(() => {
    return userData.filter((val) => val?.value !== auth?.autoID);
  }, [auth?.autoID, userData]);

  const onSubmit = async (data) => {
    const { discription, amount, user, split } = data;
    const splitValue = split === "false" ? false : true;
    if (singlePerson) {
      await paySingleMutation({
        payAmount: Number(amount),
        discription,
        fromUserId: user?.value,
        split: splitValue,
      });
    } else {
      await payAllMutation({
        payAmount: Number(amount),
        discription,
      });
    }
  };

  const setDefaultHandler = useCallback(() => {
    reset({
      user: updatedUserData?.filter(
        (val) => val?.label === editData?.toName
      )[0],
      amount: editData?.payAmount,
      discription: editData?.discription,
    });
  }, [editData, reset, updatedUserData]);

  useEffect(() => {
    if (editData) {
      console.log(editData, ";;;");
      setDefaultHandler();
    }
  }, [editData, setDefaultHandler]);

  useEffect(() => {
    if (data) {
      queryClient.removeQueries({ queryKey: ["pay-all", "list"] });
      toggle(false);
    }
    if (paySingleData) {
      queryClient.removeQueries({ queryKey: ["pay-single", "list"] });
      toggle(false);
    }
  }, [data, paySingleData, queryClient, toggle]);

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
            <Dialog.Panel className="w-[564px] rounded-lg max-w-2xl transform bg-[#FFFFFF] text-left shadow-[0px_16px_32px_-12px_#00000033] transition-all">
              <div className="flex justify-between mx-6 mt-6 mb-4 items-center">
                <p className="text-lg font-montserratBold text-[#3D3D3D]">
                  {editData ? "Edit" : "Add"} Expense
                </p>
                <Close
                  className={classNames(
                    " cursor-pointer transition-all fill-[#8F8F8F]"
                  )}
                  onClick={() => toggle(false)}
                />
              </div>
              {(isError || paySingleIsError || userIsError) && (
                <Alert
                  text={
                    error?.displayMessage ||
                    paySingleError?.displayMessage ||
                    userError?.displayMessage
                  }
                  type="error"
                />
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6">
                  {singlePerson ? (
                    userLoading && isFetching ? (
                      placeholderElInput()
                    ) : (
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                          <div>
                            <Dropdown
                              items={updatedUserData}
                              onChange={onChange}
                              error={errors.user}
                              value={value}
                              label="User"
                              placeholder=" Select User"
                              required
                            />
                          </div>
                        )}
                        name="user"
                      />
                    )
                  ) : (
                    <></>
                  )}
                  {userLoading && isFetching ? (
                    placeholderElInput()
                  ) : (
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
                  )}
                  {userLoading && isFetching ? (
                    placeholderElInput()
                  ) : (
                    <Controller
                      control={control}
                      name="discription"
                      rules={{ required: false }}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          type="text"
                          label="Discription"
                          value={value}
                          onChange={onChange}
                          placeholder="Enter Discription"
                          errors={errors?.discription}
                        />
                      )}
                    />
                  )}
                  {singlePerson ? (
                    userLoading && isFetching ? (
                      placeholderElInput()
                    ) : (
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                          <div>
                            <Label>Split</Label>
                            <div className="flex flex-col mt-3 gap-3">
                              <RadioThemeOne
                                onChange={() => {
                                  onChange("false");
                                }}
                                label="False"
                                value={value === "false"}
                                name="div_false"
                              />
                              <RadioThemeOne
                                onChange={() => {
                                  onChange("true");
                                }}
                                label="True"
                                value={value === "true"}
                                name="div_true"
                              />
                            </div>
                          </div>
                        )}
                        name="split"
                      />
                    )
                  ) : (
                    <></>
                  )}
                </div>
                <div className="grid grid-cols-2 w-full p-6 border-t-[1px] border-[#E7E7E7]  gap-4">
                  {userLoading && isFetching ? (
                    placeholderElBtn()
                  ) : (
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
                        isLoading={isLoading || paySingleLoading}
                        disabled={isLoading || paySingleLoading}
                        type="submit"
                        size="medium"
                        full
                      />
                    </>
                  )}
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
