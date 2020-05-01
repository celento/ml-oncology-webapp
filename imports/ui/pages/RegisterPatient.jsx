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
      s1:"show_div",
      s2:"hide_div"
    };
 
  
    this.handleSubmit = this.handleSubmit.bind(this);


    // Steps

    this.stepTwo = this.stepTwo.bind(this);
    this.stepThree = this.stepThree.bind(this);
    this.stepFour = this.stepFour.bind(this);
    this.stepFive = this.stepFive.bind(this);
    this.stepSix= this.stepSix.bind(this);
    this.submit= this.submit.bind(this);

    

    this.openNotification = this.openNotification.bind(this);


  }
  componentDidMount(){
    
  }


  openNotification = () => {
    notification.open({
      message: this.state.error_title,
      description:this.state.error,
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
    });
  };

  
  stepTwo(){
    console.log("hellow wo")

    // this.setState({
    //   s1:"anim_hide_div",
    //   s2:"anim_show_div"
    // })

    var el = document.getElementById('step1');
    console.log(el)

    for (let i=0; i<=500; i+=5) { 
      task(i); 
     
   } 

 
     
   function task(i) { 
     if(i==499){
       el.style.display="none";
     }
     setTimeout(function() { 
        el.style.marginTop = -i+"px";
        el.style.opacity = Math.round((1-i/500) * 10) / 10
         console.log(i,Math.round((1-i/500) * 10) / 10)
     }, 1/1.5*i); 
   }   
 
    
  }

  stepThree(){
    this.setState({
      s1:"anim_show_div",
      s2:"anim_hide_div"
    })

  }


  stepFour(){
    // name,age,gender,phone
    var taluk = document.getElementById('taluk').value;
    var panchayat = document.getElementById('panchayat').value;
    var ward = document.getElementById('ward').value;
  

    if(taluk==""||panchayat==""||ward==""){
      this.openNotification();
    }else{
    this.setState({
      stepThree:"disp_false",
      stepFour:"disp_true",
      taluk,panchayat,ward
    })
    }

    console.log(this.state.pincode)
  }



  stepFive(){
    // name,age,gender,phone
    var travel = document.getElementById('travel').value;
    var country = document.getElementById('country').value;
  

    if(travel=="yes" && country=="No"){
      this.setState({
        error:"Please select a country",
      })
      this.openNotification();
    }else{
    this.setState({
      stepFour:"disp_false",
      stepFive:"disp_true",
      travel,country
    })
    }
    console.log(this.state.pincode)
  }

  

  stepSix(){
    // name,age,gender,phone
    var medical = document.getElementById('medical').value;

    if(medical==""){
      this.openNotification();
    }else{
    this.setState({
      stepFive:"disp_false",
      stepSix:"disp_true",
      medical
    })
    }
    console.log(this.state.pincode)
  }

  submit(){
    console.log(this.state)

    var name = this.state.name;
    var age = this.state.age;
    var gender = this.state.gender;
    var phone = this.state.phone;

    var house = this.state.house;
    var street = this.state.street;
    var pincode = this.state.pincode;

    var taluk = this.state.taluk;
    var panchayat = this.state.panchayat;
    var ward = this.state.ward;

    var travel = this.state.travel;
    var country = this.state.country;
    var medical = this.state.medical;
    
    var categoryID = taluk+panchayat+ward;

    var userid = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 20; i++)
    userid += possible.charAt(Math.floor(Math.random() * possible.length));

    userno = userid;
    console.log(userid)

    Meteor.call('create_patient',userid,categoryID,name,age,gender,phone,house,street,pincode,taluk,panchayat,ward,travel,country,medical,(err)=>{
      if(!err){
        this.props.history.push('/p/xcv/home?id='+userid);
    
      }
    }).bind(this)
  
  }

   
  handleSubmit(e){
     
    // e.preventDefault();
   
    let name = document.getElementById("normal_signup_name").value;
    let email = document.getElementById("normal_signup_email").value;
    let password = document.getElementById("normal_signup_password").value;
    let retype = document.getElementById("normal_signup_password-repeat").value;
    let hospital = document.getElementById("normal_signup_hospital").value;
    let license = document.getElementById("normal_signup_license").value;
    let type = "doctor"
   
    console.log(name,email,password,retype,hospital,license)

    var userid = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 15; i++)
    userid += possible.charAt(Math.floor(Math.random() * possible.length));

    
    if (password !=retype) {
      
      alert("Passwords do not match");

    }else{

            Meteor.call('CREATE_NEW_ACCOUNT_DOCTOR',name,email,password,userid,hospital,license,type,(error)=>{
              if(error){
               alert(error)
              }else{
                Meteor.loginWithPassword(email, password, (err) => {
                  if(err){
                     alert("Incorrect email or password")
                  } else { 
                      this.props.history.push('/d/start');
                  }
                });
              }

            });
 
    }
}

  render(){

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
        <div className="answer_container">
           

           <div id="step1" className={"anim_div " + this.state.s1}>
             <center>
             <img src="/img/icon_m.png" className="ans_logo"/>

             <h1 className="ans_title"> <b>Welcome</b></h1>
              <p className="ans_content"> Tap Get Started to register yourself and book an appointment with a doctor around you</p>

              <Button onClick={this.stepTwo} className="getStartedbtn" type="primary">Get Started</Button>
             </center>
          
           </div>


           <div id="step2" className={"anim_div " + this.state.s2}>
             <center>
             <img src="/img/icon_m.png" className="ans_logo"/>

             <h1 className="ans_title"> <b>Hello</b></h1>
              <p className="ans_content"> Tap Get Started to register yourself and book an appointment with a doctor around you</p>

              <Button onClick={this.stepThree} className="getStartedbtn" type="primary">Get Started</Button>
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