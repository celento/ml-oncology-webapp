import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';
import Header from '../components/Header'
import Footer from '../components/Footer'


class Privacy extends Component{

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
    document.title = "Privacy Policy : Stackraft";
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
            <center><h1 className="faq-main-title">Privacy Policy
</h1></center>


            <br/>
                  <p className="faq-txt">StackRaft Inc. ("StackRaft", "we", “us”, "our", "Company") welcomes you ("User(s)" or "you") to our Site (defined below) and to our Service (defined below). We are committed to protect the personal information that you share within the Site. We believe that you have a right to know our practices regarding the information we may collect and use when you use the Site.</p>

            <br/>
            <div>
     
                  <h3 className="terms-title">Your Consent (PLEASE READ CAREFULLY!)
</h3>
                  <p className="faq-txt">BY ENTERING, CONNECTING TO, ACCESSING OR USING THE SITE, YOU AGREE TO THE TERMS AND CONDITIONS SET FORTH IN THIS PRIVACY POLICY (THE "PRIVACY POLICY"), INCLUDING TO THE COLLECTION AND PROCESSING OF YOUR PERSONAL INFORMATION (AS DEFINED BELOW). <b>IF YOU DISAGREE TO ANY TERM PROVIDED HEREIN, PLEASE DO NOT ACCESS AND USE THE SITE.</b>

</p>

                 <br/>
                 <br/>

          <h3 className="terms-title">What information we may collect on the Users?

</h3>
                  <p className="faq-txt">We may collect two types of data and information from Users:
</p>

   <p className="faq-txt"> <ol>

     <li>
     The first type of information is non-identifiable and anonymous information ("Non-personal Information"). We are not aware of the identity of the User from whom we have collected the Non-personal Information. Non-Personal Information is any unconcealed aggregated information which does not enable identification of an individual User, and which is available to us while such User is using the Site. Non-personal Information which is being gathered consists of technical information, such as screen resolution, type of operating system, type of browser, keyboard language, etc. Furthermore, Non-personal Information which is being gathered consists of behavioral information and may contain, among other things, the User's activity on the Site such as the User's 'click-stream', the period of time spent on certain pages, number of pages visited by the User, etc.

     </li>
     <br/>
                
     <li>
     The second type of information is personally identifiable information ("Personal Information"). <b>This information may identify an individual or may be of a private and/or sensitive nature.</b>
     </li>
     <br/>
                
     <li>
     Users of the Site automatically provide their IP address mainly for enhancing their experience and for geo-location and security purposes as further detailed below.

     </li>
     <br/>
                
     <li>
     In addition, Personal Information which is being gathered consists of any personal details provided consciously and voluntarily by the User.
            <ul>
            <br/>
              
              <li>Users who create a Profile in order to use our Services should provide the following details as part of the registration process: full name, valid e-mail address, country of residence, and employment related information which may include, inter alia, your academic background, technical and product skills, professional experience and work experience
</li>
<br/>
                 
<li>
Alternatively, you can create a Profile on the Site following signing up to use our Services via your existing third party social network account, such as your LinkedIn account ("Social Network Account"). In the event that you register to the Site through your existing Social Network Account, and elect to import your profile information from such Social Network Account, then such Social Network Account provides us with access to certain information about you as is stored in your Social Network Account, namely, any information which is detailed and displayed to the User in the notice which appears during the "LinkedIn Invitation" process (for example, full profile, the primary email address you use for your LinkedIn account, address, phone number and any other information contained in LinkedIn and required to create your Profile). Please read carefully such notice in order to understand what information is provided by such Social Network Account to us. We may collect your login information and other relevant information necessary to enable us to access your Social Network Account (such as, user access token) in order to collect and/or store, to the extent legally permissible, the above mentioned data contained within your Social Network Account (or any part of it). Please remember that the manner in which LinkedIn uses, stores and discloses your information is governed solely by its policies and StackRaft shall have no liability or responsibility for the privacy practices or other actions of LinkedIn that may take place within the Site.</li>
 
<br/>
               
<li>
We may collect any information which you upload or manually enter into the Services such as your Profile or which is generated through your use of the Services (e.g. communications with potential Recruiters).
</li>
<br/>
              
<li>
In addition, Personal Information which is being gathered consists of any personal details provided consciously and voluntarily by you when you contact us.
</li>
</ul>
     </li>
     <br/>
      

    <li>
    For avoidance of doubt, any Non-Personal Information connected or linked to any Personal Information shall be deemed Personal Information as long as such connection or linkage exists.


    </li>

         <br/>
              

    <li>StackRaft does not currently respond to do-not-track signals that may be sent from your device. If we do so in the future, we will provide information about that practice in an updated version of this privacy policy.
    </li>

   </ol>
</p>

                 <br/>
                 <br/>



                  <h3 className="terms-title">How Do We Collect Information on Users?

</h3>
                  <p className="faq-txt">There are two main methods we use:</p>
 
               
               <ol>
                 <li>
                 We collect information through your entry and use of the Site. In other words, when you are using the Site we are aware of it and may gather, collect and store the information relating to such usage, either independently or through the help of third-party service providers as detailed below.

                 </li>
                 <br/>
                 <li>We collect information which you provide us voluntarily. We collect Personal Information when you register by manually creating your Profile or by registering and creating the Profile through the interface with your existing Social Network Account. When connecting your Social Network Accounts, you agree to grant StackRaft access to Personal Information stored in such account, as detailed above. Personal Information is also gathered from personal details provided consciously and voluntarily by you. We may gather, collect and store the Personal Information either independently or through the help of our authorized third-party service providers as detailed below.
                 </li>
               </ol>



                  <br/>
                 <br/>



                  <h3 className="terms-title">What are the Purposes of the Collection of Information?
</h3>
                  <p className="faq-txt">Non-personal Information is collected in order to:
</p>
 
               
               <ul>
                 <li>
                 Enhance the User's experience on the Services (e.g. by determining the screen resolutions).
                 </li>
               
                 <li> Learn about the preferences of Users and general trends on and uses of the Services (e.g. understand which features are more popular than others).
                 </li> 
                 
                 <li> Analysis of the Services for statistical and research purposes and for customization and improvement of our Services.
                 </li>
               </ul>
     
          <p className="faq-txt">Personal Information is collected in order to:
</p>
 
               
               <ul>
                 <li>
                 Operate the Site and/or Services;

                 </li>
                  
                 <li> Include your Personal Information in the Company's database, which may enable the Company to create your Profile and provide such Profile to Recruiters who may ping you with positions that may interest you based on the Expectations you set. Please note that your personally identifiable information contained in your Profile will not be transferred to Recruiters without your prior consent;

                 </li> 
             
                 <li>To verify your identity when you enter the Site after registration;
                 </li>


                 <li>To encourage safe online experiences and enforce our policies;

                 </li>


                 <li>Be able to contact Users for the purpose of providing them with technical assistance and support;

                 </li>


                 <li>Send Users emails and messages via their personal cell phones which relate to the Service;

                 </li>

                 <li>Determine general geo-location information from which the User's computer is connected to the Internet in order for us to know the general location of the Site's Users, to analyze the User's behaviors, as well as in order to safeguard the Site and the Service.

</li>
               </ul>
          
<br/>
<br/>

  <h3 className="terms-title">Sharing Information with Third Parties

</h3>
                  <p className="faq-txt">StackRaft will share Personal Information it collects to the extent that such disclosure is required for operating the Services and the Site. Mainly, with your express permission, we will share your Profile with Recruiters who pinged you with information on open positions based on your Profile. With your explicit permission we may also share your Personal Information with third-party site and/or social networking sites in order to provide you with the Service.
You create your Profile on the Site at your own risk. StackRaft cannot and will not be responsible for actions of others with respect to your Profile.
StackRaft may also disclose Personal Information it collects in the following cases:<br/>
<br/>
(a) Legal, Compliance and Protection of Rights: (i) to satisfy any applicable law, regulation, legal process, subpoena or governmental request; (ii) to enforce this Privacy Policy and/or the TOU, including investigation of potential violations thereof; (iii) to detect, prevent, or otherwise address fraud, security or technical issues; (iv) to respond to claims that any content available on the Site and/or Service violates the rights of third-parties; (f) to respond to claims that contact information (e.g. name, e-mail address, etc.) of a third-party has been posted or transmitted without their consent or as a form of harassment; (g) to protect the rights, property, or personal safety of StackRaft, its Users, or the general public;<br/>
<br/>
(b) Business Transactions: when StackRaft is undergoing any change in control, including by means of merger, acquisition or purchase of all or substantially all of its assets;<br/>
<br/>
(c) Third Party Service Providers and Vendors: (i) to collect, hold and/or manage your Personal Information through StackRaft's authorized third parties service providers (including, as applicable, their affiliates as necessary to provide us with the requested services), as reasonable for performance of services necessary for our operation, which may be located in a country that does not have the same data protection laws as your jurisdiction; (ii) cooperate with third parties for the purpose of enhancing the User's experience and provide you with the Services; (iii) to respond to User's support requests; and<br/>
<br/>
(d) pursuant to your explicit approval prior to the disclosure.
As described above, third party service providers and vendors may have access to your Personal Information in the course of providing the Services, and by contractual agreement, those companies are required to treat your information as confidential. Please note that we will not be liable (to the fullest extent permitted by law) for any damages that may result from the misuse of your Personal Information by such third parties and vendors.<br/>
<br/>
For avoidance of doubt, Stackraft may transfer and disclose Non-personal Information to third parties at its own discretion. We note that, while Profiles shall not be shared with or disclosed to third parties other than with your permission as specified above, StackRaft may share with third parties the User's Profile and may provide third parties with statistical information about these Profiles in an aggregated manner which will not enable such third parties to deduce any Personal Information about particular Users.


</p>

                 <br/>
                 <br/>


                  <h3 className="terms-title">Social Features
</h3>
                  <p className="faq-txt">
Our Site includes social media features ("Social Features"). The Social Features are operated or allow for social integration with certain third party social networks or third party platforms ("Social Network" or "Platform(s)"). These Social Networks and Platforms are created and maintained by third parties who are not affiliated with and/or controlled by StackRaft. If you enable this integration with such Social Networks and Platforms, your use of the Social Features is subject to the applicable third party Social Network's or Platform's terms of use and privacy policies. You should ensure that you read their terms of use and privacy policies to understand how they treat your information and in order to understand the methods for changing the privacy or sharing settings on such services. If you do not agree to the practices described in such terms you should not allow the Site to interact with such Social Networks or Platforms, however you may find that you are not able to enjoy all the features that may be made available via the Site. By using the Social Features you hereby agree and understand that the applicable Social Networks or Platforms may collect certain Personal Information, such as your IP address, Non-personal Information and may set cookies and/or other web tracking technologies to enable the functionality of the Social Features. The use of such features enables the sharing of information with your friends or the public, depending on the settings you establish with the third party that provides the Social Features. You hereby understand and agree that when you share content via Social Networks or Platforms that your content may become public and others may re-post-it.
</p>

                 <br/>
                 <br/>




                                   <h3 className="terms-title">Security
</h3>
                  <p className="faq-txt">We take reasonable measures to maintain the security and integrity of the Services, the Site and the Profiles and prevent unauthorized access to them or use thereof through generally accepted industry standard technologies and internal procedures. Please note, however, that there are inherent risks in transmission of information over the Internet or other methods of electronic storage and we cannot guarantee that unauthorized access or use of your Personal Information will never occur.
</p>

                 <br/>
                 <br/>





                                   <h3 className="terms-title">International Data Transfer
</h3>
                  <p className="faq-txt">We may transfer information collected about you, including Personal Information, to affiliated entities, or to other third party service provides (as provided herein) across borders and from your country or jurisdiction to other countries or jurisdictions around the world. Please note that we may transfer such information to a country and jurisdiction that does not have the same data protection laws as your jurisdiction, and you consent to such transfer of information.

</p>

                 <br/>
                 <br/>





                                   <h3 className="terms-title">Cookies and Tracking Technologies

</h3>
                  <p className="faq-txt">When you access or use the Site, the Company may place and use industry-wide technologies such as cookies and/or Flash and/or other tracking technologies which store certain information on your computer ("Local Storage") and which will allow us to enable automatic activation of certain features, and make your experience much more convenient and effortless. The cookies used by the Service are created per session, does not include any information about you, other than your session key and are removed as your session ends (usually after 24 hours). It is easy to prohibit the Local Storage. For example, most browsers will allow you to erase cookies from your computer's hard drive, block acceptance of cookies, or receive a warning before a cookie is stored. However, if you block or erase cookies, your online experience may be limited. We may also use certain third-party cookies and web-tracking technologies. These are different kind of cookies and web-tracking technologies, stored on your computer and/or on your End-Users devices by third parties, rather than by StackRaft. We do not control such third party service providers.<br/>
The above mentioned cookies and other tracking technologies usually store only a Non-personal Information, such as the web pages you have visited, the duration of your browsing, etc.
</p>

                 <br/>
                 <br/>





                                   <h3 className="terms-title">Changes to the Privacy Policy
</h3>
                  <p className="faq-txt">The terms of this Privacy Policy will govern the use of the Site and/or the Services and any information collected therein. StackRaft reserves the right to change this policy at any time, so please re-visit this page frequently. We will provide notice of substantial changes of this policy on the homepage of the Site and/or we will send you an e-mail regarding such changes to the e-mail address that you may have provided us. Such substantial changes will take effect seven (7) days after such notice was provided on the Site or sent via e-mail, whichever is the earlier. Otherwise, all other changes to this Privacy Policy are effective as of the stated "Last Revised" date and your continued use of the Site and/or the Services after the Last Revised date will constitute acceptance of, and agreement to be bound by, those changes.
                  <br/><br/><b>
If you have any questions (or comments) concerning the Terms, you are most welcome to send us an email to hello@stackraft.com and we will make an effort to reply within a reasonable timeframe.
</b>

</p>
 
</div> 
            </div>
<Footer/>
     </div>
        </div>
   
 
  );
 };
}
export default Privacy;
