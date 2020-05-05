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
import { UserOutlined, LockOutlined,BankOutlined,MobileOutlined,UnlockOutlined } from '@ant-design/icons';
import { patientDB } from '../../collections/patientDB';
import { accessDB } from '../../collections/accessDB';
import { regPatient } from '../../collections/regPatient';

const override = css`
    display: block;
    border-color: red;s
`;
var state,url;
 
class PatAccess extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      
     
    };

    this.toggleLock=this.toggleLock.bind(this);
   
  }

  componentDidMount(){
    
  }
 
  
  handleSubmit(e){
     
    
}

toggleLock(){
  var curr_state = this.props.patientInfo.datalock;
  var next_state = !curr_state;
  const qs = require('query-string');
  userid = qs.parse(this.props.location.search).id

  Meteor.call('toggleDataLock',userid,next_state,(err)=>{
    if(!err){
      console.log("Done")
    }
  })
}


  render(){
 
  


  if(!this.props.patientInfo || !this.props.access){
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

  var accessLogs = null;
  if(Object.keys(this.props.access)==0){
      accessLogs =  <p className="ma_nothing">Nothing to Show</p>
  }else{
    accessLogs =  his.props.access.map(access=><div className="access_div_holder">{access.date}</div>)
  }

  
  if(this.props.patientInfo.datalock){
      var datalock = <div onClick={this.toggleLock}  className={"data_lock_divider"}>
      <center>
          <UnlockOutlined className="data_lock_icon" />
          <p className="data_lock_text"> DataLock is OFF</p>
      </center>
      </div>
  }else{
    var datalock = <div onClick={this.toggleLock} className={"data_lock_divider data_lock_on"}>
    <center>
        <LockOutlined className="data_lock_icon" />
        <p className="data_lock_text"> DataLock is ON</p>
    </center>
    </div>
  }






 

    return (
      <div>
        <Notifications/>
  
        <p className="ma-title">Access</p>
        {datalock}
        <br/>
        <p className="ma-sub-title">Logs</p>``

        {accessLogs}
     


     
      </div>
 

       
    

    );
  }
}
  export default createContainer((props)=>{
  

    const qs = require('query-string');
    q = qs.parse(props.location.search).id

    Meteor.subscribe('access-user',q);

    Meteor.subscribe('patient-info',q);

    return{
      patientInfo:regPatient.findOne({_id:q}),
      uid : q,
      access:accessDB.find({},{sort:{timestamp:-1}}).fetch(),
    }
    
  }, withRouter(PatAccess));