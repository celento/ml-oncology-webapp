import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
  
 

  
 
import SignupPageDoctor from '../../ui/pages/SignupPageDoctor.jsx';
import LoginPageOfficial from '../../ui/pages/LoginPageOfficial.jsx';
 
 


export const renderRoutes = () => (
 
    <div>
    <Switch>
 
       
        <Route exact path="/login" component={LoginPageOfficial}/>        
      

        {/* <Route exact path="/" component={LoginPageDoctor}/>   */}
        <Route exact path="/signup" component={SignupPageDoctor}/>  
      

 
       
  
</Switch>
  </div>

  
);
