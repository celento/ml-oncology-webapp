import { doctorDB } from "../imports/collections/doctorDB";
import { appointmentsDB } from "../imports/collections/appointmentsDB";
import { patientDB } from "../imports/collections/patientDB";
import { testDB } from "../imports/collections/testDB";
import { regPatient } from "../imports/collections/regPatient";
import { accessDB } from "../imports/collections/accessDB";

 



Meteor.methods({

   
    CREATE_NEW_ACCOUNT_DOCTOR(name,email,password,userid,hospital,license,type){
 
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        }

        today = mm + '/' + dd + '/' + yyyy;

        var accountID = Accounts.createUser({
                    email:email,
                    username: userid,
                    password: password, 
                    profile:{
                        isType : type,
                        status:"new", 
                        name:name,
                        hospitalID:"1234",
                        hospital:hospital,
                        license:license,
                        timestamp:Date.now(),
                        date:today
                    }}
            );

        console.log("USER ID" + accountID) 

        Roles.addUsersToRoles(accountID, [type])
   

        doctorDB.insert(
              {                     
                    _id:userid,
                    email:email,
                    userID:accountID,
                    timstamp:Date.now(),
                    creation:today,
                    name:name,
                    dp:"/img/user.png",
                    hospital:hospital,
                    license:license
                })
                
        console.log("Updated to the ACCOUNT DB + Doctor DB");

    },

     
    discardAppointment(id){

        appointmentsDB.remove(
              {_id:id,})

    },

    addToPatientsDB(userInfo,notes){
        
        patientDB.insert({
            appointmentID:userInfo._id,
            name:userInfo.name,
            hospitalID:userInfo.hospitalID,
            initialInfo:userInfo,
            notes:notes,
        })

    },



    newTest(hid,pid,date,ts,test,name,gender,age,notes){
        // status 
        // 0 - booked
        // 1 - taken
        // 2 - result
        testDB.insert({
            name:name,
            age:age,
            date:date.substring(0, date.length - 3),
            ts:ts,
            test:test,
            gender:gender,
            hospitalID:hid,
            status:0,
            patientID:pid,
            notes:notes,
        })

    },


    registerPatient(hash,name,age,gender,mobile){

        regPatient.insert({_id:hash,name,age,gender,mobile,datalock:false,
        timestamp:Date.now()
    })

    },

    toggleDataLock(userid,state){
        regPatient.update({_id:userid},{
            "$set":{
                datalock:state
            }
        })
    },

    accessLog(userid,doctorid,doctorinfo,type){

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;   
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();
        var ss = today.getSeconds();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        }

        today = mm + '/' + dd + '/' + yyyy + " " + hh+":"+min+":"+ss ;

        accessDB.insert({
            userID:userid,
            doctorID:doctorid,
            doctorInfo:doctorinfo,
            timestamp:Date.now(),
            type:type,
            date:today,
        })
    },

    accessAppointment(aid,did,type){
        Meteor.subscribe('appointment-single',aid);
        Meteor.subscribe('doctor-userid',did);

         var res = appointmentsDB.findOne({_id:aid});

         console.log(res);
         
         var patID = res.patID;

         var doctorInfo = doctorDB.findOne({userID:did});

         Meteor.call('accessLog',patID,did,doctorInfo,type)


    },


    newAppointment(appointmentID,aID,patientID,name,age,gender,mobile,appointmentTime,appointmentTS,test,questions,answers,hID){

        appointmentsDB.insert({
            _id:appointmentID,
            aID,
            patID:patientID,
            timestamp:Date.now(),  
            name,age,gender,phone:mobile,appointmentTime,
            TSappointment:appointmentTS,TScreation:Date.now(),test,hospitalID:1234,
            answers:answers,
            hID:hID,
            hospital:hID,
            questions:questions
        })
    }
    ,

    storeResult(pid,p,c,link){
        testDB.update({patientID:pid},{
            "$set":{
                p,c,link
            }
        })
    },



    // sendtoPatient(pid,test){
    //     notifDB.insert({
    //         patientID:pid,
    //         test:test,
    //     })
              
            
    //     }
 

})

