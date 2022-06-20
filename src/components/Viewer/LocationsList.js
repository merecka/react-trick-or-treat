import React, { useContext } from "react";
import { UserContext } from "../../context/user";
import "../../css/Viewer.scss";
import LocationCard from "./LocationCard";

function LocationsList({ users }) {
  const { loggedInUser } = useContext(UserContext);

  console.log("users in LocationsList are: " + JSON.stringify(users));

  return (
    <div className="hosts-container">
      List of Locations
      <div className="hosts-cards-container">
        {users.map((user) => {
          return <LocationCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
}

export default LocationsList;
