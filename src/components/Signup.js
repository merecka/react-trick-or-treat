import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import "../css/Signup.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faHouse,
  faCity,
  faLandmarkFlag,
} from "@fortawesome/free-solid-svg-icons";

function Signup({ setIsLoggedIn, users, setUsers }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const form = document.getElementById("signup");
  const submit_button = document.getElementById("submit_button");

  function handleChange(e) {
    if (
      form.elements["password"].value === "" ||
      form.elements["password_retype"].value === "" ||
      form.elements["password"].value !== form.elements["password_retype"].value
    ) {
      setPasswordsMatch(false);
      submit_button.disabled = true;
    } else {
      setPasswordsMatch(true);
      submit_button.disabled = false;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      address:
        formData.street +
        " " +
        formData.city +
        ", " +
        formData.state +
        " " +
        formData.zipcode,
      lat: null,
      lng: null,
      starttime: null,
      endtime: null,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(
      `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSSTACK_API_KEY}&query=${formData.address}`
    )
      .then((r) => r.json())
      .then((coords) => {
        formData.lat = coords.data[0].latitude;
        formData.lng = coords.data[0].longitude;
      })
      .catch((error) => {
        console.log(error);
      });

    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        setLoggedInUser(newUser);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoggedIn(true);

    // after logging the user in, redirect to the correct page!
    if (loggedInUser.host === true) {
      history.push("/host");
    } else {
      history.push("/viewer");
    }
  }

  return (
    <div className="form_wrapper">
      <div className="form_container">
        <div className="title_container">
          <h2>Sign Up</h2>
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
                  name="name"
                  placeholder="Name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_field">
                {" "}
                <span>
                  <FontAwesomeIcon icon={faEnvelope} size="1x" />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_field">
                {" "}
                <span>
                  <FontAwesomeIcon icon={faHouse} size="1x" />
                </span>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_field">
                {" "}
                <span>
                  <FontAwesomeIcon icon={faCity} size="1x" />
                </span>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row clearfix">
                <div className="col_half">
                  <div className="input_field">
                    {" "}
                    <span>
                      <FontAwesomeIcon icon={faLandmarkFlag} size="1x" />
                    </span>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col_half">
                  <div className="input_field">
                    {" "}
                    <span>
                      <FontAwesomeIcon icon={faHouse} size="1x" />
                    </span>
                    <input
                      type="text"
                      name="zipcode"
                      placeholder="Zip Code"
                      value={formData.zipcode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
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
                  value={formData.password}
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
                  name="password_retype"
                  placeholder="Re-type Password"
                  required
                />
              </div>
              <div className="input_field radio_option">
                <input
                  type="radio"
                  name="host"
                  id="rd1"
                  value={false}
                  onChange={handleChange}
                  required
                />
                <label for="rd1">Non-Host</label>
                <input
                  type="radio"
                  name="host"
                  id="rd2"
                  value={true}
                  onChange={handleChange}
                  required
                />
                <label for="rd2">Host</label>
              </div>
              <button
                id="submit_button"
                className="submit_button"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
        {passwordsMatch ? null : (
          <span id="password_error" className="passwordError">
            Passwords do not match. Please try again.
          </span>
        )}
      </div>
    </div>
  );
}

export default Signup;
