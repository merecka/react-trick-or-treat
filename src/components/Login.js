import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import "../css/Signup.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

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

    users.find((user) => {
      if (
        user.name.toLowerCase() === formData.username.toLowerCase() &&
        user.password.toLowerCase() === formData.password.toLowerCase()
      ) {
        setLoggedInUser(user);
        setIsLoggedIn(true);

        // after logging the user in, redirect to the correct page!
        user.host === true ? history.push("/host") : history.push("/viewer");
      } else {
        setLoginFailed(true);
      }
    });
  }

  return (
    <div>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Login</h2>
          </div>
          <div className="row clearfix">
            <div className="">
              <form onSubmit={handleSubmit} id="signup">
                <div className="input_field">
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faUser} size="1x" />
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Name"
                    value={formData.username.toString()}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faLock} size="1x" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password.toString()}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  id="submit_button"
                  className="submit_button"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {loginFailed ? (
        <h3>Incorrect username or password. Please try again.</h3>
      ) : null}
      <h2>No Account?</h2>
      <Link to="/signup">Sign Up!</Link>
    </div>
  );
}

export default Login;
