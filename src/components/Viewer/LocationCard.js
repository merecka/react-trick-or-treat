import React, { useContext } from "react";
import { UserContext } from "../../context/user";
import "../../css/LocationCard.scss";
import * as dayjs from "dayjs";

function LocationCard({ user }) {
  console.log(user);
  console.log(user.starttime);
  console.log(user.endtime);
  const startTime = dayjs(user.starttime).format("h:mm A");
  const endTime = dayjs(user.endtime).format("h:mm A");

  return (
    <div className="card-container">
      <div className="host-info">
        <p>{user.name}</p>
        <p>{user.street}</p>
        <p>
          <span>
            {user.city}&nbsp;{user.state},&nbsp;{user.zipcode}{" "}
          </span>
        </p>
        <p>Start Time: {startTime}</p>
        <p>End Time: {endTime}</p>
      </div>
      <div className="save-remove">Save / Remove</div>
    </div>
  );
}

export default LocationCard;
