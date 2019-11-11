//NODE MODULES
import React from 'react';
import {Button, Modal, Image, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import createWidget from '../../Requests/WidgetsManagement/CreateWidget';
import updateWidget from '../../Requests/WidgetsManagement/UpdateWidget';
import CheckAuthToken from './CheckAuthToken';

//MY COMPONENTS

class CustomModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showNormal: false,
      showSuccess: false,
      showError: false,
      timer: (this.props.item && this.props.item.timer) ? this.props.item.timer : "5"
    };
    this.createWidget = this.createWidget.bind(this);
    this.timerData = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  }


  showNormalModal = () => {
    this.setState({
      showNormal: true,
      showSuccess: false,
      showError: false
    });
  };


  hideModal = () => {
    this.setState({
      showNormal: false,
      showSuccess: false,
      showError: false
    });
  };


  showSuccessModal = () => {
    this.setState({
      showNormal: false,
      showSuccess: true,
      showError: false
    });
  };


  showErrorModal = () => {
    this.setState({
      showNormal: false,
      showSuccess: false,
      showError: true
    });
  };


  localDeleteWidget = () => {
    this.props.deleteWidget(this.props.item.id);
    this.hideModal();
  };


  onTimerChange = (event) => {
    this.setState({timer: event.target.value});
  };


  createWidget() {
    if (!this.child.__proto__) {
      console.log("Ici1");
      this.showErrorModal();
    }

    if (this.props.mode === "create") {
      console.log("Ici2");
      createWidget(this.props.type, this.state.timer, this.child.getParams(), res => {
        if (res.status === 200) {
          this.showSuccessModal();
          this.props.onWidgetCreated();
          this.props.test();
        } else {
          //this.showErrorModal();
        }
      }, err => {
        //this.showErrorModal();
      });
    } else if (this.props.mode === "edit") {
      console.log("Ici3");
      updateWidget(this.props.item.id, this.state.timer, this.child.getParams(), res => {
        this.showSuccessModal();
        this.props.onWidgetCreated();
        this.props.test();
      }, err => {
        //this.showErrorModal();
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.mode === "create" && <p onClick={this.showNormalModal}>{this.props.title}</p> }
        {this.props.mode === "edit" &&
          <Image style={{marginTop: '15px', cursor: 'pointer'}} src={require("../../Assets/Icons/ic_edit_widget.svg")} onClick={this.showNormalModal}/>
        }

        {/*Modal with form*/}
        <Modal show={this.state.showNormal} onHide={this.hideModal} backdrop={true}>
          <Modal.Header>
            <Modal.Title>{this.props.titleModal}</Modal.Title>
          </Modal.Header>
          <CheckAuthToken ref={this.CheckAuthToken} service={this.props.service}>
          <Modal.Body>
            {React.cloneElement(this.props.form, {mode: this.props.mode, item: this.props.item, onRef: ref => (this.child = ref)})}
            <Form.Group style={{width: '30%'}} controlId="exampleForm.ControlSelect1">
              <Form.Label>Time refresh widget (mn)</Form.Label>
              <Form.Control defaultValue={this.state.timer} onChange={this.onTimerChange} as="select">
                {this.timerData.map((e) => {
                  return <option key={e}>{e}</option>
                })}
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          </CheckAuthToken>
          <Modal.Footer>
          {this.props.mode === "create" && <Button variant="secondary" onClick={this.hideModal}>Fermer</Button>}
          {this.props.mode === "edit" && <Button variant="outline-danger" onClick={this.localDeleteWidget}>Supprimer</Button>}
          <Button variant="primary" onClick={this.createWidget}>{this.props.mode === "create" ? "Créer le widget" : "Mettre à jour le widget"}</Button>
          </Modal.Footer>
        </Modal>

        {/*Success*/}
        <Modal show={this.state.showSuccess} onHide={this.hideModal} backdrop={true}>
          <Modal.Header>
            <Modal.Title>Widget successfully {this.props.mode === "create" ? "created" : "updated"}! </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="success" onClick={this.hideModal}>Fermer</Button>
          </Modal.Footer>
        </Modal>

        {/*Failure*/}
        <Modal show={this.state.showError} onHide={this.hideModal} backdrop={true}>
          <Modal.Header>
            <Modal.Title>Widget can not be {this.props.mode === "create" ? "created" : "updated"}!</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={this.hideModal}>Fermer</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CustomModal.propTypes = {
  service: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  form: PropTypes.any.isRequired,
  titleModal: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  deleteWidget: PropTypes.func.isRequired,
  onWidgetCreated: PropTypes.func.isRequired
};

export default CustomModal;
