import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
  
import CandContainer from '../../ui/containers/CandContainer.jsx'
 
import LoginPageDoctor from '../../ui/pages/LoginPageOfficial.jsx';
import SignupPageDoctor from '../../ui/pages/SignupPageDoctor.jsx';
import RegisterPatient from '../../ui/pages/RegisterPatient.jsx';
 
import OfficialContainer from '../../ui/containers/OfficialContainer.jsx';
import OfficialHome from '../../ui/official/OfficialHome.jsx';
import SubmitResponse from '../../ui/patient/SubmitResponse.jsx';

import OfficialNotifications from '../../ui/official/OfficialNotifications.jsx';
import OfficialStats from '../../ui/official/OfficialStats.jsx';
import PatHome from '../../ui/patient/PatHome.jsx';
import AppointmentDetail from '../../ui/official/AppointmentDetail.jsx';
import PatientsHome from '../../ui/official/PatientsHome.jsx';
import PatientsDetail from '../../ui/official/PatientsDetail.jsx';
import Tests from '../../ui/official/Tests.jsx';
import BrainCancer from '../../ui/official/BrainCancer.jsx';
import ResultBrain from '../../ui/official/ResultBrain.jsx';
import PatientContainer from '../../ui/containers/PatientContainer.jsx';
import PatNotif from '../../ui/patient/PatNotif.jsx';
import PatAccess from '../../ui/patient/PatAccess.jsx';
import PatSettings from '../../ui/patient/PatSettings.jsx';
import PatBook from '../../ui/patient/PatBook.jsx';
import BloodCancer from '../../ui/official/BloodCancer.jsx';
import SkinCancer from '../../ui/official/SkinCancer.jsx';
import BreastCancer from '../../ui/official/BreastCancer.jsx';
import ResultBreast from '../../ui/official/ResultBreast.jsx';
import ResultSkin from '../../ui/official/ResultSkin.jsx';
import ResultBlood from '../../ui/official/ResultBlood.jsx';

export const renderRoutes = () => (
  <Router >
    <div>
    <Switch>
 
        <Route exact path="/login" component={LoginPageDoctor}/>
 
        <Route exact path="/signup" component={SignupPageDoctor}/>


        <Route path="/register" component={RegisterPatient}/>

        <Route path="/p/">
            <PatientContainer>
            <Route path="/p/xcv/home" component={PatHome}/>
            <Route path="/p/xcv/book" component={PatBook}/>
            <Route path="/p/xcv/notif" component={PatNotif}/>
            <Route path="/p/xcv/access" component={PatAccess}/>
            <Route path="/p/xcv/settings" component={PatSettings}/>
            <Route path="/p/xcv/response" component={SubmitResponse}/>
            </PatientContainer>
        </Route>


        
        <Route path="/d/">
            <OfficialContainer>
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/home" component={OfficialHome}/>
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/patients" component={PatientsHome}/>
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/patient/:pid" component={PatientsDetail}/> 
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/appointment/:aid" component={AppointmentDetail}/> 

                {/* Tests */}
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/test/brain/:pid" component={BrainCancer}/> 

                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/test/blood/:pid" component={BloodCancer}/> 

                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/test/skin/:pid" component={SkinCancer}/>

                
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/test/breast/:pid" component={BreastCancer}/>  

                {/* Results */}
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/result/brain/:pid" component={ResultBrain}/> 

                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/result/breast/:pid" component={ResultBreast}/> 

                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/result/skin/:pid" component={ResultSkin}/> 

                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/result/blood/:pid" component={ResultBlood}/> 


                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/tests" component={Tests}/>
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/notifications" component={OfficialNotifications}/>
                <Route onUpdate={() => window.scrollTo(0, 0)} path="/d/stats" component={OfficialStats}/>

            </OfficialContainer>
        </Route>



</Switch>
  </div>

  </Router>
);
