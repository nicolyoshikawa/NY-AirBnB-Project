// users

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disableSignUpButton, setDisableSignUpButton] = useState([]);

    useEffect(() => {
        const errors = {};
        const disableButton = [];
        if (email && !email.includes("@")) errors["email"] = ("Invalid email");
        if(!email) disableButton.push("email");
        if (username && username.length < 4) errors["username"] = ("Please provide a username with at least 4 characters.");
        if(!username) disableButton.push("username");
        if(!firstName) disableButton.push("firstName");
        if(!lastName) disableButton.push("lastName");
        if (password && password.length < 6) errors["password"] = ("Password must be 6 characters or more.");
        if(!password) disableButton.push("password");
        if (password !== confirmPassword) errors["confirmPassword"] = ("Confirm Password field must be the same as the Password field");
        if(!confirmPassword) disableButton.push("confirmPassword");
        setErrors(errors);
        setDisableSignUpButton(disableButton);
    }, [email, username, firstName, lastName, password, confirmPassword]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label>
            Email:
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </label>
        </div>
        {errors.email && <p className="errors">{errors.email}</p>}
        <div>
            <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </label>
        </div>
        {errors.username && <p className="errors">{errors.username}</p>}
        <div>
            <label>
            First Name:
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            </label>
        </div>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <div>
            <label>
            Last Name:
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            </label>
        </div>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <div>
            <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </label>
        </div>
        {errors.password && <p className="errors">{errors.password}</p>}
        <div>
            <label>
            Confirm Password:
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            </label>
        </div>
        <div>{errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}</div>
        <div>
            {errors.length > 0 && errors.map(el => (
                <div key={el} className="errors">{el}</div>
            ))}
        </div>
        <button type="submit" disabled={disableSignUpButton.length > 0}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
