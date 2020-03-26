Slingshot.fileRestrictions("DisplayPicture", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
  maxSize: 1048576   // 2 MB (use null for unlimited)
});


Slingshot.createDirective("DisplayPicture", Slingshot.S3Storage, {
  bucket: "stackraft-resume", // change this to your s3's bucket name

  acl: "public-read",

  authorize: function (file, metaContext) {
    
    //Deny uploads if user is not logged in.
  //   if (!this.userId) {
  //     var message = "Please login before posting files";
  //     throw new Meteor.Error("Login Required", message);
  //   }

    return true;
  },

  key: function (file, metaContext) {
    // User's image url with ._id attached:
    return metaContext.userID + "/" + metaContext.fn_date + "-" + file.name;
  }
});



// Linkedin PDF

Slingshot.fileRestrictions("LinkedInPDF", {
  allowedFileTypes: ["application/pdf"],
  maxSize: 1048576   // 1 MB (use null for unlimited)
});


Slingshot.createDirective("LinkedInPDF", Slingshot.S3Storage, {
  bucket: "stackraft-resume", // change this to your s3's bucket name

  acl: "public-read",

  authorize: function (file, metaContext) {
    
    //Deny uploads if user is not logged in.
  //   if (!this.userId) {
  //     var message = "Please login before posting files";
  //     throw new Meteor.Error("Login Required", message);
  //   }

    return true;
  },

  key: function (file, metaContext) {
    // User's image url with ._id attached:
    return "linkedinpdf/"+ metaContext.userID + "/" + metaContext.fn_date + "-" + file.name;
  }
});




// Used to upload documents 

Slingshot.fileRestrictions("UsersAvatar", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/jpg","application/pdf",'application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    maxSize: null // 2 MB (use null for unlimited)
  });
  
  
  Slingshot.createDirective("UsersAvatar", Slingshot.S3Storage, {
    bucket: "stackraft-resume", // change this to your s3's bucket name
  
    acl: "public-read",
  
    authorize: function (file, metaContext) {
      
      //Deny uploads if user is not logged in.
    //   if (!this.userId) {
    //     var message = "Please login before posting files";
    //     throw new Meteor.Error("Login Required", message);
    //   }
  
      return true;
    },
  
    key: function (file, metaContext) {
      // User's image url with ._id attached:
      return metaContext.userID + "/" + metaContext.fn_date + "-" + file.name;
    }
  });