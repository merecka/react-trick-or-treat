import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

function Signup({ setIsLoggedIn, users, setUsers }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });
  const { setLoggedInUser } = useContext(UserContext);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      "starttime": null,
      "endtime" : null
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("users are: " + users);
    console.log(JSON.stringify(formData));

    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newUser) => setUsers([...users, newUser]));

    setLoggedInUser(formData);

    setIsLoggedIn(true);

    // after logging the user in, redirect to the home page!
    history.push("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label for="fname">Name:</label><br />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <label for="fname">Address:</label><br />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <br />
      <label for="fname">Email:</label><br />
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <label for="fname">Password:</label><br />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
