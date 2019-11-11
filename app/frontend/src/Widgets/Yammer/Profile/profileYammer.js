//NODES MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//CSS
import './profileYammer.css';

//MY COMPONENTS
import FormProfileYammer from '../../../Components/Modal/FormProfileYammer';
import CustomModal from '../../../Components/Modal/CustomModal';
import config from '../../../config';
import LoadingWidget from "../../../CommonComponents/LoadingWidget";
import Axios from 'axios';

class ProfileYammer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profilePicture: "null",
      name: "Name",
      firstName: "First",
      networkName: "Epitech",
      information: "Etudiant Epitech Montpellier ect ... Bite"
    };

    this.updateData = this.updateData.bind(this);
    setInterval(this.updateData, this.props.item.timer * 1000 * 60);
  }

  updateData() {
    Axios
      .get(config.backURI + 'yammer/profil', {
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          loading: false,
          name: res.data.data.name,
          network: res.data.data.network,
          following: res.data.data.following,
          followers: res.data.data.followers,
          updates: res.data.data.updates,
          image: res.data.data.image
        });
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
      });
  }

  componentDidMount() {
    this.updateData();
  }
    
  render() {
    let profilePicture;
    let name;
    let networkName;
    let information;
    
    if (this.props.item.params.profilePicture === "true")
      profilePicture = <Image style={{borderRadius: '50%'}} width={130} height={130} className="img-profile-yammer" src={this.state.image} />
    if (this.props.item.params.name === "true")
      name = <h5 className="userName-profile-Yammer dark">{this.state.name}</h5>
    if (this.props.item.params.networkName === "true")
      networkName = <p>{this.state.network}</p>
    if (this.props.item.params.information === "true")
      information = <div>
        <h5 className="title-info-yammer dark">Informations</h5>
        <p>Following : {this.state.following}</p>
        <p>Followers : {this.state.followers}</p>
        <p>Updates   : {this.state.updates}</p>
        </div>

    return(
      <LoadingWidget loading={this.state.loading}>
        <Row>
          <Col xs={{span: '4', offset: '1'}} >
            <Image style={{marginTop: '15px'}} src={require("../../../Assets/Icons/yammer.svg")} />
          </Col>
          <Col xs={{span: '3', offset: '4'}} sm={{span: '1', offset: '4'}}>
            <CustomModal
              service="yammerToken"
              onWidgetCreated={this.props.onWidgetCreated}
              type={"profileYammer"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Profile Yammer"}
              titleModal={"Modification du widget profile Yammer"}
              form={<FormProfileYammer/>}
              mode="edit"
            />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Col xs={{offset: '1', span: '4'}}>
            {profilePicture}
          </Col>
          <Col xs={{span: '6'}}>
            <Row>
              <div style={{display: 'block', marginLeft: '35px', marginTop: '10px'}}>
                {name}
              </div>
              <div style={{display: 'block', marginLeft: '35px'}}>
                {networkName}
              </div>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={{offset: '1', span: '11'}}>
            {information}
          </Col>
        </Row>
      </LoadingWidget>
    )
  }
}

export default ProfileYammer;