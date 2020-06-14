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

  }else if(type==4){

    breast += inc;
    iBreast +=1;

    var question = document.getElementById("btq"+qid).textContent;
    var answer = document.getElementById("bta"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)

  }else if(type==2){

    blood += inc;
    iBlood +=1;

    var question = document.getElementById("blq"+qid).textContent;
    var answer = document.getElementById("bla"+qid+aid).textContent;
    rQuestions.push(question)
    rAnswers.push(answer)

  }else if(type==3){

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
// 2 - Blood
// 3 - Skin
// 4 - Breast
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
      <p id="gq4" className="pat_question">Which among the symptoms trouble you the most?</p>
      <div id="ga41" onClick={()=>this.resp(0,0,10,4,1)} className="pat_button_resp">flesh-colored scar-like lesion</div>
      <div id="ga42" onClick={()=>this.resp(0,0,10,4,2)} className="pat_button_resp">Bleeding sore</div>
      <div id="ga43" onClick={()=>this.resp(0,0,10,4,3)} className="pat_button_resp">Itchy/Painful lesion</div>
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
  view : <div id="bn3" className="pat_question_view">
  <p className="pat_question">Does it worsen when you engage in any activity?</p>
  <div id="bna31" onClick={()=>this.resp(1,3,10,3,1)} className="pat_button_resp">Yes</div>
  <div id="bna32" onClick={()=>this.resp(1,4,10,3,2)} className="pat_button_resp">No</div>
  </div>
  },

  // 3
  {
    view : <div id="bn4" className="pat_question_view">
    <p className="pat_question">Have you experiences any  problems with your vision?</p>
    <div id="bna41" onClick={()=>this.resp(1,1,10,4,1)} className="pat_button_resp">Yes</div>
    <div id="bna42" onClick={()=>this.resp(1,5,10,4,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 4
  {
    view : <div id="bn5" className="pat_question_view">
    <p className="pat_question">Does it worsen early in the morning?</p>
    <div id="bna51" onClick={()=>this.resp(1,3,10,5,1)} className="pat_button_resp">Yes</div>
    <div id="bna52" onClick={()=>this.resp(1,5,10,5,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 5
  {
    view : <div id="bn6" className="pat_question_view">
    <p className="pat_question">Have you ever felt your limbs heavy?</p>
    <div id="bna61" onClick={()=>this.resp(1,3,10,6,1)} className="pat_button_resp">Yes</div>
    <div id="bna62" onClick={()=>this.resp(1,2,10,6,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 6
  {
    view : <div id="bn7" className="pat_question_view">
    <p className="pat_question">Do you experience problems when focusing on something ?</p>
    <div id="bna71" onClick={()=>this.resp(1,3,10,7,1)} className="pat_button_resp">Yes</div>
    <div id="bna72" onClick={()=>this.resp(1,6,10,7,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 7
  {
    view : <div id="bn8" className="pat_question_view">
    <p className="pat_question">Do you have trouble keeping maintaining your body balance?</p>
    <div id="bna81" onClick={()=>this.resp(1,3,10,8,1)} className="pat_button_resp">Yes</div>
    <div id="bna82" onClick={()=>this.resp(1,2,10,8,2)} className="pat_button_resp">No</div>
    </div>
  },

  // todooooooo
  // 8
  {
    view : <div id="bn9" className="pat_question_view">
    <p className="pat_question">Are you often confused between your left and right side of the body?</p>
    <div id="bna91" onClick={()=>this.resp(1,"x",10,9,1)} className="pat_button_resp">Yes</div>
    <div id="bna92" onClick={()=>this.resp(1,"x",10,9,2)} className="pat_button_resp">No</div>
    </div>
  },


  // 9
  {
    view : <div id="bn10" className="pat_question_view">
    <p className="pat_question">Does the vomiting last more than a week?</p>
    <div id="bna101" onClick={()=>this.resp(1,10,10,10,1)} className="pat_button_resp">Yes</div>
    <div id="bna102" onClick={()=>this.resp(1,3,10,10,2)} className="pat_button_resp">No</div>
    </div>
  },

  // 10
  {
    view : <div id="bn11" className="pat_question_view">
    <p className="pat_question">Does it occur when you wake up?</p>
    <div id="bna111" onClick={()=>this.resp(1,3,10,11,1)} className="pat_button_resp">Yes</div>
    <div id="bn112" onClick={()=>this.resp(1,11,10,11,2)} className="pat_button_resp">No</div>
    </div>
  },

  // done
  // 11
  {
    view : <div id="bn12" className="pat_question_view">
    <p className="pat_question">Does it accompany with a headache?</p>
    <div id="bna121" onClick={()=>this.resp(1,0,10,12,1)} className="pat_button_resp">Yes</div>
    <div id="bn122" onClick={()=>this.resp(1,5,10,12,2)} className="pat_button_resp">No</div>
    </div>
  },

  // done
  // 12
  {
    view : <div id="bn13" className="pat_question_view">
    <p className="pat_question">Have you experienced Short-term memory loss</p>
    <div id="bna131" onClick={()=>this.resp(1,14,10,13,1)} className="pat_button_resp">Yes</div>
    <div id="bn132" onClick={()=>this.resp(1,13,10,13,2)} className="pat_button_resp">No</div>
    </div>
  },


// todooooooooo
  // 13
  {
    view : <div id="bn14" className="pat_question_view">
    <p className="pat_question">Have you felt any difficulty planning things?</p>
    <div id="bna141" onClick={()=>this.resp(1,"x",10,14,1)} className="pat_button_resp">Yes</div>
    <div id="bn142" onClick={()=>this.resp(1,"x",10,14,2)} className="pat_button_resp">No</div>
    </div>
  },

  // done
  // 14
  {
    view : <div id="bn15" className="pat_question_view">
    <p className="pat_question">Are you often confused even with simple actions?</p>
    <div id="bna151" onClick={()=>this.resp(1,6,10,15,1)} className="pat_button_resp">Yes</div>
    <div id="bn152" onClick={()=>this.resp(1,7,10,15,2)} className="pat_button_resp">No</div>
    </div>
  },

]


var qBlood = [

  // 0
  // done
  {
    view : <div id="bl1" className="pat_question_view">
    <p className="pat_question">Do you experience any difficulty breathing?</p>
    <div id="bla11" onClick={()=>this.resp(2,1,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="bla12" onClick={()=>this.resp(2,2,10,1,2)} className="pat_button_resp">No</div>
    </div>
  },

  // done
  // 1
  {
    view : <div id="bl2" className="pat_question_view">
    <p className="pat_question">Have you experienced any bleeding gums?</p>
    <div id="bla21" onClick={()=>this.resp(2,3,10,2,1)} className="pat_button_resp">Yes</div>
    <div id="bla22" onClick={()=>this.resp(2,11,0,2,2)} className="pat_button_resp">No</div>
    </div>
  },

  // deadend
  // 2
  {
    view : <div id="bl3" className="pat_question_view">
    <p className="pat_question">Do you usually get tired without doing much of anything?</p>
    <div id="bla31" onClick={()=>this.resp(2,'x',10,3,1)} className="pat_button_resp">Yes</div>
    <div id="bla32" onClick={()=>this.resp(2,11,0,3,2)} className="pat_button_resp">No</div>
    </div>
  },

// done
// 3
  {
    view : <div id="bl4" className="pat_question_view">
    <p className="pat_question">Does your gum bleed while brushing?</p>
    <div id="bla41" onClick={()=>this.resp(2,4,10,4,1)} className="pat_button_resp">Yes</div>
    <div id="bla42" onClick={()=>this.resp(2,11,0,4,2)} className="pat_button_resp">No</div>
    </div>
  },

// 4
  {
    view : <div id="bl5" className="pat_question_view">
    <p className="pat_question">Do you have any reported cases of repeated infections?</p>
    <div id="bla51" onClick={()=>this.resp(2,2,10,5,1)} className="pat_button_resp">Yes</div>
    <div id="bla52" onClick={()=>this.resp(2,5,0,5,2)} className="pat_button_resp">No</div>
    </div>
  },

  // deadend 60 61
// 5
  {
    view : <div id="bl6" className="pat_question_view">
    <p className="pat_question">Does your bones fracture  easily?</p>
    <div id="bla61" onClick={()=>this.resp(2,'x',10,6,1)} className="pat_button_resp">Yes</div>
    <div id="bla62" onClick={()=>this.resp(2,'x',0,6,2)} className="pat_button_resp">No</div>
    </div>
  },

// done
// 6
  {
    view : <div id="bl7" className="pat_question_view">
    <p className="pat_question">Do you usually sweat at night?</p>
    <div id="bla71" onClick={()=>this.resp(2,8,10,7,1)} className="pat_button_resp">Yes</div>
    <div id="bla72" onClick={()=>this.resp(2,7,0,7,2)} className="pat_button_resp">No</div>
    </div>
  },

  // done
// 7
  {
    view : <div id="bl8" className="pat_question_view">
    <p className="pat_question">Do you often experience itching over the body?</p>
    <div id="bla81" onClick={()=>this.resp(2,10,10,8,1)} className="pat_button_resp">Yes</div>
    <div id="bla82" onClick={()=>this.resp(2,8,0,8,2)} className="pat_button_resp">No</div>
    </div>
  },

// deadend 61
// 8
  {
    view : <div id="bl9" className="pat_question_view">
    <p className="pat_question">Does your body experience any sudden weight loss?</p>
    <div id="bla91" onClick={()=>this.resp(2,10,10,9,1)} className="pat_button_resp">Yes</div>
    <div id="bla92" onClick={()=>this.resp(2,'x',0,9,2)} className="pat_button_resp">No</div>
    </div>
  },

// deadend
// 9
  {
    view : <div id="bl10" className="pat_question_view">
    <p className="pat_question">Do you often feel lightheaded</p>
    <div id="bla101" onClick={()=>this.resp(2,'x',10,10,1)} className="pat_button_resp">Yes</div>
    <div id="bla102" onClick={()=>this.resp(2,'x',0,10,2)} className="pat_button_resp">No</div>
    </div>
  },


// 10
  {
    view : <div id="bl11" className="pat_question_view">
    <p className="pat_question">Do you experience fatigue without involving in any physical activity</p>
    <div id="bla111" onClick={()=>this.resp(2,3,10,11,1)} className="pat_button_resp">Yes</div>
    <div id="bla112" onClick={()=>this.resp(2,2,0,11,2)} className="pat_button_resp">No</div>
    </div>
  },

  // deadend
  // 11
  {
    view : <div id="bl12" className="pat_question_view">
    <p className="pat_question">Does your nose bleed?</p>
    <div id="bla121" onClick={()=>this.resp(2,'x',10,12,1)} className="pat_button_resp">Yes</div>
    <div id="bla122" onClick={()=>this.resp(2,'x',0,12,2)} className="pat_button_resp">No</div>
    </div>
  },

]

var qSkin = [

  // done
  // 0
  {
    view : <div id="sk1" className="pat_question_view">
    <p className="pat_question">Does it appears like a pearly or waxy bump?</p>
    <div id="ska11" onClick={()=>this.resp(3,1,10,1,1)} className="pat_button_resp">Yes</div>
    <div id="ska12" onClick={()=>this.resp(3,5,0,1,2)} className="pat_button_resp">No</div>
    </div>
  },

// done
   // 1
   {
    view : <div id="sk2" className="pat_question_view">
    <p className="pat_question">Does the lesion changes it's color?</p>
    <div id="ska21" onClick={()=>this.resp(3,2,10,2,1)} className="pat_button_resp">Yes</div>
    <div id="ska22" onClick={()=>this.resp(3,5,0,2,2)} className="pat_button_resp">No</div>
    </div>
  },
 
  // deadend 62
  // 2
  {
    view : <div id="sk3" className="pat_question_view">
    <p className="pat_question">Does it bleed?</p>
    <div id="ska31" onClick={()=>this.resp(3,'x',10,3,1)} className="pat_button_resp">Yes</div>
    <div id="ska32" onClick={()=>this.resp(3,3,0,3,2)} className="pat_button_resp">No</div>
    </div>
  },

  // deadend 63
  // 3
  {
  view : <div id="sk4" className="pat_question_view">
  <p className="pat_question">Is there any burning sensation/pain inside the lesion?</p>
  <div id="ska41" onClick={()=>this.resp(3,4,10,4,1)} className="pat_button_resp">Yes</div>
  <div id="ska42" onClick={()=>this.resp(3,'x',0,4,2)} className="pat_button_resp">No</div>
  </div>
},


// deadend 62 63
// 4
  {
  view : <div id="sk15" className="pat_question_view">
  <p className="pat_question">Have you ever felt itching over the surface of lesion?</p>
  <div id="ska51" onClick={()=>this.resp(3,'x',10,5,1)} className="pat_button_resp">Yes</div>
  <div id="ska52" onClick={()=>this.resp(3,'x',0,5,2)} className="pat_button_resp">No</div>
  </div>
},


// done
// 5
  {
  view : <div id="sk6" className="pat_question_view">
  <p className="pat_question">Does it appears as a large brownish spot?</p>
  <div id="ska61" onClick={()=>this.resp(3,6,10,6,1)} className="pat_button_resp">Yes</div>
  <div id="ska62" onClick={()=>this.resp(3,4,0,6,2)} className="pat_button_resp">No</div>
  </div>
  },


// done
// 6
  {
  view : <div id="sk7" className="pat_question_view">
  <p className="pat_question">Does it contain dark coloured spots?</p>
  <div id="ska71" onClick={()=>this.resp(3,'x',10,7,1)} className="pat_button_resp">Yes</div>
  <div id="ska72" onClick={()=>this.resp(3,4,0,7,2)} className="pat_button_resp">No</div>
  </div>
},


// done
// 7
{
  view : <div id="sk8" className="pat_question_view">
  <p className="pat_question">Does that sore remains open for week?</p>
  <div id="ska81" onClick={()=>this.resp(3,8,10,8,1)} className="pat_button_resp">Yes</div>
  <div id="ska82" onClick={()=>this.resp(3,6,0,8,2)} className="pat_button_resp">No</div>
  </div>
},


// deadend 13
// 8
{
  view : <div id="sk9" className="pat_question_view">
  <p className="pat_question">Is this accompanied by any other symptoms?</p>
  <div id="ska91" onClick={()=>this.resp(3,'x',10,9,1)} className="pat_button_resp">Yes</div>
  <div id="ska92" onClick={()=>this.resp(3,'x',0,9,2)} className="pat_button_resp">No</div>
  </div>
},

]


var qBreast = [

//done
// 0
{
  view : <div id="bt1" className="pat_question_view">
  <p className="pat_question">Do you feel any thickness in any part of the breast?</p>
  <div id="bta11" onClick={()=>this.resp(3,1,10,1,1)} className="pat_button_resp">Yes</div>
  <div id="bta12" onClick={()=>this.resp(3,2,0,1,2)} className="pat_button_resp">No</div>
  </div>
},

// done
// 1
{
  view : <div id="bt2" className="pat_question_view">
  <p className="pat_question">Is there any pain experienced in that area?</p>
  <div id="bta21" onClick={()=>this.resp(3,2,10,2,1)} className="pat_button_resp">Yes</div>
  <div id="bta22" onClick={()=>this.resp(3,3,0,2,2)} className="pat_button_resp">No</div>
  </div>
},

// done
// 2
{
  view : <div id="bt3" className="pat_question_view">
  <p className="pat_question">Is there any bloody discharge from the nipples?</p>
  <div id="bta31" onClick={()=>this.resp(3,'x',10,3,1)} className="pat_button_resp">Yes</div>
  <div id="bta32" onClick={()=>this.resp(3,'x',0,3,2)} className="pat_button_resp">No</div>
  </div>
},

// deadend 64 65
// 3
{
  view : <div id="bt4" className="pat_question_view">
  <p className="pat_question">Have you observed any reddish spots across the skin over the breast?</p>
  <div id="bta41" onClick={()=>this.resp(3,'x',10,4,1)} className="pat_button_resp">Yes</div>
  <div id="bta42" onClick={()=>this.resp(3,'x',0,4,2)} className="pat_button_resp">No</div>
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