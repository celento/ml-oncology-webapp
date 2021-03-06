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
import { Descriptions, Spin,PageHeader,Input, Button,Popconfirm,message,Result} from 'antd';
import Highlighter from 'react-highlight-words';
import { patientDB } from '../../collections/patientDB';
// import AshaContainer from '../containers/AshaContainer';
// import AshaUserCard from './components/AshaUserCard';
import { AuditOutlined,SearchOutlined } from '@ant-design/icons';
import { ansDB } from '../../collections/ansDB';
import { appointmentsDB } from '../../collections/appointmentsDB';
import { regPatient } from '../../collections/regPatient';


const { TextArea } = Input;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



class AppointmentDetail extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
      iconLoading: false, 
      additionalInfo:"",
   };
 

   this.enterIconLoading= this.enterIconLoading.bind(this);
   this.discard= this.discard.bind(this);

   this.handleChange=this.handleChange.bind(this);

  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });

    Meteor.call('addToPatientsDB',this.props.appointments,this.state.additionalInfo,(err)=>{
      if(err){
        message.error("Something went wrong. Try Again!")
      }
    })
    setTimeout(() => {
      message.success("Patient referred for Checkup")
      this.setState({ iconLoading: false });
      this.props.history.push('/d/home')
    }, 1000);
  };



  discard(){
    Meteor.call('discardAppointment',this.props.appointments._id,(err)=>{
      message.info('Patient Removed');
      this.props.history.push('/d/home')
    })
  }

handleChange(e){
  this.setState({
    additionalInfo:e.target.value,
  })
}

componentDidMount(){
  Meteor.call('accessAppointment',this.props.match.params.aid,Meteor.userId(),"Accessed your appointment",(err)=>{
      if(!err){
        console.log("hello")
      }
  })
}
  
render(){  

  if(!this.props.appointments || !this.props.patientInfo){
    return(<div><Spin size="large" /></div>)
  }

  if(this.props.patientInfo.datalock){
    return( <Result
      status="warning"
      title="The Patient has DataLock enabled"
      extra={
        <Button onClick={()=>{ window.history.back();}} type="primary" key="console">
          Go Back
        </Button>
      }
    />)
  }
 

  var responses = [];

  var q = this.props.appointments.questions;
  var a = this.props.appointments.answers;

  for(var i=0;i<q.length;i++){
      responses.push(
      <div className="single_resp">
          <p className="resp_question">{i+1+" : " + q[i]}</p>
          <p className="resp_answer">{"Ans : " +a[i]}</p>
      </div>
     
      )
  }

  responses = <div className="responses">{responses}</div>

 

  return(
    <div className="main-22">

<PageHeader
    className="site-page-header"
    onBack={() =>window.history.back()}
    title="Appointment"
    // subTitle="This is a subtitle"
  />

  <br/>
 
      <h1>{this.props.appointments.name}</h1> 

<br/>
 
      <Descriptions title="User Info">
    <Descriptions.Item label="Name">{this.props.appointments.name}</Descriptions.Item>
    <Descriptions.Item label="Phone">{this.props.appointments.phone}</Descriptions.Item>
    <Descriptions.Item label="Age">{this.props.appointments.age}</Descriptions.Item>
    <Descriptions.Item label="Gender">{this.props.appointments.gender}</Descriptions.Item>
 
  </Descriptions> 
<br/>
<h2>Patient Responses</h2>

{responses}


<br/>
  <h2>Additional Notes</h2>
  <TextArea rows={4} onChange={this.handleChange} />


<br/>
<br/>
    <Button
          type="primary"
          size="large"
          icon={<AuditOutlined />}
          loading={this.state.iconLoading}
          onClick={this.enterIconLoading}
        >
          Refer for Checkup
    </Button>

    <Popconfirm placement="topLeft" title="Are you sure to discard this record?" onConfirm={this.discard} okText="Yes" cancelText="No">
    <Button type="default" size="large">
          Discard Record
        </Button>
      </Popconfirm>
    
    </div>
  )

 };
}

export default createContainer((props)=>{
 
  var patID = (props.match.params.aid).split("_")[1];
  Meteor.subscribe('appointment-single',props.match.params.aid);
  Meteor.subscribe('patient-info',patID);

  
  return{ 
      appointments:appointmentsDB.findOne({_id:props.match.params.aid}),
      patientInfo:regPatient.findOne({_id:patID}),
  };
}, AppointmentDetail);  