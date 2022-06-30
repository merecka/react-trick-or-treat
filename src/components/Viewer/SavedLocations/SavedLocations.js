import React, { useContext } from "react";
import "../../../css/SavedLocations.scss";
import * as dayjs from "dayjs";
import { UserContext } from "../../../context/user";

function SavedLocations({ users }) {
  const { loggedInUser } = useContext(UserContext);

  const savedUsers = users.filter((user) =>
    loggedInUser.savedlocations.includes(user.id)
  );
  const savedUsersTableData = savedUsers.map((user, index) => {
    return (
      <tr>
        <td>{index}</td>
        <td>{user.name}</td>
        <td>{user.address}</td>
        <td>{dayjs(user.starttime).format("h:mm A")}</td>
        <td>{dayjs(user.endtime).format("h:mm A")}</td>
      </tr>
    );
  });

  return (
    <div className="saved-locations-table">
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Address</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>{savedUsersTableData}</tbody>
      </table>
    </div>
  );
}

export default SavedLocations;
