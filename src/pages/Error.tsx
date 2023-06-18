import Button from "components/Button";

const Error = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-screen-sm space-y-4 text-center">
        <img
          src="/img_404.svg"
          alt="Not Found"
          className=" mx-auto mb-8 max-w-md"
        />
        <p className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Oops..
        </p>
        <p className="text-lg font-light text-gray-500 dark:text-gray-400">
          Halaman tidak ditemukan
        </p>
        <Button className="mx-auto inline-block">Kembali ke Home</Button>
      </div>
    </div>
  );
};

export default Error;
