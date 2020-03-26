import React, { Component } from 'react'
import { withHistory, Link } from 'react-router-dom'
import { createContainer } from 'meteor/react-meteor-data'

export default class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      done: false,
      email:null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
 
  }

 

  handleSubmit(e){
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    if(email.trim()!=""){
    this.setState({
      done:true,
      email:email,
    })

    var resetId = "" 

    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     
    // account == _id for the hrDB 
    for (var i = 0; i < 15; i++)
    resetId += possible.charAt(Math.floor(Math.random() * possible.length));

    Meteor.call('forgotPasswordLink',email,resetId,(err)=>{
        if(!err){
     
        }
    })
  }
  
  }


  
 

  render(){
    const error = this.state.error;
    document.title = "Forgot Password | Stackraft";


    if(!this.state.done){
      form_ui = <div><center>
      <p className="login-title">Forgot Password</p>
      </center>

      
      <form id="login-form" className="form col-md-12 center-block" onSubmit={this.handleSubmit}>
        <div className="l-form-group">
          <input type="email" id="login-email" className="form-control input-lg" placeholder="Email"/>
        </div>
      
        <div className="l-form-group text-center">
          <input type="submit" id="login-button" className="login-button" value="Continue" />
        </div>
      </form></div>;
    } else {
      form_ui = <p className="fp-success-text">If an account exists for {this.state.email}, you will get an email with instructions on resetting your password. If it doesn't arrive, be sure to check your spam folder.</p>
       

    }
     


    return (
      <div className="vh-bg-lg">


            <div className="login-box forgot-password-holder">

            <center>
          
                <img className="login-logo" src='/img/logo.png'/>
               
            </center>


            {form_ui}
 
            
            </div>
 
 </div>
    );
  }
}
