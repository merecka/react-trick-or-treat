import React, { useContext } from "react";
import { UserContext } from "../context/user";
import "../css/Header.css";

function Header() {
  const { loggedInUser } = useContext(UserContext);

  console.log(loggedInUser);

  return (
    <div className="mainHeader">
      <div>
        {loggedInUser.name}{" "}
        {loggedInUser.host === true ? (
          <span>(host)</span>
        ) : (
          <span>(viewer)</span>
        )}
      </div>
      <div>Logout</div>
    </div>
  );
}

export default Header;
