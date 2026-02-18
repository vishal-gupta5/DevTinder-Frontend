import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/slices/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const [toast, setToast] = useState({ show: false, type: "" });

  // Review Requests
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
      setToast({ show: true, type: status });
      setTimeout(() => {
        setToast({ show: false, type: "" });
      }, 3000);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  // Fetch Requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received/", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <h1>Loading...</h1>;

  if (requests?.length === 0)
    return (
      <h1 className="text-center font-bold text-2xl pt-4">
        No Requrest found!
      </h1>
    );

  return (
    <>
      {" "}
      <div className="flex justify-center flex-col gap-5">
        <h1 className="text-center text-2xl font-bold mt-5">
          Connection Requests
        </h1>
        {requests.map((request) => {
          const { firstName, lastName, age, gender, photoURL, about } =
            request.fromUserId;
          return (
            <div
              key={request._id}
              className="w-3/7 bg-base-300 mx-auto rounded-lg"
            >
              <div className="flex justify-between gap-5">
                {/* Image  */}
                <div className="flex gap-3">
                  <img
                    className="w-32 rounded-full pl-2 p-2"
                    src={photoURL}
                    alt="photo"
                  />
                  {/* Inforamtion  */}
                  <div className="py-2">
                    <h1 className="text-xl font-bold">
                      {firstName + " " + lastName}
                    </h1>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p className="text-xs">{about}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {toast.show && (
        <div className="toast toast-top toast-center">
          {toast.type === "accepted" && (
            <div className="alert alert-success">
              <span>Request Accepted</span>
            </div>
          )}

          {toast.type === "rejected" && (
            <div className="alert alert-info">
              <span>Request Rejected</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Requests;
