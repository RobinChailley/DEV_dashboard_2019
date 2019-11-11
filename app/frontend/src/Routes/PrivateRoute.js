import React from 'react';
import { Route } from 'react-router-dom';
import CheckAuth from './CheckAuth';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render = {props =>
      <CheckAuth
        RedirectPath="/"
        RedirectIf={false}
        Component={Component}
        ComponentProps={props}
      />
    }
  />
);

export default PrivateRoute;