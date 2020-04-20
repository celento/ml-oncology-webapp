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
import { Descriptions, Spin,PageHeader,Input, Button,Popconfirm,message} from 'antd';
import Highlighter from 'react-highlight-words';
import { patientDB } from '../../collections/patientDB';
// import AshaContainer from '../containers/AshaContainer';
// import AshaUserCard from './components/AshaUserCard';
import { AuditOutlined,CarryOutOutlined,UserSwitchOutlined } from '@ant-design/icons';
import { ansDB } from '../../collections/ansDB';
import { appointmentsDB } from '../../collections/appointmentsDB';


const { TextArea } = Input;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



class PatientsDetail extends TrackerReact(React.Component){

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
  
render(){  

  if(!this.props.patient){
    return(<div><Spin size="large" /></div>)
  }

 

  return(
    <div className="main-22">

<PageHeader
    className="site-page-header"
    onBack={() =>window.history.back()}
    title="Patients"
    // subTitle="This is a subtitle"
  />

  <br/>
 
      <h1>{this.props.patient.name}</h1> 

<br/>
 
      <Descriptions title="User Info">
    <Descriptions.Item label="Name">{this.props.patient.name}</Descriptions.Item>
    <Descriptions.Item label="Phone">{this.props.patient.initialInfo.phone}</Descriptions.Item>
    <Descriptions.Item label="Age">{this.props.patient.initialInfo.age}</Descriptions.Item>
    <Descriptions.Item label="Gender">{this.props.patient.initialInfo.gender}</Descriptions.Item>
  </Descriptions> 



  <Tabs defaultActiveKey="2">
    <TabPane
      tab={
        <span>
          <CarryOutOutlined />
          Tests
        </span>
      }
      key="1"
    >
     No Tests Yet
    </TabPane>
    <TabPane
      tab={
        <span>
         <UserSwitchOutlined />
          Patient Response
        </span>
      }
      key="2"
    >
      Tab 2
    </TabPane>
  </Tabs>


<br/>
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
 
  console.log(props.match.params.pid)
  Meteor.subscribe('patients-single',props.match.params.pid);
    return{ 
      patient:patientDB.findOne({_id:props.match.params.pid}),
  };
}, PatientsDetail);  