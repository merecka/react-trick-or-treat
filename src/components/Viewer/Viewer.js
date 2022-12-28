import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import Header from "../Header";
import Map from "../Map/Map";
import "../../css/Viewer.scss";
import LocationsList from "./LocationsList/LocationsList";
import SavedLocations from "./SavedLocations/SavedLocations";

function Viewer({ isLoggedIn, users }) {
  const { loggedInUser } = useContext(UserContext);
  const hostUsers = users.filter((user) => user.host === "true");

  if (isLoggedIn === false) return <Redirect to="/login" />;

  return (
    <div className="viewer-container">
      <Header />
      <h1>Visitor! {loggedInUser.address}</h1>
      <div className="content-container">
        <div className="top-container">
          <div className="locations-list">
            <LocationsList users={hostUsers} />
          </div>
          <div className="viewer-map">
            <Map users={hostUsers} />
          </div>
        </div>
        <div className="bottom-container">
          Saved Locations
          <SavedLocations users={users} />
        </div>
      </div>
    </div>
  );
}

export default Viewer;
