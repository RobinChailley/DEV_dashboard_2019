//NODE MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//CSS
import './MailBoxYammer.css';

//MY COMPONENTS
import FormMailBoxYammer from '../../../Components/Modal/FormMailBoxYammer';
import CustomModal from '../../../Components/Modal/CustomModal';
import ListMailYammer from './ListMailYammer';
import axios from 'axios';
import config from '../../../config';
import LoadingWidget from '../../../CommonComponents/LoadingWidget';

class MailBoxYammer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: []
    };

    this.updateData = this.updateData.bind(this);
    setInterval(this.updateData, this.props.item.timer * 1000 * 60);
  }

  updateData() {
    let yammerToken = null;
    axios
      .get(config.backURI + "yammer/mails", {
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
      })
      .then(res => {
        this.setState({data: res.data.data, loading: false});
      })
      .catch(err => {
          console.log(JSON.parse(JSON.stringify(err)));
      });
  }

  componentDidMount() {
    this.updateData();
  }

  render() {

    let style = {};
    let data = this.state.data;
    if (this.props.item.params.truncate === "true") {
      style.height = "80px";
      data = data.map((e, i) => {
        return e.substring(0, 90) + "...";
      });
    }

    if (this.props.item.params.nbMsg !== "all") {
      data = data.filter((e, i) => {
        return i < parseInt(this.props.item.params.nbMsg);
      });
    }

    return(
      <LoadingWidget loading={this.state.loading}>
        <Row>
          <Col xs={{span: '1', offset: '1'}} >
            <Image style={{marginTop: '15px'}} src={require("../../../Assets/Icons/yammer.svg")} />
          </Col>
          <Col xs={{span: '8'}}>
            <h6 className="title-mail-box-yammer dark">Boite de réception</h6>
        </Col>
          <Col xs={{span: '1'}}>
            <CustomModal
              service="yammerToken"
              onWidgetCreated={this.props.onWidgetCreated}
              type={"mailboxYammer"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Boîte de réception Yammer"}
              titleModal={"Modification du widget boîte de réception Yammer"}
              form={<FormMailBoxYammer />}
              mode="edit"
            />
          </Col>
        </Row>
        {
          data.map((e, i) => {
            return (<ListMailYammer key={i} style={style} text={e}/>)
          })
        }
        </LoadingWidget>
    )
  }
}

export default MailBoxYammer;
