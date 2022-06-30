import React, { useContext } from "react";
import "../../../css/LocationCard.scss";
import * as dayjs from "dayjs";
import { UserContext } from "../../../context/user";
import RemoveButton from "./RemoveButton";
import SaveButton from "./SaveButton";

function SavedLocations({ users }) {
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="saved-locations-table">
      <table>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Address</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
    </div>
  );
}

export default SavedLocations;
