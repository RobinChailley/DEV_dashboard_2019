//NPM MODULES
import React from 'react';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

//CSS
import './Header.css'

//MY COMPONENTS
import ProfileNav from '../ProfileNav/ProfileNav';
import CustomModal from "../../Components/Modal/CustomModal";
import FormInformationEpitech from "../../Components/Modal/FormInformationEpitech";
import FormModuleEpitech from "../../Components/Modal/FormModuleEpitech";
import FormNotificationEpitech from "../../Components/Modal/FormNotificationEpitech";
import FormPosteLinkedin from "../../Components/Modal/FormPosteLinkedin";
import FormProfileEpitech from "../../Components/Modal/FormProfileEpitech";
import FormProfileLinkedin from "../../Components/Modal/FormProfileLinkedin";
import FormProfileGithub from "../../Components/Modal/FormProfileGithub";
import FormRepositoryGithub from "../../Components/Modal/FormRepositoryGithub";
import FormGroupYammer from "../../Components/Modal/FormGroupYammer";
import FormMailBoxYammer from "../../Components/Modal/FormMailBoxYammer";
import FormProfileYammer from "../../Components/Modal/FormProfileYammer";

class Header extends React.Component {

  render() {

    const linksNav = [
      {type: "profileEpitech", service: "autologinEpitech", titleModal: "Profile Epitech", title: "Epitech - Profile", comp: <FormProfileEpitech onRef={() => {}}/>, divider: false},
      {type: "informationEpitech", service: "autologinEpitech", titleModal: "Informations Epitech", title: "Epitech - Informations", comp: <FormInformationEpitech onRef={() => {}}/>, divider: false},
      {type: "notificationsEpitech", service: "autologinEpitech", titleModal: "Notifications Epitech", title: "Epitech - Notifications", comp: <FormNotificationEpitech onRef={() => {}}/>, divider: false},
      {type: "moduleEpitech", service: "autologinEpitech", titleModal: "Module Epitech", title: "Epitech - Module", comp: <FormModuleEpitech onRef={() => {}}/>, divider: true},
      {type: "profileLinkedin", service: "linkedinToken", titleModal: "Profile Linkedin", title: "Linkedin - Profil", comp: <FormProfileLinkedin onRef={() => {}}/>, divider: false},
      {type: "posteLinkedin", service: "linkedinToken", titleModal: "Postes Linkedin", title: "Linkedin - Posts", comp: <FormPosteLinkedin onRef={() => {}}/>, divider: true},
      {type: "profileGithub", service: "githubToken", titleModal: "Profile Github", title: "Github - Profil", comp: <FormProfileGithub onRef={() => {}}/>, divider: false},
      {type: "repositoryGithub", service:"githubToken", titleModal: "Répertoire Github", title: "Github - Répertoire", comp: <FormRepositoryGithub onRef={() => {}}/>, divider: true},
      {type: "groupYammer", service:"yammerToken", titleModal: "Group Yammer", title: "Yammer - Group", comp: <FormGroupYammer onRef={() => {}}/>, divider: false},
      {type: "mailBoxYammer", service:"yammerToken", titleModal: "Boîte de réception Yammer", title: "Yammer - Boîte de réception", comp: <FormMailBoxYammer onRef={() => {}}/>, divider: false},
      {type: "profileYammer", service:"yammerToken", titleModal: "Profile Yammer", title: "Yammer - Profile", comp: <FormProfileYammer onRef={() => {}}/>, divider: false}
    ];

    return (
        <Navbar expand="lg">
          <Navbar.Brand href=""><img alt="alt" className="img-dark" src={require('../../Assets/Icons/ic_dashboard.svg')}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link className="navLink" href="">Accueil</Nav.Link>
                <NavDropdown className="navLink" title="Ajouter un widget" id="basic-nav-dropdown">
                  {
                    linksNav.map((e,i) => {
                      return (
                        <div key={e.titleModal}>
                          <NavDropdown.Item>
                            <CustomModal service={e.service} onWidgetCreated={this.props.onWidgetCreated} type={e.type} mode={"create"} form={e.comp} titleModal={e.titleModal} title={e.title} deleteWidget={() => {}} item={{}}/>
                          </NavDropdown.Item>
                          {e.divider === true && <NavDropdown.Divider />}
                        </div>
                      );
                    })
                  }
                </NavDropdown>
              <Nav.Link className="navLink">Paramètres</Nav.Link>
            </Nav>
            <ProfileNav />
          </Navbar.Collapse>
        </Navbar>
    )
  }
}

/*
 * Describe the type and some options of each props of this component
 */
Header.propTypes = {
  onWidgetCreated: PropTypes.func.isRequired
};


export default Header;
