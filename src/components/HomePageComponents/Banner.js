import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../asset/trophy.png";

function Banner() {
  return (
    <div className="bg-stone-800 banner h-52 md:h-80">
      <div className="filter flex flex-col justify-center items-center">
        <h1 className="mx-10 text-center font-medium text-white text-2xl md:text-5xl 2xl:text-6xl md:p-3 lg:p-5">
          Welcome to WebWiz Tournament
        </h1>
        <div className=" flex w-100 mb-5">
          <img
            className="mr-12 lg:w-36 md:w-28 sm:w-24 w-20"
            src={Logo}
            alt="logo"
          />
        </div>

        <Link
          className="bg-amber-600 rounded py-2 px-10  text-center  mx-auto text-base text-white lg:text-md  h-8"
          to="/new"
        >
          <p className="w-full text-sm lg:text-md">Create A Tournament</p>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
