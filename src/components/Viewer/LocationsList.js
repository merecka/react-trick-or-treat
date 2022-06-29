import React from "react";
import "../../css/Viewer.scss";
import LocationCard from "./LocationCard";

function LocationsList({ users }) {
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
