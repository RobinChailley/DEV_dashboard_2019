//NODES MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import PropTypes from 'prop-types';

//CSS
import './ListMailYammer.css'

class ListMailYammer extends React.Component {
  render() {
    return(
      <Row>
        <Col style={this.props.style} className="container-list-mail-yammer" xs={{offset: '1', span: '10'}}>
          <Row>
            <Col xs={{span: '1'}}>
              <Image className="img-progile-list-mail-yammer" src={require("../../../Assets/Images/profile-placeholder.png")} roundedCircle/>
            </Col>
            <Col xs={{span: '10'}}>
              <p style={{marginLeft: '20px', marginTop: '15px', fontSize: '15px'}}>{this.props.text}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

/*
 * Describe the type and some options of each props of this component
 */
ListMailYammer.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object
};



export default ListMailYammer;
