import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';
import Header from '../components/Header'
import Footer from '../components/Footer' 


class FAQ extends Component{

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
    document.title = " FAQ : Stackraft";
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
        <div className="inner-hold-terms">
            <br/><br/><br/>
            <center><h1 className="faq-main-title">FAQ</h1></center>
            <br/>
            <br/>
           
     
                  <h3 className="faq-title">What is StackRaft?</h3>
                  <p className="faq-txt">A web platform that facilitates professional introductions for career opportunities as per mutual consent & compatibility
</p>

                  <br/>

                      
     
                  <h3 className="faq-title">Why is it built?</h3>
                  <p className="faq-txt">To simplify the complex world of job search and finding talent
</p>

                  <br/>

                      
     
                  <h3 className="faq-title">Is it another Job Board?</h3>
                  <p className="faq-txt">Nope, you play work challenges as per skills and not just send resumes
</p>

                  <br/>


                      
     
                  <h3 className="faq-title">What exactly is different on StackRaft?</h3>
                  <p className="faq-txt">Think of it like a online school where you meet your mentors, play challenges, get support with resumes, mock interviews and land best career opportunities.
</p>

                  <br/>


                      
     
                  <h3 className="faq-title">How is a Introduction made?</h3>
                  <p className="faq-txt">Our algorithm recommends you jobs as per your skills, values and career intent, then you apply with your StackRaft profile and get introduced when selected
</p>

                  <br/>



                      
     
                  <h3 className="faq-title">What kind of companies hire on StackRaft?</h3>
                  <p className="faq-txt">From early stage startups to fortune 500’s all hire at StackRaft, all growth stage tech companies! 

</p>

                  <br/>



                      
     
                  <h3 className="faq-title">Who can see my details and contact me?</h3>
                  <p className="faq-txt">Companies can only see what you allow and when you apply to work with them. Noone else can see full details on your profile, until you allow public access
</p>

                  <br/>



                      
     
                  <h3 className="faq-title">How much does it cost?</h3>
                  <p className="faq-txt">Zero, Zilch</p>

                  <br/>


                  <h3 className="faq-title">Why is it called StackRaft, it’s confusing 🙂 </h3>
                  <p className="faq-txt">We stack everything for opportunity rafts across the globe! Yeah, we are Starcraft fans too ;)
</p>

                  <br/>


                  <h3 className="faq-title">Who built StackRaft?</h3>
                  <p className="faq-txt">Optimism, curiosity and grit of a woman and a young computer science genius</p>

                  <br/>


                  <h3 className="faq-title">How do you make money?</h3>
                  <p className="faq-txt">Definitely not by selling your personal information. Also not by showing you Ads. Your privacy is the first thing we care about. Companies subscribe to get introduced to you as per work related tech challenges</p>

                  <br/>


                  <h2 className="faq-main-title">More Curious? Ok go on..</h2>

                   


     
                  <h3 className="faq-title">Who is a coach?</h3>
                  <p className="faq-txt">A coach is an expert in a particular skill say Java who creates challenges</p>

                  <br/>



     
                  <h3 className="faq-title">How do I get a coach?</h3>
                  <p className="faq-txt">When you apply for opportunities, and unlock skill levels you get introduced to your skill coaches</p>

                  <br/>



     
                  <h3 className="faq-title">Can I change or select my coach?</h3>
                  <p className="faq-txt">Coaches are assigned as per skills and mutual consent</p>

                  <br/>
 

     
                  <h3 className="faq-title">Can anyone post a job?</h3>
                  <p className="faq-txt">
Yes, as long as it’s genuine and directly from the hiring company. We validate all jobs </p>

                  <br/>



     
                  <h3 className="faq-title">What is a challenge?</h3>
                  <p className="faq-txt">It is a skill based question that helps us learn your understanding of concept. These are not puzzles, or logical reasoning questions. These challenges do not intend to evaluate your coding capabilities
</p>

                  <br/>
 
     
                  <h3 className="faq-title">How does taking challenges help?</h3>
                  <p className="faq-txt">It helps in calculating a score and overall skill assessment to match jobs and assign coaches</p>

                  <br/>

                  <h3 className="faq-title">What is the Talent Score?</h3>
                  <p className="faq-txt">Your skills and required skills for a particular job generates a talent score</p>

                  <br/>


                  <h3 className="faq-title">How is the Talent Score calculated?</h3>
                  <p className="faq-txt">As per competency, years of experience, proof of work</p>

                  <br/>




                  <h3 className="faq-title">Privacy?</h3>
                  <p className="faq-txt">Your data is secured and protected under the legal guidelines, it is never sold to advertisers</p>

                  <br/>



                  <h3 className="faq-title">How secure this is?</h3>
                  <p className="faq-txt">You have full control to permanently delete your profile anytime</p>

                  <br/>


                  <h3 className="faq-title">Its 2020, and you don’t have a mobile app?</h3>
                  <p className="faq-txt">We want to be interoperable with your current apps and softwares</p>

                  <br/>

                  <h3 className="faq-title">More?</h3>
                  <p className="faq-txt">Write to us on hello@stackraft.com</p>

                  <br/>





               

                 

              </div>
        

             

   <Footer/>
     </div>
        </div>
   
 
  );
 };
}
export default FAQ;
