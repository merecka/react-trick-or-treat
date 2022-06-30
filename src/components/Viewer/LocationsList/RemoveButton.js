import React, { useContext } from "react";
import { UserContext } from "../../../context/user";
import { UsersContext } from "../../../context/users";

function RemoveButton({ user }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { users, setUsers } = useContext(UsersContext);

  function handleRemove() {
    let newSavedLocations = loggedInUser.savedLocations.filter(
      (userId) => userId !== user.id
    );
    setLoggedInUser(...loggedInUser, { savedlocations: newSavedLocations });

    setUsers(...users, (users[users.id].savedlocations = newSavedLocations));
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
