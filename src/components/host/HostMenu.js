import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as dayjs from "dayjs";

function HostMenu({ onUpdateUser }) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [toEdit, setToEdit] = useState(true);
  const currentYear = new Date().getFullYear();

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

    setSelectedDate({
      startDate: newStartDate,
      endDate: newEndDate,
    });

    onUpdateUser({
      startDate: newStartDate,
      endDate: newEndDate,
    });

    setToEdit(false);
  }

  function toggleEditMenu() {
    setToEdit(!toEdit);
  }

  return (
    <div>
      <button
        onClick={toggleEditMenu}
        style={{ visibility: toEdit ? "hidden" : "visible" }}
      >
        Edit
      </button>
      <div style={{ display: toEdit ? null : "none" }}>
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
        </form>
      </div>
      {selectedDate.startDate && selectedDate.endDate ? (
        <div style={{ visibility: toEdit ? "hidden" : "visible" }}>
          <h2>Start Time: {dayjs(selectedDate.startDate).format("h:mm A")}</h2>
          <h2>End Time: {dayjs(selectedDate.endDate).format("h:mm A")}</h2>
        </div>
      ) : null}
    </div>
  );
}

export default HostMenu;
