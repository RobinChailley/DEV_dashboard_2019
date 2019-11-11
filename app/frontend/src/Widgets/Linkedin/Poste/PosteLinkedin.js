//NODE MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//CSS
import './PosteLinkedin.css'

//MY COMPONENTS
import FormPosteLinkedin from '../../../Components/Modal/FormPosteLinkedin';
import CustomModal from '../../../Components/Modal/CustomModal';
import LoadingWidget from "../../../CommonComponents/LoadingWidget";

class PosteLinkedin extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }


  componentDidMount() {
    setTimeout(() => this.setState({loading: false}), 2000);
  }


  render() {
    return(
      <LoadingWidget loading={this.state.loading}>
        <Row>
          <Col className="author-poste-linkedin-container" xs={{span:'8', offset: '1'}}>
            <Image className="img-author-poste-linkedin" src={require('../../../Assets/Images/profileEpitech.png')} />
            <p className="title-author-poste-linkedin">Nicolas Jaussaud</p>
          </Col>
          <Col xs={{span: '1'}}>
            <Image style={{marginTop: '15px'}} src={require("../../../Assets/Icons/ic_linkedin.svg")} />
          </Col>
          <Col xs={{span: '1'}}>
            <CustomModal
              service="linkedinToken"
              onWidgetCreated={this.props.onWidgetCreated}
              type={"posteLinkedin"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Poste Linkedin"}
              titleModal={"Création du widget Poste Linkedin"}
              form={<FormPosteLinkedin />}
              mode="edit"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Image className="img-poste-linkedin" src={require("../../../Assets/Images/placeholder-image.png")} />
          </Col>
        </Row>
        <Row>
          <Col xs={{span: '7', offset: '1'}}>
            <p className="description-poste-linkedin">Ceci est la description du poste linkedin</p>
          </Col>
          <Col xs={{span: '1', offset: '1'}} >
            <Image className="img-like-poste-linkedin" src={require("../../../Assets/Icons/ic-heart.svg")} />
          </Col>
          <Col xs={{span: '1'}} >
            <p style={{marginTop: '17px', marginLeft: '-15px', color: '#2B2F33'}}>123</p>
          </Col>
        </Row>
      </LoadingWidget>
    )
  }
}

export default PosteLinkedin;