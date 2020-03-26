import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import Notifications, {notify} from 'react-notify-toast';
import { withRouter ,withHistory } from 'react-router-dom';
import {Resumes} from '../../collections/Resumes'
import PropTypes from 'prop-types';
import {Mongo} from 'meteor/mongo';
import Notifications, {notify} from 'react-notify-toast';
import { Meteor } from 'meteor/meteor'
import Rodal from 'rodal';  
import { userInfo } from 'os';
import {createContainer} from 'meteor/react-meteor-data';
 
import { hrDB } from '../../collections/hrDB';

class SettingsHR extends Component{

  constructor(props) {
    super(props);

    this.state = { 
        
        confModal:false,

   };

   this.openConfModal = this.openConfModal.bind(this)
   this.closeConfModal = this.closeConfModal.bind(this)
   this.deleteAccount = this.deleteAccount.bind(this)



  }
   
  componentWillMount(){
    
  }

  componentDidMount(){
       
  }

  closeConfModal() {
    this.setState({confModal: false});
   
  }

  openConfModal(){
    this.setState({confModal:true})
  }

  deleteAccount(){
      Meteor.call('deleteAccountHR',Meteor.userId(),()=>{
        Meteor.logout( (err) => {
            if (err) {
          
            } else {
              Meteor.call('mail_profileDeletion',this.props.theCandidate.name,this.props.theCandidate.email)
                this.props.history.push('/login');
            }
        });
        this.props.history.push('/login');
      })
  }
  
  
render(){
  document.title = "Settings - Stackraft"

  return(
    <div className="settings_holder">
        <Notifications/>

        <div className="db-title-header">
 
 </div>
    <div className="db-right-padded db-width-trim">

    

        <div className="settings-item-hold">
            <p className="csett_title">Basic Information</p>
            <p className='csett-text'>Name : {this.props.theCandidate.name} </p>
            <p className='csett-text'>Email : {this.props.theCandidate.email} </p>
            <p className='csett-text'>Last Login (GMT): {this.props.theCandidate.lastLogin} </p>
            {/* <p className='csett-text'>Password : ************ (Change) </p> */}
        </div>
        

        <div className="settings-item-hold">
            <p className="csett_title">Billing Information</p>
            <p className="pp32323"> <i>No billing information provided</i></p>
        </div>

        <div className="settings-item-hold">
            <p className="csett_title">Manage</p>

            <p className='csett-text'><span className="sr_sett_bld">Delete Stackraft Account</span> </p> 

            <p className='csett-text'>This will delete all your data from our servers including your job listings and applicant data. This operation is not reversible</p>

            <p onClick={this.openConfModal.bind(this)} className="delete_stackraft_account">Delete Account</p>

            <p></p>
        </div>
        




        {/* Message Confirmation Modal */}
        <Rodal width={600} height={270} visible={this.state.confModal}  onClose={this.closeConfModal.bind(this)}  showCloseButton={false}>
            <div className="rodal-candidate rodal-edit">
            <div className="edit-model-header mWidth600">
                <div className="fa-close-hold">
                <span onClick={this.closeConfModal.bind(this)}className="edit_back fa fa-close"/>
                </div>
                <p className="edit-model-title">Account Deletion</p>
                </div>
                <div className="edit-c324"/>

                <div className="model-dialog-content-holder">
                    <p className="model-dialog-text">Deleting your Stackraft Account will remove all your data from our servers and also delete all your job listings and applicant data. <span className="bold-text">THIS ACTION IS NOT REVERSIBLE</span></p>


                <div className="model-dialog-button-hold">
                     <button onClick={this.deleteAccount.bind(this)}  className="model-dialog-button-pri">Delete</button>
                    <button onClick={this.closeConfModal.bind(this)} className="model-dialog-button-sec">Cancel</button>
                  
                </div>


         </div>  

            
            </div>
        </Rodal>

        


    </div>

 
 </div>
  );
 };
}
export default createContainer((props)=>{
  Meteor.subscribe('hr-single',Meteor.userId());
  return{ theCandidate : hrDB.find({userID:Meteor.userId()}).fetch()[0]};
}, SettingsHR);
 
