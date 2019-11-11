//NODE MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//CSS
import './ProfileLinkedin.css'

//MY COMPONENTS
import FormProfileLinkedin from '../../../Components/Modal/FormProfileLinkedin';
import CustomModal from '../../../Components/Modal/CustomModal';
import LoadingWidget from "../../../CommonComponents/LoadingWidget";
import RequestProfileLinkedin from "../../../Requests/Linkedin/Profile";

class ProfileLinkedin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profilePicture: "null",
      name: "Name",
      firstName: "firstName",
      country: "France"
    };
  }


  componentDidMount() {
    RequestProfileLinkedin(res => {
      this.setState({
        profilePicture: res.data.data.profilePicture,
        name: res.data.data.name,
        firstName: res.data.data.firstName,
        country: res.data.data.country,
        loading: false
      });
    }, err => {
      console.log(err);
    });
  }

  render() {
    let profilePicture;
    let name;
    let country;

    if (this.props.item.params.profilePicture === "true")
      profilePicture = <Image style={{borderRadius: '50%'}} className="img-profile-linkedin" src={this.state.profilePicture} />
    if (this.props.item.params.name === "true")
      name = <h5 className="userName-profile-linkedin dark">{this.state.firstName} {this.state.name}</h5>
    if (this.props.item.params.country === "true") {
      if (this.state.country === "FR")
        country = <p className="country-profile-linkedin">France</p>
      else if (this.state.country == "EN")
        country = <p className="country-profile-linkedin">England</p>
      else
        country = <p className="country-profile-linkedin">{this.state.country}</p>
    }

    return(
      <LoadingWidget loading={this.state.loading}>
        <Row>
          <Col xs={{span: '4', offset: '1'}} >
            <Image style={{marginTop: '15px'}} src={require("../../../Assets/Icons/ic_linkedin.svg")} />
          </Col>
          <Col xs={{span: '3', offset: '4'}} sm={{span: '3', offset: '4'}}>
            <CustomModal
              service="linkedinToken"
              onWidgetCreated={this.props.onWidgetCreated}
              type={"ProfileLinkedin"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Profile Linkedin"}
              titleModal={"Création du widget Profile Linkedin"}
              form={<FormProfileLinkedin />}
              mode="edit"
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={{span: '6'}}>
            {profilePicture}
          </Col>
        </Row>
        <Row>
          <Col xs={{span: '11'}}>
            {name}
          </Col>
          <Col xs={{span: '11'}}>
            {country}
          </Col>
        </Row>
      </LoadingWidget>
    )
  }
}

export default ProfileLinkedin;