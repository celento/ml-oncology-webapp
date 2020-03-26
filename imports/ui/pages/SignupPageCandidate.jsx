import React, { Component } from 'react';
import { withHistory, Link,withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';
import Footer from '../components/Footer';
import Rodal from 'rodal';
import {createContainer} from 'meteor/react-meteor-data';
import { candidateDB } from '../../collections/candidateDB';
import { PropagateLoader} from 'react-spinners';
import { css } from 'react-emotion';
import { partnerDB } from '../../collections/partnerDB';
import { InvitesHR } from '../../collections/InvitesHR';

const override = css`
    display: block;
    border-color: red;
`;
var state,url;
class SignupPageCandidate extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      error: '',
      modalIsOpen:false,
      loading:false,
      theButton :<a onClick={this.handleSubmit.bind(this)}><button id="login-button" className="login-button" value="Create your Account">Create an Account</button></a>,

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
    this.setState({

      theButton:<div className="center-align-cand-login"><PropagateLoader
      className={override}
      sizeUnit={"px"}
      size={40}
      color={'#3a22f8'}
      loading={true}
    /></div>,

    })
    e.preventDefault();
    let myColor = {background: '#FF4646', text: "#FFFFFF"};
    let myColor2 = {background: '#FF1944', text: "#FFFFFF"};

    let email = document.getElementById("signup-email").value;

    let password = document.getElementById("signup-password").value;
    let username = document.getElementById("signup-username").value;


    
    const qs = require('query-string');
    q = qs.parse(this.props.location.search).invite

    inviteCode = qs.parse(this.props.location.search).invite

    
    if(inviteCode==null){
      inviteCode="none"
    }

    if(this.props.partner!=undefined){
    // inviteInst = this.props.hr.company
    inviteInst = "none"
    }else{
      inviteInst = "none"
    }
 
    var type = "candidate"
 
    let status = "new";
     
    var account = "";
    var canid = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     

    // account == _id for the hrDB 
    for (var i = 0; i < 15; i++)
    account += possible.charAt(Math.floor(Math.random() * possible.length));

    for (var i = 0; i < 8; i++)
    canid += possible.charAt(Math.floor(Math.random() * possible.length));

    if (password.replace(/ /g, '') == "" || email.replace(/ /g, '') == "" || username.replace(/ /g, '') == "" ) {
      
      notify.show("Please fill all the fields", "custom", 2000, myColor);


      this.setState({
        theButton :<a onClick={this.handleSubmit.bind(this)}><button id="login-button" className="login-button" value="Create your Account">Create an Account</button></a>,

      })

    }else{

            Meteor.call('CREATE_NEW_ACCOUNT_TALENT',username,email,password,account,canid,status,type,inviteCode,inviteInst,(error)=>{
              if(error){
         
                notify.show("Email/Username already taken", "custom", 2000, myColor2);

                this.setState({
                  theButton :<a onClick={this.handleSubmit.bind(this)}><button id="login-button" className="login-button" value="Create your Account">Create an Account</button></a>,

                })

                 


              }else{
                Meteor.loginWithPassword(email, password, (err) => {
                  if(err){
                    this.setState({
                      error: err.reason
                    });
                  } else { 
                   
                    if (Roles.userIsInRole(Meteor.userId(), 'candidate')) {
                      document.cookie = "inviteCode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                          this.props.history.push('/c/start');
                    }else if (Roles.userIsInRole(Meteor.userId(), 'hrmanager')) {
                      this.props.history.push('/c/start');
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

    document.title = "Talent Signup : Stackraft"
    const error = this.state.error;
 
    const qs = require('query-string');
    q = qs.parse(this.props.location.search).invite

    inviteCode = qs.parse(this.props.location.search).invite


    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    var stored_cookie = getCookie("inviteCode")

 
    if(inviteCode==null){
      inviteCode=stored_cookie
    }

    if(inviteCode==null || inviteCode.trim()==""){
      inviteCode="none"
    }
  
  
    if(this.props.partner!=undefined){
    inviteInst = this.props.partner.company

    // Invite Cookie
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "inviteCode=" + inviteCode + ";" + expires + ";path=/";
    
    }else{
      inviteInst = "none"
    }

    state = "S34mfkDemdfd__" + inviteCode + "__" + inviteInst;
    
    url = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81fx1ftmvmrrki&redirect_uri=https://stackraft.com/login/auth&state="+state;
    
 


    if(this.props.partner==undefined && inviteCode!="none"){return(<div><br></br><center>Loading...</center></div>)}

    if(q!=null || stored_cookie.trim()!=""){
      var inviteText = <p className="talent-profile-join-txt"><p className="red-inline">{this.props.partner.company}</p></p>
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
        <h1 className="login-headline">Go International with top tech companies</h1>
       
 </div>
 

  <div className="login-div-right">

            <div className="signup-box">
            <center>
              <img className="login-logo-lk" src="/img/logo.png"/> 
              <p className="login-title invites-margin"><b>Signup for a Stackraft Talent Account </b></p>

              {inviteText}

              </center>

              {/* {inviteText} */}

           
             
              { error.length > 0 ? <div className="alert-login">{error}</div> :''}
              <form id="login-form" className="form col-md-12 center-block " onSubmit={this.handleSubmit}>
                    <div className="l-form-group l-signup">
                      <input type="text" id="signup-username" className="form-control input-lg" placeholder="Username"/>
                    </div>
                  <div className="l-form-group l-signup">
                      <input type="email" defaultValue={emailAdd}  id="signup-email" className="form-control input-lg" placeholder="Email" />
                  </div>
                  <div className="l-form-group l-signup">
                      <input type="password" id="signup-password" className="form-control input-lg" placeholder="Password"/>
                  </div>

                  <div className="l-form-group l-signup">
                    {this.state.theButton}
                  </div>
                

                </form>
              
              
            </div>
 

             </div>
             </div>

             <Footer/>

          </div>
  

       
          </div>
      
    );
  }
}
  export default createContainer((props)=>{
  
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    var stored_cookie = getCookie("inviteCode")

    const qs = require('query-string');
    q = qs.parse(props.location.search).invite
 

    var i_code = q;
    if(i_code==undefined || i_code=="" || i_code==null){
      i_code = stored_cookie
    }
 
    email = qs.parse(props.location.search).email

    Meteor.subscribe('partner-single',i_code);

 

    theData = partnerDB.findOne({userID:i_code})
    return{ partner : theData,email};
    
  }, withRouter(SignupPageCandidate));