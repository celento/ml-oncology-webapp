import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
  
import CandContainer from '../../ui/containers/CandContainer.jsx'
 
   
import Home from '../../ui/doctor/Home.jsx'
import LoginPageDoctor from '../../ui/pages/LoginPageDoctor.jsx';
import SignupPageDoctor from '../../ui/pages/SignupPageDoctor.jsx';

export const renderRoutes = () => (
  <Router >
    <div>
    <Switch>
 
        <Route path="/login" component={LoginPageDoctor}/>
        <Route path="/signup" component={SignupPageDoctor}/>
        

        <Route path="/d/">
            <CandContainer>
                
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/home" component={Home}/>
        

            </CandContainer>
        </Route>






</Switch>
  </div>

  </Router>
);
