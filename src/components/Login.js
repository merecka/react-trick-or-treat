import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

function Login({ setIsLoggedIn, users }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setLoggedInUser } = useContext(UserContext);
  const [loginFailed, setLoginFailed] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    users.find(user => {
      if (user.name.toLowerCase() === formData.username.toLowerCase() && user.password.toLowerCase() === formData.password.toLowerCase()) {
        setLoggedInUser(user);
        setIsLoggedIn(true);
    
        // after logging the user in, redirect to the home page!
        history.push("/");
      } else {
        setLoginFailed(true);
      }

    })


  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label for="fname">Username:</label><br />
        <input
          type="text"
          name="username"
          value={formData.username.toString()}
          onChange={handleChange}
        />
        <label for="fname">Password:</label><br />
        <input
          type="password"
          name="password"
          value={formData.password.toString()}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {loginFailed ? <h3>Incorrect username or password.  Please try again.</h3> : null}
      <h2>No Account?</h2>
      <Link to="/signup">Sign Up!</Link>
    </div>
  );
}

export default Login;
