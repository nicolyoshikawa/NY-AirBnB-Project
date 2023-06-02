// session

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import DemoUser from "./DemoUser";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) {
            setErrors(data.message);
        };
        setCredential("");
        setPassword("");
      }
    );
  };

  return (
    <>
    {errors.length > 0 && <p className="errors">The provided credentials were invalid.</p>}
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label>
            Username or Email
            <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
            />
            </label>
        </div>
        <div>
            <label>
            Password
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </label>
        </div>
        <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <div><DemoUser/></div>
      </form>
    </>
  );
}

export default LoginFormPage;
