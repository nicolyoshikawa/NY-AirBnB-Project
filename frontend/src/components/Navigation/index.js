import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navbar'>
      <li className="home">
        <NavLink exact to="/" className="home logo"><i className="fa-solid fa-house"/> Home Sweet Home</NavLink>
      </li>

      {/* {isLoaded && sessionUser &&(
        <li>
          <NavLink exact to="/spots/new" className="createSpot">Create a new spot</NavLink>
        </li>
      )} */}
      {isLoaded && (
        <>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </>
      )}
       {isLoaded && sessionUser &&(
        <li>
          <NavLink exact to="/spots/new" className="createSpot">Create a new spot</NavLink>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
