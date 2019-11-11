import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

class FormInformationEpitech extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      option: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.option : "credits"
    };
    this.onChangeOption = this.onChangeOption.bind(this);
    this.getParams = this.getParams.bind(this);
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


  render() {
    return (
      <Form>
        <Form.Group controlId="profileEpitech.Scolarité">
          <Form.Label>Afficher l'information</Form.Label>
          <Form.Control defaultValue={this.state.option} onChange={this.onChangeOption} as="select">
            <option value={"credits"}>Total des crédits acquis</option>
            <option value={"netsoul"}>Moyenne Netsoul pour la dernière semaine</option>
            <option value={"gpa"}>GPA</option>
          </Form.Control>
        </Form.Group>
      </Form>
      )
  }
}

FormInformationEpitech.propTypes = {
  onRef: PropTypes.func,
  item: PropTypes.object,
  mode: PropTypes.string
};

export default FormInformationEpitech;