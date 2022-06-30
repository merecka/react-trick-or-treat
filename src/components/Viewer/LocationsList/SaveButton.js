import React, { useContext } from "react";
import { UserContext } from "../../../context/user";
import { UsersContext } from "../../../context/users";

function SaveButton({ user }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { users, setUsers } = useContext(UsersContext);

  //   users.forEach((user) => {
  //     for (const [key, value] of Object.entries(user)) {
  //       console.log(`${key}: ${value}`);
  //     }
  //   });

  function handleSave() {
    let updatedUser = loggedInUser;
    updatedUser.savedlocations.push(user.id);

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
      <button className="save-remove" onClick={handleSave}>
        Save
      </button>
    </>
  );
}

export default SaveButton;
