import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory,withRouter } from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
 
import { MoonLoader} from 'react-spinners';
import { css } from 'react-emotion';
import ReactTooltip from 'react-tooltip'
import { patientDB } from '../../collections/patientDB';
import { doctorDB } from '../../collections/doctorDB';
 

import Slider from 'react-slide-out';
 

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
`;
var showDashboard=true;
var mode=null;
 
var title = "",subTitle = "";
class CandContainer extends TrackerReact(React.Component) {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        
        this.state = {
          
            userInfof:null,
            isAuthenticated:this.getMeteorData().isAuthenticated,
            hasRole:this.getRoleData().hasRole,
         
        };
     
 
 
    }

    getMeteorData(){
        return { isAuthenticated: Meteor.userId() !== null };
    }
    getRoleData(){
      
        return { hasRole: Roles.userIsInRole(Meteor.userId(), 'candidate') };
    }

    componentDidMount(){
       
    }
 
    componentWillMount(){

        if (!this.state.isAuthenticated){
            this.props.history.push('/login');
        }

     Tracker.autorun(()=>{
        if(Roles.subscription.ready()){
        if (!Roles.userIsInRole(Meteor.userId(), 'doctor')) {
            this.props.history.push('/login');
        }else{
             
            if (Roles.userIsInRole(Meteor.userId(), 'doctor')){
                Meteor.subscribe('doctor-userid',Meteor.userId());
                this.setState({
                    userInfo : doctorDB.find({userID:Meteor.userId()}).fetch()[0]
                })
            } else {
               alert("Something went wrong")
            }

            this.forceUpdate()
        }
    }else{
        showDashboard = false;
    }
     })
 
 
}
 
    componentDidUpdate(prevProps, prevState){
        if (!this.state.isAuthenticated) {
            this.props.history.push('/login');
        }
    }


    logout(e){
        e.preventDefault();
        Meteor.logout( (err) => {
            if (err) {
          
            } else {
                // window.location('/login')
                this.props.history.push('/login');
            }
        });
        this.props.history.push('/login');
    }

     
    render(){

        console.log(this.state.userInfo)
        if(this.state.userInfo==null){
            return(<div></div>)
        }
         
        return (
                
 
    <div>
              

         <h1>{"Welcome" + this.state.userInfo.name} </h1>
          <div className="right-pane-cand">
              <div className="child-hold">
              {this.props.children}
              </div>
          </div>
              
 

    </div>
        );
    }
}

export default withRouter(CandContainer);