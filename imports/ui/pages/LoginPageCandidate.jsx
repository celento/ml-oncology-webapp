import React, { Component } from 'react'
import { withHistory, Link } from 'react-router-dom'
import { createContainer } from 'meteor/react-meteor-data'
import {Helmet} from "react-helmet";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
 
export default class LoginPageCandidate extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
 
  }

  handleSubmit(e){



    // e.preventDefault();


    const qs = require('query-string');
    q = qs.parse(this.props.location.search).redirect


    if (q==undefined){
      gohr = '/c/start';
      go = '/c/start';
    } else {
      go = q;
      gohr = q;
    }

 

    let email = document.getElementById('normal_login_username').value;
    let password = document.getElementById('normal_login_password').value;   
    
    console.log(email + "/" +password)
    Meteor.loginWithPassword(email, password, (err) => {
      if(err){
        this.setState({
          error: err.reason
        });
      } else {

        // Meteor.call('mail_newCandidate',12312,"random person","ajay.thakur@litmuspreviews.com",(err)=>{
        //   if(!err){
 
        //   }
        // })


      

        Meteor.call('setUserID',email,Meteor.userId(),(err)=>{
            if(!err){
               
            }
        })
       
        if (Roles.userIsInRole(Meteor.userId(), 'candidate')){
          this.props.history.push(go);
        } else if(Roles.userIsInRole(Meteor.userId(), 'hrmanager')) {
         
              this.props.history.push(gohr);
        }else{
          this.setState({
           error : 'No Talent Account found. Please create one and try again.'           
          });
        }
     
      }
    });
  }
 
  

  render(){
    const error = this.state.error;



    return (
      <div className="vh-bg-lg">
 
            <div className="login-box">
            <center>


             
          <a href="/">
            <img className="login-logo" src='/img/icon_m.png'/>
            </a>


            </center>


            <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={this.handleSubmit} 
    >
      <Form.Item
        name="username" id="login-email"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password" id="login-password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item  name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
         &nbsp;&nbsp;or <a href="">register now!</a>
      </Form.Item>
    </Form>
              {/* <center>
              <p className="login-title">Login to your Stackraft Account</p>
              </center> */}

            

              {/* { error.length > 0 ? <div className="alert-login">{error}</div> :''}
              <form id="login-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit}>
                <div className="l-form-group">
                  <input type="email" id="login-email" className="form-control input-lg" placeholder="Email"/>
                </div>
                <div className="l-form-group">
                  <input type="password" id="login-password" className="form-control input-lg" placeholder="Password"/>
                </div>
                <div className="l-form-group text-center">
      
                 
                </div>
                <div className="form-group text-center">
                  <center>
                  <p className="text-center sign-up-link"><Link className="alink" to="/login/forgot">Forgot Password</Link></p>
                  
                  <p className="text-center sign-up-link sign-up-link-dec "><Link className="alink" to="/talent/signup">Create a Talent Account </Link> |  <Link className="alink" to="/company/signup"> Create a Company Account </Link></p>
                  
                  </center>
                </div>
              </form> */}
            </div>
            {/* <div className="footer-cp">
            <center>

            <p className="copyright-login">© 2018 Stackraft Inc. All rights reserved.</p> 
                </center>


                </div> */}
 </div>
    );
  }
}
