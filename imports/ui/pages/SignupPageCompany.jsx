import React, { Component } from 'react';
import { withHistory, Link,withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';
import Footer from '../components/Footer';
import Rodal from 'rodal';
import {createContainer} from 'meteor/react-meteor-data';
import { candidateDB } from '../../collections/candidateDB';
var state,url;
class SignupPageCompany extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      error: '',
      modalIsOpen:false,
    };
 
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }
  componentDidMount(){

  }
 

  closeModal() {
    this.setState({modalIsOpen: false});
    window.location.href='https://stackraft.com';
  }


  handleSubmit(e){
    e.preventDefault();
    let myColor = {background: '#FF4646', text: "#FFFFFF"};
    let myColor2 = {background: '#FF1944', text: "#FFFFFF"};

    let email = document.getElementById("signup-email").value;

    let password = document.getElementById("signup-password").value;
    let company = document.getElementById("signup-company").value;

   
    var type = "hrmanager"
 
    let status = "new";
     
    var username ="";
    var account = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     

    // account == _id for the hrDB 
    for (var i = 0; i < 15; i++)
    account += possible.charAt(Math.floor(Math.random() * possible.length));

    for (var i = 0; i < 8; i++)
      username += possible.charAt(Math.floor(Math.random() * possible.length));

    if (password.replace(/ /g, '') == "" || email.replace(/ /g, '') == "" ) {
      
      notify.show("Please fill all the fields", "custom", 2000, myColor);

    }else{

            Meteor.call('CREATE_NEW_ACCOUNT_HR',username,email,password,company,account,status,type,(error)=>{
              if(error){
                
                notify.show("Email already exists", "custom", 2000, myColor2);

              }else{
                Meteor.loginWithPassword(email, password, (err) => {
                  if(err){
                    this.setState({
                      error: err.reason
                    });
                  } else {
                   
                    if (Roles.userIsInRole(Meteor.userId(), 'candidate')) {
                          this.props.history.push('/c/start');
                    }else if (Roles.userIsInRole(Meteor.userId(), 'hrmanager')) {
                      this.props.history.push('/c/begin');
                } else {
                  notify.show("Something went wrong. Try again later or contact Support", "custom", 2000, myColor);
      
                    }
                 
                  }
                });
              }

            });
 
    }
}

  render(){

    document.title = "Company Signup : Stackraft"
    const error = this.state.error;

    const qs = require('query-string');
    q = qs.parse(this.props.location.search).invite

    inviteCode = qs.parse(this.props.location.search).invite

    if(inviteCode==null){
      inviteCode="none"
    }
    if(this.props.hr!=undefined){
    inviteInst = this.props.hr.company
    }else{
      inviteInst = "none"
    }

    if(window.location.href.includes("girlscript")){
      inviteCode = "N9yx5DbLNmZXkxhNC";
      inviteInst = "GirlScript";
    }

    state = "Dfe43424cvd3__" + inviteCode + "__" + inviteInst;
    
    url = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81fx1ftmvmrrki&redirect_uri=https://stackraft.com/login/auth&state="+state;
    

    if(this.props.hr==undefined && q!=null){return(<div><br></br><center>Loading...</center></div>)}

    if(q!=null){
      var inviteText = <p className="talent-profile-join-txt"> Join  <p className="red-inline">{this.props.hr.name}</p> on Stackraft</p>
    }

    var emailAdd = null;
    if(this.props.email!=undefined ||this.props.email!=""){
       emailAdd = this.props.email
    }

    // Customized Invite Labels

    if(window.location.href.includes("girlscript")){
      var inviteText = <p className="talent-profile-join-txt"> Join  <p className="red-inline">GirlScript</p> on Stackraft</p>
    }

    // End 

    return (
      <div className="vh-bg">
        <Notifications/>
 
<div className="center-hold-signup">
 <div className="center-main-left-div"></div>
 <div className="center-main-right-div"></div>

  <div className="login-main-hold">
  <div className="login-div-left">
      <br/>
        <img className="cdb-invites" src="../../img/invite_cand.png"/> 
        <h1 className="login-headline">Headhunt global tech talent for diverse teams</h1>
       
 </div>
 

  <div className="login-div-right">

            <div className="signup-box">
              
              <center>
              <img className="login-logo-lk" src="/img/logo.png"/> 
              <p className="login-title invites-margin"><b>Signup for a Stackraft Account </b></p>

              </center>

              {/* {inviteText} */}

           
             
              { error.length > 0 ? <div className="alert-login">{error}</div> :''}
              <form id="login-form" className="form col-md-12 center-block " onSubmit={this.handleSubmit}>
                  <div className="l-form-group l-signup">
                      <input type="email" id="signup-email" className="form-control input-lg"  defaultValue={emailAdd} placeholder="Company Email"/>
                    </div>
                    <div className="l-form-group l-signup">
                      <input type="text" id="signup-company" className="form-control input-lg" placeholder="Company Name"/>
                    </div>
                    <div className="l-form-group l-signup">
                      <input type="password" id="signup-password" className="form-control input-lg" placeholder="Password"/>
                    </div>

                  <div className="l-form-group l-signup">
                    <input type="submit" id="login-button" className="login-button" value="Create your Account" />
                  </div>


                </form>
              

            </div>

{/* Mobile */}


             </div>
             </div>
          </div>
  

        <Footer/>
          </div>
      
    );
  }
}
  export default createContainer((props)=>{

    const qs = require('query-string');
    q = qs.parse(props.location.search).invite

    email = qs.parse(props.location.search).email

    
    Meteor.subscribe('candidateDB');
    theData = candidateDB.findOne({userID:q});
    return{ hr : theData, email:email };
    
  }, withRouter(SignupPageCompany));