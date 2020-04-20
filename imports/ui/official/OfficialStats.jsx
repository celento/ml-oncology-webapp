import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { withRouter ,withHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Mongo} from 'meteor/mongo';
import Notifications, {notify} from 'react-notify-toast';
import {createContainer} from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import Rodal from 'rodal';
import { Statistic, Row, Col, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { patientDB } from '../../collections/patientDB';
// import AshaContainer from '../containers/AshaContainer';
// import AshaUserCard from './components/AshaUserCard';
import { SmileOutlined,SearchOutlined } from '@ant-design/icons';
import { ansDB } from '../../collections/ansDB';
 


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



class OfficialStats extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
    
     
      
   };
 

  }

 

  
render(){  

  

  if(!this.props.answer ||!this.props.asha || !this.props.patient_all || !this.props.patient_nv || !this.props.patient_rej || !this.props.patient_v ){
    return(<div><Spin size="large" /></div>)
  }
 
  var totalAns = Object.keys(this.props.answer).length;
  var totalPat = Object.keys(this.props.patient_all).length;
  var totalAsha = Object.keys(this.props.asha).length;
  var totalVer= Object.keys(this.props.patient_v).length;
  var totalNotVer = Object.keys(this.props.patient_nv).length;
  var totalRej = Object.keys(this.props.patient_rej).length;


  console.log(this.props.answer);
 

  return(
    <div>
      <h1>Stats</h1> 
      <br/>
      <br/>
      <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Verified Users" value={totalVer} />
    </Col>

    <Col span={12}>
      <Statistic title="Not Verified Users" value={totalNotVer} />
    </Col>

    <Col span={12}>
      <Statistic title="Total Users" value={totalPat} />
    </Col>
    
    <Col span={12}>
      <Statistic title="Asha Workers" value={totalAsha} />
    </Col>


    <Col span={12}>
      <Statistic title="Total Submissions" value={totalAns} />
    </Col>
   
   
   
  </Row>

    </div>
  )

 };
}

export default createContainer((props)=>{
  Meteor.subscribe('ansdb-all');
  Meteor.subscribe('patient-all');
  Meteor.subscribe('asha-all');
 
    return{ 
      answer:ansDB.find({}).fetch(),
 
      patient_all:patientDB.find({}).fetch(),
      patient_nv:patientDB.find({status:0}).fetch(),
      patient_v:patientDB.find({status:1}).fetch(),
      patient_rej:patientDB.find({status:2}).fetch(),
  };
}, OfficialStats);  