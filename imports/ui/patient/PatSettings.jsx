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
 
class PatSettings extends Component {
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
  
        <p className="ma-title">Settings</p>
       
        <div className="hp_main_profile_holder">
          <center>
            <img src={"/img/"+this.props.patientInfo.gender+".png"} className="userimage"/>
            <p className="hp_pp_name">{this.props.patientInfo.name}</p>
            <p className="hp_info_p"><span className="hp_pp_gender">{this.props.patientInfo.gender}</span> | <span className="hp_pp_age">{this.props.patientInfo.age}</span></p>
            <p className="edit_info">Edit Info</p>
          </center>

        </div>

      </div>
 

       
    

    );
  }
}
  export default createContainer((props)=>{
  

    const qs = require('query-string');
    q = qs.parse(props.location.search).id

    Meteor.subscribe('notif-all');

    Meteor.subscribe('patient-info',q);

    return{
      patientInfo:regPatient.findOne({_id:q}),
      uid : q,
      notif:notifDB.find({},{sort:{timestamp:-1}}).fetch(),
    }
    
  }, withRouter(PatSettings));