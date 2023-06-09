import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormPage/LoginFormModal';
import SignupFormModal from '../SignupFormPage/SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };
  const manageSpots = () => {
    closeMenu();
    history.push("/spots/current");
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="dropdown">
        <i className="fa-solid fa-bars profile"/>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>

        {user ? (
          <div className="dropdown-content">
              <li className="loggedIn">Hello, {user.firstName}</li>
              <li className="loggedIn">{user.email}</li>
              <div className="bottonBorder"></div>
              <li  className="loggedIn">
                <button onClick={manageSpots}>Manage Spots</button>
              </li>
              <div className="bottonBorder"></div>
              <li className="logout">
                <button onClick={logout} className="logoutButton">Log Out</button>
              </li>
          </div>
        ) : (
          <div className="dropdown-content">
            <div>
              <SignupFormModal onButtonClick={closeMenu}/>
            </div>
            <div>
              <LoginFormModal onButtonClick={closeMenu}/>
            </div>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
