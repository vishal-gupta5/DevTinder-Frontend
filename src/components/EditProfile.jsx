import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoURL, about, age, gender },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className=" flex justify-center gap-10">
      <div className="flex justify-center my-8">
        <div className="card bg-base-300 text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title mx-auto text-2xl">Edit Profile</h2>
            <label className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="input"
              placeholder="First Name"
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="input"
              placeholder="Last Name"
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => {
                setPhotoURL(e.target.value);
              }}
              className="input"
              placeholder="Photo URL"
            />

            <label className="label">Age</label>
            <input
              type="text"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              className="input"
              placeholder="Age"
            />

            <label className="label">Gender</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="input"
              placeholder="Gender"
            />

            <label className="label">About</label>
            <input
              type="text"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              className="input"
              placeholder="About"
            />

            <p className="text-red-400 font-bold">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn bg-secondary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard user={{ firstName, lastName, photoURL, about, age, gender }} />
    </div>
  );
};

export default EditProfile;
