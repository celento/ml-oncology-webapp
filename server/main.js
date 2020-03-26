import { Meteor } from 'meteor/meteor';
import React from 'react';
 
 
import { onPageLoad } from 'meteor/server-render';  
import  {renderRoutes}  from '../imports/startup/both/routes.jsx'
 
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {Helmet} from 'react-helmet';

 
Meteor.startup(() => {

 onPageLoad(sink => {  
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={sink.request.url} context={context}>
     {renderRoutes()}
    </StaticRouter>

 );
  
 
  sink.renderIntoElementById("target", app);
  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());
 
  });
 
  // Meteor.publish('Jobs', function() {
  //   console.log("Done Publishing...")
  //   return Jobs.find({});
  // });
 

});
