import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
function AddStadium() {
  const [stadiumName, setStadiumName] = useState("");
  const [club, setClub] = useState("");
  const [city, setCity] = useState("");
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [capacity, setCapacity] = useState();
  const [league, setLeague] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        stadiumName: stadiumName,
        Team: club,
        City: city,
        League: league,
        Longitude: long,
        Latitude: lat,
        Capacity: capacity,
        isAdded: true,
      };

      const docRef = await addDoc(collection(db, "stadiums"), data);
      console.log("Document written with ID: " + docRef.id);
      toast.success("תודה שהוספת אצטדיון!");
      navigate("/");
    } catch (err) {
      toast.error(".הייתה בעיה, נסה שוב");
      console.log(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-grey-lighter min-h-screen flex flex-col items-center">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">
              הוספת אצטדיון
            </h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="stadiumName"
              placeholder="שם האצטדיון (באנגלית)"
              onChange={(e) => setStadiumName(e.target.value)}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="club"
              placeholder="שם המועדון (באנגלית)"
              onChange={(e) => setClub(e.target.value)}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="league"
              placeholder="שם הליגה (באנגלית)"
              onChange={(e) => setLeague(e.target.value)}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="city"
              placeholder="עיר (באנגלית)"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="number"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="capacity"
              placeholder="קיבולת"
              onChange={(e) => setCapacity(e.target.value)}
            />
            <input
              type="number"
              step="any"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="longitude"
              placeholder="קווי אורך"
              onChange={(e) => setLong(e.target.value)}
            />
            <input
              type="number"
              step="any"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="latitude"
              placeholder="קווי רוחב"
              onChange={(e) => setLat(e.target.value)}
            />

            <button
              type="submit"
              className="w-full text-center text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              שמור
            </button>
          </div>

          <div className="text-grey-900 mt-6">
            <Link to="/">
              <h6 className="no-underline mr-3 font-bold border-b border-blue text-grey-900 hover:text-blue-700">
                חזרה לדף הבית
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddStadium;
