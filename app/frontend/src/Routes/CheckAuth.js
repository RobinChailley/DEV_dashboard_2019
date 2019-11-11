import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import config from '../config';

class CheckAuth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
  }

  componentDidMount() {

    console.log("Auth Token : " + localStorage.getItem('authToken'));
    if (localStorage.getItem('authToken') === null) {
      this.setState({token: false});
      return;
    }

    axios.get(config.backURI + "me", {
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({token: true});
          return;
        }
        this.setState({token: false});
      })
      .catch(err => {
        this.setState({token: false});
      });
  }

  render()
  {
    if (this.state.token === null)
      return <div></div>
    else if (this.state.token === this.props.RedirectIf)
      return <Redirect to={this.props.RedirectPath}/>
    else if (this.state.token === !this.props.RedirectIf) {
      return <this.props.Component {...this.props.ComponentProps}/>
    }
  }
}

export default CheckAuth;
