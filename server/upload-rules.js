Slingshot.fileRestrictions("CancerImage", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
  maxSize: 1048576   // 2 MB (use null for unlimited)
});


Slingshot.createDirective("CancerImage", Slingshot.S3Storage, {
  bucket: "cp-oncology", // change this to your s3's bucket name

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
    return metaContext.userID + "/" + metaContext.ts_date + "-" + file.name;
  }
});
 