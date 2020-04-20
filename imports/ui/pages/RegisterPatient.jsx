import React, { Component, useReducer } from 'react';
import { withHistory, Link,withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import Notifications, {notify} from 'react-notify-toast';
import {Helmet} from "react-helmet";
 
import Rodal from 'rodal';
import {createContainer} from 'meteor/react-meteor-data';
 
import { PropagateLoader} from 'react-spinners';
import { css } from 'react-emotion';
import { Button, notification } from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';


const override = css`
    display: block;
    border-color: red;
`;



var state,url;

var userno=null;
class RegisterPatient extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      error: '',
      modalIsOpen:false,
      loading:false,

      // Steps

      stepOne:"disp_true",
      stepTwo:"disp_false",
      stepThree:"disp_false",
      stepFour:"disp_false",
      stepFive:"disp_false",
      stepSix:"disp_false",


      // values

      name:null,
      age:null,
      gender:null,
      phone:null,

      house:null,
      street:null,
      pincode:null,

      taluk:null,
      panchayat:null,
      ward:null,


      travel:null,
      country:null,

      medical:null,


      // error
      error_title:"Error",
      error:"Please complete all the required fields to continue"


    };
 
  
    this.handleSubmit = this.handleSubmit.bind(this);


    // Steps

    this.stepTwo = this.stepTwo.bind(this);
    this.stepThree = this.stepThree.bind(this);
    this.stepFour = this.stepFour.bind(this);
    this.stepFive = this.stepFive.bind(this);
    this.stepSix= this.stepSix.bind(this);
    this.submit= this.submit.bind(this);

    

    this.openNotification = this.openNotification.bind(this);


  }
  componentDidMount(){
    
  }


  openNotification = () => {
    notification.open({
      message: this.state.error_title,
      description:this.state.error,
      icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
    });
  };

  
  stepTwo(){

    // name,age,gender,phone
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var phone = document.getElementById('phone').value;

    if(name==""||age==""||gender==""||phone==""){
      this.openNotification();
    }else{
    this.setState({
      stepOne:"disp_false",
      stepTwo:"disp_true",

      name:name,
      age:age,
      gender:gender,
      phone:phone
    })
    }
  }

  stepThree(){
    // name,age,gender,phone
    var house = document.getElementById('house').value;
    var street = document.getElementById('street').value;
    var pincode = document.getElementById('pincode').value;
  

    if(house==""||street==""||pincode==""){
      this.openNotification();
    }else{
    this.setState({
      stepTwo:"disp_false",
      stepThree:"disp_true",
      house,street,pincode
    })
    }

    console.log(this.state.pincode)
  }


  stepFour(){
    // name,age,gender,phone
    var taluk = document.getElementById('taluk').value;
    var panchayat = document.getElementById('panchayat').value;
    var ward = document.getElementById('ward').value;
  

    if(taluk==""||panchayat==""||ward==""){
      this.openNotification();
    }else{
    this.setState({
      stepThree:"disp_false",
      stepFour:"disp_true",
      taluk,panchayat,ward
    })
    }

    console.log(this.state.pincode)
  }



  stepFive(){
    // name,age,gender,phone
    var travel = document.getElementById('travel').value;
    var country = document.getElementById('country').value;
  

    if(travel=="yes" && country=="No"){
      this.setState({
        error:"Please select a country",
      })
      this.openNotification();
    }else{
    this.setState({
      stepFour:"disp_false",
      stepFive:"disp_true",
      travel,country
    })
    }
    console.log(this.state.pincode)
  }

  

  stepSix(){
    // name,age,gender,phone
    var medical = document.getElementById('medical').value;

    if(medical==""){
      this.openNotification();
    }else{
    this.setState({
      stepFive:"disp_false",
      stepSix:"disp_true",
      medical
    })
    }
    console.log(this.state.pincode)
  }

  submit(){
    console.log(this.state)

    var name = this.state.name;
    var age = this.state.age;
    var gender = this.state.gender;
    var phone = this.state.phone;

    var house = this.state.house;
    var street = this.state.street;
    var pincode = this.state.pincode;

    var taluk = this.state.taluk;
    var panchayat = this.state.panchayat;
    var ward = this.state.ward;

    var travel = this.state.travel;
    var country = this.state.country;
    var medical = this.state.medical;
    
    var categoryID = taluk+panchayat+ward;

    var userid = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 20; i++)
    userid += possible.charAt(Math.floor(Math.random() * possible.length));

    userno = userid;
    console.log(userid)

    Meteor.call('create_patient',userid,categoryID,name,age,gender,phone,house,street,pincode,taluk,panchayat,ward,travel,country,medical,(err)=>{
      if(!err){
        this.props.history.push('/p/xcv/home?id='+userid);
    
      }
    }).bind(this)
  
  }

   
  handleSubmit(e){
     
    // e.preventDefault();
   
    let name = document.getElementById("normal_signup_name").value;
    let email = document.getElementById("normal_signup_email").value;
    let password = document.getElementById("normal_signup_password").value;
    let retype = document.getElementById("normal_signup_password-repeat").value;
    let hospital = document.getElementById("normal_signup_hospital").value;
    let license = document.getElementById("normal_signup_license").value;
    let type = "doctor"
   
    console.log(name,email,password,retype,hospital,license)

    var userid = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 15; i++)
    userid += possible.charAt(Math.floor(Math.random() * possible.length));

    
    if (password !=retype) {
      
      alert("Passwords do not match");

    }else{

            Meteor.call('CREATE_NEW_ACCOUNT_DOCTOR',name,email,password,userid,hospital,license,type,(error)=>{
              if(error){
               alert(error)
              }else{
                Meteor.loginWithPassword(email, password, (err) => {
                  if(err){
                     alert("Incorrect email or password")
                  } else { 
                      this.props.history.push('/d/start');
                  }
                });
              }

            });
 
    }
}

  render(){

    <Helmet>
    <meta charSet="utf-8" />
    <title>SignUp</title>
    <meta name="description" content="Sin to your Account" />
  </Helmet>

    const error = this.state.error;
    // End 

    return (
      <div className="vh-bg">
        <Notifications/>
  
 
        
        <div className="login-box">
            <center>


             
          <a href="/">
            <img className="login-logo" src='/img/icon_m.png'/>
            </a>


            </center>

              <div className={"co_single_step "+this.state.stepOne}>
                <p className="co_label_reg">പേര്</p>
                <input type="text" className="co_input_reg" id="name"/>
                <p className="co_label_reg"> വയസ്സ് </p>
                <input type="number" className="co_input_reg" id="age"/>
                <p className="co_label_reg"> സ്ത്രീ/പുരുഷൻ </p>
                <select className="co_input_reg"  id="gender">
                <option value="Male">പുരുഷൻ</option>
                <option value="Female">സ്ത്രീ</option>
                </select>
                <p className="co_label_reg"> മൊബൈൽ നമ്പർ (10 Digits)</p>
                <input type="number" className="co_input_reg" id="phone"/>
                <button className="co_next_reg" onClick={this.stepTwo}>Next</button>
              </div>


              <div className={"co_single_step "+this.state.stepTwo}>
                <p className="co_label_reg"> വീട്ടുപേര് </p>
                <input type="text" className="co_input_reg" id="house"/>
                <p className="co_label_reg">താമസസ്ഥലം</p>
                <input type="text" className="co_input_reg" id="street"/>
                <p className="co_label_reg">പിൻകോഡ്</p>
              
                <input type="number" className="co_input_reg" id="pincode"/>
                <button className="co_next_reg" onClick={this.stepThree}>Next</button>
              </div>


              <div className={"co_single_step "+this.state.stepThree}>
                <p className="co_label_reg"> താലൂക്ക് </p>
                <select className="co_input_reg"  id="taluk">
                <option value="Kalpetta">Kalpetta</option>
                <option value="Mananthavady">Mananthavady</option>
                <option value="Sulthan Bathery">Sulthan Bathery</option>
                </select>
                <p className="co_label_reg"> പഞ്ചായത്ത്/മുൻസിപ്പാലിറ്റി</p>
                <select className="co_input_reg"  id="panchayat">
                <option value="Ambalavayal">Ambalavayal</option>
                <option value="Edavaka">Edavaka</option>
                <option value="Kalpetta">Kalpetta</option>
                <option value="Kaniyambetta">Kaniyambetta</option>
                <option value="Kottathara">Kottathara</option>
                <option value="Mananthavady">Mananthavady</option>
                <option value="Meenangadi">Meenangadi</option>
                <option value="Meppadi">Meppadi</option>
                <option value="Mullankolly">Mullankolly</option>
                <option value="Muppainadu">Muppainadu</option>
                <option value="Muttil">Muttil</option>
                <option value="Nenmeni">Nenmeni</option>
                <option value="Noolpuzha">Noolpuzha</option>
                <option value="Padinharathara">Padinharathara</option>
                <option value="Panamaram">Panamaram</option>
                <option value="Poothadi">Poothadi</option>
                <option value="Pozhuthana">Pozhuthana</option>
                <option value="Pulppalli">Pulppalli</option>
                <option value="Sulthan Bathery">Sulthan Bathery</option>
                <option value="Thariode">Thariode</option>
                <option value="Thavinhal">Thavinhal</option>
                <option value="Thirunelly">Thirunelly</option>
                <option value="Thondernadu">Thondernadu</option>
                <option value="Vellamunda">Vellamunda</option>
                <option value="Vengappalli">Vengappalli</option>
                <option value="Vythiri">Vythiri</option>
                </select>
                <p className="co_label_reg">വാർഡ് നമ്പർ</p>
                <select className="co_input_reg"  id="ward">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                </select>
                <button className="co_next_reg" onClick={this.stepFour}>Next</button>
              </div>


              <div className={"co_single_step "+this.state.stepFour}>
                <p className="co_label_reg">കഴിഞ്ഞ രണ്ടു മാസങ്ങൾക്കുള്ളിൽ ഏതെങ്കിലും വിദേശരാജ്യം സന്ദർശിച്ചിട്ടുണ്ടോ?</p>
                <select className="co_input_reg"  id="travel">
                <option value="no">No</option>
                <option value="yes">Yes</option>
                </select>
                <p className="co_label_reg">ഉണ്ടെങ്കിൽ ഏത്</p>
                <select className="co_input_reg"
                 id="country" name="country">
                    <option selected value="No">Select</option>
                    <option value="Afganistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bonaire">Bonaire</option>
                    <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Canary Islands">Canary Islands</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Channel Islands">Channel Islands</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Island">Cocos Island</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote DIvoire">Cote DIvoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Curaco">Curacao</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="East Timor">East Timor</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands">Falkland Islands</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Ter">French Southern Ter</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Great Britain">Great Britain</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="India">India</option>
                    <option value="Iran">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea North">Korea North</option>
                    <option value="Korea Sout">Korea South</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Laos">Laos</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Macedonia">Macedonia</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Midway Islands">Midway Islands</option>
                    <option value="Moldova">Moldova</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Nambia">Nambia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherland Antilles">Netherland Antilles</option>
                    <option value="Netherlands">Netherlands (Holland, Europe)</option>
                    <option value="Nevis">Nevis</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau Island">Palau Island</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Phillipines">Philippines</option>
                    <option value="Pitcairn Island">Pitcairn Island</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Republic of Montenegro">Republic of Montenegro</option>
                    <option value="Republic of Serbia">Republic of Serbia</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russia</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="St Barthelemy">St Barthelemy</option>
                    <option value="St Eustatius">St Eustatius</option>
                    <option value="St Helena">St Helena</option>
                    <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                    <option value="St Lucia">St Lucia</option>
                    <option value="St Maarten">St Maarten</option>
                    <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                    <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                    <option value="Saipan">Saipan</option>
                    <option value="Samoa">Samoa</option>
                    <option value="Samoa American">Samoa American</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syria</option>
                    <option value="Tahiti">Tahiti</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Erimates">United Arab Emirates</option>
                    <option value="United States of America">United States of America</option>
                    <option value="Uraguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Vatican City State">Vatican City State</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                    <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                    <option value="Wake Island">Wake Island</option>
                    <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zaire">Zaire</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
</select>
                <button className="co_next_reg" onClick={this.stepFive}>Next</button>
              </div>



              <div className={"co_single_step "+this.state.stepFive}>
                <p className="co_label_reg">നിലവിൽ എന്തെങ്കിലും അസുഖങ്ങൾക്ക് ചികിത്സയിൽ കഴിയുന്നുണ്ടോ?</p>
                <select className="co_input_reg"  id="medical">
                <option value="No">No</option>
                <option value="heart">Heart Stuff</option>
                <option value="lungs">Lungs Stuff</option>
                <option value="liver">Liver Stuff</option>
                <option value="liver">Liver Stuff</option>
                </select>
                <button className="co_next_reg" onClick={this.stepSix}>Next</button>
              </div>



              <div className={"co_single_step "+this.state.stepSix}>
                <p className="co_label_reg">താങ്കളുടെ രജിസ്ട്രേഷൻ വിജയകരമായി പൂർത്തീകരിച്ചിരിക്കുന്നു</p>
                
                <button  className="co_next_reg" onClick={this.submit}>Sumbit</button> 
              </div>


    
              
            </div>
 

             </div>
       
      
    );
  }
}
  export default createContainer((props)=>{
  
    return{v:null}
    
  }, withRouter(RegisterPatient));