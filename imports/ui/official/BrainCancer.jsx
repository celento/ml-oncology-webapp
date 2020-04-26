import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { withRouter ,withHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Mongo} from 'meteor/mongo';
import Notifications, {notify} from 'react-notify-toast';
import {createContainer} from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import Rodal from 'rodal';
import { Descriptions, Spin,PageHeader,Progress,Input,Tabs, Button,Popconfirm,message,Modal,DatePicker,Upload} from 'antd';
import Highlighter from 'react-highlight-words';
import { patientDB } from '../../collections/patientDB';
// import AshaContainer from '../containers/AshaContainer';
// import AshaUserCard from './components/AshaUserCard';
import { InboxOutlined,AuditOutlined,CarryOutOutlined,UserSwitchOutlined,PaperClipOutlined} from '@ant-design/icons';
import { ansDB } from '../../collections/ansDB';
import { appointmentsDB } from '../../collections/appointmentsDB';
import { testDB } from '../../collections/testDB';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { TextArea } = Input;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



const { Dragger } = Upload;




class BrainCancer extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
      iconLoading: false, 
      additionalInfo:"",
      visible:false,
      appointmentTime:null,
      appointmentTS:null,
      uploadLink:null,
      progressView:"upload-progress-hide",
      progress:0,
      btnStatus:"disabled",
      btnClass :"btn_test_class_dis",

   };
 

   this.enterIconLoading= this.enterIconLoading.bind(this);
   this.discard= this.discard.bind(this);

   this.handleChange=this.handleChange.bind(this);
   this.onChangeDate=this.onChangeDate.bind(this);

   this.upload = this.upload.bind(this);
  }


  upload(info){
    var progress =0;
    console.log(info)
    var metaContext = {userID : Meteor.userId(), ts_date:Date.now()};

    // showing the uploader

    this.setState({progressView:"upload-progress-show"})

    typeof(info.file)
    console.log(info.fileList[0].originFileObj)

    var uploader = new Slingshot.Upload("CancerImage", metaContext);
    uploader.send(info.fileList[0].originFileObj, function (error, downloadUrl) { 
      // you can use refs if you like
      if (error) {
        // Log service detailed response
        console.error('Error uploading. Please check your internet connection/try again later');
        alert (error); // you may want to fancy this up when you're ready instead of a popup.
      }
      else {
        this.setState({uploadLink: downloadUrl});
        console.log(downloadUrl)
        // we use $set because the user can change their avatar so it overwrites the url :)
          //Adding the Upload to the Database
    
      }
      // you will need this in the event the user hit the update button because it will remove the avatar url
    }.bind(this));
    var computation = Tracker.autorun(function () {
      var exact_progress = progress * uploader.progress();
 
      if(uploader.progress()){
        console.log("Progress : " + uploader.progress()*100)

        this.setState({
          progress:Math.ceil(uploader.progress()*100),
          btnClass :"btn_test_class_dis"
        })
      }
      if(uploader.progress()==1){
        this.setState({
          btnClass :"btn_test_class",
        })
        console.log(this.state.uploadLink)
      console.log("Done Uploading the file")
  
      }
    }.bind(this));
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

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  
    onChange(info) {
      const { status } = info.file;
  
     this.upload(info.file).bind(this);
      console.log(status)
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  var testData = null;
  

  if(Object.keys(this.props.test)==0){
    testData = <p>No Test Data</p>
  }else{
    testData = <div>
        
    </div>
  }
 
  
  function onOk(value) {
    console.log('onOk: ', value);
  }
 

  return(
    <div className="main-22">

<PageHeader
    className="site-page-header"
    onBack={() =>window.history.back()}
    title="Brain Cancer Testing"
    // subTitle="This is a subtitle"
  />

  <br/>
 
      <h1>{this.props.patient.name}</h1> 

<br/>
 
      <Descriptions title="User Info">
    <Descriptions.Item label="Name">{this.props.patient.name}</Descriptions.Item>
    <Descriptions.Item label="Phone">{this.props.patient.initialInfo.phone}</Descriptions.Item>
    <Descriptions.Item label="Age">{this.props.patient.initialInfo.age}</Descriptions.Item>
    <Descriptions.Item label="Gender">{this.props.patient.initialInfo.gender}</Descriptions.Item>
  </Descriptions> 

    <p><b>Notes: </b>{this.props.patient.notes}</p>

<br/><br/>
 

<h3>Upload MRI Scan</h3>
<p> The image has to be in .jpg or .jpeg file format and has to be less than 20MB in size</p>
<br/>
    <Dragger accept=".jpg,.jpeg" onChange={this.upload}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Dragger>

<br/>
<div className={this.state.progressView}>
 <Progress size="large" percent={this.state.progress} size="small" />
</div>
<br/>
    <Button
          type="primary"
          size="large"
          className={this.state.btnClass}
          icon={<AuditOutlined />}
          loading={this.state.iconLoading}
          onClick={this.enterIconLoading}
        >
         Run Test
    </Button>

    {/* <Popconfirm placement="topLeft" title="Are you sure to discard this record?" onConfirm={this.discard} okText="Yes" cancelText="No">
     
      </Popconfirm>
     */}
 
 
    </div>
  )

 };
}

export default createContainer((props)=>{
  
  Meteor.subscribe('patients-single',props.match.params.pid);
  Meteor.subscribe('test-single',props.match.params.pid);

  console.log(patientDB.find({_id:props.match.params.pid}).fetch())
    return{ 
      test:testDB.findOne({patientID:props.match.params.pid}),
      patient:patientDB.findOne({_id:props.match.params.pid}),
      
  };
}, BrainCancer);  