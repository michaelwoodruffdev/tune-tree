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
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
