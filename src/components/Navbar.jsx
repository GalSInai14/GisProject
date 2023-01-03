import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Navbar() {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully. See you later!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("There is a problem, try again later please.");
    }
  };

  return (
    <div>
      <nav className="fixed px-2 sm:px-4 py-2.5 bg-gray-900  w-full z-50 top-0 left-0 border-b border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/">
            <h3 href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                GiStadium
              </span>
            </h3>
          </Link>
          {!user?.email ? (
            <div className="flex md:order-1">
              <Link to="/register">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  צור חשבון
                </button>
              </Link>
              <Link to="/login">
                <button className="text-white  hover:text-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 ">
                  התחבר
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex md:order-1">
              <Link to="/account">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  פרופיל
                </button>
              </Link>

              <button
                className="text-white  hover:text-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                onClick={handleLogout}
              >
                התנתק
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
