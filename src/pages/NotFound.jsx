import React from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <>
    <div className="flex items-center justify-center mt-20">
        <Link to="/">
          <h1 className="lg:text-5xl md:text-3xl font-bold text-gray-900 hover:text-blue-600">
            Return to GiStadium Homepage
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-center mt-20">
        <Spinner />
      </div>
      
    </>
  );
}

export default NotFound;
