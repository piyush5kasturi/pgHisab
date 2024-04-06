import { Controller, useForm } from "react-hook-form";
import { useSignIn } from "./login.services";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/auth";
import { useNavigate } from "react-router-dom";
import Input from "../../ui-components/input";
import Button from "../../ui-components/button";
import Alert from "../../ui-components/alert";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const { signInMutation, isLoading, error, data, isError } = useSignIn();

  const onSubmit = async (data) => {
    signInMutation(data);
  };

  useEffect(() => {
    if (data && data?.userData?.autoID) {
      dispatch(setUser(data?.userData));
      navigate("/create");
    }
  }, [data, dispatch, navigate]);
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          {isError && <Alert text={error?.displayMessage} type="error" />}
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">PG HISAB</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <Controller
                    control={control}
                    name="userName"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label="Username"
                        value={value}
                        onChange={onChange}
                        placeholder="Enter Username"
                        errors={errors?.userName}
                        required
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        type="password"
                        label="Password"
                        value={value}
                        onChange={onChange}
                        placeholder="Enter Password"
                        errors={errors?.password}
                        required
                      />
                    )}
                  />
                  <Button
                    text="Submit"
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                    full
                    size="large"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
