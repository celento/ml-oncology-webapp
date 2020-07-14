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
import { Descriptions, Card, Avatar,Modal,message ,Input} from 'antd';
import { EditOutlined, EllipsisOutlined, FolderOpenOutlined } from '@ant-design/icons';
 
const { Meta } = Card;


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const { confirm } = Modal;

 
class AppointmentCard extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
    

   };

   this.showConfirm = this.showConfirm.bind(this);
   this.addUser = this.addUser.bind(this);
   this.navigate = this.navigate.bind(this);
    
  }

  successAccept = () => {
    message.success('This is a success message');
  }


  addUser(){

   var id = this.props.info._id;
   var id = this.props.info._id

   confirm({
     title: 'Confirm',
     icon: <ExclamationCircleOutlined />,
     content: 'Are you sure that you want to add this user to the database ?',
     onOk() {

       Meteor.call('accept_patient',id,(err)=>{
         if(!err){
           message.success('User Added')
         }
     }) 
       
     },
     onCancel() {},
   });

  }


  navigate(){
    this.props.history.push('/d/appointment/'+this.props.patient._id);
  }


  
 
   
  showConfirm() {

   var id = this.props.info._id

    confirm({
      title: 'Do you want to delete this record?',
      icon: <ExclamationCircleOutlined />,
      content: 'This operation cannot be undone ',
      onOk() {

        Meteor.call('reject_patient',id,(err)=>{
          if(!err){
            message.success('Record Deleted')
          }
      }) 
        
      },
      onCancel() {},
    });
  }
  componentWillMount(){
 
  }

 
  componentDidMount(){
    
   
  }


 
 
render(){  
  



  return(
    <div className="appoint-single-card">
    <Card
    style={{ width: 300 }}
   
    actions={[
      <FolderOpenOutlined onClick={this.navigate} key="setting" />,
      // <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src={"/img/"+this.props.patient.gender+".png"} />}
      title={this.props.patient.name}
     

      description={(this.props.patient.appointmentTime).substring(0, this.props.patient.appointmentTime.length - 3)}
    />
  </Card>
 
    </div>
  )

 };
}

export default withRouter(AppointmentCard);  