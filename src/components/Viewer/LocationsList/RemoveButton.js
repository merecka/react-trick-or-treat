import React, { useContext } from "react";
import { UserContext } from "../../../context/user";
import { UsersContext } from "../../../context/users";

function RemoveButton({ user }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { users, setUsers } = useContext(UsersContext);

  function handleRemove() {
    let newSavedLocations = loggedInUser.savedlocations.filter(
      (userId) => userId !== user.id
    );

    let updatedUser = loggedInUser;
    updatedUser.savedlocations = newSavedLocations;
    setLoggedInUser(updatedUser);

    const newUsersArray = users.map((user) => {
      if (user.id === loggedInUser.id) {
        return updatedUser;
      } else {
        return user;
      }
    });

    setUsers(newUsersArray);

    fetch(`http://localhost:4000/users/${loggedInUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ savedlocations: updatedUser.savedlocations }),
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <button className="save-remove" onClick={handleRemove}>
        Remove
      </button>
    </>
  );
}

export default RemoveButton;
