import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory,withRouter } from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
 
import { MoonLoader} from 'react-spinners';
import { css } from 'react-emotion';
import ReactTooltip from 'react-tooltip'
import { patientDB } from '../../collections/patientDB';
import { doctorDB } from '../../collections/doctorDB';
import { HomeOutlined, NotificationOutlined, SettingOutlined,LockOutlined } from '@ant-design/icons';

import Slider from 'react-slide-out';
 

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
`;
 
 
var userid=null;
 
class PatientContainer extends TrackerReact(React.Component) {
    constructor(props){
        super(props);
      
        this.state = {
            t1:"mn_selected_item",
            t2:"",
            t3:"",
            t4:""
        };

        this.goNotif=this.goNotif.bind(this);
        this.goHome=this.goHome.bind(this);
        this.goSettings=this.goSettings.bind(this);
        this.goAccess=this.goAccess.bind(this);

    }

    componentWillMount(){
        // TODO -> Make it work with every pages
        const qs = require('query-string');
        q = qs.parse(this.props.location.search).id
        if((window.location.href).includes("home")){
            userid = q;
        }
    }
 
 
    goNotif(){
        this.props.history.push('/p/xcv/notif?id='+userid);
        this.setState({
            t1:"",
            t2:"mn_selected_item",
            t3:"",
            t4:""
        })
    }

     
    goHome(){
        this.props.history.push('/p/xcv/home?id='+userid);
        this.setState({
            t1:"mn_selected_item",
            t2:"",
            t3:"",
            t4:""
        })
    }

    goSettings(){
        this.props.history.push('/p/xcv/settings?id='+userid);
        this.setState({
            t1:"",
            t2:"",
            t3:"",
            t4:"mn_selected_item"
        })
    }

    goAccess(){
        this.props.history.push('/p/xcv/access?id='+userid);
        this.setState({
            t1:"",
            t2:"",
            t3:"mn_selected_item",
            t4:""
        })
    }
     
    render(){

      
        return (
 
    <div>
          
          <div className="right-pane-cand">
              <div className="child-hold">
              
              <div className="child-content-holder">
                {this.props.children}
              </div>
              <div className="mobile-navigation">
                  <div onClick={this.goHome} className={"mn-item "+this.state.t1}>
                      <center>
                        <HomeOutlined className="hm_icon" />
                        <p className="hm_text">Home</p>
                        </center>
                  </div>
                  <div onClick={this.goNotif} className={"mn-item "+this.state.t2}>
                     <center>
                        <NotificationOutlined className="hm_icon" />
                        <p className="hm_text">Notifications</p>
                       </center>
                  </div>
                  <div onClick={this.goAccess} className={"mn-item "+this.state.t3}>
                      <center>
                        <LockOutlined className="hm_icon" />
                        <p className="hm_text">Access</p>
                        </center>
                  </div>
                  <div onClick={this.goSettings} className={"mn-item "+this.state.t4}>
                    <center>
                      <SettingOutlined className="hm_icon" />
                        <p className="hm_text">Settings</p>
                    </center>
                  </div>
              </div>
              </div>
          </div>
              
 

    </div>
        );
    }
}

export default withRouter(PatientContainer);