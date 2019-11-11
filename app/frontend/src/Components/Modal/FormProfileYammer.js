import React from 'react';
import { Form } from 'react-bootstrap';
import Switch from "react-switch";

class FormProfileYammer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.profilePicture === "true" : false,
      name: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.name === "true" : false,
      networkName: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.networkName === "true" : false,
      information: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.information === "true" : false
    };
    this.handleChangeProfilePicture = this.handleChangeProfilePicture.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNetworkName = this.handleChangeNetworkName.bind(this);
    this.handleChangeInformation = this.handleChangeInformation.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getParams() {
    return "profilePicture=" + this.state.profilePicture + "&name=" + this.state.name + "&networkName=" + this.state.networkName + "&information=" + this.state.information;
  }

  handleChangeProfilePicture(profilePicture) {
    this.setState({profilePicture: profilePicture});
  }

  handleChangeName(name) {
    this.setState({name: name});
  } 

  handleChangeNetworkName(networkName) {
    this.setState({networkName: networkName});
  }

  handleChangeInformation(information) {
    this.setState({information: information});
  }

  render() {
    return (
      <Form>
        <label>
          <span>Photo de profile</span>
          <Switch  checked={this.state.profilePicture} onChange={this.handleChangeProfilePicture} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
        <label style={{marginLeft: '40px'}}>
          <span>Nom Prénom</span>
          <Switch  checked={this.state.name} onChange={this.handleChangeName} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
        <label style={{marginLeft: '40px'}}>
          <span>Nom du réseau</span>
          <Switch  checked={this.state.networkName} onChange={this.handleChangeNetworkName} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
        <label style={{marginLeft: '40px'}}>
          <span>Informations</span>
          <Switch  checked={this.state.information} onChange={this.handleChangeInformation} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
      </Form>
      )
  }
}

export default FormProfileYammer;