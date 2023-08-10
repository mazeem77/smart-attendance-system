import React from 'react';
import Link from "next/link";

function NoPage() {
  return (
    <main className="w-full flex flex-col justify-center items-center mt-80">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-red-500 px-2 text-sm bg-main rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <Link className="relative inline-block text-sm font-medium text-red-500 group active:text-red-500 focus:outline-none focus:ring"
          href={"/"}>
          <span
            className="relative inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-red-500 group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

          <span className="relative block px-8 py-3 bg-main hover:bg-tertiary border border-current">
            <router-link to="/">Go Home</router-link>
          </span>
        </Link>
      </button>
    </main>)
}

export default NoPage