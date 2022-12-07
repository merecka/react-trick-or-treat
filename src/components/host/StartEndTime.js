import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as dayjs from "dayjs";

function StartEndTime({ onUpdateUserTime, loggedInUser }) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [toEdit, setToEdit] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (loggedInUser.starttime != null && loggedInUser.endtime != null) {
      setToEdit(false);
    } else {
      setToEdit(true);
    }
  }, [loggedInUser.starttime, loggedInUser.endtime]);

  function handleSubmit(event) {
    event.preventDefault();

    // January = 0, December = 11
    const newStartDate = new Date(
      currentYear,
      9,
      31,
      startTime.getHours(),
      startTime.getMinutes(),
      0
    );

    const newEndDate = new Date(
      currentYear,
      9,
      31,
      endTime.getHours(),
      endTime.getMinutes(),
      0
    );

    onUpdateUserTime({
      startDate: newStartDate,
      endDate: newEndDate,
    });

    setToEdit(false);
  }

  function toggleEditMenu() {
    setToEdit((toEdit) => !toEdit);
  }

  function handleEditTimeCancel() {
    toggleEditMenu();
    setStartTime(new Date(loggedInUser.starttime));
    setEndTime(new Date(loggedInUser.endtime));
  }

  return (
    <div>
      <div
        style={{
          display:
            loggedInUser.starttime && loggedInUser.endtime && toEdit === false
              ? null
              : "none",
        }}
      >
        <h2>Start Time: {dayjs(loggedInUser.starttime).format("h:mm A")}</h2>
        <h2>End Time: {dayjs(loggedInUser.endtime).format("h:mm A")}</h2>
        <button
          onClick={toggleEditMenu}
          style={{ display: toEdit ? "none" : null }}
        >
          Edit
        </button>
      </div>

      <div
        className="edit-time-form"
        style={{
          display: toEdit === true ? null : "none",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label>Start Time:</label>
          <br />
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
          <label>End Time:</label>
          <br />
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
          <button type="submit">Save</button>
          <button onClick={handleEditTimeCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default StartEndTime;
