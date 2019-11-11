import React from 'react';
import { Form } from 'react-bootstrap';
import Switch from "react-switch";

class FormProfileGithub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      avatar_url: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.avatar_url === "true" : false,
      name: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.name === "true" : false,
      login: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.login === "true" : false,
      repository: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.repository === "true" : false,
    };
    this.handleChangePhoto = this.handleChangePhoto.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangeRepository = this.handleChangeRepository.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getParams() {
    return "avatar_url=" + this.state.avatar_url + "&name=" + this.state.name + "&login=" + this.state.login + "&repository=" + this.state.repository + "&option=followers";
  }

  handleChangePhoto(avatar_url) {
    this.setState({avatar_url: avatar_url});
  }

  handleChangeName(name) {
    this.setState({ name: name});
  }

  handleChangeUserName(login) {
    this.setState({login: login});
  }

  handleChangeRepository(repository) {
    this.setState({repository: repository});
  }

  render(){
    return (
      <Form>
       <label>
          <span>Photo de profile</span>
          <Switch  checked={this.state.avatar_url} onChange={this.handleChangePhoto} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
        <label>
          <span style={{marginTop: '15px'}}>Votre nom</span>
          <Switch  checked={this.state.name} onChange={this.handleChangeName} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
        <label style={{marginLeft: '10px'}}>
          <span>Votre identifiant</span>
          <Switch  checked={this.state.login} onChange={this.handleChangeUserName} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
        <label style={{display: 'block', marginTop:'15px', marginBottom: '15px'}}>
          <span>Afficher vos derniers répertoires</span>
          <Switch  checked={this.state.repository} onChange={this.handleChangeRepository} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
      </Form>
      )
  }
}

export default FormProfileGithub;