import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import Header from "../Header";
import Map from "../Map/Map";
import HostMenu from "./HostMenu";

function Host({ isLoggedIn, users }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const address = loggedInUser ? loggedInUser.street + ' ' + loggedInUser.city + ', ' + loggedInUser.state + ' ' + loggedInUser.zipcode : null;
  
  if (!isLoggedIn) return <Redirect to="/login" />;

  function updateLoggedInUser(startDate, endDate) {
    console.log(new Date(startDate));
    console.log(new Date(endDate));

    fetch(`http://localhost:4000/users/${loggedInUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        starttime: startDate,
        endtime: endDate
      }),
    })
      .then((r) => r.json())
      .then(() => setLoggedInUser({...loggedInUser, starttime: startDate, endtime: endDate}))
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <Header />
      <h1>Home!</h1>
      <Map users={users} />
      <h2>{address}</h2>
      <HostMenu onUpdateUser={updateLoggedInUser} />
    </div>
  );
}

export default Host;
