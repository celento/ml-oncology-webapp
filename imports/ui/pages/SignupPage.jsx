import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';

export default class SignupPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let myColor = {background: '#FF4646', text: "#FFFFFF"};

    let name = document.getElementById("signup-name").value;
    let company = document.getElementById("signup-company").value;
    let designation = document.getElementById("signup-username").value;  
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    var invitation = "none"
    var hrID="";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 8; i++)
      hrID += possible.charAt(Math.floor(Math.random() * possible.length));

    if (name.replace(/ /g, '') == "" || email.replace(/ /g, '') == "" || company.replace(/ /g, '') == "" || password.replace(/ /g, '') == "" || designation.replace(/ /g, '') == "") {
      
      notify.show("Please fill all the fields", "custom", 2000, myColor);

    }else{
  
      Meteor.call('ACC_NEW_HR',name,email,password,company,designation,(error)=>{
              if(error){
             
              }else{
                Meteor.loginWithPassword(email, password, (err) => {
                  if(err){
                    this.setState({
                      error: err.reason
                    });
                  } else {
                   
                    if (Roles.userIsInRole(Meteor.userId(), 'hrmanager')) {
                          this.props.history.push('/p/home');
                          
                    }else{
                      this.props.history.push('/login/hr');
                    }
                 
                  }
                });
              }

            });
    }
  }

  render(){
    const error = this.state.error;
    return (
      <div className="vh-bg">
        <Notifications/>
<div className="header-signup">
  <center>
    <img className="login-logo signup-logo" src='/img/logo.png'/>
  </center>
</div>

        <div className="center-hold-signup">
<div className="login-main-hold">
  <div className="login-div-left">
  <img className="cdb-invites" src="../../img/signup_hr.png"/> 
        <h1 className="login-headline">Interview Top Tech Talent</h1>
        <p className="login-sub"> Get access to a new pool of high-quality, diverse talent pool who might never have applied to your jobs</p>
  </div>

  <div className="login-div-right">
 
            <div className="signup-box">

               <center>
              <p className="login-title signup-margin"><b>Sign Up for a Stackraft account</b></p>
              </center>
              { error.length > 0 ? <div className="alert-login">{error}</div> :''}
               

               <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81fx1ftmvmrrki&redirect_uri=https://stackraft.com/login/auth&state=DCEeFWf45A53sdfKef424">Sign In with Linkedin</a>

            </div>

          </div>

          </div>
          </div>
         
          </div>
      
    );
  }
}
