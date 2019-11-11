import React from 'react';
import { Form } from 'react-bootstrap';

class FormRepositoryGithub extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        repositoryName: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.repositoryName : ""
    };
    this.onChangeRepositoryName = this.onChangeRepositoryName.bind(this);
  }

  onChangeRepositoryName(event) {
    this.setState({repositoryName: event.target.value});
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getParams() {
    return "repositoryName=" + this.state.repositoryName;
  }

  render() {

    return (
      <Form>
        <Form.Group controlId="GithubRepository.Name">
          <Form.Label>Nom du répertoire Github</Form.Label>
          <Form.Control defaultValue={this.state.repositoryName} onChange={this.onChangeRepositoryName} as="textarea" rows="1" />
        </Form.Group>
      </Form>
      )
  }
}

export default FormRepositoryGithub;