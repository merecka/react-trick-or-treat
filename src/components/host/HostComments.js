import React, { useState } from "react";

function HostComments({ onUpdateUserComment, loggedInUser }) {
  const [toEdit, setToEdit] = useState();
  const [comment, setComment] = useState();

  function handleChange(event) {
    setComment(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUserComment(comment);

    setToEdit(false);
  }

  function toggleEditMenu() {
    setToEdit(!toEdit);
  }

  return (
    <div>
      <div
        style={{
          display: toEdit ? "none" : null,
        }}
      >
        <h3>Comment:</h3>
        {loggedInUser.comment}
      </div>
      <button
        onClick={toggleEditMenu}
        style={{ visibility: toEdit ? "hidden" : "visible" }}
      >
        Edit
      </button>
      <div style={{ display: toEdit ? null : "none" }}>
        <form onSubmit={handleSubmit}>
          <label>Edit Comment:</label>
          <br />
          <textarea
            name="comment"
            value={comment}
            onChange={handleChange}
            rows="10"
            cols="30"
          >
            {" "}
          </textarea>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default HostComments;
