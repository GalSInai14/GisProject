import React from "react";

function About() {
  return (
    <div className=" mt-20  text-center items-center font-bold">
      <h1 className="text-gray-900 lg:text-5xl md:text-3xl sm:text-3xl mb-5">
        !GiStadiumשלום וברוכים הבאים ל
      </h1>
      <div className="lg:ml-[200px] mt-10 mb-7  whitespace-pre-wrap lg:w-[75%] ">
        <h1 className="text-gray-900 lg:text-3xl md:text-2xl sm:text-2xl mb-5 rtl-grid">
          {" "}
          כאוהדי ואוהבי כדורגל, ובמיוחד כדורגל אנגלי, הרגשנו צורך ליצור מערכת
          שתנגיש לאנשים כמונו שמתכוונים לטייל וללכת למשחקים באנגליה את כל המידע
          על האצטדיונים בה.
        </h1>
      </div>
      <div className="mt-10 mb-7 w-[100%]">
        <h1 className="text-blue-700 lg:text-3xl md:text-2xl sm:text-2xl mb-5">
          {" "}
          :מגישי הפרוייקט
        </h1>
        <h1 className="text-gray-900 lg:text-3xl md:text-2xl sm:text-2xl mr-5 mb-5">
          {" "}
          רון אשכנזי, שחר מיכל, וגל סיני
        </h1>
      </div>
      <div className="mt-10 mb-7 w-[100%]">
        <h1 className="text-blue-700 lg:text-3xl md:text-2xl sm:text-2xl mb-5">
          {" "}
          :מרצה{" "}
        </h1>
        <h1 className="text-gray-900 lg:text-3xl md:text-2xl sm:text-2xl mr-5 mb-5">
          {" "}
          מארק ישראל
        </h1>
      </div>
      <div className="flex justify-center mt-9">
        <img
          src="https://www.hit.ac.il/.upload/minisites/HIT_50/history/old_logo_4.png"
          alt="hit"
          className="w-20 h-20"
        />
      </div>
    </div>
  );
}

export default About;
