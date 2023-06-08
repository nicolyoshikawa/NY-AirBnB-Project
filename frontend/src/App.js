import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Spots from "./components/Spots";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotDetails from "./components/Spots/SpotDetails.js";
import CreateNewSpot from "./components/Spots/CreateNewSpot.js";
import ManageSpots from "./components/Spots/ManageSpots.js";
import UpdateSpotForm from "./components/Spots/UpdateSpotForm.js";
import './index.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/session">
            <LoginFormPage/>
          </Route>
          <Route path="/users">
            <SignupFormPage/>
          </Route>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route path="/spots/new">
            <CreateNewSpot />
          </Route>
          <Route path="/spots/current">
            <ManageSpots />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <UpdateSpotForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetails/>
          </Route>
          <Route>
              <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
