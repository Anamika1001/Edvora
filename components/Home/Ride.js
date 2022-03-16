import React from "react";
// import styles from "../../styles/Home/Main.module.css";
import styles from "../../styles/Home/Ride.module.css";

export default function Ride({ ride }) {
  return (
    <div className={"row py-4 mx-4 mb-3 bg-171717 " + styles.div2}>
      <div className="col-3">
        <img
          src={ride.map_url + "?random=" + ride.id}
          alt="map"
          className="px-3 mx-auto d-flex"
          role="button"
          width={"90%"}
        />
      </div>
      <div className={"col-5 my-auto interFont " + styles.rideDetails}>
        <p className="my-0 pb-1">Ride Id : {ride.id}</p>
        <p className="my-0 pb-1">Origin Station : {ride.origin_station_code}</p>
        <p className="my-0 pb-1">
          station_path : {"[" + ride.station_path.join(", ") + "]"}
        </p>
        <p className="my-0 pb-1">Date : {ride.date}</p>
        <p className="my-0 pb-1">Distance : {ride.distance}</p>
      </div>
      <div className="col-4 ">
        <p
          className={
            "d-inline-block mx-2 px-3 py-1 bg-black text-white " + styles.button
          }
        >
          {ride.city}
        </p>
        <p
          className={
            "d-inline-block mx-2 px-3 py-1 mr-2 bg-black text-white " +
            styles.button
          }
        >
          {ride.state}
        </p>
      </div>
    </div>
  );
}
