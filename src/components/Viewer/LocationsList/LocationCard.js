import React, { useContext } from "react";
import "../../../css/LocationCard.scss";
import * as dayjs from "dayjs";
import { UserContext } from "../../../context/user";
import RemoveButton from "./RemoveButton";
import SaveButton from "./SaveButton";

function LocationCard({ user }) {
  const { loggedInUser } = useContext(UserContext);
  const startTime = dayjs(user.starttime).format("h:mm A");
  const endTime = dayjs(user.endtime).format("h:mm A");

  console.log("Rendering Location Card");
  console.log(loggedInUser.savedlocations.length);
  console.log(loggedInUser.savedlocations.includes(user.id));

  const saveRemoveButton = loggedInUser.savedlocations.includes(user.id) ? (
    <RemoveButton user={user} />
  ) : (
    <SaveButton user={user} />
  );

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
      {saveRemoveButton}
    </div>
  );
}

export default LocationCard;
