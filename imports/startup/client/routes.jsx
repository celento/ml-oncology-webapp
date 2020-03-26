import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
  
import CandContainer from '../../ui/containers/CandContainer.jsx'
 
import LoginPageCandidate from '../../ui/pages/LoginPageCandidate.jsx';
   
import Home from '../../ui/doctor/Home.jsx'

export const renderRoutes = () => (
  <Router >
    <div>
    <Switch>
 
        {/* <Route path="/login" component={LoginPage}/> */}
        <Route path="/" component={LoginPageCandidate}/>
        

        <Route path="/d/">
            <CandContainer>
                
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/main" component={Home}/>
                {/* <Route exact path="/c/jobs" component={Jobs}/> */}
               
                {/* Candidate Settings */}
                {/* <Route  path="/c/settings" component={SettingsCand} />   */}
                {/* HR Settings */}                   
             
            
            </CandContainer>
        </Route>



     



</Switch>
  </div>

  </Router>
);
