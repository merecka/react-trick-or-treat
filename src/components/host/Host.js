import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import Header from "../Header";
import Map from "../Map/Map";
import HostComments from "./HostComments";
import StartEndTime from "./StartEndTime";
import "../../css/Host.scss";

function Host({ isLoggedIn, users }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const hostUsers = users.filter((user) => user.host === "true");

  if (!isLoggedIn) return <Redirect to="/login" />;
  if (loggedInUser && loggedInUser.host === "false")
    return <Redirect to="/viewer" />;

  function updateLoggedInUserTime(selectedDate) {
    fetch(
      `${process.env.REACT_APP_POSSTACK_API_KEY}/users/${loggedInUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          starttime: selectedDate.startDate,
          endtime: selectedDate.endDate,
        }),
      }
    )
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

  function updateLoggedInUserComment(newComment) {
    fetch(
      `${process.env.REACT_APP_POSSTACK_API_KEY}/users/${loggedInUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newComment,
        }),
      }
    )
      .then((r) => r.json())
      .then(() =>
        setLoggedInUser({
          ...loggedInUser,
          comment: newComment,
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="host-container">
      <div className="top-container">
        <Header />
        <h1>Host!</h1>
        <h2>{loggedInUser.address}</h2>
        <div className="viewer-map">
          <Map users={hostUsers} />
        </div>
      </div>
      <div className="bottom-container">
        <StartEndTime
          onUpdateUserTime={updateLoggedInUserTime}
          loggedInUser={loggedInUser}
        />
        <HostComments
          loggedInUser={loggedInUser}
          onUpdateUserComment={updateLoggedInUserComment}
        />
      </div>
    </div>
  );
}

export default Host;
