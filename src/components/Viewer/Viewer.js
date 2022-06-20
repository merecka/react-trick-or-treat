import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import Header from "../Header";
import Map from "../Map/Map";
import "../../css/Viewer.scss";
import LocationsList from "./LocationsList";

function Viewer({ isLoggedIn, users }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const hostUsers = users.filter((user) => user.host === true);

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div>
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
          <div className="bottom-container">Bottom Container</div>
        </div>
      </div>
    </div>
  );
}

export default Viewer;
