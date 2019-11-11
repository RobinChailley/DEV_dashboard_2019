import React from 'react';
import { Form } from 'react-bootstrap';
import Switch from "react-switch";

class FormProfileLinkedin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.profilePicture === "true" : false,
      name: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.name === "true" : false,
      country: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.country === "true" : false,
    };
    this.handleChangeProfilePicture = this.handleChangeProfilePicture.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getParams() {
    return "profilePicture=" + this.state.profilePicture + "&name=" + this.state.name + "&country=" + this.state.country;
  }

  handleChangeProfilePicture(profilePicture) {
    this.setState({profilePicture: profilePicture});
  }

  handleChangeName(name) {
    this.setState({name: name});
  }

  handleChangeCountry(country) {
    this.setState({country: country});
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
          <span>Pays</span>
          <Switch  checked={this.state.country} onChange={this.handleChangeCountry} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
      </Form>
      )
  }
}

export default FormProfileLinkedin;