import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

//import { useState } from "react";

function Review(props) {
  const reviews = [];

  props.reviews.forEach((review) => {
    reviews.push(review);
  });
  const lenReviews = reviews.length;
  console.log(lenReviews);
  //console.log(reviews[0].facilities);
  return (
    <>
      {reviews.map((review, i) => (
        <div className="" key={i}>
          <div className="w-75% mr-5 md:w-50% shadow p-5 rounded-lg bg-white mb-2 ">
            <div className="flex flex-row-reverse">
              <div className="w-[5%] h-6 text-center  bg-blue-600 rounded-full mt-2 ml-2">
                <h1 i={1} className=" text-white font-bold">
                  {i + 1}
                </h1>
              </div>

              <h1 className="text-2xl text-blue-700 underline">
                {props.isUser ? (
                  review.stadiumName
                ) : (
                  <>
                    {" "}
                    {review.user}{" "}
                    {lenReviews >= 5 && lenReviews < 10 ? (
                      <AiOutlineStar />
                    ) : (
                      <div></div>
                    )}
                    {lenReviews >= 10 && lenReviews < 15 ? (
                      <>
                        <AiOutlineStar /> <AiOutlineStar />
                      </>
                    ) : (
                      <div></div>
                    )}
                    {lenReviews >= 15 ? (
                      <>
                        <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar />
                      </>
                    ) : (
                      <div></div>
                    )}
                  </>
                )}
              </h1>
            </div>
            <div className="flex flex-row-reverse ">
              <div className="flex flex-col">
                <div className="flex flex-row-reverse mt-2 mb-2">
                  <h1 className="text-md font-bold ml-2 text-gray-900">
                    {" "}
                    :מתקני האצטדיון
                  </h1>
                  <h1 className="text-md  text-blue-700 rtl-grid">
                    {review.facilities}
                  </h1>
                </div>
                <div className="flex flex-row-reverse mt-2 mb-2">
                  <h1 className="text-md font-bold text-gray-900 ml-2">
                    {" "}
                    :האווירה באצטדיון
                  </h1>
                  <h1 className="text-md  text-blue-700 rtl-grid">
                    {review.atmosphere}
                  </h1>
                </div>
                <div className="flex flex-row-reverse mt-2 mb-2">
                  <h1 className="text-md font-bold ml-2 text-gray-900">
                    {" "}
                    :תמורה יחס למחיר
                  </h1>
                  <h1 className="text-md  text-blue-700 rtl-grid">
                    {review.price}
                  </h1>
                </div>
                <div className="flex flex-row-reverse mt-2 mb-2">
                  <h1 className="text-md font-bold ml-2 text-gray-900">
                    {" "}
                    :הדירוג שלך
                  </h1>
                  <h1 className="text-md  text-blue-700">{review.grade}/5</h1>
                </div>
                <div className="flex flex-row-reverse mt-2 mb-2">
                  {props.isUser === true ? (
                    <Link to={`/stadium/${review.stadiumName}`}>
                      <button
                        type="submit"
                        className="mt-8 lg:w-[100%] text-center text-white bg-blue-600 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        עמוד האצטדיון{" "}
                      </button>{" "}
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Review;
