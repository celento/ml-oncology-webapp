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

var aws_link = 0;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { TextArea } = Input;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



const { Dragger } = Upload;




class BloodCancer extends TrackerReact(React.Component){

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
      p_class : null,

   };
 

   this.enterIconLoading= this.enterIconLoading.bind(this);
   this.discard= this.discard.bind(this);

   this.handleChange=this.handleChange.bind(this);
 

   this.upload = this.upload.bind(this);
   this.handleKeyPress = this.handleKeyPress.bind(this);

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

 
    setTimeout(() => {

      console.log(aws_link)
      var postData = {
        data:{
            "link" : aws_link,
        }
      }

      console.log(postData)

      
      HTTP.call( 'POST', 'http://localhost:7001/blood_cancer', postData, 
         function( error, response ) {
      
         if ( error ) {
            console.log(error)
         } else {
            console.log(response.data)
            p = response.data['prediction']
            c = response.data['confidence']

            Meteor.call("storeResult",this.props.match.params.pid,p,c,this.state.uploadLink,(err)=>{
              if(!err){
                this.props.history.push("/d/result/blood/"+this.props.match.params.pid)
              }
            })
            
         }}.bind(this))


         this.setState({ iconLoading: false });
 
 

     
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
 
  
handleKeyPress = (event) => {
  console.log(event.key)
  if(event.key === 'y'){
    console.log('Set True')
    aws_link=1;
    this.setState({
      p_class : true,
    })
  }else if(event.key === 'n'){
    aws_link=0;
    this.setState({
      p_class : false,
    })
    console.log('Set False')
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
    <div  onKeyPress={this.handleKeyPress} tabIndex={-1} className="main-22">

<PageHeader
    className="site-page-header"
    onBack={() =>window.history.back()}
    title="Leukemia Testing"
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
 

<h3>Upload</h3>
<p> The image has to be in .jpg, .jpeg or .png file format and has to be less than 20MB in size</p>
<br/>
    <Dragger accept=".jpg,.jpeg,.png" onChange={this.upload}>
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
}, BloodCancer);  