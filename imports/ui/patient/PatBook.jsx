import React, { Component } from 'react';
import { withHistory, Link,withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';
import {Helmet} from "react-helmet";
 
import Rodal from 'rodal';
import {createContainer} from 'meteor/react-meteor-data';
 
import { PropagateLoader} from 'react-spinners';
import { css } from 'react-emotion';
import { Spin,Button,Modal,DatePicker,message} from 'antd';
import { UserOutlined, LockOutlined,BankOutlined,MobileOutlined,CalendarOutlined } from '@ant-design/icons';
import { patientDB } from '../../collections/patientDB';
import { notifDB } from '../../collections/notifDB';
import { regPatient } from '../../collections/regPatient';
import { func } from 'prop-types';

const override = css`
    display: block;
    border-color: red;s
`;

var renderDone = false;


var skin=0;
var brain=0;
var breast=0;
var blood=0;
var general=0;
 
var iSkin = 0;
var iBrain = 0;
var iBreast = 0;
var iBlood = 0;
var iGeneral = 0;

var results = null;

var qData = null;
var qBreast = null;
var qBlood = null;
var qBrain = null;
var qSkin = null;
var qInfo = null;


var rQuestions = []
var rAnswers = []
 
class PatBook extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      view : null,
      visible:false,
      appointmentTime:null,
      appointmentTS:null,
      test:null,
    };

    this.resp=this.resp.bind(this)
    this.begin=this.begin.bind(this)
    this.initalState=this.initalState.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
   
  }

  
  
handleSubmit(e){
    
} 


// Test 
showModal = () => {
  this.setState({
    visible: true,
  });
};
 


onChangeDate(value, dateString) {
  var ts = new Date(dateString).getTime();

  if(Date.now()>ts){
    message.error("Invalid Date/Time. Can't go back in Time. LOL!")
  }else{

    this.setState({
      appointmentTime:dateString,
      appointmentTS:ts,
    })

  }
}



begin(){
  this.setState({
    view: qData[0].view,
  })
}

initalState(){
  this.setState({
    view: qInfo[0].view,
  })
}

handleCancel = e => {
 
  this.setState({
    visible: false,
  });
};

// Modal OK
handleOk = e => {

  if(this.state.appointmentTime!=null){

  var appointmentID  = "";
  var possible = 
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 13; i++)
    appointmentID += possible.charAt(Math.floor(Math.random() * possible.length));
   
  var appID = appointmentID+"_"+this.props.uid;

  Meteor.call('newAppointment',appID,appointmentID,this.props.uid,this.props.patientInfo.name,this.props.patientInfo.age,this.props.patientInfo.gender,this.props.patientInfo.mobile,this.state.appointmentTime,this.state.appointmentTS,this.state.test,rQuestions,rAnswers,(err)=>{
    if(!err){
      message.success("Appointment Booked")
    }
  })

  this.setState({
    visible: false,
  });
}else{
  message.error("Please choose a valid Date/Time")
}
};


resp(type,next,inc,sid,qid,aid){


  if(next>=58){

    if(next==58){
    this.setState({
      view:results[0].view,
      test:"Brain Cancer"
    })
  }else if(next==60){
    this.setState({
      view:results[1].view,
      test:"Blood Cancer"
    })
  }else if(next==62){
    this.setState({
      view:results[2].view,
      test:"Skin Cancer"
    })
  }else if(next==64){
    this.setState({
      view:results[3].view,
      test:"Breast Cancer"
    })
  } 

    return
  }




  function findNext(curr){
    var typeData = null
    if(type==0){
      typeData = qData
    }else if(type==1){
      typeData = qBrain
    }else if(type==2){
      typeData = qBlood
    }else if(type==4){
      typeData = qBreast
    }else if(type==3){
      typeData = qSkin
    }

    for(var i=0; i<=typeData.length;i++){
      if(!typeData[i].asked && i!=curr){
        return i
      }
    }

  }

  if(sid==1){
    var question = document.getElementById("bn"+qid).textContent;
    var answer = document.getElementById("bna"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)
  }else if(sid==4){

    var question = document.getElementById("bt"+qid).textContent;
    var answer = document.getElementById("bta"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)

  }else if(sid==2){

    var question = document.getElementById("bl"+qid).textContent;
    var answer = document.getElementById("bla"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)

  }else if(sid==3){

    var question = document.getElementById("sk"+qid).textContent;
    var answer = document.getElementById("ska"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)

  }else{

    var question = document.getElementById("gq"+qid).textContent;
    var answer = document.getElementById("ga"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)
  
  }
 

  console.log(qid,aid)

  console.log(qData)


  if(type==1){
    brain += inc;
    iBrain +=1;

    if(qBrain[next].asked){
      next = findNext(qid-1)
    }


    this.setState({
      view:qBrain[next].view
    })
    qBrain[qid-1].asked = true;


  }else if(type==4){

    breast += inc;
    iBreast +=1;

    if(qBreast[next].asked){
      next = findNext(qid-1)
    }

    this.setState({
      view:qBreast[next].view
    })

    qBreast[qid-1].asked = true;

  }else if(type==2){

    blood += inc;
    iBlood +=1;

    if(qBlood[next].asked){
      next = findNext(qid-1)
    }

    this.setState({
      view:qBlood[next].view
    })
    qBlood[qid-1].asked = true;


  }else if(type==3){

    skin += inc;
    iSkin +=1;

    if(qSkin[next].asked){
      next = findNext(qid-1)
    }

    this.setState({
      view:qSkin[next].view
    })
    qSkin[qid-1].asked = true;



  }else{

    general +=inc;

    if(qData[next].asked){
      next = findNext(qid-1)
    }

    this.setState({
      view:qData[next].view
    })

    qData[next].asked = true;
    console.log(qData[next].asked)
    console.log(next)



  }

 
  console.log(rQuestions,rAnswers)
  console.log(qBrain)
  console.log(qBlood)
  console.log(qBreast)
  console.log(qSkin)
 
}

  render(){
 


  if(!this.props.patientInfo){
    return(
      <div>
        <center>
          <br/>
          <br/>
          <br/>
          <br/>
        <Spin size="large" />
        </center>
      </div>
    )
  }

// 0 - General
// 1 - Brain
// 2 - Blood
// 3 - Skin
// 4 - Breast
// cancerid,nextq,scoreinc,questionid,answerid

if(!renderDone){

  qInfo = [{
    view : <div className="pat_question_view"> 
    <br/>
    <br/>
    <br/>
    <br/>  <br/>
    <br/><br/>
    <br/>
    <h1 className="book_begin">
      Welcome to your Personal Assessment
    </h1>

    <p className="book_subtitle">
      The Personalized Assessment helps you assess your current  health condition and lets you book an appointment with the doctor if necessary. 
    </p>

    <Button onClick={this.begin} className="getStartedbtn" type="primary">Get Started</Button>
 

    </div>
  }]



 qData = [{
  view : <div className="pat_question_view">
      <p id="gq1" className="pat_question">Have you ever been troubling with these set of symptoms ?</p>
      <div id="ga11" onClick={()=>this.resp(0,1,10,0,1,1)} className="pat_button_resp">Headache, Depression, Vomiting, Memory-loss</div>
      <div id="ga12" onClick={()=>this.resp(0,2,10,0,1,2)} className="pat_button_resp">Bone-Pain, Lumps in armpits, Pale Skin</div>
      <div id="ga13" onClick={()=>this.resp(0,3,10,0,1,3)} className="pat_button_resp">Flesh-colored scar-like lesion, Bleeding sore, Itchy/Painful lesion</div>
      <div id="ga14" onClick={()=>this.resp(0,0,0,0,1,4)} className="pat_button_resp">None of the above</div>
  </div>,

  asked : false,
},

// todo
{
  view : <div className="pat_question_view">
      <p id="gq2" className="pat_question">Which among the symptoms trouble you the most?</p>
      <div id="ga21" onClick={()=>this.resp(1,0,10,0,2,1)} className="pat_button_resp">Headache</div>
      <div id="ga22" onClick={()=>this.resp(1,9,10,0,2,2)} className="pat_button_resp">Vomiting</div>
      <div id="ga23" onClick={()=>this.resp(1,12,10,0,2,3)} className="pat_button_resp">Memory-loss</div>
  </div>,
  asked : false,

},

// todo
{
  view : <div className="pat_question_view">
      <p id="gq3" className="pat_question">Which among the symptoms trouble you the most?</p>
      <div id="ga31" onClick={()=>this.resp(0,0,10,0,3,1)} className="pat_button_resp">Bone-Pain</div>
      <div id="ga32" onClick={()=>this.resp(0,0,10,0,3,2)} className="pat_button_resp">Lumps in Armpits /  Swellings in any part of the Breast</div>
      <div id="ga33" onClick={()=>this.resp(0,0,10,0,3,3)} className="pat_button_resp">Pale Skin</div>
      <div id="ga34" onClick={()=>this.resp(0,0,10,0,3,4)} className="pat_button_resp">Excessive Bleeding Periods</div>
  </div>,
  asked : false,

},

// todo
{
  view : <div className="pat_question_view">
      <p id="gq4" className="pat_question">Which among the symptoms trouble you the most?</p>
      <div id="ga41" onClick={()=>this.resp(0,0,10,0,4,1)} className="pat_button_resp">flesh-colored scar-like lesion</div>
      <div id="ga42" onClick={()=>this.resp(0,0,10,0,4,2)} className="pat_button_resp">Bleeding sore</div>
      <div id="ga43" onClick={()=>this.resp(0,0,10,0,4,3)} className="pat_button_resp">Itchy/Painful lesion</div>
  </div>,
  asked : false,

},
 
] 


qBrain = [{
  view : <div className="pat_question_view">
      <p id="bn1" className="pat_question">How would you describe the intensity of the headache?</p>
      <div id="bna11" onClick={()=>this.resp(1,1,10,1,1,1)} className="pat_button_resp">Severe</div>
      <div id="bna12" onClick={()=>this.resp(1,2,10,1,1,2)} className="pat_button_resp">Moderate</div>
  </div>,
  asked : false,

},

// done
// 1
{
view : <div className="pat_question_view">
<p id="bn2"  className="pat_question">How long has this been troubling you?</p>
<div id="bna21" onClick={()=>this.resp(1,6,10,1,2,1)} className="pat_button_resp">Less than a Week</div>
<div id="bna22" onClick={()=>this.resp(1,2,10,1,2,2)} className="pat_button_resp">About a Month</div>
<div id="bna23" onClick={()=>this.resp(1,3,10,1,2,3)} className="pat_button_resp">Over an Year</div>
</div>,

asked : false,

},

// done
// 2
{
  view : <div className="pat_question_view">
  <p id="bn3" className="pat_question">Does it worsen when you engage in any activity?</p>
  <div id="bna31" onClick={()=>this.resp(1,3,10,1,3,1)} className="pat_button_resp">Yes</div>
  <div id="bna32" onClick={()=>this.resp(1,4,10,1,3,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

  },

  // done
  // 3
  {
    view : <div className="pat_question_view">
    <p  id="bn4" className="pat_question">Have you experiences any  problems with your vision?</p>
    <div id="bna41" onClick={()=>this.resp(1,6,10,1,4,1)} className="pat_button_resp">Yes</div>
    <div id="bna42" onClick={()=>this.resp(1,4,10,1,4,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // done
  // 4
  {
    view : <div className="pat_question_view">
    <p  id="bn5" className="pat_question">Does it worsen early in the morning?</p>
    <div id="bna51" onClick={()=>this.resp(1,3,10,1,5,1)} className="pat_button_resp">Yes</div>
    <div id="bna52" onClick={()=>this.resp(1,5,10,1,5,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // 5
  {
    view : <div className="pat_question_view">
    <p id="bn6" className="pat_question">Have you ever felt your limbs heavy?</p>
    <div id="bna61" onClick={()=>this.resp(1,3,10,1,6,1)} className="pat_button_resp">Yes</div>
    <div id="bna62" onClick={()=>this.resp(1,2,10,1,6,2)} className="pat_button_resp">No</div>
    </div>,
    asked : false,

  },

  // 6
  {
    view : <div className="pat_question_view">
    <p id="bn7" className="pat_question">Do you experience problems when focusing on something ?</p>
    <div id="bna71" onClick={()=>this.resp(1,3,10,1,7,1)} className="pat_button_resp">Yes</div>
    <div id="bna72" onClick={()=>this.resp(1,6,10,1,7,2)} className="pat_button_resp">No</div>
    </div>,
    asked : false,

  },

  // 7
  {
    view : <div className="pat_question_view">
    <p id="bn8" className="pat_question">Do you have trouble keeping maintaining your body balance?</p>
    <div id="bna81" onClick={()=>this.resp(1,3,10,1,8,1)} className="pat_button_resp">Yes</div>
    <div id="bna82" onClick={()=>this.resp(1,2,10,1,8,2)} className="pat_button_resp">No</div>
    </div>,
    asked : false,

  },

  // todooooooo
  // 8
  {
    view : <div className="pat_question_view">
    <p id="bn9" className="pat_question">Are you often confused between your left and right side of the body?</p>
    <div id="bna91" onClick={()=>this.resp(1,58,10,1,9,1)} className="pat_button_resp">Yes</div>
    <div id="bna92" onClick={()=>this.resp(1,59,10,1,9,2)} className="pat_button_resp">No</div>
    </div>,
    asked : false,

  },


  // 9
  {
    view : <div className="pat_question_view">
    <p id="bn10" className="pat_question">Does the vomiting last more than a week?</p>
    <div id="bna101" onClick={()=>this.resp(1,10,10,1,10,1)} className="pat_button_resp">Yes</div>
    <div id="bna102" onClick={()=>this.resp(1,3,10,1,10,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // 10
  {
    view : <div className="pat_question_view">
    <p id="bn11" className="pat_question">Does it occur when you wake up?</p>
    <div id="bna111" onClick={()=>this.resp(1,3,10,1,11,1)} className="pat_button_resp">Yes</div>
    <div id="bna112" onClick={()=>this.resp(1,11,10,1,11,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // done
  // 11
  {
    view : <div className="pat_question_view">
    <p id="bn12" className="pat_question">Does it accompany with a headache?</p>
    <div id="bna121" onClick={()=>this.resp(1,0,10,1,12,1)} className="pat_button_resp">Yes</div>
    <div id="bna122" onClick={()=>this.resp(1,5,10,1,12,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // done
  // 12
  {
    view : <div className="pat_question_view">
    <p id="bn13" className="pat_question">Have you experienced Short-term memory loss</p>
    <div id="bna131" onClick={()=>this.resp(1,14,10,1,13,1)} className="pat_button_resp">Yes</div>
    <div id="bna132" onClick={()=>this.resp(1,13,10,1,13,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },


// todooooooooo
  // 13
  {
    view : <div className="pat_question_view">
    <p id="bn14" className="pat_question">Have you felt any difficulty planning things?</p>
    <div id="bna141" onClick={()=>this.resp(1,58,10,1,14,1)} className="pat_button_resp">Yes</div>
    <div id="bna142" onClick={()=>this.resp(1,59,10,1,14,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // done
  // 14
  {
    view : <div className="pat_question_view">
    <p id="bn15" className="pat_question">Are you often confused even with simple actions?</p>
    <div id="bna151" onClick={()=>this.resp(1,6,10,1,15,1)} className="pat_button_resp">Yes</div>
    <div id="bna152" onClick={()=>this.resp(1,7,10,1,15,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

]


 qBlood = [

  // 0
  // done
  {
    view : <div className="pat_question_view">
    <p id="bl1" className="pat_question">Do you experience any difficulty breathing?</p>
    <div id="bla11" onClick={()=>this.resp(2,1,10,2,1,1)} className="pat_button_resp">Yes</div>
    <div id="bla12" onClick={()=>this.resp(2,2,10,2,1,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // done
  // 1
  {
    view : <div className="pat_question_view">
    <p id="bl2" className="pat_question">Have you experienced any bleeding gums?</p>
    <div id="bla21" onClick={()=>this.resp(2,3,10,2,2,1)} className="pat_button_resp">Yes</div>
    <div id="bla22" onClick={()=>this.resp(2,11,0,2,2,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // done
  // 2
  {
    view : <div className="pat_question_view">
    <p id="bl3" className="pat_question">Do you usually get tired without doing much of anything?</p>
    <div id="bla31" onClick={()=>this.resp(2,60,10,2,3,1)} className="pat_button_resp">Yes</div>
    <div id="bla32" onClick={()=>this.resp(2,11,0,2,3,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

// done
// 3
  {
    view : <div className="pat_question_view">
    <p id="bl4" className="pat_question">Does your gum bleed while brushing?</p>
    <div id="bla41" onClick={()=>this.resp(2,4,10,2,4,1)} className="pat_button_resp">Yes</div>
    <div id="bla42" onClick={()=>this.resp(2,11,0,2,4,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

// done
// 4
  {
    view : <div className="pat_question_view">
    <p id="bl5" className="pat_question">Do you have any reported cases of repeated infections?</p>
    <div id="bla51" onClick={()=>this.resp(2,2,10,2,5,1)} className="pat_button_resp">Yes</div>
    <div id="bla52" onClick={()=>this.resp(2,5,0,2,5,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

// done
// 5
  {
    view : <div className="pat_question_view">
    <p id="bl6" className="pat_question">Does your bones fracture  easily?</p>
    <div id="bla61" onClick={()=>this.resp(2,60,10,2,6,1)} className="pat_button_resp">Yes</div>
    <div id="bla62" onClick={()=>this.resp(2,61,0,2,6,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

// done
// 6
  {
    view : <div className="pat_question_view">
    <p id="bl7" className="pat_question">Do you usually sweat at night?</p>
    <div id="bla71" onClick={()=>this.resp(2,8,10,2,7,1)} className="pat_button_resp">Yes</div>
    <div id="bla72" onClick={()=>this.resp(2,7,0,2,7,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // done
// 7
  {
    view : <div className="pat_question_view">
    <p id="bl8" className="pat_question">Do you often experience itching over the body?</p>
    <div id="bla81" onClick={()=>this.resp(2,10,10,2,8,1)} className="pat_button_resp">Yes</div>
    <div id="bla82" onClick={()=>this.resp(2,8,0,2,8,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

// done
// 8
  {
    view : <div className="pat_question_view">
    <p id="bl9" className="pat_question">Does your body experience any sudden weight loss?</p>
    <div id="bla91" onClick={()=>this.resp(2,10,10,2,9,1)} className="pat_button_resp">Yes</div>
    <div id="bla92" onClick={()=>this.resp(2,61,0,2,9,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

// done
// 9
  {
    view : <div className="pat_question_view">
    <p id="bl10" className="pat_question">Do you often feel lightheaded</p>
    <div id="bla101" onClick={()=>this.resp(2,60,10,2,10,1)} className="pat_button_resp">Yes</div>
    <div id="bla102" onClick={()=>this.resp(2,61,0,2,10,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },


// 10
  {
    view : <div className="pat_question_view">
    <p id="bl11" className="pat_question">Do you experience fatigue without involving in any physical activity</p>
    <div id="bla111" onClick={()=>this.resp(2,3,10,2,11,1)} className="pat_button_resp">Yes</div>
    <div id="bla112" onClick={()=>this.resp(2,2,0,2,11,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // done
  // 11
  {
    view : <div className="pat_question_view">
    <p id="bl12" className="pat_question">Does your nose bleed?</p>
    <div id="bla121" onClick={()=>this.resp(2,60,10,2,12,1)} className="pat_button_resp">Yes</div>
    <div id="bla122" onClick={()=>this.resp(2,61,0,2,12,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

]

 qSkin = [

  // done
  // 0
  {
    view : <div className="pat_question_view">
    <p id="sk1" className="pat_question">Does it appears like a pearly or waxy bump?</p>
    <div id="ska11" onClick={()=>this.resp(3,1,10,3,1,1)} className="pat_button_resp">Yes</div>
    <div id="ska12" onClick={()=>this.resp(3,5,0,3,1,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

    
  },

// done
   // 1
   {
    view : <div className="pat_question_view">
    <p id="sk2" className="pat_question">Does the lesion changes it's color?</p>
    <div id="ska21" onClick={()=>this.resp(3,2,10,3,2,1)} className="pat_button_resp">Yes</div>
    <div id="ska22" onClick={()=>this.resp(3,5,0,3,2,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },
 
  // done
  // 2
  {
    view : <div className="pat_question_view">
    <p id="sk3" className="pat_question">Does it bleed?</p>
    <div id="ska31" onClick={()=>this.resp(3,62,10,3,3,1)} className="pat_button_resp">Yes</div>
    <div id="ska32" onClick={()=>this.resp(3,3,0,3,3,2)} className="pat_button_resp">No</div>
    </div>,
  asked : false,

  },

  // done
  // 3
  {
  view : <div className="pat_question_view">
  <p id="sk4" className="pat_question">Is there any burning sensation/pain inside the lesion?</p>
  <div id="ska41" onClick={()=>this.resp(3,4,10,3,4,1)} className="pat_button_resp">Yes</div>
  <div id="ska42" onClick={()=>this.resp(3,63,0,3,4,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

},


// done
// 4
  {
  view : <div className="pat_question_view">
  <p id="sk5" className="pat_question">Have you ever felt itching over the surface of lesion?</p>
  <div id="ska51" onClick={()=>this.resp(3,62,10,3,5,1)} className="pat_button_resp">Yes</div>
  <div id="ska52" onClick={()=>this.resp(3,63,0,3,5,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

},


// done
// 5
  {
  view : <div className="pat_question_view">
  <p id="sk6" className="pat_question">Does it appears as a large brownish spot?</p>
  <div id="ska61" onClick={()=>this.resp(3,6,10,3,6,1)} className="pat_button_resp">Yes</div>
  <div id="ska62" onClick={()=>this.resp(3,4,0,3,6,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

  },


// done
// 6
  {
  view : <div className="pat_question_view">
  <p id="sk7" className="pat_question">Does it contain dark coloured spots?</p>
  <div id="ska71" onClick={()=>this.resp(3,62,10,3,7,1)} className="pat_button_resp">Yes</div>
  <div id="ska72" onClick={()=>this.resp(3,4,0,3,7,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

},


// done
// 7
{
  view : <div className="pat_question_view">
  <p id="sk8" className="pat_question">Does that sore remains open for week?</p>
  <div id="ska81" onClick={()=>this.resp(3,8,10,3,8,1)} className="pat_button_resp">Yes</div>
  <div id="ska82" onClick={()=>this.resp(3,6,0,3,8,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

},


// deadend 13
// 8
{
  view : <div className="pat_question_view">
  <p id="sk9" className="pat_question">Is this accompanied by any other symptoms?</p>
  <div id="ska91" onClick={()=>this.resp(1,0,10,3,9,1)} className="pat_button_resp">Yes</div>
  <div id="ska92" onClick={()=>this.resp(3,62,0,3,9,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

},

]


 qBreast = [

//done
// 0
{
  view : <div className="pat_question_view">
  <p id="bt1" className="pat_question">Do you feel any thickness in any part of the breast?</p>
  <div id="bta11" onClick={()=>this.resp(3,1,10,4,1,1)} className="pat_button_resp">Yes</div>
  <div id="bta12" onClick={()=>this.resp(3,2,0,4,1,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

},

// done
// 1
{
  view : <div className="pat_question_view">
  <p id="bt2" className="pat_question">Is there any pain experienced in that area?</p>
  <div id="bta21" onClick={()=>this.resp(3,2,10,4,2,1)} className="pat_button_resp">Yes</div>
  <div id="bta22" onClick={()=>this.resp(3,3,0,4,2,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

},

// done
// 2
{
  view : <div className="pat_question_view">
  <p id="bt3" className="pat_question">Is there any bloody discharge from the nipples?</p>
  <div id="bta31" onClick={()=>this.resp(3,64,10,4,3,1)} className="pat_button_resp">Yes</div>
  <div id="bta32" onClick={()=>this.resp(3,3,0,4,3,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

},

// deadend 64 65
// 3
{
  view : <div className="pat_question_view">
  <p id="bt4" className="pat_question">Have you observed any reddish spots across the skin over the breast?</p>
  <div id="bta41" onClick={()=>this.resp(3,'x',10,4,4,1)} className="pat_button_resp">Yes</div>
  <div id="bta42" onClick={()=>this.resp(3,'x',0,4,4,2)} className="pat_button_resp">No</div>
  </div>,
  asked : false,

},


]
 

results = [
 
  {

    view : <div className="pat_question_view"> 
    <br/>
    <br/>
    <br/>
    <br/>  <br/>
    <br/><br/>
    <br/>
    <h1 className="book_begin">
      Assessment Complete
    </h1>

    <h2 className="acs_text">Based on your answers, you are in high risk category for <b>Brain Cancer</b></h2>

    <p className="book_subtitle">
       Book an appointment with the nearest doctor and get yourself checked.
    </p>

    <Button onClick={this.showModal} className="getStartedbtn" type="primary">Book an Appointment</Button>
 

    </div>

  },

  {

    view : <div className="pat_question_view">
    <p id="bt4" className="pat_question">You got 2 weeks on Earth</p>

    <p>Be greatful for everything you ever had and die in peace</p>
    
    </div>,

  },


  {

    view : <div className="pat_question_view">
    <p id="bt4" className="pat_question">You got 2 weeks on Earth</p>

    <p>Be greatful for everything you ever had and die in peace</p>
    
    </div>,

  },


  {

    view : <div className="pat_question_view">
    <p id="bt4" className="pat_question">You got 2 weeks on Earth</p>

    <p>Be greatful for everything you ever had and die in peace</p>
    
    </div>,
  },

]





renderDone = true;
}
// end of renderDone


if(this.state.view==null){
  console.log("here")
  this.initalState()
}
 

 

    return (
      <div>
        <Notifications/>
{/*   
        <p className="ma-title">Notifications</p>
        <p className="ma_nothing">Nothing to Show</p> */}

        {this.state.view}



        <Modal
          title="Book an Appointment"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="Confirm"
          onCancel={this.handleCancel}
        >
 
           <p><b>Test :</b> {this.state.test} </p>


           <p> <b>Appointment Date & Time </b></p>
          <DatePicker showTime={{ format: 'HH:mm' }} onChange={this.onChangeDate}/>
          <br />
          <br />
        
 
     
        </Modal>



     
      </div>
 

       
    

    );
  }
}
  export default createContainer((props)=>{
  

    const qs = require('query-string');
    q = qs.parse(props.location.search).id

    Meteor.subscribe('notif-user',q);

    Meteor.subscribe('patient-info',q);

    return{
      patientInfo:regPatient.findOne({_id:q}),
      uid : q,
      notif:notifDB.find({userID:q},{sort:{timestamp:-1}}).fetch(),
    }
    
  }, withRouter(PatBook));