import React from "react";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase.config";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import Review from "../components/Review";
function Account() {
  const navigate = useNavigate();
  const user = UserAuth();

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", `${user.user.email}`);
        const currentUser = await getDoc(userRef);
        const currentUserData = currentUser.data();
        if (currentUser.exists()) {
          console.log(currentUserData);
        } else {
          setLoading(true);
          console.log("Document does not exist.");
        }

        setUserData(currentUserData);
        console.log(".$!.$!.");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="mt-10 flex items-center lg:text-5xl md:text-2xl sm:text-sm text-gray-900">
        <FaSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center text-center mt-20">
        {userData?.reviews.length >= 5 && userData?.reviews.length < 10 ? (
          <AiOutlineStar />
        ) : (
          <div></div>
        )}
        {userData.reviews.length >= 10 && userData.reviews.length < 15 ? (
          <>
            <AiOutlineStar /> <AiOutlineStar />
          </>
        ) : (
          <div></div>
        )}
        {userData.reviews.length >= 15 ? (
          <>
            <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar />
          </>
        ) : (
          <div></div>
        )}
        <h1 className="font-bold text-5xl text-grey-900">
          !{userData.name} ??????{" "}
        </h1>
      </div>
      <div className="flex flex-row-reverse px-7">
        <h1 className="font-bold text-3xl text-gray-900">
          ???????????? ???????????????????? ??????
        </h1>
      </div>
      {userData.reviews[0] !== [] ? (
        <div className="flex justify-end mb-2">
          <div className="flex flex-col  ">
            <Review reviews={userData.reviews} isUser={true} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row-reverse px-7">
          <h1 className="font-bold text-3xl text-gray-400">
            ...???? ?????????? ???? ??????????????{" "}
          </h1>
        </div>
      )}

      {!userData?.admin ? (
        <div></div>
      ) : (
        <div className="flex justify-center">
          <Link to="/add-stadium">
            <button
              type="submit"
              className="mt-8 lg:w-[100%] text-center text-white bg-blue-600 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ???????? ??????????????
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Account;
