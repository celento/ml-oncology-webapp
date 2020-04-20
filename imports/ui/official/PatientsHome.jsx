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
import {Badge, Spin,Result,Table,Button,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { patientDB } from '../../collections/patientDB';
 
import { SmileOutlined,SearchOutlined } from '@ant-design/icons';
 
import PatientCard from '../doctor/components/PatientCard';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



class PatientsHome extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
    
      patientList:null,
      loaded:false,
      searchText: '',
      searchedColumn: '',
      
   };
 

  }


render(){  
  if(!this.props.appointments){
    return(<div><Spin size="large" /></div>)
  }
  // console.log(this.props.patientList);

  // console.log(Object.keys(this.props.patientList).length)

  if(Object.keys(this.props.appointments).length<=0){
   return(<div>
  <Result
    icon={<SmileOutlined />}
    title="Great! No more appointments"
  />
   </div>)
  }
 
  return(
    <div className="main-22">

      <h1>Patients</h1>

      <div className="appointments-holder">
      {this.props.appointments.map(patient=><PatientCard patient={patient.initialInfo} key={patient._id}/>)}
      </div>

    </div>
  )

 };
}

export default createContainer((props)=>{
  Meteor.subscribe('patients-list',Meteor.user().profile.hospitalID);

  console.log(patientDB.find({}).fetch())
    return{ 
      appointments:patientDB.find({}).fetch(),
  };
}, PatientsHome);  