import React from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/slices/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoURL, about, age, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  if (!user) return;
  

  return (
    <div className="">
      <div className="card bg-base-300 w-96 h-[90%] shadow-sm my-8">
        <figure>
          <img className="w-full" src={photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p className="text-xl">{`${age}, ${gender}`}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
