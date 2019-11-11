//NODE MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//CSS
import './NotificationEpitech.css';

//COMPONENTS
import CustomModal from '../../../Components/Modal/CustomModal';
import FormNotificationEpitech from '../../../Components/Modal/FormNotificationEpitech';
import LoadingWidget from "../../../CommonComponents/LoadingWidget";
import getNotificationsEpitechData from "../../../Requests/Epitech/Notification";

class NotificationEpitech extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: [],
      missed: [],
      alert: []
    };

    this.updateData = this.updateData.bind(this);
    setInterval(this.updateData, this.props.item.timer * 1000 * 60);
  }

  updateData() {
    let option = this.props.item.params.option;
    if (option === null || option === undefined) {
      console.log("Error : option === null || undefined");
      return;
    }
    getNotificationsEpitechData(res => {
      if (res.data.error)
        this.setState({
          loading: false,
        });
      let notifs = res.data.data;
      this.setState({
        message: notifs.message,
        missed: notifs.missed,
        alert: notifs.alert,
        loading: false
      });
    }, err => {
    });
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    const ContentBody = () => {
      if (this.props.item.params.option === "message" || this.props.item.params.option === "alert") {
        let arr = [];
        this.state[this.props.item.params.option].map((e, i) => {
          arr.push(
            <Col key={e + i.toString()} className="container-notification" xs={{span: '10', offset: '1'}}>
              <p>{e}</p>
            </Col>
          );
        });
        return arr;
      } else if (this.props.item.params.option === "missed") {
        let arr = [];
        this.state[this.props.item.params.option].map((e, i) => {
          arr.push(
            <Col key={e + i.toString()} className="container-notification" xs={{span: '10', offset: '1'}}>
              <p style={{lineHeight: "10px"}}><strong style={{fontWeight: "bold"}}>Activité : </strong>{e.title}</p>
              <p style={{lineHeight: "10px"}}><strong style={{fontWeight: "bold"}}>Date : </strong>{e.date}</p>
              <p style={{lineHeight: "10px"}}><strong style={{fontWeight: "bold"}}>Heure : </strong>{e.hour}</p>
            </Col>
          );
        });
        return arr;
      } else {
        return (<div>Error !</div>)
      }
    };

    let description;
    if (this.props.item.params.option === "alert")
      description = "Alertes"
    else if (this.props.item.params.option === "missed")
      description = "Absences"
    else if (this.props.item.params.option === "message")
      description = "Messages";
    else
      description = "Error !";

    return(
      <LoadingWidget loading={this.state.loading}>
        <div className="scroll">
          <Row>
            <Col xs={{span: '4', offset: '1'}} >
              <Image style={{marginTop: '15px'}} src={require("../../../Assets/Icons/ic_epitech.svg")} />
            </Col>
            <Col xs={{span: '3', offset: '4'}} sm={{span: '3', offset: '4'}}>
              <CustomModal
                service="autologinEpitech"
                onWidgetCreated={this.props.onWidgetCreated}
                type={"notificationsEpitech"}
                deleteWidget={this.props.deleteWidget}
                item={this.props.item}
                title={"Notifications Epitech"}
                titleModal={"Création du widget Notifications Epitech"}
                form={<FormNotificationEpitech />}
                mode="edit"
              />
            </Col>
          </Row>
          <Row className="container-header-notification-epitech">
            <Col xs={{span: '3', offset: '1'}}>
              <Image src={require('../../../Assets/Icons/ic_notification_epitech.svg')} />
            </Col>
            <Col xs={8}>
              <h5 className="title-notification-epitech dark">{description}</h5>
            </Col>
          </Row>
          <Row>
            <ContentBody/>
          </Row>
        </div>
      </LoadingWidget>
    )
  }
}

export default NotificationEpitech;
