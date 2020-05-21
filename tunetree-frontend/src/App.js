import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SigninPage from './SigninPage/SigninPage.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin">
          <SigninPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
