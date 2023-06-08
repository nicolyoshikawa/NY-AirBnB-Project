// session

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DemoUser from "./DemoUser";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const loggedInUser = await dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) {
            setErrors(data.message);
        };
        setCredential("");
        setPassword("");
      }
    )
    if (loggedInUser) {
      history.push("/");
    };
  };

  return (
    <>
    {errors.length > 0 && <p className="errors">The provided credentials were invalid.</p>}
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
            <label>Username or Email</label>
            <div>
              <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
              />
            </div>
        </div>
        <div>
            <label>Password</label>
            <div>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
        </div>
        <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <div><DemoUser/></div>
      </form>
    </>
  );
}

export default LoginFormPage;
