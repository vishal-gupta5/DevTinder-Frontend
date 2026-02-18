import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections?.length === 0) return <h1 className="text-center font-bold text-2xl pt-4">No connections found!</h1>;

  return (
    <div className="flex justify-center my-10 flex-col">
      <h1 className="text-center text-2xl font-bold">Connections</h1>

      {connections?.map((connection) => (
        <div
          key={connection._id}
          className="flex flex-row gap-5 w-4/12 bg-base-300 mx-auto my-4 rounded-lg"
        >
          <div>
            <img className="w-36 rounded-tl-lg rounded-bl-lg" src={connection?.photoURL} alt="photo" />
          </div>

          <div className="py-2">
            <h3>{connection?.firstName + " " + connection.lastName}</h3>
            {connection?.age && connection?.gender && (
              <h5>{connection?.age + ", " + connection?.gender}</h5>
            )}

            <p>{connection?.about}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
