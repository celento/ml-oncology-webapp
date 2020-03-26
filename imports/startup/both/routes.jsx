import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
  
 

  
import LoginPageDoctor from '../../ui/pages/LoginPageDoctor.jsx';
import SignupPageDoctor from '../../ui/pages/SignupPageDoctor.jsx';
 
 


export const renderRoutes = () => (
 
    <div>
    <Switch>
 
       
        <Route exact path="/login" component={LoginPageDoctor}/>        
      

        {/* <Route exact path="/" component={LoginPageDoctor}/>   */}
        <Route exact path="/signup" component={SignupPageDoctor}/>  
      

 
       
  
</Switch>
  </div>

  
);
