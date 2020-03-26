import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';
import HeaderHome from '../components/HeaderHome'
import Scroll from '../components/Scroll'
import Footer from '../components/Footer'
import {Helmet} from "react-helmet";
import FooterLarge from '../components/FooterLarge';
// import Slider from "react-slick";
import Fade from 'react-reveal/Fade';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
 

function SampleNextArrow(props) {
   const {className, style, onClick} = props
   return (
     <div
       className={className}
       style={{...style, display: 'block',}}
       onClick={onClick}ƒ
     ></div>
   );
 }
 
 function SamplePrevArrow(props) {
   const {className, style, onClick} = props
   return (
     <div
       className={className}
       style={{...style, height:'40px'}}
       onClick={onClick}
     ></div>
   );
 }
 

var settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   nextArrow: <SampleNextArrow />,
   prevArrow: <SamplePrevArrow />,
   slidesToScroll: 1
 };  

class HomeEmp extends Component{

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
   this.getStarted = this.getStarted.bind(this)
  }


  earlyAccess(event){
    event.preventDefault();
    let myColor = { background: '#2579fe', text: "#FFFFFF" };
    var earlyMail=this.refs.email.value;

        // Execute after setState has been executed
          if(earlyMail.replace(/ /g,'')==""){
            notify.show("Enter your email to join the early access.", "custom", 2000, myColor);

          }else{
            this.setState({
              showSuccessEmail:'block',
              hideEmail:'none',

            }, function(){
          Meteor.call('earlyAccess',earlyMail,()=>{


          })
        });

        }

  }

  getStarted(){
    var email=this.refs.joinEmail.value;
    this.props.history.push('/company/signup?email='+email);   
  }


  contactUS(event){

    event.preventDefault();
    let myColor = { background: '#2579fe', text: "#FFFFFF" };
    var cname=this.refs.cname.value;
    var cemail=this.refs.cemail.value;
    var cmessage=this.refs.cmessage.value;


    if(cname.replace(/ /g,'')=="" || cemail.replace(/ /g,'')=="" || cmessage.replace(/ /g,'')=="" ){
      notify.show("Please fill up all the fields.", "custom", 2000, myColor);

    }else{
      this.setState({
        repContact:'Thank You',
        repDesc:'We will get back to you shortly!',
        contactForm:'0px',
      contactFormD:'none',

      }, function(){
    Meteor.call('contactUs',cname,cemail,cmessage,()=>{

    })
  });
  }


  }

  newSignUp(){
    window.location='https://stackraft.com/signup';
  }

  newTalent(){
    window.location='https://stackraft.com/talent/signup';
  }

  moreJobs(){
    window.location='https://stackraft.com/forum';
  }

  componentDidMount(){


   // function getCookie(name) {
   //    var value = "; " + document.cookie;
   //    var parts = value.split("; " + name + "=");
   //    if (parts.length == 2) return parts.pop().split(";").shift();
   //  }

   //  console.log(getCookie("meteor_login_token"))

  //  if(Meteor.userId()){
  //     window.location = "/c/start"
  //  }

  }

     
  componentWillMount(){
   

  }


render(){


  
 
 
  return(
  
    <div>

         <Helmet>
               <meta charSet="utf-8" />
               <title>Search & Pitch for Tech Jobs in US & Canada | StackRaft</title>
               <meta name="description" content="StackRaft is a global tech talent community to showcase your best work and get personalized career assistance for visa sponsored or remote jobs across North America" />
         </Helmet>

      <div id="hero-hold" className="hero-hold">
      <div className="hero-hold-inner-bg emp-bg-hero">


    <HeaderHome/>

      <Notifications />
      
        <div className="inner-hold">
          <center>
         <img className="hero-mobile" src='/img/nhero.png' />
          </center>
       
         <div className="inner-fr emp-inner-fr">
         <p className="ncc-text-title lp3224234">Pre-screened Applicants Only</p>

           <h1 className="title-main"> Hiring Humanized</h1>
           <h4 className="title-sub">We give you insights based on reliable data and answer questions that cannot be answered with CV's, grade lists or IQ tests. Our pre-screening is bias-free, data-driven and humanly intelligent</h4>
         
          
            <div className="lp-input-holder">
                <a className="lp-232213a" href="/company/signup"><button className="sub-btn button-two"> Get Started </button></a>

                <a className="lp-get-started-text" href="/talent/signup">Looking for a job? Sign Up, for Free</a>
            </div>
     
      
            </div>

            <div className="inner-fl">
         <img draggable="false" className="hero" src='/img/nhero.png' />
         </div>
         </div>
    
       
        </div>
        </div>
 

 


<div className="middle-hold">
<br/>
 
     
 
</div>
 
 
     <div className="lp-bg23">
     <center>
     <h2 className="title-lp-sub">How it Works</h2>
     <h4 className="little-sub-title-lp">FREE TO USE, PAY FOR DATA INSIGHTS</h4>
     </center>
    
<div className="three-sect-hp-hold">
 
 <Fade bottom>
 
   <div className="ind-hp-sect">
   <center>
       <img className="three-jbs-img" src="/img/homepage/e1.png"/>
       <p className="hiw_title">Post a Job</p>     
       <p className="lp-sec-text hiw-large">Our job posting tool helps you to write a job description to get the best people apply to you, simply sign-up and post a free job</p>
    </center>
   </div>
 </Fade>
 
 <Fade bottom>
   <div className="ind-hp-sect ind-mt-50">
   <center>
       <img className="three-jbs-img" src="/img/homepage/e2.png"/>
       
       <p className="hiw_title">Applications</p>
       <p className="lp-sec-text hiw-large">Our pre-screening filters applications for you to show you the closest match among everyone who showed interest working with you
</p>
    </center>
   </div>
   </Fade>
 
 <Fade bottom>
   <div className="ind-hp-sect ind-mt-50">
   <center>
       <img className="three-jbs-img" src="/img/homepage/a3.png"/>
       <p className="hiw_title">Hire</p>       
       <p className="lp-sec-text hiw-large">You can schedule interviews, manage your jobs and hiring pipeline all with a few clicks and for free
</p>
    </center>
   </div>
   </Fade>
   
    
     </div>
   </div>
 


<Fade bottom>

<div className="lp_blank_43"/>


<div className="lp-bg24 lp-bg24-alt emp-bg">
 
<div className="lp-dual-split">

   <div className="lp-dual-single ">
       <div className="div-img-h92">
         <center>
            <img className="img-i92" src="/img/homepage/show_case_team.png"/>
         </center>
       </div>
   </div>


    <div className="lp-dual-single">
          <h2 className="title-lp-sub title-dark">Showcase your team</h2>
          <h4 className="little-sub-title-lp lp3224234">Team Invites, collaboration and more..</h4>
    
          <p className="lp-sec-sub lp-21-white">Invite your team members to collaborate on the hiring process and describe your team’s culture, and values to get matched with the people in a more precise way. Your company pages will be experiential, multi-dimensional, portable, and ubiquitous to attract the best people
</p>
    </div>


 

</div>

</div>

</Fade>
   

   <Fade bottom>

  
   <div className="lp-bg24 emp-white-bg">
<div className="lp-dual-split">
 
         <div className="lp-dual-single ">
        
               <center>
                  <img className="img-i93" src="/img/homepage/coach.png"/>
               </center>
         
         </div>

         <div className="lp-dual-single">
               <h2 className="title-lp-sub">A text away is your Coach </h2>
         
               <p className="lp-sec-sub">A coach is a subject matter expert that works on specific jobs and facilitates the interview process with more data insights on a candidate. A Coach is a real-world advocate that listens to both the companies and the candidate to help rationalize the hiring negotiation and decisions
 </p>
         </div>
   </div>
   </div>
   
</Fade>





<div className="lp_blank_43"/>
   <center>
      <h2 className="title-lp-sub">Perks & Promises</h2>
      <h4 className="lp-sec-sub">We work with you as a team and not as users on a product</h4>
   </center>


<div className="three-sect-hp-hold">
 
<Fade bottom>

  <div className="ind-hp-sect">
  <center>
      <img className="three-jbs-img timg-resize" src="/img/homepage/pp1.png"/>
      <p className="lp-sec-title">Trust & Safety</p>
      <p className="lp-sec-text">Your information on the profile and all introductions will always be private, protected and never sold to advertisers or misused in anyway</p>
   </center>
  </div>
</Fade>

<Fade bottom>
  <div className="ind-hp-sect ind-mt-50">
  <center>
      <img className="three-jbs-img timg-resize" src="/img/homepage/pp2.png"/>
      <p className="lp-sec-title">Community</p>
      <p className="lp-sec-text">You get access to subject matter experts for a facilitated talent search which is a combination of data science and human intelligence</p>
   </center>
  </div>
  </Fade>

<Fade bottom>
  <div className="ind-hp-sect ind-mt-50">
  <center>
      <img className="three-jbs-img timg-resize" src="/img/homepage/pp3.png"/>
      <p className="lp-sec-title">Speed & Savings</p>
      <p className="lp-sec-text">We learn about your priorities, and skills to introduce you to talent directly, no fuss, simple and warm introductions</p>
   </center>
  </div>
  </Fade>
 
</div>


<Fade bottom>

   <div className="lp_blank_43"/>
 
   <center>
      <h2 className="title-lp-sub">Our Partner Network</h2>
      <p className="lp-sec-sub">StackRaft partners with universities, subject-matter experts, boot camps and developer communities to qualify emerging technical talent in a human way for hard-to-search attributes like entrepreneurial, linear algebra skills or geometric deep tech to make tech hiring process simple, efficient and economical</p>
   </center>

   <div className="three-sect-hp-hold">
        
        
               <center>
                  <img className="img-i93" src="/img/homepage/partner_logos.png"/>
               </center>
         
   
   </div>
 
</Fade>


<Fade bottom>

   <div className="lp_blank_43"/>
 
   <center>
      <p className="title-lp-sub">Don't take our word for it</p>
      <p className="lp-sec-sub">Top engineering and data science talent across the globe use our platform to make their hiring simple and productive</p>
   </center>

   <div className="three-sect-hp-hold no-margin-top">
        
        
               <center>
                 <a  target="_blank" href="https://yourstory.com/2019/03/job-board-introduction-networking-uqmw376231" className="a-press">
                  <img className="img-press" src="/img/press/pr1.png"/> </a>

                  <a target="_blank"  href="https://qz.com/india/1579747/as-trump-tightens-us-h-1b-norms-jobs-move-to-canada/" className="a-press">
                  <img className="img-press img-p-class1" src="/img/press/pr2.png"/> </a>


                  <a  target="_blank" href="https://economictimes.indiatimes.com/nri/visa-and-immigration/canada-trumps-us-opens-h-1b-doors-to-indians/articleshow/69017275.cms" className="a-press">
                  <img className="img-press" src="/img/press/pr3.png"/> </a>


                  <a  target="_blank" href="https://timesofindia.indiatimes.com/business/international-business/canada-holds-doors-wide-open-for-indians/articleshow/68804155.cms" className="a-press">
                  <img className="img-press img-p-class2" src="/img/press/pr4.png"/> </a>


                  <a  target="_blank" href="https://e27.co/30-women-entrepreneurs-selected-for-zone-startups-empowe-20181123/" className="a-press">
                  <img className="img-press img-p-class2" src="/img/press/pr5.png"/> </a>


                  <a  target="_blank" href="https://www.mercurynews.com/2019/03/27/h-1b-u-s-employers-say-canadas-immigration-policies-better-as-tech-booms-north-of-border/" className="a-press">
                  <img className="img-press" src="/img/press/pr6.png"/> </a>


                  <a target="_blank" href="https://www.peoplematters.in/article/pmtac/how-stackraft-is-bridging-the-indo-canadian-technical-talent-divide-without-resumes-21368" className="a-press">
                  <img className="img-press img-p-class1" src="/img/press/pr7.png"/> </a>
               </center>
         
   
   </div>
 
</Fade>

  
   <div className="lp_blank_43"/>
   <div className="lp-bg24 emp-bg">

   <center>
      <h2 className="title-lp-sub title-dark">Sign-up Now, for Free</h2>
    
      <br/>
      <div className="sn-input-holder">
         <input  ref="joinEmail" className="sn-input-hp" type="email" placeholder="Email Address"/>
         <button onClick={this.getStarted} type="submit" className="sn-submit-btn">Submit</button>
      </div>
      </center>
 <center>
      <p className="ncc-text lp3224234">Simple, fast setup, no credit card required</p>
</center>
   
   </div>
 
<FooterLarge/>
</div>
 
  );
 };
}
export default HomeEmp;
