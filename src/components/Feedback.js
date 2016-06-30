require('normalize.css/normalize.css');
require('styles/Common.scss');
require('styles/Feedback.scss');

import React from 'react';
import Header from './Header.js'
import Footer from './Footer.js';

import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap'

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header navActive="5"/>
        <div className="feedback-content">
          <div className="container">
            <div className="content">
            	<h1>意见反馈</h1>

              <Form action="#" horizontal>
                  <FormGroup controlId="formControlsUserType">
                    <Col componentClass={ControlLabel} sm={2}>
                      您是：
                    </Col>
                    <Col sm={10}>
                      <FormControl componentClass="select" placeholder="你是">
                        <option value="服装厂" select="select">服装厂</option>
                        <option value="档口">档口</option>
                        <option value="厂商">厂商</option>                    
                        <option value="经销商">经销商</option>
                      </FormControl>
                    </Col>
                  </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    意见：
                  </Col>
                  <Col sm={10}>
                    <FormControl componentClass="textarea" placeholder="填写意见" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    联系方式：
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="联系方式" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">
                      提交
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Feedback;