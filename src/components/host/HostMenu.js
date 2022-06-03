import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as dayjs from 'dayjs'

function HostMenu({onUpdateUser}) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [toEdit, setToEdit] = useState(true);

  const currentYear = startTime.getFullYear();
  // const startDate;
  // const endDate;

  function handleSubmit(event) {
    event.preventDefault();

    console.log(startTime.getHours());
    console.log(startTime.getMinutes());
    console.log(endTime.getHours());
    console.log(endTime.getMinutes());

    setStartDate(new Date(currentYear, 9, 31, startTime.getHours(), startTime.getMinutes(), 0));
    setEndDate(new Date(currentYear, 9, 31, endTime.getHours(), endTime.getMinutes(), 0));
    setToEdit(false);
    onUpdateUser(startDate, endDate);

  }

  function toggleEditMenu() {setToEdit(!toEdit) };

  return (
    <div>
      <h1>HELLO</h1>
      <button onClick={toggleEditMenu} style={{ visibility: toEdit ? 'hidden': 'visible'}}>Edit</button>
      <div style={{ display: toEdit ? null : 'none'}}>
        <form onSubmit={handleSubmit}>
          <label for="fname">Start Time:</label><br />
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
          <label for="fname">End Time:</label><br />
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
      {startDate && endDate ? 
        <div style={{ visibility: toEdit ? 'hidden': 'visible'}}>
          <h2>Start Time:  {dayjs(startDate).format('h:mm A')}</h2>
          <h2>End Time:  {dayjs(endDate).format('h:mm A')}</h2>
        </div> : null}
    </div>
  );
}

export default HostMenu;
