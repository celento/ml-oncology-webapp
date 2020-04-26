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
import {Badge, Spin,Result,Empty,Button,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { patientDB } from '../../collections/patientDB';
// import AshaContainer from '../containers/AshaContainer';
// import AshaUserCard from './components/AshaUserCard';
import { SmileOutlined,SearchOutlined } from '@ant-design/icons';
import { appointmentsDB } from '../../collections/appointmentsDB';
import AppointmentCard from '../doctor/components/AppointmentCard';
import { testDB } from '../../collections/testDB';
import TestCard from '../doctor/components/TestCard';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



class Tests extends TrackerReact(React.Component){

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
  if(!this.props.test){
    return(<div><Spin size="large" /></div>)
  }
  // console.log(this.props.patientList);

  // console.log(Object.keys(this.props.patientList).length)

  if(Object.keys(this.props.test).length<=0){
   return(<div>
  {/* <Result
    icon={<SmileOutlined />}
    title="Great! No more appointments"
  /> */}
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <Empty description="Nothing to show here" />
   </div>)
  }
 
  return(
    <div className="main-22">

      <h1>Test</h1>

<br/>
 
       
      <h3>Queue</h3>
      <br/>

      {this.props.test.map(test=>(
        <div>
          <TestCard key={test._id} test={test}/>
          <br/>
        </div>
  
      ))}



    

    </div>
  )

 };
}

export default createContainer((props)=>{
  Meteor.subscribe('test-all',Meteor.user().profile.hospitalID);
  
  console.log(testDB.find({}).fetch())
    return{ 
      test:testDB.find({}).fetch(),
  };
}, Tests);  