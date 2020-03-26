import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';
import Header from '../components/Header'
import Scroll from '../components/Scroll'
import Footer from '../components/Footer'
import {Helmet} from "react-helmet";


class About extends Component{

  constructor(props) {
    super(props);

    this.state = {
      showSuccessEmail: 'none',
      hideEmail:'block',
      contactForm:'auto',
      contactFormD:'block',
      repContact:'Contact Us',
      repDesc:'Got any questions? Don\'t hesitate to reach out',

   };
  }
  
  componentDidMount(){
   document.title = " About : Stackraft";
 }


render(){

  return(
    <div>

    <Header/>

         <Helmet>
                <meta charSet="utf-8" />
                <title>About Us | StackRaft</title>
                <meta name="description" content="StackRaft streamlines the hiring process such that recruiters and hiring managers can narrow down and focus on headhunting the right candidates with ease" />
            </Helmet>


    <div id="hero-hold" className="hero-hold-abt">
       
       <div className="pa-main-hold">
       
       <center>
       <img className="pa-hero-img abt-hero-img" src="/img/abt_img.png"></img>

        <p className="pa-main-head abt-main-head">Our mission is to build diverse teams 
to do great things together
</p>
        <p className="pa-main-sub abt-main-sub">StackRaft is a talent network to help product & engineering teams headhunt the right fit. 
Tech companies use our platform to hire entrepreneurial talent

</p>
        
        </center>

       
   
     </div>
   </div>
 

<div className="middle-hold pa-middle-hld abt-middle-hld">
 
 
<div className="lp_blank_43"/>

<center>
  <img src="/img/glyco/abt_users.png" className="glyco pa-mtop"/>
  <p className="pa-cnt-main-ttl">We are an ‘open source’ talent ecosystem</p>

  <p className="pa-intro-txt">Every community, every company is a unique dynamics of its people, a good balance of skills, abilities, and aspirations. As a leader, you want your people, employees, soldiers, community, and teams to come together to help transform the company for the future. And your people want the company to help transform their careers for the long term. Challenge is that of expectations mismatch over a course of time, understanding the intrinsic needs of each other and constantly work to recruit and retain the entrepreneurial talent. We are building a talent network together with our partners to identify, verify and stack such talent wherever they are, then understand who they are and what they are looking for to help companies hire the right fit for their teams. Our talent community is curated by humans and ranked by algorithms.


      </p>


</center>

<div className="lp_blank_43"/>


<div className="pa-dual-split pa-drop-sh-div">
    <div className="pa-split-ind">
 
    <p className="pa-cnt-main-ttl pa-ex-sml pa-blue-sml abt-sp34">OUR TALENT HIRING STACK</p>
  
     <p className="pa-intro-txt pa-intro-txt-sml"> StackRaft combines a recruitment platform with communities that source people data at the heart of business operations.
</p>

    </div>

    <div className="pa-split-ind">

      <img className="pa-partners-img" src="/img/abt_sauce.png"/>
    </div>


</div>


  

<div className="pa-dual-split">
   <div className="pa-split-ind">
         <center>
            <p className="abt-stat-main">600</p>
            <p className="abt-stat-sub">Verified Jobs</p>
         </center>
   </div>

   <div className="pa-split-ind">
         <center>
            <p className="abt-stat-main">8000</p>
            <p className="abt-stat-sub">Curated Talent Pool</p>
         </center>
   </div>

   <div className="pa-split-ind">
         <center>
            <p className="abt-stat-main">74</p>
            <p className="abt-stat-sub">Cities</p>
         </center>
   </div>

   <div className="pa-split-ind">
         <center>
            <p className="abt-stat-main">9</p>
            <p className="abt-stat-sub">Partners</p>
         </center>
   
   </div>

</div>


   

<center>
    <a href="/partner-program"><div className="feed-button"> BECOME A TALENT PARTNER</div></a>

</center>
<br/>
<br/>


    </div>
  

<Footer/>

</div>

  );
 };
}
export default About;
