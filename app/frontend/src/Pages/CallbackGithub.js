import React from 'react';
import axios from 'axios';
import config from '../config';

class CallbackGithub extends React.Component {

  componentDidMount() {
    this.code = "";
    let href = window.location.href;
    this.code += href.substring(href.indexOf('code=') + 'code='.length, href.indexOf("&"));

    axios
      .post(config.backURI + "accessTokenGithub", {
        code: this.code
      }, {
        headers: {
          "x-access-token": localStorage.getItem('authToken')
        }
      })
      .then(res => {
        console.log(res)
        this.props.history.push('/home');
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
      });
  }

  render() {
    return (
      <div>
        wait ...
      </div>
    );
  }
}

export default CallbackGithub;
