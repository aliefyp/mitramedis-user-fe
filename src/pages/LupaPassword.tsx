import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
}

const LupaPassword = () => {
  const { register, handleSubmit } = useForm<FormValues>()
  // const navigate = useNavigate();

  const onSubmit = (val: FormValues) => {
    console.log(val)
  }

  return (
    <section className="bg-slate-200 dark:bg-slate-800 p-0 sm:p-16 h-screen">
      <div className="flex bg-white p-2 flex-col sm:flex-row rounded-none sm:rounded-3xl h-auto sm:h-full shadow dark:bg-teal-800">

        {/* left section */}
        <div className="w-full sm:w-1/2 p-4 space-y-4 sm:p-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex flex-col">
          <div className="flex items-center mb-6 text-2xl font-semibold text-slate-50 dark:text-slate-800">
            <img className="w-8 h-8 mr-2" src="http://placehold.it/32x32" alt="logo" />
            Mitramedis
          </div>
          <div className="grow px-8 sm:px-4 flex flex-col items-center justify-center">
            <img className="m-0 mx-auto" src="/ilus_login.svg" alt="Login" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold leading tracking-tight text-slate-50 mb-0 sm:mb-12">
              Partner sehat bersama
            </h1>
          </div>
        </div>

        {/* right section */}
        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center space-y-4 p-4 py-8 sm:p-16">
          <div className="space-y-4 md:space-y-6 w-full">
            <h1 className="text-3xl font-bold leading tracking-tight text-slate-800 dark:text-slate-50">
              Login
            </h1>
            <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  {...register('email')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button className="w-full text-slate-50 font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Kirim
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Belum punya akun? <a href="#login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Daftar</a>
              </p>
            </form>

          </div>
        </div>
      </div>
    </section >
  )
}

export default LupaPassword;