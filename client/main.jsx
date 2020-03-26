import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx'
import {Helmet} from 'react-helmet';
import { renderToString } from "react-dom/server"
import { onPageLoad } from 'meteor/server-render';  
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
 

Meteor.startup(() => {
 
  render(renderRoutes(), document.getElementById('target'));

});
   