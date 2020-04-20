import React, { Component } from 'react';
import { withHistory, Link,withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';
import {Helmet} from "react-helmet";
 
import Rodal from 'rodal';
import {createContainer} from 'meteor/react-meteor-data';
 
import { PropagateLoader} from 'react-spinners';
import { css } from 'react-emotion';
import { Spin,Progress } from 'antd';
import { UserOutlined, LockOutlined,BankOutlined,MobileOutlined,IdcardOutlined } from '@ant-design/icons';
import { patientDB } from '../../collections/patientDB';

const override = css`
    display: block;
    border-color: red;
`;
var state,url;

const questions = ['പനി','ജലദോഷം','വയറിളക്കം','തൊണ്ടവേദന',
'ചുമ','ശ്വാസംമുട്ടൽ','ശ്വാസതടസ്സം','സന്ധികളിൽ വേദന','ശക്തമായ തലവേദ','ക്ഷീണം അനുഭവപ്പെടുന്നുണ്ടോ'];

class SubmitResponse extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      
      current:0,
      currentQ : questions[0],
      rec_ans : [],
      panic_score:0,
      finished : "dis_none",
      qArea : "dis_block",
    };

    this.yes =  this.yes.bind(this);
    this.no =  this.no.bind(this);
    this.done =  this.done.bind(this);
  }

  componentDidMount(){
    
  }

  done(){
    var q = questions;
    var a = this.state.rec_ans;

    var userinfo = this.props.patientInfo;


    console.log(this.props.patientInfo)

    var userinfo = this.props.patientInfo;
    var name = this.props.patientInfo.name;
    var age = this.props.patientInfo.age;
    var gender = this.props.patientInfo.gender;
    var panchayat = this.props.patientInfo.panchayat;
    var taluk = this.props.patientInfo.taluk;
    var ward = this.props.patientInfo.ward;
    var travel = this.props.patientInfo.travel;
    var phone = this.props.patientInfo.travel;

    
    console.log(name,age,gender,panchayat,taluk,ward,travel)

    Meteor.call('done_quest',this.props.uid,this.state.panic_score,q,a,name,age,gender,panchayat,taluk,ward,travel,phone,userinfo,(err)=>{
      console.log("done")
    })


  }

  yes(){  

    var ans = this.state.rec_ans;
    ans.push('Yes')

    if(this.state.current==9){
      this.setState({
        finished:"dis_blk",
        current : 10,
        qArea:"dis_none"
      })

      this.done()

    } else{

  
    
    this.setState({
       panic_score : this.state.panic_score+1,
       rec_ans:ans,
       currentQ : questions[this.state.current+1],
       current:this.state.current+1,
    })

  }
  }

  no(){
    var ans = this.state.rec_ans;
    ans.push('No')
    if(this.state.current==9){
      this.setState({
        finished:"dis_blk",
        current : 10,
        qArea:"dis_none"
      })
      this.done()
    } else { 



    this.setState({
      rec_ans:ans,
      currentQ : questions[this.state.current+1],
      current:this.state.current+1,
   })
  }
  }
 
 
 

  handleSubmit(e){
     
    
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

   
    const error = this.state.error;
    // End 

    return (
      <div className="vh-bg">
        <Notifications/>
  
 
        
        <div className="login-box">
            <center>
            <Progress percent={this.state.current*10} steps={10} strokeColor="#1890ff" />
            <br/>
            <br/>

            <div className={"q_holder " + this.state.qArea}>
            <p className="response_question">{this.state.currentQ}</p>
            <button onClick={this.yes} className="response_ans ans_yes">ഉണ്ട്</button>
             <br/>
            <button onClick={this.no}  className="response_ans ans_no">ഇല്ല</button>
            </div>


            <div className={"q_finished " + this.state.finished}>
              
              <h1 className="h21"> നന്ദി!</h1>
              <p className="t32">താങ്കൾ ചോദ്യാവലി വിജയകരമായി പൂർത്തീകരിച്ചു</p>
              <br/>
              <a href={"/p/xcv/home?id" + this.props.uid}className="done_btn_21">Done</a>

            </div>


            </center>

        
            </div>
 

             </div>
    

    );
  }
}
  export default createContainer((props)=>{
  

    const qs = require('query-string');
    q = qs.parse(props.location.search).uid


    Meteor.subscribe('patient-info',q);

    return{
      patientInfo:patientDB.findOne({_id:q}),
      uid : q,
    }
    
  }, withRouter(SubmitResponse));