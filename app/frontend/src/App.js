import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Pages/Home/Home'
import Signin from './Pages/SignIn/SignIn'
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import CallbackGithub from './Pages/CallbackGithub';
import CallbackLinkedin from './Pages/CallbackLinkedin';
import CallbackLinkedin2 from './Pages/CallbackLinkedin2';
import CallbackYammer from './Pages/CallbackYammer';

import 'bootstrap/dist/css/bootstrap.min.css';

class Handle404 extends React.Component {
  render() {
    return (
      <div>404 ERROR NOT FOUND</div>
    )
  }
}

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute exact path="/signin" component={Signin} />
          <PrivateRoute exact path="/callbackgithub" component={CallbackGithub} />
          <PrivateRoute exact path="/callbacklinkedin" component={CallbackLinkedin} />
          <PrivateRoute exact path="/callbacklinkedin_accesstoken" component={CallbackLinkedin2} />
          <PrivateRoute exact path="/callbackyammer" component={CallbackYammer} />
          <Route path="*" component={Handle404}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
