import { doctorDB } from "../imports/collections/doctorDB";

 



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
                    dp:"/img/no_pp.png",
                    hospital:hospital,
                    license:license

                })

 

        console.log("Updated to the ACCOUNT DB + Doctor DB");

    },

 



})

