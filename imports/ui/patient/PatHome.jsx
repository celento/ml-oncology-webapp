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
import { UserOutlined, LockOutlined,BankOutlined,MobileOutlined,IdcardOutlined } from '@ant-design/icons';
import { patientDB } from '../../collections/patientDB';
import { notifDB } from '../../collections/notifDB';
import { regPatient } from '../../collections/regPatient';

const override = css`
    display: block;
    border-color: red;
`;
var state,url;

const questions = ['പനി','ജലദോഷം','വയറിളക്കം','തൊണ്ടവേദന',
'ചുമ','ശ്വാസംമുട്ടൽ','ശ്വാസതടസ്സം','സന്ധികളിൽ വേദന','ശക്തമായ തലവേദ','ക്ഷീണം അനുഭവപ്പെടുന്നുണ്ടോ'];

class PatHome extends Component {
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

  // console.log(this.props.patientInfo)
 
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var hr = today.getHours();
  var min = today.getMinutes();
  var ss = today.getSeconds();


if (dd < 10) {
  dd = '0' + dd;
  }

  if (mm < 10) {
  mm = '0' + mm;
  }

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ]

  today = months[mm-1] + ' ' + dd + ' ' + yyyy;


    // End 

    return (
      <div className="ans-bg">
        <Notifications/>
  

        <p className="ma-title">Home</p>
      
            <img className="login-logo" src='/img/icon_m.png'/>
            <br/>
    <p className="today_date">{today}</p>
         <a href={"/p/xcv/response?uid="+this.props.patientInfo._id}>
              <div className="go_question">
                <p className="fill_q_text">
                പ്രതിദിന ചോദ്യാവലി പൂരിപ്പിക്കാൻ ഇവിടെ ക്ലിക്ക് ചെയ്യുക
                </p>
              </div>
  </a>
  <br/>
              <h3>അറിയിപ്പുകൾ</h3>
              <hr/>


           


            {this.props.notif.map(notif=>
  <div>

  <Card title={notif.title}>
      <p>{notif.msg}</p>
      <p className="site-card-demo-inner-p sm_msg_ttl">{notif.date}</p>
  </Card>

  <br/>
  </div>
  
  
  )}
        
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
    
  }, withRouter(PatHome));