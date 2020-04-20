import { patientDB } from "../imports/collections/patientDB";
 
import { configConsumerProps } from "antd/lib/config-provider";
import { Result } from "antd";

// Status
//  0 -> Pending for review 
//  1 -> Accepted
//  2 -> rejected


Meteor.methods({

   
    db_asha_patient(userid){
 
        Meteor.subscribe('asha-userid',userid);

        var asha = ashaDB.find({userID:userid}).fetch();

        var ashaCategory = asha[0].categoryID;

        console.log(ashaCategory)
    
        Meteor.subscribe('patient-asha',ashaCategory);

        var patient = patientDB.find({categoryID:ashaCategory,status:2}).fetch();
        
         
        console.log(patient)

        return(patient)
    },

 
})

