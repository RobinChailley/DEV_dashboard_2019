import React from 'react';
import axios from 'axios';
import config from '../config';

class CallbackLinkedin2 extends React.Component {

  componentDidMount() {
    let href = window.location.href;
    let code = href.substring(href.indexOf('code=') + 'code='.length);
    axios
      .post(config.backURI + "accessTokenLinkedin", {
        code: code,
        redirect_uri: "http://localhost:8080/callbacklinkedin_accesstoken"
      }, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.accessToken);
        window.close();
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
      });
  }

  render() {
    return (
      <div>
        Wait ...
      </div>
    );
  }

}

export default CallbackLinkedin2;