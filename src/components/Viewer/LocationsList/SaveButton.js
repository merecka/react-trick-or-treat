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
    console.log(loggedInUser);
    console.log(user.id);

    let updatedUser = loggedInUser;
    updatedUser.savedlocations.push(user.id);
    console.log(updatedUser);

    setLoggedInUser(updatedUser);
    const newUsersArray = users.map((user) => {
      if (user.id === loggedInUser.id) {
        return updatedUser;
      } else {
        return user;
      }
    });

    setUsers(newUsersArray);
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
