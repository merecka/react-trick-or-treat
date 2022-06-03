import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import Header from "../Header";
import Map from "../Map";
import HostMenu from "./HostMenu";

function Host({ isLoggedIn }) {
  const { loggedInUser } = useContext(UserContext);
  
  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div>
      <Header />
      <h1>Home!</h1>
      <Map />
      <h2>{loggedInUser.address}</h2>
      <HostMenu />
    </div>
  );
}

export default Host;
