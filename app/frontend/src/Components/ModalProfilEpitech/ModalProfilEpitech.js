//NODE MODULES
import React from 'react';
import { Button, Modal, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

//CSS
import './ModalProfilEpitech.css'

//MY COMPONENTS
import FormProfileEpitech from './FormProfileEpitech'

class ModalProfilEpitech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      connected: false
    }
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  // DrawModeFooter() {
  //   if (this.props.mode == "create" && this.state.connected == false) {
  //     return (<div>
  //       <Button variant="secondary" onClick={this.hideModal}>Fermer</Button>
  //       <Button variant="primary" onClick={this.hideModal} disabled>Créer le widget</Button>
  //     </div>);
  //   } else if (this.props.mode == "create" && this.state.connected == true) {
  //     console.log("Je suis ici")
  //     return (<div>
  //         <Button variant="secondary" onClick={this.hideModal}>Fermer</Button>
  //         <Button variant="primary" onClick={this.hideModal}>Créegit logr le widget</Button>
  //       </div>);
  //   } else {
  //     return (<Button variant="outline-danger" onClick={this.hideModal}>Supprimer</Button>);
  //   }
  // }

  render() {

    const DrawModeFooter = () => {
      console.log(this.props.mode);
      console.log(this.state.connected);

      if (this.props.mode == "create" && this.state.connected == false) {
        return (<div>
          <Button variant="secondary" onClick={this.hideModal}>Fermer</Button>
          <Button variant="primary" onClick={this.hideModal} disabled>Créer le widget</Button>
        </div>);
      } else if (this.props.mode == "create" && this.state.connected == true) {
        return (<div>
            <Button variant="secondary" onClick={this.hideModal}>Fermer</Button>
            <Button variant="primary" onClick={this.hideModal}>Créer le widget</Button>
          </div>);
      } else {
        return (<Button variant="outline-danger" onClick={this.hideModal}>Supprimer</Button>);
      }

    }

    return (
      <div>
        {this.props.mode == "create" && <p onClick={this.showModal}>Profile Epitech</p> }
        {this.props.mode == "edit" &&
          <Image style={{marginTop: '15px', cursor: 'pointer'}} src={require("../../Assets/Icons/ic_edit_widget.svg")} onClick={this.showModal}/>
        }
        <Modal show={this.state.show} onHide={this.hideModal} backdrop={true}>
          <Modal.Header>
            <Modal.Title>Création du widget Profile Epitech</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.connected === false && <p>Veuillez vous connecter svp</p>}
            {this.state.connected === true && <FormProfileEpitech />}
          </Modal.Body>
          <Modal.Footer>
            <DrawModeFooter/>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalProfilEpitech;

ModalProfilEpitech.propTypes = {
  mode: PropTypes.string.isRequired
}