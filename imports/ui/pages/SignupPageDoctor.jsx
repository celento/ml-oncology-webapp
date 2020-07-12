import React, { Component } from 'react';
import { withHistory, Link,withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';
import {Helmet} from "react-helmet";
 
import Rodal from 'rodal';
import {createContainer} from 'meteor/react-meteor-data';
 
import { PropagateLoader} from 'react-spinners';
import { css } from 'react-emotion';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined,BankOutlined,MailOutlined,IdcardOutlined } from '@ant-design/icons';

const override = css`
    display: block;
    border-color: red;
`;
var state,url;
class SignupPageDoctor extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      error: '',
      modalIsOpen:false,
      loading:false,
      

    };
 
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }
  componentDidMount(){
    
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
    
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
                      this.props.history.push('/d/home');
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
      <div className="vh-bg">
        <Notifications/>
  
 
        
        <div className="login-box">
            <center>


             
          <a href="/">
            <img className="login-logo" src='/img/icon_m.png'/>
            </a>


            </center>
 


            <Form
      name="normal_signup"
      className="signup-form"
      initialValues={{ remember: true }}
      onFinish={this.handleSubmit}
    >
      <Form.Item
        name="name" id="login-name"
        rules={[{ required: true, message: 'Please input your Full Name' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        name="email" id="login-email"
        rules={[{ required: true, message: 'Please input your Email Address' }]}
      >
        <Input type="email" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email Address" />
      </Form.Item>

      <Form.Item
        name="license" id="signup-license"
        rules={[{ required: true, message: 'Please input your License No.' }]}
      >
        <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="License Number" />
      </Form.Item>


      <Form.Item
        name="hospital" id="signup-hospital"
        rules={[{ required: true, message: 'Please input the Hospital Name' }]}
      >
        <Input prefix={<BankOutlined className="site-form-item-icon" />} placeholder="Hospital" />
      </Form.Item>


      <Form.Item
        name="password-repeat" id="login-password"
        rules={[{ required: true, message: 'Please input your Password' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="password" id="login-password"
        rules={[{ required: true, message: 'Please retype your Password' }]}
      >
      <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

     
      <Form.Item>
        <Button  size="large" type="primary" htmlType="submit" className="login-form-button full-width-button">
          Sign Up
        </Button>
         &nbsp;&nbsp;or <a href="/login">Already have an account?</a>
      </Form.Item>
    </Form>
              
              
            </div>
 

             </div>
       
      
    );
  }
}
  export default createContainer((props)=>{
  
    return{v:null}
    
  }, withRouter(SignupPageDoctor));