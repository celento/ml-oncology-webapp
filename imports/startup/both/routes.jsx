import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
  
 

 
import LoginPageCandidate from '../../ui/pages/LoginPageCandidate.jsx'
 
 


export const renderRoutes = () => (
 
    <div>
    <Switch>
 
       
        <Route exact path="/login" component={LoginPageCandidate}/>        
      

        <Route exact path="/" component={LoginPageCandidate}/>  
      

 
       
  
</Switch>
  </div>

  
);
