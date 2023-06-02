import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreateNewSpot from '../Spots/NewSpot';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navbar'>
      <li className="home">
        <NavLink exact to="/" className="home"><i className="fa-solid fa-house"/> Home Sweet Home</NavLink>
      </li>
      {isLoaded && (
        <>
          <li>
            <CreateNewSpot/>
          </li>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;
