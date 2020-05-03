import React, { Component, useReducer } from 'react';
import { withHistory, Link,withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';
import {Helmet} from "react-helmet";
 
import Rodal from 'rodal';
import {createContainer} from 'meteor/react-meteor-data';
 
import { PropagateLoader} from 'react-spinners';
import { css } from 'react-emotion';
import { Button, notification } from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import { Radio } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;
const override = css`
    display: block;
    border-color: red;
`;


 

var state,url;

var userno=null;
class RegisterPatient extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      error: '',
      age:null,
      gender:null,
      s1:"animation_div",
      s2:"animation_div anim_hide",
      s3:"animation_div anim_hide",
      s4:"animation_div anim_hide",
      s5:"animation_div anim_hide",

    };
 
   

    // Steps
    this.stepOne = this.stepOne.bind(this);
    this.stepTwo = this.stepTwo.bind(this);
    this.stepThree = this.stepThree.bind(this);
    this.stepFour = this.stepFour.bind(this);
    this.stepFive = this.stepFive.bind(this);
  

    

    this.openNotification = this.openNotification.bind(this);

    this.onChangeAge=this.onChangeAge.bind(this);
    this.onChangeGender=this.onChangeGender.bind(this);



  }
  componentDidMount(){
    
  }


  openNotification = (msg,desc) => {
    notification.open({
      message: msg,
      description:desc,
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
    });
  };

// Welcome
  stepOne(){
    // Animation 
    this.setState({
      s1: "animation_div anim_hide",
      s2:"animation_div"
    })
  
  }

// Name
  stepTwo(){
  
    var name = document.getElementById('g_name').value;

    if(name.trim()==""){
      this.openNotification("Oops!","Enter your name to continue")
    }else{
    // Data Store
    this.setState({
      name: name,
    })
    // Animation 
    this.setState({
      s2:"animation_div anim_hide",
      s3:"animation_div"
    })
   }
  }

// Age + Gener
  stepThree(){
    var age = this.state.age;
    var gender = this.state.gender;
    
    if(age == null || gender == null){
      this.openNotification("Oops!","Fill up both your age and gender")
    }else{
    // Animation 
    this.setState({
      s3:"animation_div anim_hide",
      s4:"animation_div"
    })
    }
  }


// Mobile Number
  stepFour(){
    var mobile = document.getElementById('g_mobile').value;

    if(mobile.trim()==""){
      this.openNotification("Oops!","Enter your mobile number")
    }else{
    this.setState({
      mobile:mobile,
    })
      // Animation
      this.setState({
        s4:"animation_div anim_hide",
        s5:"animation_div"
      })
    }
  }

  
// Finish
  stepFive(){
 
    var hash = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 20; i++)
    hash += possible.charAt(Math.floor(Math.random() * possible.length));
    // console.log(hash)

    var name = this.state.name;
    var age = this.state.age;
    var gender = this.state.gender;
    var mobile = this.state.mobile;

    Meteor.call('registerPatient',hash,name,age,gender,mobile,(err)=>{

      if(err){
        this.openNotification('Error!',"Something went wrong. Try again later")
      }else{
        console.log("Done");
      }

    })

  }


  onChangeGender(e) {
    this.setState({
      gender:e.target.value,
    })
    // console.log(`radio checked:${e.target.value}`);
  }
  onChangeAge(value) {
    this.setState({
      age:value,
    })  
    // console.log(`selected ${value}`);
  }
 
   
 

  render(){

    var ageGenerator = []
    for(var i=1;i<120;i++){
      var x = <Option value={i}>{i}</Option>
      ageGenerator.push(x)
    }
    

    <Helmet>
    <meta charSet="utf-8" />
    <title>SignUp</title>
    <meta name="description" content="Sin to your Account" />
  </Helmet>

    const error = this.state.error;
    // End 

    return (
      <div className="ans-bg">
        <Notifications/>

        {/* Welcome */}
        <div className={"answer_container "+ this.state.s1}>
        
           <div id="step1">
             <center>
             <img src="/img/icon_m.png" className="ans_logo"/>

             <h1 className="ans_title"> <b>Welcome</b></h1>
              <p className="ans_content"> Tap Get Started to register yourself and book an appointment with a doctor around you</p>

              <Button onClick={this.stepOne} className="getStartedbtn" type="primary">Get Started</Button>
             </center>
          
           </div>
      </div>

      {/* Name */}
      <div className={"answer_container "+ this.state.s2}>

        <div id="step2">
          <center>
          <img src="/img/icon_m.png" className="ans_logo"/>

          <p className="ans_content">Name</p>
    
          <Input id="g_name" size="large" placeholder="Full Name" prefix={<UserOutlined />} />

          <Button onClick={this.stepTwo} className="getStartedbtn" type="primary">Next</Button>
          </center>

        </div>

        </div>


      {/* Gender & Age */}
      <div className={"answer_container "+ this.state.s3}>

           <div id="step3">
             <center>
             <img src="/img/icon_m.png" className="ans_logo"/>
 
              <p className="ans_content">Gender & Age</p>
              <Radio.Group size="large" onChange={this.onChangeGender}>
                <Radio.Button value="Male">Male</Radio.Button>
                <Radio.Button value="Female">Female</Radio.Button>
              </Radio.Group> &nbsp;&nbsp;
              <Select size="large" defaultValue="Age" style={{ width: 120 }} onChange={this.onChangeAge}>
                {ageGenerator}
              </Select>

              <Button onClick={this.stepThree} className="getStartedbtn" type="primary">Next</Button>
             </center>
          
           </div>

        </div>

        {/* Mobile Number */}
        <div className={"answer_container "+ this.state.s4}>

          <div id="step4">
            <center>
            <img src="/img/icon_m.png" className="ans_logo"/>

            <p className="ans_content">Mobile Number</p>

            <Input type="number" id="g_mobile" size="large" placeholder="Enter you Mobile Number" prefix={<UserOutlined />} />

            <Button onClick={this.stepFour} className="getStartedbtn" type="primary">Next</Button>
            </center>

          </div>

      </div>


       {/* Finish */}
       <div className={"answer_container "+ this.state.s5}>
        
        <div id="step1">
          <center>
          <img src="/img/icon_m.png" className="ans_logo"/>

          <h1 className="ans_title"> <b>Done</b></h1>
           <p className="ans_content"> You have successfully completed the registration.</p>

           <Button onClick={this.stepFive} className="getStartedbtn" type="primary">Finish</Button>
          </center>
       
        </div>
       </div>





      </div>
       
      
    );
  }
}
  export default createContainer((props)=>{
  
    return{v:null}
    
  }, withRouter(RegisterPatient));