import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import Header from "../Header";
import Map from "../Map/Map";
import HostMenu from "./HostMenu";

function Host({ isLoggedIn, users }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  if (!isLoggedIn) return <Redirect to="/login" />;
  if (loggedInUser && loggedInUser.host === false)
    return <Redirect to="/viewer" />;

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
      <Header />
      <h1>Host!</h1>
      <Map users={users} />
      <h2>{loggedInUser.address}</h2>
      <HostMenu onUpdateUser={updateLoggedInUser} />
    </div>
  );
}

export default Host;
