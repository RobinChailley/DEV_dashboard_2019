import React from 'react';
import config from '../config';
import axios from 'axios';

class CallbackYammer extends React.Component {

  componentDidMount() {
    let href = window.location.href;
    let accessToken = href.substring(href.indexOf("access_token=") + "access_token=".length);
    axios
      .post(config.backURI + "setYammerToken", {
        token: accessToken
      }, {
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });

    this.props.history.push('/home');
  }

  render() {
    return (
      <div>Wait ...</div>
    )
  }
}

export default CallbackYammer;