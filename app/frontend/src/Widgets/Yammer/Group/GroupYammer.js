//NODE MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import axios from 'axios';

//CSS
import './GroupYammer.css';

//MY COMPONENTS
import FormGroupYammer from '../../../Components/Modal/FormGroupYammer';
import CustomModal from '../../../Components/Modal/CustomModal';
import config from '../../../config';
import LoadingWidget from "../../../CommonComponents/LoadingWidget";

class GroupYammer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      datas: []
    };

    this.updateData = this.updateData.bind(this);
    setInterval(this.updateData, this.props.item.timer * 1000 * 60);
  }

  updateData() {
    axios
      .get(config.backURI + "yammer/group", {
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
      })
      .then(res => {
        this.setState({
          loading: false,
          datas: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.updateData();
  }

  render() {

    let members = 0;
    let last_message = "";
    let name = "";
    let img;
    let groupPrivacy = "";

    if (this.state.datas !== []) {
      let group = {};
      for (let i = 0; i < this.state.datas.length; i++)
        if (this.state.datas[i].name === this.props.item.params.groupName)
          group = this.state.datas[i];
      members = group.members;
      last_message = group.last_message;
      img = group.img;
      name = group.name;
      groupPrivacy = "Groupe " + (group.privacy === "private" ? "privé" : "public");
    }

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
              type={"groupYammer"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Groupe Yammer"}
              titleModal={"Modification du widget groupe Yammer"}
              form={<FormGroupYammer/>}
              mode="edit"
            />
          </Col>
        </Row>
        <Row>
            <Col xs={{span: '10', offset: '1'}}>
                <Image className="photo-group-yammer" src={img} />
                <h6 className="group-name-yammer dark">{name}</h6>
                <p style={{textAlign: 'center'}}>{groupPrivacy}</p>
            </Col>
        </Row>
        <Row className="justify-content-center">
            <Col xs={{span: '5'}}>
                <Image className="icons-yammer-group" src={require("../../../Assets/Icons/ic_user.svg")} />
                <p className="members-group-yammer">{members}</p>
            </Col>
            <Col xs={{span: '5'}}>
                <Image className="icons-yammer-group" src={require("../../../Assets/Icons/notification.svg")} />
                <p className="notifications-group-yammer">{last_message}</p>
            </Col>
        </Row>
      </LoadingWidget>
    )
  }
}

export default GroupYammer;
