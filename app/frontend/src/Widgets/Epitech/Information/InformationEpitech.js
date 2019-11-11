//NODE MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//CSS
import './InformationEpitech.css';

//MY COMPONENTS
import CustomModal from '../../../Components/Modal/CustomModal';
import FormInformationEpitech from '../../../Components/Modal/FormInformationEpitech';
import LoadingWidget from "../../../CommonComponents/LoadingWidget";
import requestInformationsEpitech from "../../../Requests/Epitech/Information";


class InformationEpitech extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gpa: 0,
      netsoul: 0,
      credits: 0
    };

    this.updateData = this.updateData.bind(this);
    setInterval(this.updateData, this.props.item.timer * 1000 * 60);
  }

  updateData() {
    requestInformationsEpitech(res => {
      this.setState({gpa: res.gpa, netsoul: res.netsoul, credits: res.credits, loading: false})
    }, err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.updateData();
  }

  render() {

    let descriptionText;
    let image;
    let number;

    if (this.props.item.params.option) {
      if (this.props.item.params.option === "gpa") {
        descriptionText = "GPA";
        image = require("../../../Assets/Icons/ic_information_epitech_gpa.svg")
        number = this.state.gpa;
      } else if (this.props.item.params.option === "credits") {
        descriptionText = "Total des crédits acquis";
        image = require("../../../Assets/Icons/ic_information_epitech_credits.svg")
        number = this.state.credits;
      } else if (this.props.item.params.option === "netsoul") {
        descriptionText = "Moyenne Netsoul pour la dernière semaine";
        image = require("../../../Assets/Icons/ic_information_epitech_netsoul.svg")
        number = this.state.netsoul;
      }
    } else {
      descriptionText = "Erreur : changez l'option de ce widget.";
    }


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
              type={"informationEpitech"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Informations module Epitech"}
              titleModal={"Création du widget information module Epitech"}
              form={<FormInformationEpitech onRef={ref => (this.child = ref)}item={this.props.item}/>}
              mode="edit"
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={{span: '4'}}>
            <Image className="img-information-epitech" src={image} />
          </Col>
          <Col sm={{span: '12'}}>
            <h1 className="value-information-epitech dark">{number}</h1>
          </Col>
          <Col sm={{span: '12'}}>
            <p className="value-unit-information-epitech">{descriptionText}</p>
          </Col>
        </Row>
      </LoadingWidget>
    )
  }
}

export default InformationEpitech;