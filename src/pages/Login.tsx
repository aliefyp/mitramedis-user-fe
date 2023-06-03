import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/')
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
          <img className="grow m-0" src="/ilus_login.svg" alt="Login" />
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading tracking-tight text-slate-50 mb-8">
              Kelola klinik jadi lebih mudah
            </h1>
          </div>
        </div>

        {/* right section */}
        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center space-y-4 p-4 py-8 sm:p-16">
          <div className="space-y-4 md:space-y-6 w-full">
            <h1 className="text-3xl font-bold leading tracking-tight text-slate-800 dark:text-slate-50">
              Login
            </h1>
            <form className="space-y-4 " onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Ingat saya</label>
                  </div>
                </div>
                <a href="#login" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Lupa password?</a>
              </div>
              <button type="submit" className="w-full text-slate-50 font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Belum punya akun? <a href="#login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Daftar</a>
              </p>
            </form>

          </div>
        </div>
      </div>

      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#login" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="http://placehold.it/32x32" alt="logo" />
          Mitramedis
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Masuk
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Ingat saya</label>
                  </div>
                </div>
                <a href="#login" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Lupa password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Belum punya akun? <a href="#login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Daftar</a>
              </p>
            </form>
          </div>
        </div>
      </div> */}
    </section >
  )
}

export default Login;