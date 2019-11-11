//NODE MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//CSS
import './ModuleEpitech.css';

//COMPONENTS
import CustomModal from '../../../Components/Modal/CustomModal';
import FormModuleEpitech from '../../../Components/Modal/FormModuleEpitech';
import Circle from 'react-circle';
import LoadingWidget from "../../../CommonComponents/LoadingWidget";
import getModuleInfo from '../../../Requests/Epitech/Module';

class ModuleEpitech extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      credits: 0,
      end: "",
      percentage: "",
      title: ""
    };

    this.updateData = this.updateData.bind(this);
    setInterval(this.updateData, this.props.item.timer * 1000 * 60);
  }


  updateData() {
    getModuleInfo.getModuleInfo({
      instance: this.props.item.params.instance,
      module: this.props.item.params.module,
      moduleName: this.props.item.params.moduleName,
      year: this.props.item.params.year
    },res => {
      this.setState({
        credits: res.data.data.credits,
        end: res.data.data.end,
        percentage: res.data.data.percentage,
        title: res.data.data.title
      });
    }, err => {
      console.log(err);
    });
  }


  componentDidMount() {
    this.updateData();
  }


  render() {
    return(
      <LoadingWidget loading={this.state.loading}>
        <Row>
          <Col xs={{span: '4', offset: '1'}} >
            <Image style={{marginTop: '15px'}} src={require("../../../Assets/Icons/ic_epitech.svg")} />
          </Col>
          <Col xs={{span: '3', offset: '4'}} sm={{span: '3', offset: '4'}}>
            <CustomModal
              service="autologinEpitech"
              onWidgetCreated={this.props.onWidgetCreated}
              type={"moduleEpitech"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Informations module Epitech"}
              titleModal={"Création du widget information module Epitech"}
              form={<FormModuleEpitech updateWidget={this.updateData.bind(this)}/>}
              mode="edit"
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={{span: '12'}} >
            <h6 className="title-module-epitech dark">{this.state.title}</h6>
          </Col>
          <Circle animate={true} animationDuration="1s" size={120} lineWidth={30} progress={this.state.percentage}
            progressColor="#EBA643" bgColor="#FFFAF0" percentSpacing={10} roundedStroke={true} showPercentage={true} showPercentageSymbol={true}
          />
        </Row>
        <Row style={{marginTop: '20px', textAlign: 'center'}} className="justify-content-center">
          <Col xs={{span: 4}}>
            <p className="dark">{this.state.credits} crédit(s)</p>
          </Col>
          <Col xs={{span: 4}}>
            <p className="dark">Termine le:</p>
            <p className="dark" style={{marginTop: '-20px'}}>{this.state.end}</p>
          </Col>
        </Row>
      </LoadingWidget>
    );
  }
}

export default ModuleEpitech;