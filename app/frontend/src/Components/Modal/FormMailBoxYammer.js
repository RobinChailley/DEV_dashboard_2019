import React from 'react';
import { Form } from 'react-bootstrap';
import Switch from 'react-switch';

class FormMailBoxYammer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedTruncate: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.truncate === "true": false,
      numberMessage: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.nbMsg: 5
    };

    this.handleTruncate = this.handleTruncate.bind(this);
    this.onChangeMessageNumber = this.onChangeMessageNumber.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleTruncate(checkedTruncate) {
    this.setState({ checkedTruncate });
  }

  onChangeMessageNumber(event) {
    this.setState({
      numberMessage: event.target.value
    });
  }

  getParams() {
    return "truncate=" + this.state.checkedTruncate + "&" + "nbMsg=" + this.state.numberMessage;
  }

  render() {

    return (
      <Form>
        <label>
          <span>Truncate messages</span>
          <Switch checked={this.state.checkedTruncate} onChange={this.handleTruncate} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={30} uncheckedIcon={false} checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48} className="react-switch" id="material-switch" />
        </label>
        <Form.Group controlId={"yammerMails"}>
          <Form.Label>Nombre de messages affichés</Form.Label>
          <Form.Control defaultValue={this.state.numberMessage} onChange={this.onChangeMessageNumber} as="select">
            <option value={"1"}>1</option>
            <option value={"3"}>3</option>
            <option value={"5"}>5</option>
            <option value={"10"}>10</option>
            <option value={"20"}>20</option>
            <option value={"all"}>Tous</option>
          </Form.Control>
        </Form.Group>
      </Form>
      )
  }
}

export default FormMailBoxYammer;
