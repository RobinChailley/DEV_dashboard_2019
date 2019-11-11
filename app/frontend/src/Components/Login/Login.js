// NPM MODULES
import React from 'react';
import {Container, Row, Col, Image, Form, Button} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import config from '../../config';

// CSS
import './Login.css';

// COMPONENTS

// MY FILES

class Login extends React.Component {

  /*
   * bind functions, and some things that we can do only in the constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      goToSignIn: false
    }
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
    this.responseGoogleSucess = this.responseGoogleSucess.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  setRedirect() {
    this.setState({goToSignIn: true})
  }

  renderRedirect = () => {
    if (this.state.goToSignIn) {
      return <Redirect to='/signin' />
    }
  }

  /*
   * Call the request when the form is filled
   */
  onSubmitForm(e) {
    e.preventDefault();
    axios.post(config.backURI + 'login',
      {email: this.state.email, password: this.state.password, authType: "basic"}
    )
    .then(res => {
      if (res.status === 200) {
        localStorage.setItem('authToken', res.data.token);
        this.props.history.push('/home');
      }
    })
    .catch(err => {
      console.log(err.response);
    })
  }


  /*
   * Handle each text input with a name on the state
   */
  handleInputText(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  /*
   * Handle the success response of the GoogleLogin component
   */
  responseGoogleSucess(response) {
    axios.post(config.backURI + 'login',
      {email: response.w3.U3, token: response.Zi.access_token, authType: "google"}
    ).then(res => {
      if (res.status === 200) {
        localStorage.setItem('authToken', res.data.token);
        this.props.history.push('/home');
      }
    })
    .catch(err => {
      console.log(err.response);
    });
  }


  /*
   * Handle the failure response of the GoogleLogin component
   */
  responseGoogleFailure(response) {
    console.log("Failure !");
    console.log(response);
  }


  /*
   * Handle the response of the FacebookLogin component
   */
  responseFacebook(response) {
    axios.post(config.backURI + 'login',
    {email: response.email, token: response.accessToken, authType: "facebook"})
    .then(res => {
      if (res.status === 200) {
        localStorage.setItem('authToken', res.data.token);
        this.props.history.push('/home');
      }
    })
    .catch(err => {
    })
  }


  /*
   * Render the component
   */
  render() {
    return (
      <Container fluid className="container-signin">
        {this.renderRedirect()}
        <Image className="logo-signin-dashboard" src={require('../../Assets/Images/dashboard-logo.png')} />
        <Row className="justify-content-center" style={{marginTop: '50px'}}>
              <Col xs={{span: '10'}} lg={{span: '5'}}>
                <h2 className="title-signin dark">Heureux de vous revoir !</h2>
                <p className="slogan-signin">Visualisez et personalisez vos informations en corélation avec votre scolarité. Idéal pour les recruteurs qui ont une vue d'ensemble sur votre profile</p>
              </Col>
            </Row>
            <Row className="justify-content-center container-form-signin">
            <Col lg={{span: '4'}}>
              <Form onSubmit={this.onSubmitForm}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Address Email</Form.Label>
                  <Form.Control onChange={this.handleInputText} name="email" placeholder="Entez votre adresse mail" />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control onChange={this.handleInputText} name="password" type="password" placeholder="Entrez votre mot de passe" />
                  <Button variant="outline-primary" type="submit" className="btn-submit">Se connecter</Button>
                </Form.Group>
                <Row className="justify-content-center">
                <GoogleLogin
                  className="google-login"
                  clientId="1061070202444-4eif8sqjrqoq8gv8qkqtr5531342ca74.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogleSucess}
                  onFailure={this.responseGoogleFailure}
                  theme={"dark"}
                  cookiePolicy={'single_host_origin'} />
                </Row>
                <Row className="justify-content-center">
                  <FacebookLogin
                    className="facebook-login"
                    appId="2367259970195693"
                    fields="name,email,picture"
                    callback={this.responseFacebook} />
                  </Row>
              </Form>
              <a className="go-to-login" onClick={this.setRedirect}>Vous n'êtes pas encore inscrit ?</a>
            </Col>
            </Row>
      </Container>
    )
  }
}


/*
 * Describe the type and some options of each props of this component
 */
Login.propTypes = {
};

export default Login;
