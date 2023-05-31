import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <li className="profile">
  //       <ProfileButton user={sessionUser}/>
  //     </li>
  //   );
  // } else {
  //   sessionLinks = (
  //     <li>
  //       <NavLink to="/session" className="profile">Log In</NavLink>
  //       <NavLink to="/users" className="profile">Sign Up</NavLink>
  //     </li>
  //   );
  // }

  return (
    <ul className='navbar'>
      <li className="home">
        <NavLink exact to="/" className="home"><i className="fa-solid fa-house"> Home Sweet Home</i></NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
