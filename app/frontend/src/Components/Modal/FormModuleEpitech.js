import React from 'react';
import { Form } from 'react-bootstrap';
import moduleRequest from '../../Requests/Epitech/Module';
import LoadingForm from '../../CommonComponents/LoadingForm';


class FormModuleEpitech extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      moduleName: (this.props.item !== undefined && this.props.item.params !== undefined) ? this.props.item.params.moduleName : "",
      allModules: []
    };
    this.onChangeModuleName = this.onChangeModuleName.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  onChangeModuleName(event) {
    this.setState({moduleName: event.target.value}, () => setTimeout(this.props.updateWidget, 3000));
  }

  updateData() {
    moduleRequest.getModulesNames(res => {
      this.setState({allModules: res.data.data, loading: false});
    }, err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.props.onRef(this);
    this.updateData();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getParams() {
    let module = this.state.allModules.filter(e => (e.title === this.state.moduleName))[0];
    return "moduleName=" + this.state.moduleName + "&" + 
           "instance=" + module.instance + "&" +
           "year=" + module.year + "&" +
           "module=" + module.module;
  }

  render() {
    return (
      <LoadingForm loading={this.state.loading}>
        <Form>
          <Form.Group controlId="Linkedin.URL">
            <Form.Control defaultValue={this.state.moduleName} onChange={this.onChangeModuleName} as="select">
              {this.state.allModules.map((e, i) => {
                return (
                  <option value={e.title}>{e.title}</option>
                )
              })}
            </Form.Control>
          </Form.Group>
        </Form>
      </LoadingForm>
    )
  }
}

export default FormModuleEpitech;