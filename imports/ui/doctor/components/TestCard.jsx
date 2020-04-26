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
import { Button, Card, Avatar,Modal,message ,Tabs} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
 
 

const { TabPane } = Tabs;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const { confirm } = Modal;
 
class TestCard extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
    
      key: 'tab1',
   };
 
   this.onTabChange=this.onTabChange.bind(this);
   this.navigate=this.navigate.bind(this);

    
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  
  navigate(){

    if(this.props.test.test="Brain Cancer"){
      this.props.history.push('/d/test/brain/'+this.props.test.patientID);
    }else if(this.props.test.test="Blood Cancer"){
      this.props.history.push('/d/test/blood/'+this.props.test.patientID);
    }else if(this.props.test.test="Breast Cancer"){
      this.props.history.push('/d/test/breast/'+this.props.test.patientID);
    }else{
      this.props.history.push('/d/test/skin/'+this.props.test.patientID);
    }
 
  }


   
  componentWillMount(){
 
  }

 
  componentDidMount(){
    
    console.log(this.props.test)
   
  }


 
 
render(){  
  function callback(key) {
    console.log(key);
  }
 
  
  return(
 
      <Card key={this.props.test.key}
          style={{ width: '100%' }}
          title={this.props.test.name}
          
           
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Test Details" key="1">
  <p className="test_name"><b>{this.props.test.test}</b></p>
  <p> Appointment : {this.props.test.date} </p>
  <br/>
  <Button onClick={this.navigate} type="primary"> Perform {this.props.test.test} Test</Button>
    </TabPane>
    <TabPane tab="Doctors Notes" key="2">
      {this.props.test.notes == "" ? <p>No Additional Notes</p> : <p>{this.props.test.notes}</p>}
    </TabPane>
 
  </Tabs>
  <br/>

        </Card>
  
  )

 };
}
export default withRouter(TestCard);  