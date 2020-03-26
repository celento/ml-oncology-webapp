import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';
import Header from '../components/Header'
import Footer from '../components/Footer'


class Terms extends Component{

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
    document.title = " Terms : Stackraft";
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
            <center><h1 className="faq-main-title">Terms of Use</h1></center>


            <br/>
                  <p className="faq-txt">StackRaft Inc. ("StackRaft", "we", “us”, "our", "Company") welcomes you ("User(s)" or "you") to our Site (defined below) and to our Service (defined below). You may use the Site and/or the Service in accordance with the terms and conditions set forth herein. The Service is available on our Site at: https://stackraft.com/ (the "Site")</p>

            <br/>
            <div>
     
                  <h3 className="terms-title">Acceptance of the Terms</h3>
                  <p className="faq-txt">By entering, connecting to, accessing or using the Site and/or the Service, you acknowledge that you have read and understood the following terms of use, including the terms of our Privacy Policy available at: https://stackraft.com/privacy (the "Privacy Policy") (collectively, the "Terms") and you agree to be bound by them and to comply with all applicable laws and regulations regarding your use of the Site and/or the Service and you acknowledge that these Terms constitute a binding and enforceable legal contract between StackRaft and you. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT ENTER TO, CONNECT TO, ACCESS OR USE THE SERVICE IN ANY MANNER.<br/><br/>The Service is available only to individuals who (a) are at least fourteen (14) years old (see further section 12 below), however, if a law requires that you must be older in order for StackRaft to lawfully provide the Services to you (including the collection, storage, and use of your information) then the minimum age is such older age; and (b) possess the legal capacity to enter into these Terms and to form a binding agreement under any applicable law, or have received the required consent from their legal guardian to enter into these Terms.
</p>

                  <br/>

                    <h3 className="terms-title">Service</h3>
                  <p className="faq-txt">StackRaft offers services for both individuals looking for job opportunities and employers and recruiters looking for job applicants. Individuals are natural persons seeking new employment or freelance contracts through the Service. Companies are natural persons or business entities searching for new employees or contractors through the Service. 
The Service allows you to create an individual talent profile ("Profile") which shall include basic information such as your real name, active email address and country of residence and may also include information such as your academic background, technical or product skills, experience and employment history. As part of your Profile, StackRaft allows you to set your expectations for your next job, such as type of job, location, salary etc. ("Expectations"). StackRaft then uses an algorithm to take your Profile to rank and create an talent archetype for you, that may include information on your skills, location, types of experience, education and companies apply to get an introduction with you. StackRaft makes your Profile visible to companies and recruiters ("Recruiters"). If a company that viewed your Profile including your Expectations elects to ping you (i.e. letting you know that it viewed your Profile and is interested in getting in touch with you directly) or if StackRaft automatically matches the criteria set in your Profile to a position opened by a Recruiter and pings you with a job opportunity, the decision to reveal your identity, share your contact details, and start a discussion with such Recruiter is yours to make. Pings with the Recruiter's information and the open position(s) will be sent to the email you provided during the registration process. You will receive a time limit by which to either accept or reject the ping. (the "Service").
<br/><br/>
A recruiter can create a free employer account to post jobs and get job seeker recommendations. The employer, hiring manager or the recruiter undertakes to inform StackRaft in writing (via email is sufficient) as soon as possible, but no later than the number of days specified in the StackRaft Agreement if an introduced Talent is hired or otherwise contracted by Company ( “Placement” ). The notification shall include the start date, the date the contract was signed and information about the Salary. StackRaft may contact Company to request status updates about ongoing negotiations.
<br/><br/>
Placement shall mean any form of employment, temporary employment, contracting or other use of Talent by Company or an undertaking affiliated with Company.
If Talent is placed by referral using the Service, StackRaft will receive a flat commission as specified in the agreement. Excluded is compensation paid by Company to Talent to compensate expenditures (e.g. travel, relocation, visa application) as well as any equity, share options or similar compensation options.
The Site provides you with the Service and additional resources such as contact information, videos, text, files, logos, button icons, images, data compilations, links, other specialized content, technical data, documentation, know-how, specifications materials, designs, data, the "look and feel" of the Site, algorithms, source and object code, interface, GUI, interactive features related graphics, illustrations, drawings, animations, and other features available on or through the Site and/or the Service (collectively, the "Content").
ALL RIGHTS IN AND TO THE CONTENT AVAILABLE ON THE SITE AND/OR THE SERVICE (OTHER THAN THE PROFILES AND THE RECRUITER'S INFORMATION) ARE RESERVED TO STACKRAFT OR ITS LICENSORS. TO THE EXTENT LEGALLY PERMISSIBLE, THE SITE AND/OR THE SERVICE AND/OR THE CONTENT, AS WELL AS THE RECRUITER'S INFORMATION AVAILABLE VIA THE SERVICE ARE PROVIDED ON AN "AS IS" BASIS.
<br/><br/><b>
STACKRAFT DOES NOT ENDORSE, RECOMMEND OR IN ANY MANNER ASSUME ANY RESPONSIBILITY FOR ANY DECISION MADE OR ACTION TAKEN OR NOT TAKEN IN RELIANCE ON THE CONTENT CONTAINED IN THE SITE AND/OR THE SERVICE AND THE RECRUITER'S INFORMATION NOR DOES IT ASSUME ANY RESPONSIBILITY FOR ANY LOSS, INJURY AND/OR DAMAGES INCURRED AS A RESULT OR IN CONNECTION WITH SUCH ACTIONS. YOUR USE OF THE SERVICES AND/OR THE SITE AND/OR CONTENT AND/OR THE RECRUITER'S INFORMATION AVAILABLE THEREIN IS ENTIRELY AT YOUR OWN RISK.
<br/><br/>
THE SERVICE MAY CONTAIN CERTAIN THIRD PARTY SERVICES WHICH MAY BE RELATED TO THE SERVICES PROVIDED BY STACKRAFT. THE COMPANY WILL NOT BE RESPONSIBLE FOR ANY SUCH SERVICES AND FOR ANY RESULTS AND OUTCOMES RELATED THERETO.
STACKRAFT CURRENTLY DOES NOT CONDUCT VERIFICATION OR CRIMINAL BACKGROUND CHECKS WITH RESPECT TO THE INFORMATION CONTAINED IN THE PROFILES, NOR DOES IT INQUIRE INTO THE BACKGROUND OF ANY OF ITS USERS OR ATTEMPT TO VERIFY THE STATEMENTS OR OTHER FACTUAL INFORMATION CONTAINED IN PROFILES. STACKRAFT RESERVES THE RIGHT TO CONDUCT ANY CRIMINAL BACKGROUND OR OTHER SCREENINGS, AT ANY TIME AND USING AVAILABLE PUBLIC RECORDS.
<br/><br/>
FURTHERMORE, IT IS THE USER'S SOLE RESPONSIBILITY TO HAVE OR OBTAIN ANY NECESSARY WORKING RIGHT, PERMIT OR LICENSE (E.G., IMMIGRANTS IN NEED OF WORKING VISAS, ETC.) FOR THE PURPOSE OF BEING EMPLOYED AT THE RELEVANT JURISDICTION AND STACKRAFT SHALL HAVE NO LIABILITY IN THIS RESPECT.</b>

</p>

<br/>

  <h3 className="terms-title">Registering to the Service and Creating your Profile
</h3>
                  <p className="faq-txt">In order to use our Service you will first have to request an invite to the Service and if accepted, you will be able to sign up to the Services and open an Account. You can request an invite with your email address and linkedin public profile link. As part of the registration process you are required to create a Profile. The profile shall describe you, an individual person. Creating the Profile is free of charge., You Profile is created by importing your Profile data into the Service from your Social Network Account (e.g. LinkedIn), or by filling in the information manually. You will receive a confirmation when accepted to join our Service via email to the email address you provided us upon registration. We may change the method of registration at our own discretion.<br/><br/>
You will be able to edit your Profile information at any point, adding or removing any information or changing your Expectations, all as you see fit. Such changes may result in a change in your Profile.<br/><br/>
By registering to the Service with a third-party account or populating your Profile by importing such information from your Social Network Account, you hereby grant us permission to access and use your information through that service, as permitted by that third party service, and to store your login credentials for that service to enable the Service.<br/><br/>
You must provide accurate and complete information during the registration process and you agree to not misrepresent your identity.<br/><br/>
You are responsible for maintaining the confidentiality of your account, Profile, and passwords, as applicable. You may not share your password or other account access information with any other party, temporarily or permanently, and you shall be responsible for all uses of your Site registration and password, whether or not authorized by you. You agree to immediately notify StackRaft of any unauthorized use of your account, Profile, or passwords.<br/><br/>
Creating your Profile may require you to share with us certain personal information. Information about the collection of personal information is provided in our Privacy Policy

</p>

                  <br/>



  <br/>

<h3 className="terms-title">Usage Restrictions

</h3>
                <p className="faq-txt">There are certain conducts which are strictly prohibited when using the Site and/or the Service. Please read the following restrictions carefully. Failure to comply with any of the provisions set forth herein may expose you to civil and/or criminal liability.<br/><br/>
You may not, whether by yourself or anyone on your behalf, unless otherwise explicitly permitted under these Terms: (a) use the Site and/or the Service and/or the Content and/or the Profiles and/or the Recruiter's Information for any illegal, immoral, unlawful and/or unauthorized purposes; (b) use the Site and/or the Service and/or Content for non-internal purposes without StackRaft’s express prior written consent; (c) remove or disassociate, from the Content and/or the Site and/or the Service any restrictions and signs indicating proprietary rights of StackRaft or its licensors, including but not limited to any proprietary notices contained in such materials (such as ©,™, or ®), and you represent and warrant that you will abide by all applicable laws in this respect; (d) interfere with or violate User's rights to privacy and other rights, or harvest or collect personally identifiable information about Users without their express consent, whether manually or with the use of any robot, spider, crawler, any search or retrieval application, or use other manual or automatic device, process or method to access the Site and/or the Service and retrieve, index and/or data-mine information; (e) interfere with or disrupt the operation of the Site or the servers or networks that host the Site, or disobey any laws, regulations, requirements, procedures, or policies of such servers or networks; (f) falsely state or otherwise misrepresent your affiliation with any person or entity, or express or imply that the Company endorses you, your site, your business or any statement you make, or present false or inaccurate information about the Service; (g) take any action that imposes, or may impose, an unreasonable or disproportionately large load on our platform infrastructure, as determined by us; (h) bypass any measures we may use to prevent or restrict access to the Site and/or the Service, including attempting to probe, scan or test the vulnerability of a system or network or breach security or authentication measures without proper authorization; (i) copy, modify, alter, adapt, replicate, make available, translate, port, reverse engineer, decompile, or disassemble any portion of the Content made accessible by StackRaft on or through the Service, including but not limited to the Profiles, or publicly display, reproduce, create derivative works from, perform, distribute, or otherwise use such Content, other than as permitted under these Terms; (j) copy, distribute, display, execute publicly, make available to the public, reduce to human readable form, decompile, disassemble, adapt, sublicense, make any commercial use, sell, rent, transfer, lend, process, compile, reverse engineer, combine with other software, translate, modify or create derivative works of any material that is subject to company’s proprietary rights, including StackRaft’s Intellectual Property (as such term is defined below), in any way or by any means, unless expressly permitted in the Terms and/or under any applicable laws which expressly permit such actions; (k) make any use of the Content on any other site or networked computer environment for any purpose without StackRaft’s prior written consent; (l) create a browser or border environment around StackRaft Content (no frames or inline linking is allowed); (m) sell, license, or exploit for any commercial purposes any use of or access to the Site and/or the Service and/or the Content; (n) frame or mirror any part of the Site without StackRaft's prior express written authorization; (o) create a database by systematically downloading and storing all or any of the Content from the Site; (p) transmit or otherwise make available in connection with the Site and/or the Service any virus, worm, Trojan Horse, time bomb, web bug, spyware, or any other computer code, file, or program that may or is intended to damage or hijack the operation of any hardware, software, or telecommunications equipment, or any other actually or potentially harmful, disruptive, or invasive code or component; (q) upload a Profile on behalf of another party (r) submit incomplete, false or inaccurate biographical information or information which is not your own (s) use the Site and Services for any purpose for which they were not intended; and/or (t) infringe and/or violate any of the Terms.


</p>

                <br/>



<h3 className="terms-title">Interaction with Recruiters

</h3>
                <p className="faq-txt">When you create a Profile you represents that the information included in your Profile (including without limitation, your qualifications, skills, training and experience) is correct, complete, accurate, sufficient and up to date, in a manner allowing Recruiters who review your Profile to make a preliminary assessment of your suitability for the role in question and to decide whether to ping you and ask that you reveal your identity so that the parties could move forward with the recruitment process.<br/><br/>
If a Recruiter elects to make you a job offer, the terms of employment and any contractual arrangements shall be negotiated and agreed upon between you and the Recruiter directly.<br/><br/>
Stackraft does not have any control of Recruiters and therefore cannot accept any liability in respect of the behavior, responses or actions of the Recruiters. Stackraft does not warrant, represent or guarantee that you will be able to find any job, position or offer by using the Services and/or the Site.
The Service is for personal use and you have no right whatsoever to resell the Services to any third party for any reason without StackRaft's prior explicit written approval.<br/><br/>
In the event that a dispute arises between a User and any Recruiter (for example, in relation to the interview or selection process or the contractual arrangements between them) ("Dispute"), the User agrees that Stackraft is not liable for any loss or damage suffered by the User as a result of any such Dispute and you hereby release and hold harmless StackRaft from any such loss or damage or any liability in relation to any Dispute.

</p>

                <br/>



<h3 className="terms-title">Changes to the Site and/or the Service

</h3>
                <p className="faq-txt">StackRaft reserves the right to modify, correct, amend, enhance, improve, make any other changes to, or discontinue, temporarily or permanently this Site and/or the Service or any part thereof, including but not limited to the Content, without notice, at any time. In addition, you hereby acknowledge that the Content provided under this Site and/or the Service may be changed, extended in terms of content and form or removed at any time without any notice to you. You agree that Stackraft shall not be liable to you or to any third party for any modification, suspension, or discontinuance of this Site and/or the Service or the Content included therein.

</p>

                <br/>
           

    
<h3 className="terms-title">Copyright Agent and The Digital Millennium Copyright Act


</h3>
                <p className="faq-txt">The Company respects the intellectual property rights of others. However, the Site may contain works generated by Users, Recruiters and information collected from the Internet. The Company cannot and does not monitor or review every item made available on or through the Services and/or any part thereof, including any and all User Content and Intellectual Property Rights related thereto.<br/><br/>
If you, as either User, software designer and/or third-party publisher, believe that your work has been copied or otherwise used in a way that constitutes copyright infringement, please provide the following information in writing to the Company's Copyright Agent: (i) the contact details of the person authorized to act on behalf of the owner of the copyright; (ii) a description of the copyrighted work that you claim has been infringed; (iii) a description of the material that you claim to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information sufficient to permit the Company to locate the material; (iv) a statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and (v) a statement that the information in the notification is accurate and, under penalty of perjury, that you are the copyright owner or are authorized to act on behalf of the owner of a copyright that is allegedly infringed.


</p>

                <br/>


 
 <h3 className="terms-title">Indemnification
</h3>
                <p className="faq-txt">You agree to defend, indemnify and hold harmless StackRaft and StackRaft's Representatives from and against any and all claims, damages, obligations, losses, liabilities, costs, debts, and expenses (including but not limited to attorney's fees) arising from: (i) your violation of any of these Terms; (ii) your violation of any third party rights, including without limitation any intellectual property rights or privacy right of such third party in connection with your use of this Site and/or the Service; (iii) the Profile and/or other User Content that you provide through the use of the Site and/or the Service; (iv) Your Use of any of the Content; (v) any damage of any sort, whether direct, indirect, special or consequential, you may cause to any third party with relation to the Site and/or the information contained therein (including without limitation, the Profiles); and (vi) any Dispute, or any breach by the User of Section above. It is hereby clarified that this defense and indemnification obligation will survive these Terms.<br/><br/>
Without derogating from the foregoing, we reserve the right to assume the exclusive defense and control of any matter which is subject to indemnification by you, which will not excuse your indemnity obligations hereunder and in which event you will fully cooperate with us in asserting any available defense. You agree not to settle any matter subject to an indemnification by you without first obtaining our prior express written approval.


</p>

                <br/>


                               <br/>


 
<h3 className="terms-title">Termination of Services
</h3>
               <p className="faq-txt">These Terms shall remain in effect until terminated as set forth herein. Your failure to comply herewith shall terminate your license to use the Site and/or the Service and any rights granted to you hereunder pursuant to these Terms. In the event of your failure to comply herewith StackRaft may temporarily or permanently limit, suspend or terminate your access to the Site and/or the Service without notice, in addition to any other remedies that may be available to StackRaft under any applicable law. Without limiting the generality of the foregoing, we may terminate or suspend your account if we believe, in our sole discretion, that one (or more) of the following events have occurred: (a) there is a threat to the security or integrity of your account, our network or our servers; (b) suspension is needed to protect the rights, property or safety of StackRaft, its users or the public; (c) you have violated these Terms; and/or (d) we are required to by law.<br/><br/>
If you object to any term hereof, as may be amended from time to time, or become dissatisfied with the Services, or for any other reason, you may terminate these Terms at any time by stopping your use of the Site and/or Services and this will be you sole and exclusive remedy under such circumstances.<br/><br/>
Additionally, Stackraft may at any time, at its sole discretion, cease the operation of the Site or any part thereof, temporarily or permanently, extend in terms of content and form, correct, modify, amend, enhance, improve and make any other changes thereto or discontinue displaying or providing any information, Content or features therein without giving any prior notice. You agree and acknowledge that Stackraft does not assume any responsibility with respect to, or in connection with the termination of the Site's operation and/or loss of any data.
Upon termination or expiration of these Terms for any reason: (a) all rights granted to you under these Terms will terminate; and (b) you will immediately cease all use of and access to the Site and/or the Service.<br/><br/>
The provisions of these Terms that, by their nature and content, must survive the termination of these Terms in order to achieve the fundamental purposes of these Terms shall so survive. Without limiting the generality of the forgoing, the Intellectual Property, Disclaimers of Warranties, Limitation of Liability, Indemnification and General sections will survive the termination of the Terms.<br/><br/> <b>
If you have any questions (or comments) concerning the Terms, you are most welcome to send us an email to hello@stackraft.com and we will make an effort to reply within a reasonable timeframe.</b>

</p>

               <br/>
          
           


</div> 
            </div>
 
 <Footer/>
     </div>
        </div>
   
 
  );
 };
}
export default Terms;
