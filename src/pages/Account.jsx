import React from "react";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
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
          !{userData.name} היי{" "}
        </h1>
      </div>
      <div className="flex flex-row-reverse px-7">
        <h1 className="font-bold text-3xl text-gray-900">
          ביקורי האצטדיונים שלך
        </h1>
      </div>
      <div className="flex justify-end mb-2">
        <div className="flex flex-col  ">
          <Review reviews={userData.reviews} isUser={true} />
        </div>
      </div>
    </>
  );
}

export default Account;
