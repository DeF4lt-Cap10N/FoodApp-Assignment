import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const getScrollValue = () => {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    let howMuchScrolled = document.documentElement.scrollTop;
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    let totalValue = (howMuchScrolled / height) * 100;
    setScrollPercentage(totalValue);
  };

  useEffect(() => {
    window.addEventListener("scroll", getScrollValue);
    window.removeEventListener("scroll", () => {});
  });

  return (
    <>
      <div
        className="border-x-0  bg-cyan-400  rounded-full p-1  fixed top-0 left-0 right-0 backdrop-blur h-1 rounded-l-none z-50"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
      <nav
        className="flex justify-between mx-10 bg-slate-300 text-slate-700 p-4 
        rounded-2xl pt-5 bg-opacity-30 text-2xl mt-2"
      >
        <div className="">
          <Link
            to="/"
            className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9DOpxwtPbcgTfC5zFe66f0T-SyTCYKcC9A&s"
              alt="FoodExplorer Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg ring-2 ring-cyan-400 group-hover:ring-purple-500"
            />
            <span className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors duration-300">
              FoodExplorer
            </span>
          </Link>
        </div>
        <div className="flex items-center ">
          <Link  className="hover:font-bold text-2xl md:font-semibold  hover:text-cyan-400 transition-colors duration-300 sm:text-base">
            Login
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
