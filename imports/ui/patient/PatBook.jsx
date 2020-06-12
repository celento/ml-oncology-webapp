import React, { Component } from 'react';
import { withHistory, Link,withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';
import {Helmet} from "react-helmet";
 
import Rodal from 'rodal';
import {createContainer} from 'meteor/react-meteor-data';
 
import { PropagateLoader} from 'react-spinners';
import { css } from 'react-emotion';
import { Spin,Result,Card } from 'antd';
import { UserOutlined, LockOutlined,BankOutlined,MobileOutlined,CalendarOutlined } from '@ant-design/icons';
import { patientDB } from '../../collections/patientDB';
import { notifDB } from '../../collections/notifDB';
import { regPatient } from '../../collections/regPatient';

const override = css`
    display: block;
    border-color: red;s
`;

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

var qData = null;
var qBreast = null;
var qBlood = null;
var qBrain = null;
var qSkin = null;

var rQuestions = []
var rAnswers = []
 
class PatBook extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      view : null
    };

    this.resp=this.resp.bind(this)
    this.initalState=this.initalState.bind(this)
   
  }

  
  
handleSubmit(e){
    
} 

initalState(){
  console.log("lol")
  this.setState({
    view: qData[0].view,
  })
}

resp(type,next,inc,qid,aid){
    
  if(type==1){

    brain += inc;
    iBrain +=1;

    var question = document.getElementById("bnq"+qid).textContent;
    var answer = document.getElementById("bna"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)

  }else if(type==2){

    breast += inc;
    iBreast +=1;

    var question = document.getElementById("btq"+qid).textContent;
    var answer = document.getElementById("bta"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)

  }else if(type==3){

    blood += inc;
    iBlood +=1;

    var question = document.getElementById("blq"+qid).textContent;
    var answer = document.getElementById("bla"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)

  }else if(type==4){

    skin += inc;
    iSkin +=1;


    var question = document.getElementById("skq"+qid).textContent;
    var answer = document.getElementById("ska"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)


  }else{

    general +=inc;
    this.setState({
      view:qData[next].view
    })

    var question = document.getElementById("gq"+qid).textContent;
    var answer = document.getElementById("ga"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)

  }

 
  console.log(rQuestions,rAnswers)

  

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
// 2 - Breast
// 3 - Blood
// 4 - Skin
// cancerid,nextq,scoreinc,questionid,answerid

 qData = [{
  view : <div id="gq1" className="pat_question_view">
      <p className="pat_question">Have you ever been troubling with these set of symptoms ?</p>
      <div id="ga11" onClick={()=>this.resp(0,1,10,1,1)} className="pat_button_resp">Headache, Depression, Vomiting, Memory-loss</div>
      <div id="ga12" onClick={()=>this.resp(0,2,10,1,2)} className="pat_button_resp">Bone-Pain, Lumps in armpits, Pale Skin</div>
      <div id="ga13" onClick={()=>this.resp(0,3,10,1,3)} className="pat_button_resp">Flesh-colored scar-like lesion, Bleeding sore, Itchy/Painful lesion</div>
      <div id="ga14" onClick={()=>this.resp(0,0,0,1,4)} className="pat_button_resp">None of the above</div>
  </div>,
},

// todo
{
  view : <div className="pat_question_view">
      <p id="gq2" className="pat_question">Which among the symptoms trouble you the most?</p>
      <div id="ga21" onClick={()=>this.resp(1,0,10,2,1)} className="pat_button_resp">Headache</div>
      <div id="ga22" onClick={()=>this.resp(1,9,10,2,2)} className="pat_button_resp">Vomiting</div>
      <div id="ga23" onClick={()=>this.resp(1,12,10,2,3)} className="pat_button_resp">Memory-loss</div>
  </div>,
},

// todo
{
  view : <div className="pat_question_view">
      <p id="gq3" className="pat_question">Which among the symptoms trouble you the most?</p>
      <div id="ga31" onClick={()=>this.resp(0,0,10,3,1)} className="pat_button_resp">Bone-Pain</div>
      <div id="ga32" onClick={()=>this.resp(0,0,10,3,2)} className="pat_button_resp">Lumps in Armpits /  Swellings in any part of the Breast</div>
      <div id="ga33" onClick={()=>this.resp(0,0,10,3,3)} className="pat_button_resp">Pale Skin</div>
      <div id="ga34" onClick={()=>this.resp(0,0,10,3,4)} className="pat_button_resp">Excessive Bleeding Periods</div>
  </div>,
},

// todo
{
  view : <div className="pat_question_view">
      <p id="gq3" className="pat_question">Which among the symptoms trouble you the most?</p>
      <div id="ga31" onClick={()=>this.resp(0,0,10,3,1)} className="pat_button_resp">flesh-colored scar-like lesion</div>
      <div id="ga32" onClick={()=>this.resp(0,0,10,3,2)} className="pat_button_resp">Bleeding sore</div>
      <div id="ga33" onClick={()=>this.resp(0,0,10,3,3)} className="pat_button_resp">Itchy/Painful lesion</div>
  </div>,
},
 
] 



qBrain = [{
  view : <div id="bn1" className="pat_question_view">
      <p className="pat_question">How would you describe the intensity of the headache?</p>
      <div id="bna11" onClick={()=>this.resp(1,1,10,1,1)} className="pat_button_resp">Severe</div>
      <div id="bn12" onClick={()=>this.resp(1,2,10,1,2)} className="pat_button_resp">Moderate</div>
  </div>,
},


// dead end
// 1
{
view : <div id="bn2" className="pat_question_view">
<p className="pat_question">How long has this been troubling you?</p>
<div id="bna21" onClick={()=>this.resp(1,1,10,2,1)} className="pat_button_resp">Less than a Week</div>
<div id="bn22" onClick={()=>this.resp(1,2,10,2,2)} className="pat_button_resp">About a Month</div>
<div id="bn23" onClick={()=>this.resp(1,3,10,2,3)} className="pat_button_resp">Over an Year</div>
</div>
},

// 2
{
  view : <div id="bn1" className="pat_question_view">
  <p className="pat_question">Does it worsen when you engage in any activity?</p>
  <div id="bna11" onClick={()=>this.resp(1,3,10,1,1)} className="pat_button_resp">Yes</div>
  <div id="bn12" onClick={()=>this.resp(1,4,10,1,2)} className="pat_button_resp">No</div>
  </div>
  },

  // 3
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Have you experiences any  problems with your vision?</p>
    <div id="bna11" onClick={()=>this.resp(1,1,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,5,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 4
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Does it worsen early in the morning?</p>
    <div id="bna11" onClick={()=>this.resp(1,3,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,5,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 5
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Have you ever felt your limbs heavy?</p>
    <div id="bna11" onClick={()=>this.resp(1,3,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,2,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 6
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Do you experience problems when focusing on something ?</p>
    <div id="bna11" onClick={()=>this.resp(1,3,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,6,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 7
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Do you have trouble keeping maintaining your body balance?</p>
    <div id="bna11" onClick={()=>this.resp(1,3,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,2,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // todooooooo
  // 8
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Are you often confused between your left and right side of the body?</p>
    <div id="bna11" onClick={()=>this.resp(1,"x",10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,"x",10,1,2)} className="pat_button_resp">No</div>
    </div>
  },


  // 9
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Does the vomiting last more than a week?</p>
    <div id="bna11" onClick={()=>this.resp(1,10,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,3,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 10
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Does it occur when you wake up?</p>
    <div id="bna11" onClick={()=>this.resp(1,3,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,11,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // done
  // 11
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Does it accompany with a headache?</p>
    <div id="bna11" onClick={()=>this.resp(1,0,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,5,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // done
  // 12
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Have you experienced Short-term memory loss</p>
    <div id="bna11" onClick={()=>this.resp(1,14,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,13,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },


// todooooooooo
  // 13
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Have you felt any difficulty planning things?</p>
    <div id="bna11" onClick={()=>this.resp(1,"x",10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,"x",10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // done
  // 14
  {
    view : <div id="bn1" className="pat_question_view">
    <p className="pat_question">Are you often confused even with simple actions?</p>
    <div id="bna11" onClick={()=>this.resp(1,6,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bn12" onClick={()=>this.resp(1,7,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

]




 


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