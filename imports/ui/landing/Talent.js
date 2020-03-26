 import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';
import Header from '../components/Header'
import Footer from '../components/Footer' 



class Talent extends Component{

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
    document.title = " Talent : Stackraft";
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
        <div className="inner-hold">
            <br/><br/><br/>
            <center><h1 className="faq-main-title thin-title">Featured Talent</h1>
            
            </center>
            <br/>
            <br/>
            <div className="faq-split dis-inline">

              <a href="https://stackraft.com/profile/26NiFVk2?view=userid" target="_blank">
                <div className="talent-box tbg-1">
                  <div className="talent-box-left">
                       <img src="https://media.licdn.com/dms/image/C4E03AQEhDiwmfmwr2g/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=7btcl899wzgNQx1Ufy1HkPx44RBfXF4HzbCy_gYET0g" className="talent-feat-img"/>
                       
                  </div>
                  <div className="talent-box-right">
                      <p className="talent-feat-txt">
                      At the age of 18, I created a web application for a FinTech startup which is running for 3 years now with zero down time.
                      </p>
                      <p className="talent-name">Saurabh Gupta</p>
                      <p className="talent-sub">Skilled in Python, JS and C++ with interest in Data Science</p>

                    </div>
                </div>
              </a>

               <a href="https://stackraft.com/profile/xj6ZeNpA?view=userid" target="_blank">
                <div className="talent-box tbg-1">
                <div className="talent-box-left">
                    <img src="https://media.licdn.com/dms/image/C5603AQFscrcrPN0FmQ/profile-displayphoto-shrink_800_800/0?e=1544659200&v=beta&t=Sk5BPGtAPNY1UEgN61mOk4Ee4uBmO2oVS9hRKSUOLHc" className="talent-feat-img"/>
               
                  </div>
                  <div className="talent-box-right">
                    <p className="talent-feat-txt">I used data science to reduce component cost of critical power-plant equipments, liquidate non-moving and slow-moving inventory, optimize manufacturing and effectively carry out predictive maintenance and failure analysis.
                    </p>
                    <p className="talent-name">Ramya B</p>
                    <p className="talent-sub">Recently graduated with Masters in Data Science from Berkeley</p>
                  </div>
                </div>
              </a>


               <a href="https://stackraft.com/profile/id6iZy8k?view=userid" target="_blank">
                <div className="talent-box tbg-1">
                <div className="talent-box-left">
                     <img src="https://media.licdn.com/dms/image/C5103AQGgvnR89do4GQ/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=DKRN9ej-S1GazQxYGfFuzGKvYVEYSJtLXn2WQch2rJo" className="talent-feat-img"/>
                     
                </div>
                <div className="talent-box-right">
                    <p className="talent-feat-txt">In my last 6 years, I have used object-oriented design & development techniques using C++ to solve many complex problems.
                    <p className="talent-name">Narendra Reddy</p>
                    <p className="talent-sub">New Immigrant in Toronto with C++ as my forte</p>
                    </p>
                  </div>
                </div>
              </a>


               <a href="https://stackraft.com/profile/1LY3L9qB?view=userid" target="_blank">
                <div className="talent-box tbg-1">
                <div className="talent-box-left">
                    <img src="https://s3-us-west-2.amazonaws.com/stackraft-resume/imageBucket/D35BHZE5GTEQSII0C5REO836FJ4MUO.jpg" className="talent-feat-img"/>
                     
                </div>
                <div className="talent-box-right">
                    <p className="talent-feat-txt">I used data and statistics-driven approach to build algorithmic trading. I'm passionate about machine learning, data science, probability, and statistics.
                    </p>
                    <p className="talent-name">Abhinav Unnam</p>
                    <p className="talent-sub">IIT Roorkee Grad, with skills in R, Python, Matlab, Data Science</p>
                  </div>
                </div>
              </a>



               <a href="https://stackraft.com/profile/Go7EeNpy?view=userid" target="_blank">
                <div className="talent-box tbg-1">
                <div className="talent-box-left">
                    <img src="https://s3-us-west-2.amazonaws.com/stackraft-resume/imageBucket/POQB2H3RG2PERV9VZV26AN6A0OFAUS.jpg" className="talent-feat-img"/>
                    
                </div>
                <div className="talent-box-right">
                    <p className="talent-feat-txt">I joined SoftBank backed Grofers in early days and built their CMS and search system that led to 100K+ user growth.
                    </p>
                    <p className="talent-name">Manjit Kumar</p>
                    <p className="talent-sub">Backend expert with skills in cloud infrastructre and Python, Django, and Elasticsearch</p>
                </div>
                </div>
              </a>



               <a href="https://stackraft.com/profile/UdmxMhqD?view=userid" target="_blank">
                <div className="talent-box tbg-1">
                <div className="talent-box-left">
                    <img src="https://media.licdn.com/dms/image/C4D03AQHqODEKmHD-kQ/profile-displayphoto-shrink_800_800/0?e=1544659200&v=beta&t=ZCNb3OKKuvG6uWDUFMB1eU7JYc5nek8At5JWn83MfWo" className="talent-feat-img"/>
                 
                </div>
                <div className="talent-box-right">
                    <p className="talent-feat-txt">I came up with a new Byzantine Fault-Tolerant protocol with numbers that achieve 3.5x over industry standards.
                    </p>
                    <p className="talent-name">Mohit Garg</p>
                    <p className="talent-sub">MS from Virginia Tech, with skills in distributed systems and blockchain</p>
                 </div>
                </div>
              </a>




            </div>
      </div>
      <Footer/>
     </div>
  </div>
   
 
  );
 };
}
export default Talent;
