import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReviewStadium from "./ReviewStadium";
//import { useParams } from "react-router-dom";

import L from "leaflet";
//import { collection, getDocs, query, where } from "firebase/firestore";
//import { db } from "../firebase";
import { toast } from "react-toastify";

const stadiumsFile = require("../data/stadiums.json");

function MapComponent(props) {
  const [stadium, setStadium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stadiumName, setStadiumName] = useState("");

  //const params = useParams();

  const customMarker = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  // Use Firebase to read stadiums collection
  // The reading can cost money, that is why we chose to read from the file

  // useEffect(() => {
  //   const fetchStadiums = async () => {
  //     try {
  //       //Get reference
  //       const stadiumsRef = collection(db, "stadiums");
  //       let q;
  //       let querySnap;

  //       if (props.team) {
  //         q = query(stadiumsRef, where("Team", "==", props.team));
  //         querySnap = await getDocs(q);
  //         let stadiums = [];
  //         querySnap.forEach((doc) => {
  //           return stadiums.push({
  //             id: doc.id,
  //             data: doc.data(),
  //           });
  //         });
  //         setStadium(stadiums);
  //         setLoading(false);
  //       } else if (props.city && !props.league) {
  //         q = query(stadiumsRef, where("City", "==", props.city));
  //         querySnap = await getDocs(q);
  //         let stadiums = [];
  //         querySnap.forEach((doc) => {
  //           return stadiums.push({
  //             id: doc.id,
  //             data: doc.data(),
  //           });
  //         });
  //         setStadium(stadiums);
  //         setLoading(false);
  //       } else if (props.league && !props.city) {
  //         q = query(stadiumsRef, where("League", "==", props.league));
  //         querySnap = await getDocs(q);
  //         let stadiums = [];
  //         querySnap.forEach((doc) => {
  //           return stadiums.push({
  //             id: doc.id,
  //             data: doc.data(),
  //           });
  //         });
  //         setStadium(stadiums);
  //         setLoading(false);
  //       } else if (!props.team && props.city && props.league) {
  //         q = query(
  //           stadiumsRef,
  //           where("City", "==", props.city),
  //           where("League", "==", props.league)
  //         );
  //         querySnap = await getDocs(q);
  //         let stadiums = [];
  //         querySnap.forEach((doc) => {
  //           return stadiums.push({
  //             id: doc.id,
  //             data: doc.data(),
  //           });
  //         });
  //         setStadium(stadiums);
  //         setLoading(false);
  //       } else {
  //         let stadiums = [];

  //         for (let i in stadiumsFile) {
  //           stadiums.push(stadiumsFile[i]);
  //         }
  //         setStadium(stadiums);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.log("Could not fetch stadiums.");
  //     }
  //   };
  //   fetchStadiums();
  // }, [props]);
  useEffect(() => {
    const fetchStadiums = () => {
      try {
        let stadiums = [];
        for (let i in stadiumsFile) {
          stadiums.push(stadiumsFile[i]);
        }

        if (props.team) {
          let teamStadium = [];

          let team = stadiums.find((element) => element.Team === props.team);
          teamStadium.push(team);
          console.log(teamStadium[0]);

          setStadium(teamStadium);
          setLoading(false);
        } else if (props.city && !props.league) {
          let cityStadiums = stadiums.filter(
            (element) => element.City === props.city
          );

          setStadium(cityStadiums);
          setLoading(false);
        } else if (props.league && !props.city) {
          let leagueStadiums = stadiums.filter(
            (element) => element.League === props.league
          );

          setStadium(leagueStadiums);
          setLoading(false);
        } else if (props.city && props.league) {
          let cityleagueStadiums = stadiums.filter(
            (element) =>
              element.League === props.league && element.City === props.city
          );

          setStadium(cityleagueStadiums);
          setLoading(false);
        } else {
          setStadium(stadiums);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        toast.error("Could not fetch data, try later.");
      }
    };
    fetchStadiums();
  }, [setStadium, props]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <h1 className="font-bold text-4xl text-blue-700">
          Preparing your map...
        </h1>
      </div>
    );
  }
  const hideComponent = (show) => {
    if (!show) {
      setStadiumName(null);
    }
  };
  if (stadiumName) {
    console.log(stadiumName);
    return (
      <div>
        <ReviewStadium stadiumName={stadiumName} onSubmit={hideComponent} />
      </div>
    );
  }

  return (
    <>
      <div className="mt-2 w-25 items-center mb-5">
        <MapContainer
          center={[52.489471, -1.898575]}
          zoom={7}
          style={{ width: "65vw", height: "60vh" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stadium.map((marker, key) => (
            <Marker
              icon={customMarker}
              position={[marker.Latitude, marker.Longitude]}
            >
              <Popup key={key}>
                <h6 className="font-bold text-sm">
                  Stadium: {marker.stadiumName}
                </h6>{" "}
                <br />
                Club: {marker.Team} <br />
                Capacity: {marker.Capacity} <br />
                City: {marker.City} <br />
                League: {marker.League} <br />
                <button
                  type="submit"
                  className="text-center mt-5 text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setStadiumName(marker.stadiumName)}
                >
                  דרג ביקור
                </button>
                <Link to={`/stadium/${marker.stadiumName}`}>
                  <button
                    type="submit"
                    className="text-center mt-5 ml-5 text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    עמוד האצטדיון
                  </button>
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default MapComponent;
