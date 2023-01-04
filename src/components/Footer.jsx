import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="fixed bottom-0 w-screen  bg-gray-900 p-0 shadow md:flex md:items-center md:justify-between md:p-6 ">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {new Date().getFullYear()}
        <a href="/" className="hover:underline">
          -GiStadium
        </a>
        . All Rights Reserved.
      </span>

      <ul className="flex flex-wrap items-center mr-4 mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <Link to="/about">
          <li>
            <h6 className="mr-4 hover:font-bold hover:text-white md:mr-6 ">
              קצת עלינו
            </h6>
          </li>
        </Link>
      </ul>
    </footer>
  );
}

export default Footer;
