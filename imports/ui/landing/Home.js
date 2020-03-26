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

class Home extends Component{

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
    this.props.history.push('/talent/signup?email='+email);   
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
      <div className="hero-hold-inner-bg">
    <HeaderHome/>

      <Notifications />
      
        <div className="inner-hold">
          <center>
         <img className="hero-mobile" src='/img/nhero.png' />
          </center>
       
         <div className="inner-fr">
            <p className="ncc-text-title lp3224234 lp2_main">Curated Fulltime, Remote, Sponsored Visa Opportunities</p>
           <h1 className="title-main">Job-search Debunked</h1>
           <h4 className="title-sub">Tired of scanning job boards, perfecting a resume, and checking glassdoor? We go the extra mile in learning your priorities, and skills, so you can make the right career decision</h4>
         
            <div className="lp-input-holder">
                <a className="lp-232213a" href="/talent/signup"><button className="sub-btn button-two"> Get Started </button></a>

                <a className="lp-get-started-text" href="/company/signup">Are you Hiring? Sign Up, for Free</a>
            </div>
     
      
            </div>

            <div className="inner-fl">
         <img draggable="false" className="hero" src='/img/nhero.png' />
         </div>
         </div>
    
       
        </div>
        </div>
 

 
{/* 

<div className="middle-hold">
<br/>
<div className="lp_blank_43"/>
 
    <div className="job-list">
    <center>
    
    </center>
    <div className="iframe-holder">
    <h2 className="title-lp-sub lp-trending-ttl">Trending Jobs</h2>
   <br/>
    <Fade bottom>

    <a target="_blank" href="https://stackraft.com/job/Grammarly/Android-Engineer-San-Francisco-CA-56">
          <div className="fjob-div">
        
        <center>
                <img className="feat-jbs-img" src="/img/jlogos/jl1.png"/>
             

              <p className="dfeat-jobs-title">Android Engineer</p>
              <p className="dfeat-jobs-comp">Grammarly</p>
              <p className="dfeat-jobs-loc">San Francisco</p>

            </center>
          </div>
  </a>
</Fade>
<Fade bottom>

  <a target="_blank"  href="https://stackraft.com/job/Pay-By-Group/Senior-Front-End-Engineer-Remote-U.S.-Time-Zone-73">
          <div className="fjob-div">
         <center>
                <img className="feat-jbs-img" src="/img/jlogos/jl2.png"/>
         
 

              <p className="dfeat-jobs-title">React Engineer</p>
              <p className="dfeat-jobs-comp">Pay By Group</p>
              <p className="dfeat-jobs-loc">San Francisco</p>
              <p className="dfeat-jobs-loc la-label">100% Remote</p>

</center>
          
          </div>
  </a>

</Fade>
<Fade bottom>

<a target="_blank"  href="https://stackraft.com/job/Kindbody/Senior-Backend-Engineer-New-York-49">
          <div className="fjob-div">
              <center>
                <img className="feat-jbs-img" src="/img/jlogos/jl3.png"/>
           
       

              <p className="dfeat-jobs-title">Ruby Engineer</p>
              <p className="dfeat-jobs-comp">Kindbody</p>
              <p className="dfeat-jobs-loc">New York</p>
</center>
       
          </div>
</a>
</Fade>
<Fade bottom>

<a target="_blank"  href="https://stackraft.com/job/Thanx/Fullstack-Engineer-San-Francisco-CA-33">
          <div className="fjob-div">
             
             <center>
                <img className="feat-jbs-img" src="/img/jlogos/jl4.png"/>
            
            

              <p className="dfeat-jobs-title">JS Full-stack Engineer</p>
              <p className="dfeat-jobs-comp">Thanx</p>
              <p className="dfeat-jobs-loc">San Francisco</p>
              <p className="dfeat-jobs-loc la-label">100% Remote</p>

 </center>
          </div>
</a>

</Fade>
<Fade bottom>

<a target="_blank"  href="https://stackraft.com/job/Azevtec/Backend-Engineer-Golden-CO-91">
          <div className="fjob-div">

             <center>
             
                <img className="feat-jbs-img" src="/img/jlogos/jl5.png"/>
            
          

              <p className="dfeat-jobs-title">Hardware Engineer</p>
              <p className="dfeat-jobs-comp">Azevtec</p>
              <p className="dfeat-jobs-loc">Golden, Colorado</p>
              <p className="dfeat-jobs-loc la-label">VISA Sponsored</p>

              </center>
        
          </div>
</a>
</Fade>

<Fade bottom>

<a target="_blank"  href="https://stackraft.com/job/Compound-Eye/Deep-Learning-Engineer-Redwood-City-CA-41">
          <div className="fjob-div">
            
            <center>
                <img className="feat-jbs-img" src="/img/jlogos/jl6.png"/>
         

              <p className="dfeat-jobs-title">Deep Learning Engineer</p>
              <p className="dfeat-jobs-comp">Compound Eye</p>
              <p className="dfeat-jobs-loc">Redwood City</p>

</center>
            
          </div>
</a>
</Fade>

    </div>

    
    
    </div>
  
 
</div> */}
 
 
     <div className="lp-bg23">
     <center>
     <h2 className="title-lp-sub">How it Works</h2>
     <h4 className="little-sub-title-lp">FREE TO USE, PAY NO CONSULTANT FEES</h4>
     </center>
    
<div className="three-sect-hp-hold">
 
 <Fade bottom>
 
   <div className="ind-hp-sect">
   <center>
       <img className="three-jbs-img" src="/img/homepage/a1.png"/>
       <p className="hiw_title">Talent Profile</p>     
       <p className="lp-sec-text hiw-large">Showcase your projects and work done. It can be any work done for a company, a side project or open source contribution. Your age, location, gender do not matter, skills do</p>
    </center>
   </div>
 </Fade>
 
 <Fade bottom>
   <div className="ind-hp-sect ind-mt-50">
   <center>
       <img className="three-jbs-img" src="/img/homepage/a2.png"/>
       
       <p className="hiw_title">Play Challenges</p>
       <p className="lp-sec-text hiw-large">Play short 60 sec challenges for the jobs recommended for you. These are fun quizzes and in no way judge your coding capabilities
</p>
    </center>
   </div>
   </Fade>
 
 <Fade bottom>
   <div className="ind-hp-sect ind-mt-50">
   <center>
       <img className="three-jbs-img" src="/img/homepage/a3.png"/>
       <p className="hiw_title">Talent Coach</p>       
       <p className="lp-sec-text hiw-large">Your talent coach will connect with you for assistance with the job you are interested in or give you feedback on how to better showcase your work
</p>
    </center>
   </div>
   </Fade>
   
    
     </div>
   </div>
 


<Fade bottom>

<div className="lp_blank_43"/>


<div className="lp-bg24 lp-bg24-alt">
 
<div className="lp-dual-split">

   <div className="lp-dual-single ">
       <div className="div-img-h92">
         <center>
            <img className="img-i92" src="/img/homepage/challenges_hero.png"/>
         </center>
       </div>
   </div>


    <div className="lp-dual-single">
          <h2 className="title-lp-sub title-dark">Showcase your Work</h2>
          <h4 className="little-sub-title-lp lp3224234">CREATE YOUR TALENT PROFILE AND PLAY 60s Challenges</h4>
    
          <p className="lp-sec-sub lp-21-white">You always need a portfolio that shows the quality of your work. Your talent profile allows you to add your previous projects from the Play Store, App Store and Github with smart integrations to take your portfolio to another level.
</p>
    </div>


 

</div>

</div>

</Fade>
   
  <Fade bottom>

     <div className="lp_blank_43"/>

     <div className="three-sect-hp-hold">
   <center>
      <div className="hero-chal-hold">
         <img className="hero_challenges" src="/img/homepage/chl_org.png"/>
      </div>
   </center>
   </div>


   <center>
      <h2 className="title-lp-sub">A Community for Insights</h2>
      <h4 className="lp-sec-sub">You will connect you with other learners, fellow like-minded community members and Industry professionals to give you real-world insights to make more informed decisions
</h4>
   </center>


   </Fade>

   <Fade bottom>

   <div className="lp_blank_43"/>
   <div className="lp-bg24">
<div className="lp-dual-split">
 
         <div className="lp-dual-single ">
        
               <center>
                  <img className="img-i93" src="/img/homepage/coach.png"/>
               </center>
         
         </div>

         <div className="lp-dual-single">
               <h2 className="title-lp-sub title-dark">Your coach is always a text away</h2>
         
               <p className="lp-sec-sub lp-21-white">Your coach will help you improve your profile and build the confidence to succeed in interviews. Talent Coach is a real-world advocate that listens to both the employer and the candidate to help you navigate the often confusing job search.
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
      <p className="lp-sec-text">Your information on the profile and all introductions will always be private, protected and never sold to advertisers</p>
   </center>
  </div>
</Fade>

<Fade bottom>
  <div className="ind-hp-sect ind-mt-50">
  <center>
      <img className="three-jbs-img timg-resize" src="/img/homepage/pp2.png"/>
      <p className="lp-sec-title">Community</p>
      <p className="lp-sec-text">You get access to career coaches a guided job search and application process</p>
   </center>
  </div>
  </Fade>

<Fade bottom>
  <div className="ind-hp-sect ind-mt-50">
  <center>
      <img className="three-jbs-img timg-resize" src="/img/homepage/pp3.png"/>
      <p className="lp-sec-title">Speed & Savings</p>
      <p className="lp-sec-text">We learn about your priorities, and skills to introduce you to the decision makers at companies directly </p>
   </center>
  </div>
  </Fade>
 
</div>


<Fade bottom>

   <div className="lp_blank_43"/>
 
   <center>
      <h2 className="title-lp-sub">Our Partner Network</h2>   <p className="lp-sec-sub">StackRaft partners with experts to qualify and vet emerging companies</p>
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
      <p className="lp-sec-sub">Top engineering and data science talent across the globe use our platform to make their job search simple and productive</p>
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


 
   <div className="lp-dual-split">
<Fade bottom>

      <div className="testm-div">
         <div className="testm-dp-div">
            <img className="testm-dp" src="/img/homepage/t1.png"/>
         </div>

         <div className="testm-content-div"> 
               <p className="testm-name"> Bhavan Kuchibhotla</p>
               <p className="testm-text">Within 2 weeks of creating my stackraft profile, I got pitched to 5 companies and got hired within 7 days of introductions</p>
         </div>
      </div>
</Fade>

<Fade bottom>

      <div className="testm-div">
         <div className="testm-dp-div">
            <img className="testm-dp" src="/img/homepage/t4.png"/>
         </div>
         <div className="testm-content-div"> 
               <p className="testm-name">Amandeep Kaur </p>
               <p className="testm-text"> Job search is very complicated in today’s time, the personalized approach of StackRaft and guidance of career coach is very novel </p>
         </div>
      </div>
</Fade>
<Fade bottom>

      <div className="testm-div">
         <div className="testm-dp-div">
            <img className="testm-dp" src="/img/homepage/t3.png"/>
         </div>
         <div className="testm-content-div"> 
               <p className="testm-name"> Jagdeesh M </p>
               <p className="testm-text"> I’m a student and wanted to work in a research field, it is very hard to find domain specific opportunities. StackRaft helped me get introductions with companies offering research in data science </p>
         </div>
      </div>
</Fade>

<Fade bottom>


      <div className="testm-div">
         <div className="testm-dp-div">
            <img className="testm-dp" src="/img/user.png"/>
         </div>
         <div className="testm-content-div"> 
               <p className="testm-name"> Sam T </p>
               <p className="testm-text"> I applied to a company I was interested to work with and didn’t really hear back. After StackRaft made the recommendation for me, I got selected, tested and hired by them
</p>
         </div>
      </div>
   </Fade>
      
 

   </div>

  

   <div className="lp_blank_43"/>
   <div className="lp-bg24">

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
export default Home;
