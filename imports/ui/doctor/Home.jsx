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
 

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class FeedCand extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
    
      
   };
 

  }
   
  componentWillMount(){
 
  }

 
  componentDidMount(){
    
   
  }


 
 
render(){  
  

  return(
    <div>
      <p> Welcome Home</p>
    </div>
  )

 };
}

export default createContainer((props)=>{
 
 
    return{ 

      featCand : null,
  
  };
}, FeedCand);  