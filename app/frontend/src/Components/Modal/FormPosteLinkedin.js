import React from 'react';
import { Form } from 'react-bootstrap';

class FormPosteLinkin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getParams() {
    return "zbi1=zbi2&zbi3=zbi4";
  }

  render() {

    return (
      <Form>
        <Form.Group controlId="Linkedin.URL">
          <Form.Label>URL du poste linkedin</Form.Label>
          <Form.Control as="textarea" rows="1" />
        </Form.Group>
      </Form>
      )
  }
}

export default FormPosteLinkin;