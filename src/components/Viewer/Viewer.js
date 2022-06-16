import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import Header from "../Header";
import Map from "../Map/Map";
import "../../css/Viewer.scss";

function Viewer({ isLoggedIn, users }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  if (!isLoggedIn) return <Redirect to="/login" />;

  function updateLoggedInUser(selectedDate) {
    fetch(`http://localhost:4000/users/${loggedInUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        starttime: selectedDate.startDate,
        endtime: selectedDate.endDate,
      }),
    })
      .then((r) => r.json())
      .then(() =>
        setLoggedInUser({
          ...loggedInUser,
          starttime: selectedDate.startDate,
          endtime: selectedDate.endDate,
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="viewer-container">
        <Header />
        <h1>Visitor! {loggedInUser.address}</h1>
        <div className="content-container">
          <div className="top-container">
            <div className="locations-list">Locations List</div>
            <div className="viewer-map">
              <Map users={users} />
            </div>
          </div>
          <div className="bottom-container">Bottom Container</div>
        </div>
      </div>
    </div>
  );
}

export default Viewer;
