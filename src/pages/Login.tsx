import Input from "components/Input";
import { useForm } from "react-hook-form";
// import crypto from "crypto-js";
// import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
  // remember: boolean;
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormValues>()
  // const navigate = useNavigate();

  const onSubmit = (val: FormValues) => {
    // const body = JSON.stringify(val);
    // const key = process.env.REACT_APP_SIGN_KEY || '';
    
    // const encoded = crypto.HmacSHA1(body, key).toString(crypto.enc.Hex);

    // const urlParam = new URLSearchParams(val).toString();

    // console.log(urlParam)
    
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(val),
    }).then(res => res.json())
      .then(res => console.log(res))
      .catch(err => {
        console.log('error', err)
      });
  }

  return (
    <section className="bg-slate-200 dark:bg-slate-800 p-0 sm:p-16 h-screen">
      <div className="flex max-w-screen-lg mx-auto bg-white p-2 flex-col sm:flex-row rounded-none sm:rounded-3xl h-auto sm:h-full shadow dark:bg-teal-800">

        {/* left section */}
        <div className="w-full sm:w-1/2 p-4 space-y-4 sm:p-8 bg-gradient-to-b from-brand3 to-brand1 rounded-3xl flex flex-col">
          <div className="flex items-center mb-6 text-2xl font-semibold text-slate-50 dark:text-slate-800">
            <img className="w-8 h-8 mr-2" src="http://placehold.it/32x32" alt="logo" />
            Mitramedis
          </div>
          <div className="grow px-8 sm:px-4 flex flex-col items-center justify-center">
            <img className="m-0 mx-auto" src="/ilus_login.svg" alt="Login" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold leading tracking-tight text-slate-50 mb-4 sm:mb-12">
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
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="name@company.com"
                {...register('email')}
              />
              <Input
                label="Password"
                type="password"
                id="email"
                placeholder="••••••••"
                {...register('password')}
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
                <a href="#login" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Lupa password?</a>
              </div>
              <button className="w-full text-slate-50 font-extrabold bg-brand1 hover:bg-brand1 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Login
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

export default Login;