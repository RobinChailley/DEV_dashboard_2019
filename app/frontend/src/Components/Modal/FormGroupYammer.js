import React from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
import LoadingForm from '../../CommonComponents/LoadingForm';

class FormGroupYammer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupNames: [],
      nameSelected: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.groupName : "",
      loading: true
    };
    this.onChangeGroupName = this.onChangeGroupName.bind(this);
    this.updateData = this.updateData.bind(this);

  }

  updateData() {
    axios.
      get(config.backURI + "yammer/group", {
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
      })
      .then(res => {
        this.setState({
          loading: false,
          groupNames: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChangeGroupName(event) {
    this.setState({nameSelected: event.target.value});
  }

  componentDidMount() {
    this.props.onRef(this);
    this.updateData();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getParams() {
    return "groupName=" + this.state.nameSelected;
  }

  render() {

    return (
      <LoadingForm loading={this.state.loading}>
        <Form>
          <Form.Group controlId="YamerGroup.Name">
            <Form.Label>Nom du groupe Yammer</Form.Label>
            <Form.Control defaultValue={this.state.nameSelected} onChange={this.onChangeGroupName} as="select">
              {this.state.groupNames.map((e, i) => {
                return (<option key={e.name + i.toString()} value={e.name}>{e.name}</option>)
              })}
            </Form.Control>
          </Form.Group>
        </Form>
      </LoadingForm>
      )
  }
}

export default FormGroupYammer;
