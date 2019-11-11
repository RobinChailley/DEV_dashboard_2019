import React from 'react';
import { Form } from 'react-bootstrap';
import Switch from "react-switch";

class FormProfileEpitech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedPhoto: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.checkedPhoto === "true": false,
      checkedGpa: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.checkedGpa === "true": false,
      checkedNetsoul: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.checkedNetsoul === "true": false,
      option: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.option : "year"
    };
    this.handleChangePhoto = this.handleChangePhoto.bind(this);
    this.handleChangeGpa = this.handleChangeGpa.bind(this);
    this.handleChangeNetsoul = this.handleChangeNetsoul.bind(this);
    this.onChangeOption = this.onChangeOption.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getParams() {
    return "checkedPhoto=" + this.state.checkedPhoto + "&" +
           "checkedGpa=" + this.state.checkedGpa + "&" + 
           "checkedNetsoul=" + this.state.checkedNetsoul + "&" +
           "option=" + this.state.option;
  }

  onChangeOption(event) {
    this.setState({
      option: event.target.value
    });
  }

  handleChangePhoto(checkedPhoto ) {
    this.setState({ checkedPhoto });
  }

  handleChangeGpa(checkedGpa ) {
    this.setState({ checkedGpa });
  }

  handleChangeNetsoul(checkedNetsoul ) {
    this.setState({ checkedNetsoul });
  }
 

  render() {

    return (
      <Form>
        <label>
          <span>Photo de profile</span>
          <Switch  checked={this.state.checkedPhoto} onChange={this.handleChangePhoto} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
        <Form.Group controlId="profileEpitech.Scolarité">
          <Form.Label>Scolarité</Form.Label>
          <Form.Control defaultValue={this.state.option} onChange={this.onChangeOption} as="select">
            <option value={"year"}>Année</option>
            <option value={"promo"}>Promotion</option>
            <option value={"parcours"}>Parcours</option>
          </Form.Control>
        </Form.Group>
        <label>
          <span>GPA</span>
          <Switch  checked={this.state.checkedGpa} onChange={this.handleChangeGpa} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
        <label style={{marginLeft: '30px'}}>
          <span>Moyenne Netsoul pour la dernière semaine</span>
          <Switch  checked={this.state.checkedNetsoul} onChange={this.handleChangeNetsoul} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
      </Form>
      )
  }
}

export default FormProfileEpitech;