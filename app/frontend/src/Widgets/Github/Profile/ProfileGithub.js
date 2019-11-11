//NODE MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//CSS
import './ProfileGithub.css';

//MY COMPONENTS
import FormProfileGithub from '../../../Components/Modal/FormProfileGithub';
import CustomModal from '../../../Components/Modal/CustomModal';
import LoadingWidget from "../../../CommonComponents/LoadingWidget";
import RequestProfileGithub from "../../../Requests/Github/Profile";
import RequestProfileRespositoryGithub from "../../../Requests/Github/ProfileRepository";
import { func } from 'prop-types';

class ProfileGithub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, 
      avatar_url: "",
      name: null,
      login: null,
      followers: 0,
      arrayRepository: null
    };
  }

  componentDidMount() {
    RequestProfileGithub(res => {
      this.setState({
        avatar_url: res.avatar_url,
        name: res.name,
        login: res.login,
        followers: res.followers,
        loading: false});
    }, err => {
      console.log(err);
    });
    RequestProfileRespositoryGithub(res => {
      this.setState({arrayRepository: res.data},);
    }, err => {
      console.log(err);
    })
  }

  render() {
    let avatarImage;
    let name;
    let login;
    let followers;
    let repository;
  
    const listItems = this.state.arrayRepository !== null ? this.state.arrayRepository.map((e, i) => {
      if (i < 4)
        return (
          <div key={e.name} className="container-repository-profile-github">
            <p className="name-repository-profile-gthub">{e.name}</p>
          </div>)
      }
    ) : <div><h6 className="dark" style={{fontFamily: 'Mark-Medium'}}></h6>Aucun répertoire</div>;

    if (this.props.item.params.avatar_url === "true")
      avatarImage = <Image className="img-profile-github" src={this.state.avatar_url} />;

    if (this.props.item.params.name === "true")
      name = <h5 className="name-profile-github dark">{this.state.name}</h5>;

    if (this.props.item.params.login === "true")
      login = <p className="username-profile-github">@{this.state.login}</p>;

    if (this.props.item.params.option == "followers") {
      followers =
        <div>
          <Image className="icon-start-profile-github" src={require('../../../Assets/Icons/ic-star.svg')} />
          <p className="value-follower-profile-gihub">{this.state.followers} </p>
        </div>
    
    if (this.props.item.params.repository == "true")
      repository =
        <Col xs={{span: '6'}} style={{marginTop: '30px'}}>
          <ul>{listItems}</ul>
        </Col>
    }
    return(
      <>
        <Row>
          <Col xs={{span: '4', offset: '1'}} >
            <Image style={{marginTop: '15px'}} src={require("../../../Assets/Icons/ic_commit.png")} />
          </Col>
          <Col xs={{span: '3', offset: '4'}} sm={{span: '1', offset: '5'}}>
            <CustomModal
              service="githubToken"
              onWidgetCreated={this.props.onWidgetCreated}
              type={"profileGithub"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Profile Github"}
              titleModal={"Modification du widget Profile Github"}
              form={<FormProfileGithub />}
              mode="edit"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={{offset: '1', span: '4'}}>
            {avatarImage}
            {name}
            {login}
            {followers}
          </Col>
          {repository}
        </Row>
      </>
    )
  }
}

export default ProfileGithub;