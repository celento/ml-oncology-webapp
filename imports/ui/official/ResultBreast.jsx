import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { withRouter ,withHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
 
 
import {createContainer} from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { css } from 'react-emotion';
 
import { Descriptions, Spin,PageHeader,Timeline,Input,Tabs, Button,Popconfirm,message,Modal,DatePicker,Card} from 'antd';
import { ChartCard, Bar, MiniArea, MiniBar, MiniProgress, WaterWave, Pie, yuan } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
 
import { patientDB } from '../../collections/patientDB';
 
import { AuditOutlined,CarryOutOutlined,UserSwitchOutlined,PaperClipOutlined} from '@ant-design/icons';
 
import { testDB } from '../../collections/testDB';
// import numeral from 'numeral';
import moment from 'moment';

const ageData = [
  {
  x:'0 - 10',
  y: 23
},
{
  x:'10 - 20',
  y: 21
},
{
  x:'20 - 30',
  y: 19
},
{
  x:'30 - 40',
  y: 32
},
{
  x:'40 - 50',
  y: 15
},
{
  x:'50 - 60',
  y: 42
},
{
  x:'60 - 70',
  y: 32
},
{
  x:'70 - 80',
  y: 65
},
{
  x:'80 - 90',
  y: 34
},
{
  x:'90 - 100',
  y: 15
},

];
// for (let i = 0; i < 10; i += 1) {
//   salesData.push({
//     x: i*10 + '-' + (i*10+10) ,
//     y: Math.floor(Math.random() * 100),
//   });
// }


const genderData = [
  {
    x: 'Male',
    y: 63,
  },
  {
    x: 'Female',
    y: 37,
  }
];


const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}
 
const ageGroup = ['0 - 10','10 - 20','20 - 30','30 - 40','40 - 50','50 - 60','60 - 70','70 - 80','80 - 90','90 - 100']

 
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 



class ResultBreast extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
      iconLoading: false, 
      additionalInfo:"",
      visible:false,
      appointmentTime:null,
      appointmentTS:null,
   };
 

   this.enterIconLoading= this.enterIconLoading.bind(this);
   this.discard= this.discard.bind(this);

   this.handleChange=this.handleChange.bind(this);
   this.onChangeDate=this.onChangeDate.bind(this);

  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });

    Meteor.call('addToPatientsDB',this.props.appointments,this.state.additionalInfo,(err)=>{
      if(err){
        message.error("Something went wrong. Try Again!")
      }
    })
    setTimeout(() => {
      message.success("Patient referred for Checkup")
      this.setState({ iconLoading: false });
      this.props.history.push('/d/home')
    }, 1000);
  };


  discard(){
    Meteor.call('discardAppointment',this.props.appointments._id,(err)=>{
      message.info('Patient Removed');
      this.props.history.push('/d/home')
    })
  }

// Additional Notes
handleChange(e){
  this.setState({
    additionalInfo:e.target.value,
  })
}

// Test 
showModal = () => {
  this.setState({
    visible: true,
  });
};

// Modal OK
handleOk = e => {

  if(this.state.appointmentTime!=null){
  
  var notes = this.state.additionalInfo;
  var test = this.props.patient.initialInfo.test;
  Meteor.call('newTest',Meteor.user().profile.hospitalID,this.props.patient._id,this.state.appointmentTime,this.state.appointmentTS,test,this.props.patient.name,this.props.patient.initialInfo.gender,this.props.patient.initialInfo.age,notes,(err)=>{
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

handleCancel = e => {
 
  this.setState({
    visible: false,
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

  
render(){  

  if(!this.props.patient || !this.props.test){
    return(<div><Spin size="large" /></div>)
  }


 
 
  
  function onOk(value) {
    console.log('onOk: ', value);
  }

  var result = null;

  var conf = this.props.test.c; 
  console.log(conf)

  if(this.props.test.p==1){
    result = "This patient has Brain Cancer"
  }else{
    result = "This patient has NO Brain Cancer"
  }
 

  var genderResult = null;
  if(this.props.patient.initialInfo.gender=="Male"){
    genderResult = genderData[0].y
  } else {
    genderResult = genderData[1].y
  }

  return(
    <div className="main-22">

<PageHeader
    className="site-page-header"
    onBack={() =>window.history.back()}
    title="Brain Cancer Test"
    // subTitle="This is a subtitle"
  />

  <br/>
 
      <h1>Result</h1> 

<br/>
 
  <Descriptions title="Patient Info">
    <Descriptions.Item label="Name">{this.props.patient.name}</Descriptions.Item>
    <Descriptions.Item label="Phone">{this.props.patient.initialInfo.phone}</Descriptions.Item>
    <Descriptions.Item label="Age">{this.props.patient.initialInfo.age}</Descriptions.Item>
    <Descriptions.Item label="Gender">{this.props.patient.initialInfo.gender}</Descriptions.Item>
  </Descriptions> 

<br/>

 
<ChartCard> 
<h2>Prediction</h2>
<h3><b>{result}</b></h3>
<br/>
 

          <h3><b>Confidence</b></h3>
          <h1><b>{conf}</b></h1>
           <MiniProgress percent={this.props.test.c} strokeWidth={12} target={80} />
           <br/>
        </ChartCard>
 

<br/>
 
<br/>


<ChartCard className="chart_card_split_l">

  <h2><b>Uploaded Image</b></h2>
  <br/>
  <img src={this.props.test.link} className="uploaded_img"/>
<br/>
<br/>
</ChartCard>
 
<ChartCard className="chart_card_split_r">
<h2><b>Age Distribution</b></h2>
  <br/>
<Bar height={300} title="" data={ageData} />
<br/>
<br/>
 
<h3>This patient {this.props.patient.initialInfo.age} years old</h3>
<h3>The age group {ageData[Number((''+this.props.patient.initialInfo.age)[0])].x}  contains {ageData[Number((''+this.props.patient.initialInfo.age)[0])].y}% of the people tested positive for Brain Cancer</h3>

</ChartCard>

<br/>
<br/>
<br/>


<ChartCard className="chart_card_split_l">

  <h2><b>Gender Distribution</b></h2>
  <br/>
  <center>
  <Pie
    hasLegend
    subTitle=""
    hasLegend={false}
    data={genderData}
    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
    height={224}
  />
  <p> Male : 63%</p>
  <p> Female : 37%</p>
  </center>

<br/>
<br/>
<h3>
  The patient who is a {this.props.patient.initialInfo.gender} accounts for {genderResult}% of the Brain Cancer cases around the world
   </h3>
 <br/>



<br/>
</ChartCard>
 
<ChartCard className="chart_card_split_r">
<h2><b>Quick Info on Malignant Brain Tumors </b></h2>
  <br/>
  Gliomas are the most prevalent type of adult brain tumor, accounting for 78 percent of malignant brain tumors. They arise from the supporting cells of the brain, called the glia. These cells are subdivided into astrocytes, ependymal cells and oligodendroglial cells (or oligos). Glial tumors include the following: <br/><br/>

Astrocytomas are the most common glioma, accounting for about half of all primary brain and spinal cord tumors. Astrocytomas develop from star-shaped glial cells called astrocytes, part of the supportive tissue of the brain. They may occur in many parts of the brain, but most commonly in the cerebrum. People of all ages can develop astrocytomas, but they are more prevalent in adults — particularly middle-aged men. Astrocytomas in the base of the brain are more prevalent in children or younger people and account for the majority of children's brain tumors. In children, most of these tumors are considered low-grade, while in adults, most are high-grade.
Ependymomas are derived from a neoplastic transformation of the ependymal cells lining the ventricular system and account for two to three percent of all brain tumors. Most are well-defined, but some are not.
Glioblastoma multiforme (GBM) is the most invasive type of glial tumor. These tumors tend to grow rapidly, spread to other tissue and have a poor prognosis. They may be composed of several different kinds of cells, such as astrocytes and oligodendrocytes. GBM is more common in people ages 50 to 70 and are more prevalent in men than women.
Medulloblastomas usually arise in the cerebellum, most frequently in children. They are high-grade tumors, but they are usually responsive to radiation and chemotherapy.
Oligodendrogliomas are derived from the cells that make myelin, which is the insulation for the wiring of the brain.

<br/>
<br/>
<p><b>Source:</b> American Association of Neurological Surgeons</p>
</ChartCard>


<br/>
<br/>
<br/>
    

    <Popconfirm placement="topLeft" title="Are you sure to discard this record?" onConfirm={this.discard} okText="Yes" cancelText="No">
    <Button type="primary" size="large">
          Send Results to the Patient
        </Button>
      </Popconfirm>
    
 

    </div>
  )

 };
}

export default createContainer((props)=>{
 
  console.log(props.match.params.pid)

  console.log(testDB.find({patientID:props.match.params.pid}).fetch())

  Meteor.subscribe('patients-single',props.match.params.pid);
  Meteor.subscribe('test-single',props.match.params.pid);
    return{ 
      patient:patientDB.findOne({_id:props.match.params.pid}),
      test:testDB.find({patientID:props.match.params.pid}).fetch()[0],
      
  };
}, ResultBreast);  