import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SigninPage from './views/SigninPage/SigninPage';
import SignupPage from './views/SignupPage/SignupPage';
import LandingPage from './views/LandingPage/LandingPage';
import Dashboard from './views/Dashboard/Dashboard';

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
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
