import React, { Component } from 'react';
import { withHistory, Link,withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';
import {Helmet} from "react-helmet";
 
import Rodal from 'rodal';
import {createContainer} from 'meteor/react-meteor-data';
 
import { PropagateLoader} from 'react-spinners';
import { css } from 'react-emotion';
import { Spin,Result,Card } from 'antd';
import { UserOutlined, LockOutlined,BankOutlined,MobileOutlined,CalendarOutlined } from '@ant-design/icons';
import { patientDB } from '../../collections/patientDB';
import { notifDB } from '../../collections/notifDB';
import { regPatient } from '../../collections/regPatient';

const override = css`
    display: block;
    border-color: red;s
`;
var state,url;
 
class PatNotif extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      
     
    };

   
  }

  componentDidMount(){
    
  }
 
  
  handleSubmit(e){
     
    
}


  render(){
 


  if(!this.props.patientInfo){
    return(
      <div>
        <center>
          <br/>
          <br/>
          <br/>
          <br/>
        <Spin size="large" />
        </center>
      </div>
    )
  }

 

    return (
      <div>
        <Notifications/>
  
        <p className="ma-title">Notifications</p>
        <p className="ma_nothing">Nothing to Show</p>
{/* 
        {this.props.notif.map(test=>(<div><Card type="inner" title={test.test}>
        Appointment : {test.date}  <br/>
        Status : {test.status} <br/>
    </Card> <br/></div>))} */}
     
      </div>
 

       
    

    );
  }
}
  export default createContainer((props)=>{
  

    const qs = require('query-string');
    q = qs.parse(props.location.search).id

    Meteor.subscribe('notif-user',q);

    Meteor.subscribe('patient-info',q);

    return{
      patientInfo:regPatient.findOne({_id:q}),
      uid : q,
      notif:notifDB.find({userID:q},{sort:{timestamp:-1}}).fetch(),
    }
    
  }, withRouter(PatNotif));