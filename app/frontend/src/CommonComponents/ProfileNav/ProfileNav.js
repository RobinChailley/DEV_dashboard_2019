//NODE MODULES
import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

//CSS
import './ProfileNav.css'

class ProfileNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goToLogin: false
        };
        this.handleClick = this.handleClick.bind(this);
      }

    handleClick() {
        this.setState({goToLogin: true});
        localStorage.removeItem("authToken");
    }

    renderRedirect = () => {
        if (this.state.goToLogin) {
          return <Redirect to='/' />
        }
    }

    render() {
        return(
            <div>
                {this.renderRedirect()}
                <Row>
                <Button variant="outline-primary" onClick={this.handleClick}>Se déconnecter</Button>
                <Col lg={3}>
                    <Image style={{width: '45px'}} src={require('../../Assets/Images/placeholder-account.png')} roundedCircle/>
                </Col>
                </Row>
            </div>
        )
    }
}

export default ProfileNav;