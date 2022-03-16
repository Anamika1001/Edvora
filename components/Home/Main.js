import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home/Main.module.css";
import Ride from "./Ride";
import { useDispatch, useSelector } from "react-redux";
import { updateCityWiseRide, updateStateWiseRide } from "../../store/reducer";

export default function Main() {
  const NearestRides = useSelector((state) => state.edvora.nearest_rides);
  const UpcomingRides = useSelector((state) => state.edvora.upcoming_rides);
  const PastRides = useSelector((state) => state.edvora.past_rides);
  const state = useSelector((state) => state.edvora.states);
  const city = useSelector((state) => state.edvora.city);
  const [selectedState, setState] = useState("State");
  const [selectedCity, setCity] = useState("City");
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    dispatch(updateStateWiseRide(selectedState));
    if (selectedState == "State") setCity("City");

    return () => (mounted = false);
  }, [dispatch, selectedState]);

  useEffect(() => {
    let mounted = true;
    {
      selectedCity == "City"
        ? dispatch(updateStateWiseRide(selectedState))
        : dispatch(updateCityWiseRide(selectedCity));
    }
    return () => (mounted = false);
  }, [dispatch, selectedCity]);

  return (
    <>
      <ul
        className="nav nav-pillss text-light m-4"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className="nav-link active"
            id="pills-nearest-tab"
            data-toggle="pill"
            href="#pills-nearest"
            role="tab"
            aria-controls="pills-nearest"
            aria-selected="true"
          >
            Nearest rides
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-upcoming-tab"
            data-toggle="pill"
            href="#pills-upcoming"
            role="tab"
            aria-controls="pills-upcoming"
            aria-selected="false"
          >
            Upcoming rides ({UpcomingRides.length})
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-past-tab"
            data-toggle="pill"
            href="#pills-past"
            role="tab"
            aria-controls="pills-past"
            aria-selected="false"
          >
            Past rides ({PastRides.length})
          </a>
        </li>

        <li className="nav-item dropdown ml-auto">
          <a
            className="nav-link"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Image src="/Vector.png" alt="filter" width={18} height={12} />{" "}
            Filters
          </a>

          <div
            className="dropdown-menu mr-5 bg-131313"
            aria-labelledby="dropdownMenuButton"
            id={styles.dropdownMenuItem}
          >
            <p className="ml-4 my-0" id={styles.dropdownItem}>
              Filters
            </p>
            <hr className="mt-0 border w-75 " />
            <select
              id="states"
              className="btn btn-secondary dropdown-toggle p-0 w-75 d-block mx-auto text-left pl-2 my-2"
              onChange={(e) => {
                setState(e.target.value);
              }}
            >
              <option value="State">All States</option>
              {state.map((st, idx) => (
                <option value={st} key={idx}>
                  {st}
                </option>
              ))}
            </select>
            <select
              id="cities"
              className="btn btn-secondary dropdown-toggle p-0 w-75 d-block mx-auto text-left pl-2 my-2"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              value={selectedCity}
            >
              <option value="City">All Cities</option>
              {city.map((ct, idx) => (
                <option value={ct} key={idx}>
                  {ct}
                </option>
              ))}
            </select>
          </div>
        </li>
      </ul>

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active text-white"
          id="pills-nearest"
          role="tabpanel"
          aria-labelledby="pills-nearest-tab"
        >
          {NearestRides.map((ride, idx) => (
            <div key={idx}>
              <Ride ride={ride} />
            </div>
          ))}
          {NearestRides.length ? (
            ""
          ) : (
            <p className="text-center display-3 mt-5 pt-5">No Rides</p>
          )}
        </div>
        <div
          className="tab-pane fade text-white"
          id="pills-upcoming"
          role="tabpanel"
          aria-labelledby="pills-upcoming-tab"
        >
          {UpcomingRides.map((ride, idx) => (
            <div key={idx}>
              <Ride ride={ride} />
            </div>
          ))}
          {UpcomingRides.length ? (
            ""
          ) : (
            <p className="text-center display-3 mt-5 pt-5">No Rides</p>
          )}
        </div>
        <div
          className="tab-pane fade text-white"
          id="pills-past"
          role="tabpanel"
          aria-labelledby="pills-past-tab"
        >
          {PastRides.map((ride, idx) => (
            <div key={idx}>
              <Ride ride={ride} />
            </div>
          ))}
          {PastRides.length ? (
            ""
          ) : (
            <p className="text-center display-3 mt-5 pt-5">No Rides</p>
          )}
        </div>
      </div>
    </>
  );
}
