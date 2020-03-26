import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import Notifications, {notify} from 'react-notify-toast';
import {Resumes} from '../../collections/Resumes'
import PropTypes from 'prop-types';
import { withRouter ,withHistory } from 'react-router-dom';

import {Mongo} from 'meteor/mongo';
import CircularProgressbar from 'react-circular-progressbar';
 

var progress=0;
var total=0;
var documentNameResume=null;
var documentLinkResume=null;
var uploadDateResume=null;

var documentNamePassport=null;
var documentLinkPassport=null;
var uploadDatePassport=null;


var documentNameCertificate=null;
var documentLinkCertificate=null;
var uploadDateCertificate=null;

var jobID;
var link;
var userID;

// Array to store the profile links and candidate ID for final processing
var toProcess=[];
var tocanID=[];

 

// -------------

class Upload extends Component{

  constructor(props) {
    super(props);

    this.state = { 
     singleProgressResume:0, 
     singleProgressPassport:0, 
     singleProgressCertificate:0, 


     progress:0,
     progressTxtResume:"",
     progressTxtPassport:"",
     progressTxtCertificate:"",

     lock:0,
     startedResume:false, 
     startedPassport:false, 
     startedCertificate:false, 
 
     display:'block',
     progressPercent:"0%",



    //  Resume State

    doneUploadResume:"block",
    doneUploadDetailResume:"none",
    uploadBlockResume:"block",

     documentNameResume:null,
     documentLinkResume:null,
     uploadDateResume:null,

    //  Passport State

    doneUploadPassport:"block",
    doneUploadDetailPassport:"none",
    uploadBlockPassport:"block",

     documentNamePassport:null,
     documentLinkPassport:null,
     uploadDatePassport:null,

    // Certificate State


    doneUploadCertificates:"block",
    doneUploadDetailCertificates:"none",
    uploadBlockCertificates:"block",

     documentNameCertificate:null,
     documentLinkCertificate:null,
     uploadDateCertificate:null,



   };
   this.upload2=this.upload2.bind(this);
   this.upload2Pass=this.upload2Pass.bind(this);

   this.uploadPass=this.uploadPass.bind(this);

   

   this.postReq=this.postReq.bind(this);
   this.proResumes=this.proResumes.bind(this);
   this.deleteRes=this.deleteRes.bind(this);
   this.deletePass=this.deletePass.bind(this);
   this.deleteCert=this.deleteCert.bind(this);

   this.saveRes=this.saveRes.bind(this);


  }

  componentDidMount(){



  }
   
  componentWillMount(){
    // we create this rule both on client and server
    Slingshot.fileRestrictions("avatar", {
      allowedFileTypes: ["image/png", "image/jpeg", "image/gif","image/jpg","application/pdf"],
      maxSize: 2 * 1024 * 1024
    });
 
    if(this.props.theCandidate){
 

    if(this.props.theCandidate.resumeLink != undefined && this.props.theCandidate.resumeLink !="none"){
      this.setState({
          doneUploadResume:"none",
          doneUploadDetailResume:"block",
          uploadBlockResume:"none"

      })
    }

    if(this.props.theCandidate.passportLink != undefined && this.props.theCandidate.passportLink !="none"){
 
      this.setState({
          doneUploadPassport:"none",
          doneUploadDetailPassport:"block",
          uploadBlockPassport:"none"

      })
    }
  

    if(this.props.theCandidate.certificateLink != undefined && this.props.theCandidate.certificateLink !="none"){
   
      this.setState({
          doneUploadCertificates:"none",
          doneUploadDetailCertificates:"block",
          uploadBlockCertificates:"none"

      })
    }
    
    
    
    documentNameResume = this.props.theCandidate.resumeName;
    documentLinkResume = this.props.theCandidate.resumeLink;
    uploadDateResume = this.props.theCandidate.resumeDate;

    documentNamePassport = this.props.theCandidate.passportName;
    documentLinkPassport = this.props.theCandidate.passportLink;
    uploadDatePassport = this.props.theCandidate.passportDate;
    

    documentNameCertificate = this.props.theCandidate.certificateName;
    documentLinkCertificate = this.props.theCandidate.certificateLink;
    uploadDateCertificate = this.props.theCandidate.certificateDate;
    
    
    }
  }

    
  

  deleteRes(){

 
    this.setState({

      doneUploadResume:"block",
      doneUploadDetailResume:"none",
      uploadBlockResume:"block",
  

    })
    documentLinkResume="none";
    documentNameResume="none";
    uploadDateResume="none";


 
  }


  deletePass(){

 
    this.setState({

      doneUploadPassport:"block",
      doneUploadDetailPassport:"none",
      uploadBlockPassport:"block",
  

    })
    documentLinkPassport="none";
    documentNamePassport="none";
    uploadDatePassport="none";

  }


  deleteCert(){

 
    this.setState({

      doneUploadCertificates:"block",
      doneUploadDetailCertificates:"none",
      uploadBlockCertificates:"block",
  

    })
    documentLinkCertificate="none";
    documentNameCertificate="none";
    uploadDateCertificate="none";


 
  }

  postReq(link,canID){
    
    var postData = {
      data:{
           "link" : link
      }
    }
    
      HTTP.call( 'POST', 'https://api.stackraft.com/api/add_message/hello', postData, 
         function( error, response ) {
      
         if ( error ) {
           
         } else {
           
 


            name=response.data.name
            email=response.data.email
            phone=response.data.phone
            skills=response.data.skills
            

            // Current status of the resume
            status="initial"


            Meteor.call('addCandidate',canID,userID,jobID,link,status,name,email,phone,skills ,()=>{
            })

         }
      }.bind(this));
 
  }

  proResumes(){
    
      for(var i=0;i<total;i++){
        this.setState({
          progressTxt:"Processing" + i+1 + " of "+ total + " resumes.",
        })
        this.postReq(toProcess[i],tocanID[i])
      }

      this.setState({
        progressTxtResume:"Done processing the resumes.",
        startedResume:false,
        display:'block',

        doneUploadResume:"none",
        doneUploadDetailResume:"none",
       

      })

      toProcess=[];
      tocanID=[];

  }


  upload2Cert(e,file_number){
 
   
    // Creating a random ID for the candidate
    var canID = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 8; i++)
      canID += possible.charAt(Math.floor(Math.random() * possible.length));

    // End of candidate ID generation.
 
      userID = Meteor.userId();
      // jobID = this.props.location.state._id;
      var status = "none";

      var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();


    var fn_date = Date.now();
    var metaContext = {userID : userID, fn_date:fn_date};
    documentNameCertificate =e.target.files[file_number].name;
    var final_name = fn_date+"-"+(e.target.files[file_number].name).replace(/\s+/g, '%20');

    // Figuring out the current Date
    var today = new Date();
    var dd = today.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    
    var monthN = monthNames[mm];
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = dd + ' ' + monthN + ' ' + yyyy;

    uploadDateCertificate =today;
    // End of Date :(


    link="https://s3-us-west-2.amazonaws.com/stackraft-resume/"+userID+"/"+final_name;
    documentLinkCertificate = link;


    

    var uploader = new Slingshot.Upload("UsersAvatar", metaContext);
    uploader.send(e.target.files[file_number], function (error, downloadUrl) { 
      // you can use refs if you like
      if (error) {
        // Log service detailed response
        console.error('Error uploading. Please check your internet connection/try again later');
        alert (error); // you may want to fancy this up when you're ready instead of a popup.
      }
      else {
        // we use $set because the user can change their avatar so it overwrites the url :)
          //Adding the Upload to the Database
    
      }
      // you will need this in the event the user hit the update button because it will remove the avatar url
      this.setState({avatar: downloadUrl});
    }.bind(this));
    var computation = Tracker.autorun(function () {
      var exact_progress = progress * uploader.progress();
 
         
      if(uploader.progress()){
      this.setState({singleProgressCertificate: uploader.progress()});
      }
      if(uploader.progress()==1){
 
        this.setState({
          doneUploadCertificates:"none",
          doneUploadDetailCertificates:"block",
          uploadBlockCertificates:"none",

        })

 
      
        toProcess[total]=link;
        tocanID[total]=canID;
        total+=1;
 
        setTimeout(function (){
          
          // this.upload2(file_number);
          
          }.bind(this), 100);
  
      }
    }.bind(this));
  }



  upload2Pass(e,file_number){
 
   
    // Creating a random ID for the candidate
    var canID = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 8; i++)
      canID += possible.charAt(Math.floor(Math.random() * possible.length));

    // End of candidate ID generation.
 
      userID = Meteor.userId();
      // jobID = this.props.location.state._id;
      var status = "none";

      var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();


    var fn_date = Date.now();
    var metaContext = {userID : userID, fn_date:fn_date};
    documentNamePassport =e.target.files[file_number].name;
    var final_name = fn_date+"-"+(e.target.files[file_number].name).replace(/\s+/g, '%20');

    // Figuring out the current Date
    var today = new Date();
    var dd = today.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    
    var monthN = monthNames[mm];
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = dd + ' ' + monthN + ' ' + yyyy;

    uploadDatePassport =today;
    // End of Date :(


    link="https://s3-us-west-2.amazonaws.com/stackraft-resume/"+userID+"/"+final_name;
    documentLinkPassport = link;


    

    var uploader = new Slingshot.Upload("UsersAvatar", metaContext);
    uploader.send(e.target.files[file_number], function (error, downloadUrl) { 
      // you can use refs if you like
      if (error) {
        // Log service detailed response
        console.error('Error uploading. Please check your internet connection/try again later');
        alert (error); // you may want to fancy this up when you're ready instead of a popup.
      }
      else {
        // we use $set because the user can change their avatar so it overwrites the url :)
          //Adding the Upload to the Database
    
      }
      // you will need this in the event the user hit the update button because it will remove the avatar url
      this.setState({avatar: downloadUrl});
    }.bind(this));
    var computation = Tracker.autorun(function () {
      var exact_progress = progress * uploader.progress();
 
         
      if(uploader.progress()){
      this.setState({singleProgressPassport: uploader.progress()});
      }
      if(uploader.progress()==1){
 
        this.setState({
          doneUploadPassport:"none",
          doneUploadDetailPassport:"block",
          uploadBlockPassport:"none",

        })

 
      
        toProcess[total]=link;
        tocanID[total]=canID;
        total+=1;
 
        setTimeout(function (){
          
          // this.upload2(file_number);
          
          }.bind(this), 100);
  
      }
    }.bind(this));
  }


  saveRes(){
    var today = new Date();
    var dd = today.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    
    var monthN = monthNames[mm];
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = dd + ' ' + monthN + ' ' + yyyy;

 
    var userID = Meteor.userId();
 
    Meteor.call('profileUpdateResumePassCert',userID,documentNameResume,documentLinkResume,documentNamePassport,documentLinkPassport,documentNameCertificate,documentLinkCertificate,today,()=>{

      window.location.href = '/c/profile'

    })    



  }
 
  upload(e,file_number){
 
   
    // Creating a random ID for the candidate
    var canID = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 8; i++)
      canID += possible.charAt(Math.floor(Math.random() * possible.length));

    // End of candidate ID generation.
 
      userID = Meteor.userId();
      // jobID = this.props.location.state._id;
      var status = "none";

      var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();


    var fn_date = Date.now();
    var metaContext = {userID : userID, fn_date:fn_date};
    documentNameResume =e.target.files[file_number].name;
    var final_name = fn_date+"-"+(e.target.files[file_number].name).replace(/\s+/g, '%20');

    // Figuring out the current Date
    var today = new Date();
    var dd = today.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    
    var monthN = monthNames[mm];
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = dd + ' ' + monthN + ' ' + yyyy;

    uploadDateResume =today;
    // End of Date :(


    link="https://s3-us-west-2.amazonaws.com/stackraft-resume/"+userID+"/"+final_name;
    documentLinkResume = link;


    

    var uploader = new Slingshot.Upload("UsersAvatar", metaContext);
    uploader.send(e.target.files[file_number], function (error, downloadUrl) { 
      // you can use refs if you like
      if (error) {
        // Log service detailed response
        console.error('Error uploading. Please check your internet connection/try again later');
        alert (error); // you may want to fancy this up when you're ready instead of a popup.
      }
      else {
        // we use $set because the user can change their avatar so it overwrites the url :)
          //Adding the Upload to the Database
    
      }
      // you will need this in the event the user hit the update button because it will remove the avatar url
      this.setState({avatar: downloadUrl});
    }.bind(this));
    var computation = Tracker.autorun(function () {
      var exact_progress = progress * uploader.progress();
 
       
      if(uploader.progress()){
      this.setState({singleProgressResume: uploader.progress()});
      }
      if(uploader.progress()==1){
 
        this.setState({
          doneUploadResume:"none",
          doneUploadDetailResume:"block",
          uploadBlockResume:"none",
        })

 
      
        toProcess[total]=link;
        tocanID[total]=canID;
        total+=1;
 
        setTimeout(function (){
          
          // this.upload2(file_number);
          
          }.bind(this), 100);
  
      }
    }.bind(this));
  }

 
  
// Use a state instead of curr_file and make it work in half an hour for god sake don't waste time, you got a lot to do..

  upload2(e,curr_file){
 
 
    this.setState({
      doneUploadResume:false,
      doneUploadResume:"none",
      doneUploadDetailResume:"none",

    })

    if(curr_file==-1){
    
      total=0;
      toProcess=[];
      tocanID=[];
    }
 
    var file_number = e.target.files.length;
   
    curr_file+=1;
 
    if(curr_file<file_number){
    progress=(curr_file+1)/file_number;
 
    this.setState({progress: progress,startedResume:true,display:'none',progressPercent:Math.trunc(this.state.singleProgress*100)+"%"});
      this.setState({
        progressTxt:"Uploading "+(curr_file+1)+" of "+(file_number)+" resumes"
      })
   
      this.upload(e,curr_file);
    }else{
      this.setState({
        progressTxt:"Processing the uploaded resumes.",
      })
      setTimeout(function (){   
        this.proResumes();   
        }.bind(this), 5000);

    }
  }


  uploadPass(e,curr_file){
 
 
    this.setState({
      doneUploadPassport:false,
      doneUploadPassport:"none",
      doneUploadDetailPassport:"none",

    })

    if(curr_file==-1){
    
      total=0;
      toProcess=[];
      tocanID=[];
    }
 
    var file_number = e.target.files.length;
   
    curr_file+=1;
 
    if(curr_file<file_number){
    progress=(curr_file+1)/file_number;
 
    this.setState({progress: progress,startedPassport:true,display:'none',progressPercent:Math.trunc(this.state.singleProgress*100)+"%"});
      this.setState({
        progressTxtPassport:"Uploading Passport"
      })
   
      this.upload2Pass(e,curr_file);
    }else{
      this.setState({
        progressTxtPassport:"Processing the uploaded passport",
      })
      setTimeout(function (){   
        this.proResumes();   
        }.bind(this), 5000);

    }
  }




  uploadCert(e,curr_file){
 
 
    this.setState({
      doneUploadCertificates:false,
      doneUploadCertificates:"none",
      doneUploadDetailCertificates:"none",

    })

    if(curr_file==-1){
    
      total=0;
      toProcess=[];
      tocanID=[];
    }
 
    var file_number = e.target.files.length;
   
    curr_file+=1;
 
    if(curr_file<file_number){
    progress=(curr_file+1)/file_number;
 
    this.setState({progress: progress,startedCertificate:true,display:'none',progressPercent:Math.trunc(this.state.singleProgress*100)+"%"});
      this.setState({
        progressTxtCertificate:"Uploading Certificate"
      })
   
      this.upload2Cert(e,curr_file);
    }else{
      this.setState({
        progressTxtCertificate:"Processing the uploaded passport",
      })
      setTimeout(function (){   
         
        }.bind(this), 5000);

    }
  }



render(){
 
  // Progress Circle styling.
  var options = {
            strokeWidth: 10
        };

  var containerStyle = {
            width: '100px',
            height: '100px'
        };
  prop=this.props.location.state;


  var uploadStyleResume = {
    display:this.state.doneUploadResume,
  }

  var uploadDoneResume = {
    display:this.state.doneUploadDetailResume,
  }

  var uploadBlockResume = {
    display:this.state.uploadBlockResume,
  }


  var uploadStylePassport = {
    display:this.state.doneUploadPassport,
  }

  var uploadDonePassport = {
    display:this.state.doneUploadDetailPassport,
  }

  var uploadBlockPassport = {
    display:this.state.uploadBlockPassport,
  }


  var uploadStyleCertificates = {
    display:this.state.doneUploadCertificates,
  }

  var uploadDoneCertificates = {
    display:this.state.doneUploadDetailCertificates,
  }

  var uploadBlockCertificates = {
    display:this.state.uploadBlockCertificates,
  }
  // UI Elements

  
// Resume
var uploadProgressResume =<div style={uploadBlockResume}><div className="c-p-holder2"><CircularProgressbar
percentage={Math.trunc(this.state.singleProgressResume*100)}
text={`${Math.trunc(this.state.singleProgressResume*100)+"%"}`}
/></div><p>{this.state.progressTxtResume}</p></div>;

var upload_infoResume =<div></div>; 
 
var on_completeResume = <div><p>{this.state.progressTxtResume}</p><br/><br/><br/></div>


// Passport
var uploadProgressPassport =<div style={uploadBlockPassport}> <CircularProgressbar
percentage={Math.trunc(this.state.singleProgressPassport*100)}
text={`${Math.trunc(this.state.singleProgressPassport*100)+"%"}`}
/><p>{this.state.progressTxtPassport}</p></div>;

var upload_infoPassport =<div></div>; 
 
var on_completePassport = <div><p>{this.state.progressTxtPassport}</p><br/><br/><br/></div>


// Certificates
var uploadProgressCertificate =<div style={uploadBlockCertificates}><div className="c-p-holder2"><CircularProgressbar
percentage={Math.trunc(this.state.singleProgressCertificate*100)}
text={`${Math.trunc(this.state.singleProgressCertificate*100)+"%"}`}
/></div><p>{this.state.progressTxtCertificate}</p></div>;

var upload_infoCertificate =<div></div>; 
 
var on_completeCertificate = <div><p>{this.state.progressTxtCertificate}</p><br/><br/><br/></div>



  // End  of UI Elements

if(!this.props.theCandidate){return(<div>Loading...</div>)}

// If Uploaded





  return(
    <div>
<div className="demo-hold">
<br/>
<div className="edit-save-hold-div">
          <p onClick={this.saveRes.bind(this)} className="edit-save-button">Save</p>
        </div>
   <center>
  {/* <img className="upload_img" src={'../../img/upload_img.svg'}/> */}


   
  </center> 
<br/><br/>

  <div className="cand-db-item-hold-up" style={uploadBlockResume}>
 <br/>
 
      {/* Before upload has began */}

 
      <div className="upload-box-db" style={uploadStyleResume}>
      <h2 className="upload-ttl-mod">Resume</h2>
      <p className="upload-no-mod">You have not uploaded a resume</p>
      
      <div className="upload-box">
        <button className="cand-db-edit-b-profile upload-docs-button">Upload Resume</button><input type="file" id="upload-input" onChange={(e)=>{this.upload2(e,-1)}}   size="20"/>
      </div>
      </div>


        {(!this.state.startedResume)? upload_infoResume : null}

      {/* During the upload.. */}

      {(this.state.startedResume)? uploadProgressResume : null}
    
      {/* On upload completion */}

      {(this.state.startedResume==false && this.state.singleProgressResume==1)? on_completeResume : null}
      
    
    </div>

    <div className="cand-db-item-hold-up" style={uploadBlockCertificates}>
 <br/>
 
      {/* Before upload has began */}

      {/* <div className="upload-box-db" style={uploadStylePassport}>
      <h2 className="upload-ttl-mod">Passport</h2>
      <p className="upload-no-mod">You have not uploaded your Passport</p>
      
      <div className="upload-box">
        <button className="cand-db-edit-b-profile">Upload Passport</button><input type="file" id="upload-input" onChange={(e)=>{this.uploadPass(e,-1)}}  size="20"/>
      </div>
      </div>


        {(!this.state.startedPassport)? upload_infoPassport : null}

     

      {(this.state.startedPassport)? uploadProgressPassport : null}
    
   

      {(this.state.startedPassport==false && this.state.singleProgressPassport==1)? on_completePassport : null}
      
    
    </div>


    <div className="cand-db-item-hold-up" style={uploadBlockCertificates}> */}
 <br/>
 
      {/* Before upload has began */}

 
      <div className="upload-box-db" style={uploadStyleCertificates}>
      <h2 className="upload-ttl-mod">Certificates</h2>
      <p className="upload-no-mod">You have not uploaded certificates regarding your field of expertise.</p>
      
      <div className="upload-box">
        <button className="cand-db-edit-b-profile upload-docs-button">Upload Certificate</button><input type="file" id="upload-input" onChange={(e)=>{this.uploadCert(e,-1)}}  size="20"/>
      </div>
      </div>


        {(!this.state.startedCertificate)? upload_infoCertificate : null}

      {/* During the upload.. */}

      {(this.state.startedCertificate)? uploadProgressCertificate : null}
    
      {/* On upload completion */}

      {(this.state.startedCertificate==false && this.state.singleProgressCertificate==1)? on_completeCertificate : null}
      
    
    </div>




    <div className="dash-item-hold" style={uploadDoneResume}>
      <p className="main-title">Resume</p>
      <div> 
          <p> <b>Document Name : </b>{documentNameResume}</p>
          <p> <b>Upload Date: </b>{uploadDateResume}</p>
          <p><a className="edit-link-view" target="_blank" href={documentLinkResume}>View Resume</a></p>
          <p className="delete_button_upload" onClick={()=>{this.deleteRes()}}>Delete</p>
      </div>
    </div>


    {/* <div className="dash-item-hold" style={uploadDonePassport}>
      <p className="main-title">Passport</p>
      <div> 
          <p> <b>Document Name : </b>{documentNamePassport}</p>
          <p> <b>Upload Date: </b>{uploadDatePassport}</p>
          <p><a className="edit-link-view" target="_blank" href={documentLinkPassport}>View Passport</a></p>
          <p className="delete_button" onClick={()=>{this.deletePass()}}>Delete</p>
      </div>
    </div>
 */}


    <div className="dash-item-hold" style={uploadDoneCertificates}>
      <p className="main-title">Certificate</p>
      <div> 
          <p> <b>Document Name : </b>{documentNameCertificate}</p>
          <p> <b>Upload Date: </b>{uploadDateCertificate}</p>
          <p><a className="edit-link-view" target="_blank" href={documentLinkCertificate}>View Certificate</a></p>
          <p className="delete_button_upload" onClick={()=>{this.deleteCert()}}>Delete</p>
      </div>
    </div>

    
 
  

        </div>
 </div>
  );
 };
}
export default withRouter(Upload);