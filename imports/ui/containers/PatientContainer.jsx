import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory,withRouter } from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
 
import { MoonLoader} from 'react-spinners';
import { css } from 'react-emotion';
import ReactTooltip from 'react-tooltip'
import { patientDB } from '../../collections/patientDB';
import { doctorDB } from '../../collections/doctorDB';
import { HomeOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons';

import Slider from 'react-slide-out';
 

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
`;
var showDashboard=true;
var mode=null;
 
var title = "",subTitle = "";
class PatientContainer extends TrackerReact(React.Component) {
    constructor(props){
        super(props);
      
        this.state = {
            userInfof:null,         
        };

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
                  <div className="mn-item">
                      <center>
                        <div className="hm_icon_hold">
                            
                        <HomeOutlined className="hm_icon" />
                        </div>
                        <p className="hm_text">Home</p>
                        </center>
                   
                  </div>
                  <div className="mn-item">
                  <center>
                        <div className="hm_icon_hold">
                        <NotificationOutlined className="hm_icon" />
                        </div>
                        <p className="hm_text">Notifications</p>
                       </center>
                  </div>
                  <div className="mn-item">
                        <div className="hm_icon_hold">
                        <HomeOutlined className="hm_icon" />
                        </div>
                        <p className="hm_text">Access</p>
                      
                  </div>
                  <div className="mn-item">
                    <div className="hm_icon_hold">
                      <SettingOutlined className="hm_icon" />
                    </div>
                        <p className="hm_text">Settings</p>
                     
                  </div>
              </div>
              </div>
          </div>
              
 

    </div>
        );
    }
}

export default withRouter(PatientContainer);