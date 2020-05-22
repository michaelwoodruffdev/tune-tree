import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SigninPage from './views/SigninPage/SigninPage.js';
import LandingPage from './views/LandingPage/LandingPage.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/signin">
          <SigninPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
