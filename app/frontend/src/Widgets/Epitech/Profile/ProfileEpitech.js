//NPM MODULES
import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

//CSS
import './ProfileEpitech.css'

//MY COMPONENTS
import FormProfileEpitech from '../../../Components/Modal/FormProfileEpitech';
import CustomModal from '../../../Components/Modal/CustomModal';
import LoadingWidget from "../../../CommonComponents/LoadingWidget";
import getProfileEpitechData from '../../../Requests/Epitech/Profile';

class ProfileEpitech extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageFile: "",
      description: "",
      name: "",
      netsoul: 0,
      annee: 0,
      gpa: 0,
      promo: 0,
      parcours: ""
    };

    this.updateData = this.updateData.bind(this);

    setInterval(this.updateData, this.props.item.timer * 1000 * 60);
  }
  
  updateData() {
    getProfileEpitechData(res => {
      let data = res.data.data;
      this.setState({
        imageFile: data.imageFile,
        description: data.description,
        name: data.name,
        netsoul: data.netsoul,
        gpa: data.gpa,
        annee: data.annee,
        promo: data.promo,
        parcours: data.parcours,
        loading: false
      });
    }, err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.updateData();
  }


  render() {

    let subtitle = "";

    if (this.props.item.params.option === "year")
      subtitle = this.state.annee + " : " + this.state.description;
    else if (this.props.item.params.option === "promo")
      subtitle = "Promotion " + this.state.promo + " : " + this.state.description;
    else if (this.props.item.params.option === "parcours")
      subtitle = "Parcours " + this.state.parcours + " : " + this.state.description;
    else
      subtitle = "error";

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
              type={"profileEpitech"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Profile Epitech"}
              titleModal={"Création du widget Profile Epitech"}
              form={<FormProfileEpitech />}
              mode="edit"
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          {this.props.item.params.checkedPhoto === "true" && (
            <Col xs={{span: '5'}}>
              <Image className="img-profile-epitech" width={120} height={120} src={this.state.imageFile} />
            </Col>
          )}
          <Col sm={{span: '12'}}>
            <h6 className="userName-profile-epitech dark">{this.state.name}</h6>
          </Col>
          <Col sm={{span: '12'}}>
            <p className="scolarity-profile-epitech">{subtitle}</p>
          </Col>
        </Row>
        <Row className="justify-content-center container-value-profil-epitech">
          {this.props.item.params.checkedGpa === "true" && (
            <Col xs={{span: '6'}} sm={{span: '4'}}>
              <Image className="icon-profile-epitech" src={require("../../../Assets/Icons/ic_user.svg")} />
              <p className="value-gpa-profile-epitech">{this.state.gpa}</p>
            </Col>
          )}
          {this.props.item.params.checkedNetsoul === "true" && (
            <Col xs={{span: '6'}} sm={{span: '4'}}>
              <Image className="icon-netsoul-profile-epitech" src={require("../../../Assets/Icons/ic_netsoul.svg")} />
              <p className="value-netsoul-profile-epitech">{this.state.netsoul}</p>
            </Col>
          )}
        </Row>
      </LoadingWidget>
    )
  }
}

export default ProfileEpitech;