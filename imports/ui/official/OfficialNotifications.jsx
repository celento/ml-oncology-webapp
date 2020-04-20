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
import { Modal, Input, Spin,Result,TextArea,Button,Card, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { patientDB } from '../../collections/patientDB';
// import AshaContainer from '../containers/AshaContainer';
// import AshaUserCard from './components/AshaUserCard';
import { MessageOutlined,SearchOutlined } from '@ant-design/icons';
import { ansDB } from '../../collections/ansDB';
import { notifDB } from '../../collections/notifDB';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



class OfficialNotifications extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      visible: false,
     
      
   };
 
   this.newNotification = this.newNotification.bind(this);
   this.handleCancel = this.handleCancel.bind(this);
   this.showModal = this.showModal.bind(this);
   this.handleCancel = this.handleCancel.bind(this);
   this.handleOk = this.handleOk.bind(this);
   this.onChangeTextArea = this.onChangeTextArea.bind(this);
   this.onChangeTextBox = this.onChangeTextBox.bind(this);

   this.deleteNotif = this.deleteNotif.bind(this);

  }

  onChangeTextArea(e) {
    this.setState({
      textarea : e.target.value,
    })
  };

  onChangeTextBox(e) {
    this.setState({
      textbox : e.target.value,
    })
  };

  deleteNotif(uid){

    Meteor.call('delete_notif',uid,(err)=>{
      if(!err){
        message.success('Notification Deleted');
      }
    })

  }

showModal(){
  console.log("hello")
  this.setState({
    visible: true,
  });
  console.log(this.state.visible)


};


handleOk = () => {
  this.setState({ loading: true });

  var title =  this.state.textbox;
  var msg =  this.state.textarea;

  Meteor.call('create_notif',Meteor.userId(),title,msg,(err)=>{
    if(!err){
      console.log("done")
    }
    })

  setTimeout(() => {
    this.setState({ loading: false, visible: false });
  }, 1500);
};

handleCancel = () => {
  this.setState({ visible: false });
};



newNotification(){


}

 

  
render(){  


  if(!this.props.notif){
    return(<div><Spin size="large" /></div>)
  }

  // if(Object.keys(this.props.notif).length<=0){
  //   return(<div>
  //  <Result
  //    icon={<MessageOutlined />}
  //    title="No notifications yet"
  //  />
  //  <center>
  //  <Button onClick={this.showModal.bind(this)} danger>Create a Notification</Button>
  //  </center>
  //   </div>)
  // }
  console.log(this.props.answer);
 
  const { visible, loading } = this.state;
  const { TextArea } = Input;
  return(
    <div>
      <h1>Notifications</h1> 
      <Button onClick={this.showModal} type="primary" icon={<MessageOutlined />}>Create a Notification</Button>
      <br/>
      <br/>

  {this.props.notif.map(notif=>
  <div>
  <Card title={notif.title}>
  <p>{notif.msg}</p>

  <p className="site-card-demo-inner-p sm_msg_ttl">Created on : {notif.date}</p>

  <Button onClick={()=>this.deleteNotif(notif._id)} danger>Delete</Button>
  


   
</Card>
<br/>
</div>
  
  
  )}


        
      <Modal
          visible={this.state.visible}
          title="New Notification"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              Create
            </Button>,
          ]}
        >
          <Input size="large" placeholder="Titile" onChange={this.onChangeTextBox} />
          <br/>
          <br/>

          <TextArea placeholder="Message" allowClear onChange={this.onChangeTextArea} />

        </Modal>

    </div>
  )

 };
}

export default createContainer((props)=>{

  Meteor.subscribe('notif-all');
    return{ 
      notif:notifDB.find({},{sort:{timestamp:-1}}).fetch(),
  };
}, OfficialNotifications);  