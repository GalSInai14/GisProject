import React from "react";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  where,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { FaArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ReviewStadium(props) {
  const user = UserAuth();
  const [show, setShow] = useState(true);
  const [facilities, setFacilities] = useState("");
  const [atmosphere, setAtmosphere] = useState("");
  const [price, setPrice] = useState("");
  const [grade, setGrade] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adding the review to the user document (reviews array)
      const userRef = doc(db, "users", `${user.user.email}`);
      const currentUser = await getDoc(userRef);
      const currentUserData = currentUser.data();
      // console.log(user);

      await updateDoc(userRef, {
        reviews: arrayUnion({
          facilities: facilities,
          atmosphere: atmosphere,
          price: price,
          grade: grade,
          stadiumName: props.stadiumName,
        }),
      });
      //////////////////////////////////////////////////////////
      const stadiumRef = collection(db, "stadiums");
      const q = query(
        stadiumRef,
        where("stadiumName", "==", props.stadiumName)
      );
      const querySnap = await getDocs(q);
      let stadium = [];
      querySnap.forEach((doc) => {
        return stadium.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(stadium[0]);

      const docRef = doc(db, "stadiums", stadium[0].id);
      await updateDoc(docRef, {
        reviews: arrayUnion({
          facilities: facilities,
          atmosphere: atmosphere,
          price: price,
          grade: grade,
          user: `${currentUserData.name}`,
        }),
      });

      //         querySnap = await getDocs(q);
      setLoading(false);
      setShow(false);
      navigate("/");
      props.onSubmit(show);

      toast.success(`! ${props.stadiumName} תודה שדירגת את `);
    } catch (error) {
      console.log(error.message);
      toast.error(".משהו לא עבד, נסה שוב מאוחר יותר");
    }

    if (loading) {
      return <h1>Loading...</h1>;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-grey-lighter mt-3  flex flex-col items-center">
        <div className="container lg:max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">
              {props.stadiumName} :דרג את
            </h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="facilities"
              placeholder="איך היו מתקני האצטדיון? (שירותים, מזון וכו')"
              onChange={(e) => setFacilities(e.target.value)}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="atmosphere"
              placeholder=" (עידוד קהל, תפאורה) ?איך הייתה האווירה באצטדיון"
              onChange={(e) => setAtmosphere(e.target.value)}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 placeholder:text-center"
              name="price"
              placeholder="?האם מחיר הכרטיס היה הוגן"
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="flex justify-center flex-col-2 items-center">
              <FaArrowDown className="font-bold text-blue-600 mr-3" />
              <h2 className="mb-2 text-md font-bold text-center text-gray-900">
                (1-5) הדירוג שלך
              </h2>
            </div>

            <div
              className="grid lg:w-[40rem] md:w-[20rem] sm:w-sm lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  rounded-xl  p-2"
              x-data="app"
            >
              <div>
                <input
                  type="radio"
                  name="option"
                  id="1"
                  className="peer hidden"
                  onChange={(e) => setGrade(e.target.id)}
                />
                <label
                  htmlFor="1"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  1
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="option"
                  id="2"
                  className="peer hidden"
                  onChange={(e) => setGrade(e.target.id)}
                />
                <label
                  htmlFor="2"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  2
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="option"
                  id="3"
                  className="peer hidden"
                  onChange={(e) => setGrade(e.target.id)}
                />
                <label
                  htmlFor="3"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  3
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="option"
                  id="4"
                  className="peer hidden"
                  onChange={(e) => setGrade(e.target.id)}
                />
                <label
                  htmlFor="4"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  4
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="option"
                  id="5"
                  className="peer hidden"
                  onChange={(e) => setGrade(e.target.id)}
                />
                <label
                  htmlFor="5"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  5
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="lg:w-[25%] text-center text-white bg-blue-600 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              שלח דירוג
            </button>
          </div>
          <Link to={`/stadium/${props.stadiumName}`}>
            <button
              type="submit"
              className="mt-8 lg:w-[100%] text-center text-white bg-blue-600 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              עמוד האצטדיון{" "}
            </button>{" "}
          </Link>
        </div>
      </div>
    </form>
  );
}

export default ReviewStadium;
