import { Fragment, useEffect, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";

import Button from "components/Button";
import Input from "components/Input";
import LayoutPlain from "components/LayoutPlain";
import useLogin from "hooks/auth/useLogin";
import useToaster from "context/ToasterContext";
import { LoginParam } from "types/login";
import Card from "components/Card";

const Login = () => {
  const { register, handleSubmit } = useForm<LoginParam>();
  const { isLoggingIn, login } = useLogin();
  const { open: openToaster } = useToaster();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const location = useLocation();
  const source = new URLSearchParams(location.search).get("source");

  const [show, setShow] = useState(false);

  const onSubmit = async (val: LoginParam) => {
    try {
      const response = await login(val);

      if (response.success) {
        signIn({
          token: response.data.access_token,
          expiresIn: response.data.expired_at,
          tokenType: "Bearer",
          authState: {
            userId: response.data.user_id,
            clinicId: response.data.clinic_id,
            token: response.data.access_token,
          },
        });

        openToaster({
          title: "Selamat Datang",
          message: "Selamat bekerja kembali!",
          variant: "success",
          autoClose: true,
        });

        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Silahkan coba lagi";

      openToaster({
        title: "Login Gagal",
        message,
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (source === "nologin") {
      openToaster({
        title: "Sesi Anda Habis",
        message: "Silahkan login kembali",
        variant: "error",
      });
    }
  }, [openToaster, source]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  return (
    <LayoutPlain>
      <Transition appear show={show} as={Fragment}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-5"
          enterTo="opacity-100 translate-y-0"
        >
          <div>
            <Card className="mx-auto flex min-w-[70vw] max-w-3xl flex-col overflow-hidden sm:min-w-0 sm:flex-row">
              {/* left section */}
              <div className="hidden w-full bg-gradient-to-b from-brand3 to-brand1 px-8 pb-12 pt-8 sm:block">
                <div className="align-center flex h-full flex-col justify-center gap-4">
                  <div className="flex grow flex-col items-center justify-center px-6 py-8">
                    <img
                      className="m-0 mx-auto"
                      src="/img_login.svg"
                      alt="Login"
                    />
                  </div>
                  <h1 className="text-5xl font-bold leading-10 tracking-tight text-slate-50">
                    Partner
                    <br />
                    sehat
                    <br />
                    bersama
                  </h1>
                </div>
              </div>

              {/* right section */}
              <div className="flex w-full shrink-0 flex-col items-center justify-center space-y-4 p-4 py-8 sm:w-1/2 sm:p-16">
                <div className="w-full space-y-4 md:space-y-6">
                  <h1 className="leading text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-50">
                    Login
                  </h1>
                  <form
                    className="space-y-4 "
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Input
                      label="Email"
                      type="email"
                      id="email"
                      placeholder="nama@domain.com"
                      {...register("email")}
                    />
                    <Input
                      label="Password"
                      type="password"
                      id="email"
                      placeholder="••••••••"
                      {...register("password")}
                    />
                    <div className="flex items-center justify-end">
                      {/* <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <Input id="remember" aria-describedby="remember" type="checkbox" {...register('remember')} />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Ingat saya</label>
                            </div>
                          </div> */}
                      <a
                        href="#login"
                        className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                      >
                        Lupa password?
                      </a>
                    </div>
                    <Button
                      type="submit"
                      loading={isLoggingIn}
                      color="primary"
                      className="w-full"
                    >
                      Login
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Belum punya akun?{" "}
                      <a
                        href="/register"
                        className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                      >
                        Daftar
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </Transition.Child>
      </Transition>
    </LayoutPlain>
  );
};

export default Login;
