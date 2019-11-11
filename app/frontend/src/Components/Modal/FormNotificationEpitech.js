import React from 'react';
import { Form } from 'react-bootstrap';

class FormNotificationEpitech extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      option: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.option : "missed"
    };
    this.onChangeOption = this.onChangeOption.bind(this);
  }

  onChangeOption(event) {
    this.setState({option: event.target.value});
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getParams() {
    return "option=" + this.state.option;
  }

  render(){
    return (
      <Form>
        <Form.Group controlId="notificationEpitech">
          <Form.Label>Afficher les notifications</Form.Label>
          <Form.Control defaultValue={this.state.option} onChange={this.onChangeOption} as="select">
            <option value={"missed"}>Derniers absences</option>
            <option value={"message"}>Messages</option>
            <option value={"alert"}>Alertes</option>
          </Form.Control>
        </Form.Group>
      </Form>
      )
  }
}

export default FormNotificationEpitech;
