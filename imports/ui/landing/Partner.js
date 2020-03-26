import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';
import Header from '../components/Header'
import Scroll from '../components/Scroll'
import Footer from '../components/Footer'
import Rodal from 'rodal';
import { link } from 'fs';



class Partner extends Component{

  constructor(props) {
    super(props);

    this.state = {
      visible: false,      
   };
   this.show = this.show.bind(this);
   this.addPartner = this.addPartner.bind(this);

  }

 
show() {
    this.setState({ visible: true });
}

hide() {
    this.setState({ visible: false });
}

     

  componentDidMount(){
   document.title = " Partner Program : Stackraft";
 }



 addPartner(event) {
  event.preventDefault();
  let myColor = {background: '#FF4646', text: "#FFFFFF"};
 
  var name = this.refs.name.value;
  var email = this.refs.email.value;
  var linkedin = this.refs.linkedin.value;
   
  // Execute after setState has been executed
  if (name.replace(/ /g, '') == "" || email.replace(/ /g, '') == "" || linkedin.replace(/ /g, '') == ""  ) {
      notify.show("Please enter valid details.", "custom", 2000, myColor);
  } else 
  
  {
      Meteor.call('partnerReq',name,email,linkedin,(error) => {
        if(error){
         notify.show("Something went wrong. Try again later.", "custom", 2000, myColor);
        }else{
         notify.show("Thanks! We will get back to you as soon as possible", "custom", 4000, myColor);

         Meteor.call('mail_newPartner', name,email,linkedin,(err)=>{
            
         })


        }
      })


     this.refs.name.value = "";
     this.refs.email.value  = "";
      this.refs.linkedin.value = "";


      this.hide();

  }
}



render(){

  // var clientHeight = document.getElementById('hero-hold').clientHeight;
  // console.log(clientHeight)


  return(
    <div>
    <Notifications/>
    <Header/>

      <div id="hero-hold" className="hero-hold-pa">
       
        <div className="pa-main-hold">
       
       <center>
        <img className="pa-hero-img" src="/img/partner.png"></img>
       
         <p className="pa-main-head">Let’s build diverse teams together!</p>
         <p className="pa-main-sub">As a talent partner, you will build a dream community by inviting people that you’ve worked with in the past or have discovered while working in an organization. 

</p>
         
     
</center>
        
          
        


      </div>
    </div>

      

<div className="middle-hold pa-middle-hld">
 
  <center>
      <p className="pa-intro-txt"> Your community members are your professional connections of people who you trust, like and endorse. We’ve designed a program to help amplify the impact when our networks come together to build great teams.
      </p>
  </center>

<center>
  <img src="/img/glyco/heart.png" className="glyco pa-mtop"/>
  <p className="pa-cnt-main-ttl">Who partners with StackRaft?</p>

  <p className="pa-intro-txt"> Working professionals, including Professors, Engineering Managers, Product Directors, Independent Consultants, and Senior Developers, work with StackRaft.

      </p>


</center>

<div className="pa-dual-split pa-drop-sh-div">
    <div className="pa-split-ind">

    <p className="pa-cnt-main-ttl pa-ex-sml pa-blue-sml">TALENT PARTNERS</p>
     <p className="pa-cnt-main-ttl pa-sml">ADD TALENT TO YOUR RADAR</p>
  
     <p className="pa-intro-txt pa-intro-txt-sml"> Partnering with StackRaft is the fastest way to let individuals and communities build verified professional talent teams. Whether you run your own community, meet-up or work with a large corporate, partnering with StackRaft helps you create new revenue streams and manage your professional network with people who you know closely.
</p>

    </div>

    <div className="pa-split-ind">

      <img className="pa-partners-img" src="/img/partners.png"/>
    </div>


</div>


<center>
  <img src="/img/glyco/handshake.png" className="glyco pa-mtop"/>
  <p className="pa-cnt-main-ttl">Why partner with StackRaft?
</p>

  <p className="pa-intro-txt"> 
The StackRaft Talent Partnership is designed to help you strengthen your professional connections, earn a passive income, and build your network in the Startup Ecosystem</p>


</center>

     
<p className="pa-cnt-main-ttl pa-sml pa-mtop-l">PROGRAM DETAILS</p>
  
  <p className="pa-intro-txt pa-intro-txt-sml">Whether you’re building a community network or plan to start-up in future, we’re excited to see the team that you’ll build with StackRaft.
 </p>

  
 <div className="pa-dual-split pa-drop-sh-div">
    <div className="pa-split-ind">

    <p className="pa-cnt-main-ttl pa-ex-sml pa-blue-sml"><b>BASIC</b>/FREE</p>
     <p className="pa-cnt-main-ttl pa-sml">Register as a StackRaft Talent Partner</p>
    
    <ul className="pa-ul">
        <li>Invite your close professional friends by using your personal invite link</li>
        <li>Set-up a call with a Talent Coach and ask your questions</li>
        <li>Earn when talent discovered by you gets hired</li>
        <li>Announce on social media that you pledge to build a great team </li>
        <li>Get first access to partner updates about new StackRaft features</li>

    </ul>

    </div>

    <div className="pa-split-ind">
 

    <p className="pa-cnt-main-ttl pa-ex-sml pa-blue-sml"><b>OPTIONAL</b>/$250y</p>
     <p className="pa-cnt-main-ttl pa-sml">Be a verified StackRaft Talent Investor</p>
    
    <ul className="pa-ul">
        <li>Get access to jobs and opportunities that are never listed on job boards</li>
        <li>Discover StackRaft’s talent directory</li>
        <li>Earn on recommendations for positions hard to fill</li>
        <li>Meet the team, other partners, and companies at invite-only corporate events</li>

    </ul>

    </div>


</div>

<center>
<div onClick={this.show} className="feed-button"> BECOME A TALENT PARTNER</div>
</center>
<br/>
<br/>
 
</div>
 


<Rodal width={450} height={340} className="rodal-class pa-form-modal" visible={this.state.visible} onClose={this.hide.bind(this)}>
      <div className="pa-join-form">
        <form onSubmit={this.addPartner.bind(this)}>
          <input ref="name" placeholder="Full Name" className="t-input pa-input"/>
            <br/>
            <br/>
          <input type="email" ref="email" placeholder="Email" className="t-input pa-input"/>
            <br/>
            <br/>
          <input ref="linkedin" placeholder="LinkedIn URL" className="t-input pa-input"/>
            <br/>
            <br/>
          <button type="submit" className="form-button">Submit</button>
        </form>
      </div>
</Rodal>



<Footer/>

</div>

  );
 };
}
export default Partner;
