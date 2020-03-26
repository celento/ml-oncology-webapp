import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { withRouter ,withHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Mongo} from 'meteor/mongo';
import Notifications, {notify} from 'react-notify-toast';
import {createContainer} from 'meteor/react-meteor-data';
 
import TrackerReact from 'meteor/ultimatejs:tracker-react';
 
import { MoonLoader} from 'react-spinners';
import { css } from 'react-emotion';
 
import ReactCrop from 'react-image-crop';
 

const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
`;

let myColor = {background: '#ff4b2b', text: "#FFFFFF"};
let myColor2 = {background: 'green', text: "#FFFFFF"};

 
class CompanyLogoUpload extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      uploading:false,
      crop: {
        aspect: 16/9,
        x: 0,
        y: 0,
      },
    }
    this.submit = this.submit.bind(this);
   };


  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result }),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg',
      );
      this.setState({ croppedImageUrl });

 
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
      
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(blob);
      }, 'image/jpeg');
    });
  }

 


submit(e){
   

  var canID = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 8; i++)
      canID += possible.charAt(Math.floor(Math.random() * possible.length));

    // End of candidate ID generation.
 
      userID = Meteor.userId();
      // jobID = this.props.location.state._id;
      var status = "none";

      var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();


    this.setState({
      uploading:true
    })


    var fn_date = Date.now();
    var metaContext = {userID : userID, fn_date:fn_date};
    documentNameCertificate = e.target.files[0].name;
    var final_name = fn_date+"-"+(documentNameCertificate).replace(/\s+/g, '%20');

    // Figuring out the current Date
    var today = new Date();
    var dd = today.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    
    var monthN = monthNames[mm];
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = dd + ' ' + monthN + ' ' + yyyy;

    uploadDateCertificate =today;
    // End of Date :(


    link="https://s3-us-west-2.amazonaws.com/stackraft-resume/"+userID+"/"+final_name;

    documentLinkCertificate = link;
 

    //  var file = new File([this.state.croppedImageUrl],"uploadfile.jpeg",{
    //   type: "image/jpeg",
    // })

    // function blob2file(blobData) {
    //   const fd = new FormData();
    //   fd.set('a', blobData,"uplad.jpeg");
    //   return fd.get('a');
    // }

    // console.log(blob2file(this.state.croppedImageUrl))

    // var link2 = document.createElement("a");
    // link2.download =file.name;
    // link2.href = blob2file(this.state.croppedImageUrl);
    // link2.click(); 

    var uploader = new Slingshot.Upload("UsersAvatar", metaContext);
    uploader.send(e.target.files[0], function (error, downloadUrl) { 
      // you can use refs if you like
      if (error) {
        // Log service detailed response
        console.error('Error uploading. Please check your internet connection/try again later');
        alert (error); // you may want to fancy this up when you're ready instead of a popup.
      }
      else {
        // we use $set because the user can change their avatar so it overwrites the url :)
          //Adding the Upload to the Database
    
      }
      // you will need this in the event the user hit the update button because it will remove the avatar url
      this.setState({avatar: downloadUrl});
    }.bind(this));
    var computation = Tracker.autorun(function () {
      // var exact_progress = progress * uploader.progress();
 
         
      if(uploader.progress()){
        // console.log("Started Uploading..")
      }
      if(uploader.progress()==1){

        // console.log("Upload Completed")

     

        Meteor.call('companyLogoUpload',link,this.props.cID,(err)=>{

            if(!err){
              notify.show("Logo uploaded", "custom", 2000, myColor2); 
              this.setState({
                uploading:false
              })
            }

        })

 
        // this.setState({
        //   doneUploadCertificates:"none",
        //   doneUploadDetailCertificates:"block",
        //   uploadBlockCertificates:"none",

        // })

 
      
        // toProcess[total]=link;
        // tocanID[total]=canID;
        // total+=1;
 
        setTimeout(function (){
          
          // this.upload2(file_number);
          
          }.bind(this), 100);
  
      }
    }.bind(this));


}
  
render(){

  const { crop, croppedImageUrl, src } = this.state;

  var mbu = null;

  if(this.state.uploading==false){
   mbu = <div><button className="upload-cmp-logo-btn rodal-button-primary ">Upload Logo</button><input type="file" id="upload-input" onChange={(e)=>{this.submit(e)}}  size="20"/></div>;
  } else {
    mbu = <div><button className="upload-cmp-logo-btn rodal-button-primary vb-3231"><MoonLoader

    className={override}
    sizeUnit={"px"}
    size={20}
    color={'#2b53ff'}
    loading={true}

  /></button><input type="file" id="upload-input" onChange={(e)=>{this.submit(e)}}  size="20"/></div>; 
  }

  return(
  <div className="App">
  <Notifications/>
   <div className="ub-12 upload-box">
          {mbu}
      </div>
</div>
  );
 };
}

export default createContainer((props)=>{

  return({
    h:null,
  })
}, CompanyLogoUpload);
 