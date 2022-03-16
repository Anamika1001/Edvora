import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Main from "../components/Home/Main";
import Navbar from "../components/Layout/Navbar";
import { updateAllRides, updateRides } from "../store/reducer";

export default function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    const res = fetch(`https://assessment.api.vweb.app/user`, {
      method: "GET",
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setData(data);
          let station_code = data.station_code;
          const res1 = fetch(`https://assessment.api.vweb.app/rides`, {
            method: "GET",
          }).then((resp) => {
            if (resp.ok) {
              resp.json().then((data) => {
                for (var i = 0, l = data.length; i < l; i++) {
                  let subResult = Math.min(
                    ...data[i].station_path.map((v, i) =>
                      Math.abs(v - station_code)
                    )
                  );
                  data[i]["distance"] = subResult;
                }
                dispatch(updateRides(data));
                dispatch(updateAllRides());
              });
            }
          });
        });
      }
    });

    return () => (mounted = false);
  }, [dispatch]);
  return (
    <>
      <Navbar user_data={data} />
      <Main />
    </>
  );
}
