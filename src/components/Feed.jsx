import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length > 0) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="w-full flex justify-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
