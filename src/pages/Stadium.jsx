import React from "react";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase.config";
import Review from "../components/Review";
import Spinner from "../components/Spinner";
function Stadium() {
  const params = useParams();
  const navigate = useNavigate();
  const user = UserAuth();
  const splittedName = params.id?.replace("20%", " ");

  console.log(splittedName);

  const [stadiumData, setStadiumData] = useState();
  const [loading, setLoading] = useState(true);
  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    const fetchStadiumData = async () => {
      try {
        const stadiumRef = collection(db, "stadiums");
        const q = query(stadiumRef, where("stadiumName", "==", splittedName));
        const querySnap = await getDocs(q);
        let stadium = [];
        querySnap.forEach((doc) => {
          return stadium.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setStadiumData(stadium[0].data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStadiumData();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Spinner />
      </div>
    );
  }
  let avg = 0;

  if (stadiumData?.reviews) {
    const arrayGrades = [];

    var sumGrades = 0;
    stadiumData?.reviews.forEach((review) => {
      arrayGrades.push(parseFloat(review.grade));
    });

    arrayGrades.forEach((grade) => {
      sumGrades = sumGrades + grade;
    });
    avg = sumGrades / arrayGrades.length;
  } else {
    console.log("there is no reviews here");
  }

  return (
    <>
      <div className=" text-center mt-20">
        <h1 className="font-bold lg:text-5xl md:text-3xl sm:text-2xl text-gray-900 mb-5">
          {stadiumData.stadiumName}{" "}
        </h1>
        <div className="flex flex-row-reverse px-7 mb-5">
          <h1 className="font-bold text-2xl text-gray-900 ml-2">:??????</h1>
          <h1 className="font-bold text-2xl text-blue-700 ml-4">
            {stadiumData.City}
          </h1>

          <h1 className="font-bold text-2xl text-gray-900 ml-2">:??????????</h1>
          <h1 className="font-bold text-2xl text-blue-700 ml-4">
            {stadiumData.Team}
          </h1>

          <h1 className="font-bold text-2xl text-gray-900 ml-2">:????????????</h1>
          <h1 className="font-bold text-2xl text-blue-700 ml-4">
            {stadiumData.Capacity}
          </h1>

          {stadiumData?.reviews ? (
            <>
              <h1 className="font-bold text-2xl text-gray-900 ml-2">
                :?????????? ????????????????
              </h1>
              <h1 className="font-bold text-2xl text-blue-700 ml-4">
                {avg.toFixed(1)}
              </h1>{" "}
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {stadiumData?.reviews ? (
        <>
          <div className="flex flex-row-reverse px-7">
            <h1 className="font-bold text-3xl text-gray-900">??????????????</h1>
          </div>
          <div className="flex justify-end mb-2">
            <div className="flex flex-col  ">
              <Review reviews={stadiumData.reviews} isUser={false} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row-reverse px-7">
          <h1 className="font-bold text-3xl text-gray-400">
            ...???????? ?????? ?????????????? ???? ?????????????? ????
          </h1>
        </div>
      )}
    </>
  );
}

export default Stadium;
