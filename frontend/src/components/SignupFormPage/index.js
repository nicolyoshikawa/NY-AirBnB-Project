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
  const [disableSignUpButton, setDisableSignUpButton] = useState(true);

    useEffect(() => {
        const errors = {};
        if (email && !email.includes("@")) errors["email"] = ("Invalid email");
        if (username && username.length < 4) errors["username"] = ("Please provide a username with at least 4 characters.");
        if (password && password.length < 6) errors["password"] = ("Password must be 6 characters or more.");
        if (password !== confirmPassword) errors["confirmPassword"] = ("Confirm Password field must be the same as the Password field");
        if(!email || !username || !firstName || !lastName || !password || !confirmPassword || Object.values(errors).length > 0) {
          setDisableSignUpButton(true)
        } else {
          setDisableSignUpButton(false)
        }
        setErrors(errors);
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
            {errors.length > 0 && errors.map(el => (
                <div key={el} className="errors">{el}</div>
            ))}
        </div>
        <div>
            <label>
            First Name
              <div>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
              </div>
            </label>
        </div>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <div>
            <label>
            Last Name
              <div>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
              </div>
            </label>
        </div>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <div>
          <label>
          Email
            <div>
              <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
          </label>
        </div>
        {errors.email && <p className="errors">{errors.email}</p>}
        <div>
            <label>
            Username
              <div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
              </div>
            </label>
        </div>
        {errors.username && <p className="errors">{errors.username}</p>}
        <div>
            <label>
            Password
              <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </div>
            </label>
        </div>
        {errors.password && <p className="errors">{errors.password}</p>}
        <div>
            <label>
            Confirm Password
              <div>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
              </div>
            </label>
        </div>
        <div>{errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}</div>
        <button type="submit" disabled={disableSignUpButton}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
