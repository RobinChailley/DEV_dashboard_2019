//NPM MODULES
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from "../../config";
import LinkedIn from 'react-linkedin-login-oauth2';
import {Row, Col} from 'react-bootstrap'

class CheckAuthToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: "null",
      autologin: ""
    };
    this.signInGithub = this.signInGithub.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.onSubmitEpitech = this.onSubmitEpitech.bind(this);
  }

  signInGithub() {
    let string = "https://github.com/login/oauth/authorize";
    string += "?client_id=fca50a960a6ae9f2a37b&";
    string += "redirect_ui=http://localhost:8080/callbackgithub&";
    string += "login=RobinChailley&"
    string += "state=salutpdlolhihi&";
    string += "allow_signup=false";
    window.location.href = string;
  }

  signInYammer() {
    let string = "https://www.yammer.com/dialog/oauth";
    string += "?client_id=ykHPPgOL01z4sJJA4QuA&";
    string += "redirect_uri=http://localhost:8080/callbackyammer&";
    string += "response_type=token";
    window.location.href = string;
  }

  handleInput(e) {
    this.setState({autologin: e.target.value});
    console.log(this.state.autologin);
  }

  onSubmitEpitech(e) {
    e.preventDefault();
    axios
      .post(config.backURI + "setEpitechAutologin", {
        autologin: this.state.autologin
      }, {
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
      })
      .then(res => {
        this.setState({request: "token"});
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  onFailureLinkedin(response) {
    console.log("Response : " + response);
  }

  onSuccessLinkedin(response) {
    this.setState({request: "token"});
  }


  componentWillMount() {
    console.log("{CheckAuthToken1} service = " + this.props.service);
    axios
    .get(config.backURI + "account",{
      headers: {
        'x-access-token': localStorage.getItem('authToken')
      }
    })
    .then(res => {
      if (res.status === 200) {
        if (typeof res.data.data[this.props.service] == "undefined")
          this.setState({request: "undefined"});
        else
          this.setState({request: "token"});
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    let modal
    if (this.state.request == "token") {
      modal = (<div>{this.props.children}</div>);
    } else if (this.state.request == "undefined") {
      switch(this.props.service) {
        case 'linkedinToken':
          return (modal =
          <Row>
            <Col style={{marginTop: '20px', marginBottom: '20px'}} xs={{offset: '1'}}>
              <p>Veuillez vous connecter pour utiliser le widget</p>
              <LinkedIn
                clientId="770q8w262cpq0v"
                onFailure={(r) => this.onFailureLinkedin(r)}
                onSuccess={(r) => this.onSuccessLinkedin(r)}
                redirectUri={"http://localhost:8080/callbacklinkedin"}
                scope={"r_liteprofile"}
                state={"fdsf78fyds7fm"}
              />
            </Col>
          </Row>)
        case 'autologinEpitech':
          return (modal =
            <Row>
              <Col style={{marginTop: '20px', marginBottom: '20px'}} xs={{offset: '1'}}>
                <p>Veuillez vous connecter pour utiliser le widget</p>
                <form onSubmit={this.onSubmitEpitech}>
                  <label>Intra Epitech</label>
                  <input name="autologin" onChange={this.handleInput} type="text" placeholder="autologin link"/>
                  <input onClick={this.onSubmitEpitech} type="submit"/>
                </form>
              </Col>
            </Row>)
        case 'githubToken':
          return (modal =
          <Row>
            <Col style={{marginTop: '20px', marginBottom: '20px'}} xs={{offset: '1'}}>
              <p>Veuillez vous connecter pour utiliser le widget</p>
              <button onClick={this.signInGithub}>
                Sign in with Github
              </button>
            </Col>
          </Row>)
        case 'yammerToken':
          return (modal = 
            <Row>
              <Col style={{marginTop: '20px', marginBottom: '20px'}} xs={{offset: '1'}}>
                <p>Veuillez vous connecter pour utiliser le widget</p>
                <button onClick={this.signInYammer}>
                  Sign in with Yammer
                </button>
              </Col>
            </Row>)
        default:
          return (modal =
            <p>Connectez vous !</p>)
      }
    }
  
    return(
      <div>
        {modal}
      </div>
    )
  } 
}

export default CheckAuthToken;

CheckAuthToken.propTypes = {
    service: PropTypes.string.isRequired
  };
