import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

function Home() {
  const { user } = UserAuth();
  const [team, setTeam] = useState();
  const [city, setCity] = useState();
  const [league, setLeague] = useState();
  const [loading, setLoading] = useState(false);

  const getFilters = (teamData, cityData, leagueData) => {
    if (teamData) {
      console.log("Comes from Home Page", teamData);
      setTeam(teamData);
      setLoading(false);
    }
    if (cityData) {
      console.log("Comes from Home Page", cityData);
      setCity(cityData);
    }
    if (leagueData) {
      console.log("Comes from Home Page", leagueData);
      setLeague(leagueData);
    }
    // console.log("Comes from Home Page", teamData, cityData, leagueData);
    // console.log("Comes from Home Page", teamData, cityData, leagueData);
    // console.log("Comes from Home Page", teamData, cityData, leagueData);
  };

  if (loading) {
    return (
      <div className="mt-10">
        <h1 className="font-bold text-center lg:text-5xl text-grey-900 md:text-3xl sm:text-2xl">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="items-center mt-20 ">
        {!user?.email ? (
          <div className="mt-10 mb-5">
            <h1 className="font-bold text-gray-900 text-center lg:text-5xl text-grey-900 md:text-3xl sm:text-2xl">
              !GiStadiumברוכים הבאים ל
            </h1>
          </div>
        ) : (
          <div className="mt-10 mb-5">
            <h1 className="font-bold text-gray-900 text-center lg:text-5xl text-grey-900 md:text-3xl sm:text-2xl">
              !מצאו את האצטדיון שמעניין אתכם
            </h1>
          </div>
        )}

        {!user?.email ? (
          <div className="mt-5 text-center ">
            <div>
              <h1 className="text-3xl font-bold text-blue-700 ">
                !האתר שיספק לכם את כל המידע הנחוץ על האצטדיונים ברחבי אנגליה
              </h1>
            </div>
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-gray-900">
                .הירשמו או התחברו אם אתם רשומים באתר
              </h1>

              <div className="mt-5">
                <Link to="/register">
                  <button
                    type="submit"
                    className="w-50% text-center text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    צור חשבון
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    type="submit"
                    className="w-50% text-center ml-3 text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    התחבר
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className=" grid grid-cols-3 text-center">
            <div className="col-span-2">
              <MapComponent team={team} city={city} league={league} />
            </div>
            <div>
              <FilterBar onSubmit={getFilters} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
