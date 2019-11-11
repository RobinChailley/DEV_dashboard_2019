import React from 'react';
import { Route } from 'react-router-dom';
import CheckAuth from './CheckAuth';

const PublicRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render = {props =>
      <CheckAuth
        RedirectPath="/home"
        RedirectIf={true}
        Component={Component}
        ComponentProps={props}
      />
    }
  />
);

export default PublicRoute;