import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";

import Button from "components/Button";
import Input from "components/FormInput/Input";
import LayoutPlain from "components/LayoutPlain";
import useRegister from "api/auth/useRegister";
import useToaster from "context/ToasterContext";
import { RegisterParam } from "types/register";
import Card from "components/Card";

interface RegisterForm extends RegisterParam {
  confirm_password: string;
}

const Login = () => {
  const { register, handleSubmit, watch } = useForm<RegisterForm>();
  const { isRegistering, register: submitRegister } = useRegister();
  const { open: openToaster } = useToaster();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const onSubmit = async (val: RegisterForm) => {
    try {
      const { confirm_password, ...rest } = val;
      const response = await submitRegister(rest);
      if (response.success) {
        openToaster({
          title: "Pendaftaran Berhasil",
          message: "Silakan cek email Anda untuk melakukan verifikasi",
          variant: "success",
          autoClose: true,
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Silahkan coba lagi";

      openToaster({
        title: "Pendaftaran Belum Berhasil",
        message,
        variant: "error",
      });
    }
  };

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
            <Card className="mx-auto flex min-w-[70vw] max-w-4xl flex-col overflow-hidden sm:min-w-0 sm:flex-row">
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
                    Daftar
                  </h1>
                  <form
                    className="space-y-4 "
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Input
                      label="Nama Lengkap"
                      type="full_name"
                      id="full_name"
                      placeholder="Nama Langkap"
                      {...register("full_name")}
                    />
                    <Input
                      label="Nomor Telepon"
                      type="number"
                      id="phone_number"
                      placeholder="0812345xxxx"
                      {...register("phone_number")}
                    />
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
                      id="password"
                      placeholder="Masukkan password"
                      {...register("password")}
                    />
                    <Input
                      label="Ulangi Password"
                      type="password"
                      id="confirm_password"
                      placeholder="Ulangi password"
                      {...register("confirm_password", {
                        validate: (val: string) => {
                          if (watch("password") !== val) {
                            return "Password Anda tidak cocok";
                          }
                        },
                      })}
                    />
                    <div className="pt-4">
                      <Button
                        type="submit"
                        loading={isRegistering}
                        color="primary"
                        className="mt-8 w-full"
                      >
                        Daftar Sekarang
                      </Button>
                    </div>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Sudah punya akun?{" "}
                      <a
                        href="/login"
                        className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                      >
                        Masuk
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
