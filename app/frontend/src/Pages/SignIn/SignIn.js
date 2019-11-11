//NODES MODULES
import React from 'react';
import {Container, Row, Col, Image, Form, Button} from 'react-bootstrap';

//CSS
import './SignIn.css'

//MY COMPONENTS
import {Redirect} from 'react-router-dom';
import RequestSignin from '../../Requests/Signin/Signin';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      confirmPassword: null,
      goToLogIn: false
    }
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  handleChangeInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    let regexMail = /\S+@\S+\.\S+/;

    if (this.state.email == null || this.state.password == null || this.state.confirmPassword == null) {
      alert("Veuillez remplir tous les champs")
      return;
    }

    if (!regexMail.test(this.state.email)) {
      alert("Format adresse mail invalide")
      return;
    }

    if (this.state.password != this.state.confirmPassword) {
      alert("Confirmation du mot de passe incorecte");
      return;
    }
    RequestSignin(this.state.email, this.state.password, res => {
      console.log("Inscription: OK");
      this.setRedirect();
    }, err => {
      console.log(err);
    })
    event.preventDefault();
  }

  setRedirect() {
    this.setState({goToLogIn: true})
  }

  renderRedirect = () => {
    if (this.state.goToLogIn) {
      return <Redirect to='/login' />
    }
  }

  render() {
    return(
      <Container fluid className="container-signin">
        {this.renderRedirect()}
        <Image className="logo-signin-dashboard" src={require('../../Assets/Images/dashboard-logo.png')} />
        <Row className="justify-content-center" style={{marginTop: '50px'}}>
          <Col xs={{span: '10'}} lg={{span: '5'}}>
            <h2 className="title-signin dark">Inscrivez-vous gratuitement</h2>
            <p className="slogan-signin">Visualisez et personalisez vos informations en corélation avec votre scolarité. Idéal pour les recruteurs qui ont une vue d'ensemble sur votre profile</p>
          </Col>
        </Row>
        <Row className="justify-content-center container-form-signin">
          <Col lg={{span: '4'}}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Address Email</Form.Label>
                <Form.Control value={this.state.email} onChange={this.handleChangeInput} name="email" placeholder="Entez votre adresse mail" />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control value={this.state.password} onChange={this.handleChangeInput} name="password" type="password" placeholder="Entrez votre mot de passe" />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirmation du mot de passe</Form.Label>
                <Form.Control value={this.state.confirmPassword} onChange={this.handleChangeInput} name="confirmPassword" type="password" placeholder="Confirmez votre mot de passe" />
                <Button variant="outline-primary" type="submit" className="btn-submit">S'inscrire</Button>
              </Form.Group>
            </Form>
            <a className="go-to-login" onClick={this.setRedirect}>Vous avez déjà un compte ?</a>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SignIn;