// pages/404.js
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
      <h1 className="text-6xl font-bold ">404</h1>
      <div className="">
        <img
          src="/assets/meta-logo-light.png"
          alt="404 Illustration"
          className="w-[10em] mx-auto"
        />
      </div>
      <p className="text-2xl mb-6">Oops! La página buscada no existe</p>
      <Link
        className=" hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        href="/"
      >
        Go back to Home
      </Link>
    </div>
  );
}
