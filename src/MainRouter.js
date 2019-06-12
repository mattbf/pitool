import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import SignIn from './SignIn.js';
import Home from './Home.js';

const auth = false

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function MainRouter(){
  return(
    <Router>
      <h2> Auth: {auth.toString()} </h2>
      <PrivateRoute path='/' exact component={Home}/>
      <Route path='/signin' component={SignIn}/>

    </Router>
  )
}

export default MainRouter
