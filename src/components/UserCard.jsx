import React from "react";

const UserCard = ({ user }) => {
  if (!user) return;
  const { firstName, lastName, photoURL, about, age, gender } = user;
  return (
    <div className="">
      <div className="card bg-base-300 w-74 shadow-sm my-8">
        <figure>
          <img src={photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p>{`${age}, ${gender}`}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
