import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';
import Header from '../components/Header'
import Footer from '../components/Footer';


class Pricing extends Component{

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
    document.title = " Pricing : Stackraft";
  }

  
  newSignUp(){
    window.location='https://stackraft.com/signup';
  }

  newTalent(){
    window.location='https://stackraft.com/candidate/invitation';
  }
render(){
  return(
    <div>
        <Header/>

      <div>
      <Notifications />
      <div className="blue-bg">
        <div className="inner-hold">
        <center> 
        <h1 className="pricing-title">Simple, transparent pricing</h1>
        <h3 className="pricing-sub-title">Always know what you'll Pay
        </h3>

        </center>

        </div>
      </div>


      <div className="inner-hold hold-big">

        <div className="pricing-box-holder">

        <div className="pricing-box">

        <center>
            <p className="pr-box-main-title">Remote - Independent Consultant</p>
            {/* <p className="pr-box-sub-title">Best fit for early stage teams</p> */}
        </center>
        
        <center>
          <p className="price-amount">$0<span className="per-month">/mo</span></p>
        </center>

        <ul className="pr-feat-ul">
          <li className="pr-feat-li">Unlimited Jobs</li>
          <li className="pr-feat-li">Engagement Period - Hourly/Daily/Monthly</li>
          <li className="pr-feat-li">30% of every payout</li>
        </ul>

 
    
        <div className="choose-plan-button">
        <a className="no_und" href="https://stackraft.com/signup">
          <p className="cp-bgn-txt"> CREATE ACCOUNT</p>
        </a>
        </div>

        </div>

       
       
       
       
       <div className="pricing-box">
       <center>
            <p className="pr-box-main-title">Contractual - Project Based</p>
            {/* <p className="pr-box-sub-title">Scaling and growth stage teams</p> */}
        </center>
        
        <center>
          <p className="price-amount">$199<span className="per-month">/mo</span></p>
        </center>

        <ul className="pr-feat-ul">
          <li className="pr-feat-li">Unlimited Jobs</li>
          <li className="pr-feat-li">Engagement Period - 3/6/12/18 Months</li>
          <li className="pr-feat-li">20% of the total project value</li>
 
          
        </ul>

 
    
        <div className="choose-plan-button">
        <a className="no_und" href="https://stackraft.com/signup">
          <p className="cp-bgn-txt">UPGRADE</p>
        </a>
        </div>

       </div>
 

      <div className="pricing-box">
       <center>
            <p className="pr-box-main-title">Permanent Hire</p>
            {/* <p className="pr-box-sub-title">Enterprise level teams</p> */}
        </center>
        
        <center>
          <p className="price-amount">$2000<span className="per-month">/mo</span></p>
        </center>

        <ul className="pr-feat-ul">
          <li className="pr-feat-li">Talent as a Service</li>
          <li className="pr-feat-li">Automated headhunting with human and machine Intelligence</li>
          <li className="pr-feat-li">Engagement Period -  As agreed</li>
          <li className="pr-feat-li">10% of the annual pay</li>
          
        </ul>

 
    
        <div className="choose-plan-button">
        <a className="no_und" href="mailto:vartika@stackraft.com?subject=Stackraft Premium Account">
          <p className="cp-bgn-txt">TALK TO US</p>
        </a>
        </div>

       </div>


  <div className="info">
    <center>
    <p className="main-title main-padding">Hiring the best, beyond the Resume</p>
    <p className="sub-title main-padding">Quick setup · Unlimited Jobs · Pay for relevancy and high quality matches ·  Top talent recommendations</p>
    </center>

  </div>

 <div className="three_holder">
      <div className="three_inner">
        <center><p className="three_title">75% Accuracy</p>
        <p className="three_content">Sourced from over 100,000 profiles from top engineering colleges, ranked by algorithms, qualified by coding tests and curated by humans</p></center>
      </div>

       <div className="three_inner">
        <center><p className="three_title">Speed</p>
        <p className="three_content">Candidates respond to introductions within 48 hours, no middleman and no gaps in communication. Connect, interview, and hire</p></center>
      </div>


       <div className="three_inner">
        <center><p className="three_title">$<span className="light_dollar">$$</span></p>
        <p className="three_content">There’s no fee to post a job or get introductions with candidate. You pay as per usage, relevancy and quality of recommendations</p></center>
      </div>
 </div>

    <div className="btm_div">
   
    </div>
 
        </div>



      </div>

<Footer/>
     </div>
        </div>
   
 
  );
 };
}
export default Pricing;
