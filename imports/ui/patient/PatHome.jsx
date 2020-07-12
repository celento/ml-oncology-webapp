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
    border-color: red;
`;
var state,url;
 
class PatHome extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      
     
    };

    this.book = this.book.bind(this);
   
  }

  componentDidMount(){
    
  }
 
  
  handleSubmit(e){
     
    
}

book(){
  this.props.history.push("/p/xcv/book?id="+this.props.uid)
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
      <div>
        <Notifications/>
  
        <p className="today_date">{today}</p>
        <p className="ma-title">Home</p>
    
  
 
    <div onClick={this.book} className="mh_book_ap">
        <center>
        <CalendarOutlined />
        <p className="hm_book_text">Book an Appointment</p>
        </center>
      </div>
<br/>
<br/>
      <p className="ma-sub-title">Upcoming Events</p>
      <p className="ma_nothing">Nothing to Show</p>

<br/>
<br/>
      <p className="ma-sub-title">Your Profile</p>

      <div className="hp_main_profile_holder">
        <center>
          <img src={"/img/"+this.props.patientInfo.gender+".png"} className="userimage"/>
          <p className="hp_pp_name">{this.props.patientInfo.name}</p>
          <p className="hp_info_p"><span className="hp_pp_gender">{this.props.patientInfo.gender}</span> | <span className="hp_pp_age">{this.props.patientInfo.age}</span></p>
          <p className="edit_info">Edit Info</p>
        </center>

      </div>




          

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