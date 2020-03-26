import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory,withRouter } from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
 
import { MoonLoader} from 'react-spinners';
import { css } from 'react-emotion';
import ReactTooltip from 'react-tooltip'
import { patientDB } from '../../collections/patientDB';
import { doctorDB } from '../../collections/doctorDB';
 

import Slider from 'react-slide-out';
 

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
`;
var showDashboard=true;
var mode=null;
 
var title = "",subTitle = "";
class CandContainer extends TrackerReact(React.Component) {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.changeView=this.changeView.bind(this);
        this.state = {
          
            userInfof:null,
            isAuthenticated:this.getMeteorData().isAuthenticated,
            hasRole:this.getRoleData().hasRole,
            navStateIntro:"none",
            navStateProfile:"none",
            navStateNewJob:"none",
            navStateJob:"none",
            navStateSkills:"none",
            navStateChallenge:"none",
            navStateFeed:"none",
            isOpen: false,
            notif:null,
            menuStyle:"user-menu-drop md-none"
        };
        this.goIntro = this.goIntro.bind(this);
        this.goIntroHR = this.goIntroHR.bind(this);
        this.goProfile = this.goProfile.bind(this);        
        this.goProfileHR = this.goProfileHR.bind(this);        
        this.goNewJob = this.goNewJob.bind(this);      
        this.goJobs = this.goJobs.bind(this);        
        this.goFeed = this.goFeed.bind(this);        
        this.goSkills = this.goSkills.bind(this);        
        this.goJobsCompany = this.goJobsCompany.bind(this);        
        this.goChallenges = this.goChallenges.bind(this);        
        this.goSettings = this.goSettings.bind(this);        
        this.openMenu = this.openMenu.bind(this);   
        this.goToken = this.goToken.bind(this);        



 
    }

    getMeteorData(){
        return { isAuthenticated: Meteor.userId() !== null };
    }
    getRoleData(){
      
        return { hasRole: Roles.userIsInRole(Meteor.userId(), 'candidate') };
    }

    componentDidMount(){
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        // Adding Username and Last Login TimeStamp
        if(mode=="cand"){
        Meteor.call('addUsername',Meteor
        .userId(),Meteor.user().username,datetime,(err) => {
            // console.log(err)
          })
        }else{
             
            Meteor.call('lastloginHR',Meteor.userId(),datetime,(err) => {
                // console.log(err)
              })
        }
    }


    openSlider = () => {
        this.setState({
          isOpen: true
        });
      }
    
      closeSlider = () => {
        
        this.setState({
          isOpen: false
        });

        Meteor.call('clearNotifications',Meteor.userId(),()=>{})
        
      }
   
      


 
    componentWillMount(){


        
 
        if (!this.state.isAuthenticated){
            this.props.history.push('/login');
        }

     Tracker.autorun(()=>{
        if(Roles.subscription.ready()){
        if (!Roles.userIsInRole(Meteor.userId(), 'candidate') && !Roles.userIsInRole(Meteor.userId(), 'hrmanager')) {
           
            this.props.history.push('/login');
        }else{
            showDashboard = true;
            if (Roles.userIsInRole(Meteor.userId(), 'candidate')){
                mode="cand";
                Meteor.subscribe('cand-userid',Meteor.userId());
                this.setState({
                    userInfo : doctorDB.find({userID:Meteor.userId()}).fetch()[0]
                })
            } else {
                mode = "hr";
                Meteor.subscribe('hr-single',Meteor.userId());
                // console.log(Meteor.userId())
                // console.log(hrDB.find({userID:Meteor.userId()}).fetch()[0])
                this.setState({
                    userInfo : patientDB.find({userID:Meteor.userId()}).fetch()[0]
                })
            }

            this.forceUpdate()
        }
    }else{
        showDashboard = false;
    }



    Meteor.subscribe('notifications-userid',Meteor.userId())
 
    var xx = Notifications.find({userID:Meteor.userId()},{sort:{timestamp:-1}}).fetch()
 
        this.setState({
            notif:xx,
            loaded:true
        })
    });

    if(Meteor.user().profile.token==undefined || Meteor.user().profile.token==NaN){

        Meteor.call('initialToken',Meteor.userId())
    }else{
        var x = Meteor.user().profile.token;
        console.log(x);
        console.log(typeof(x));
    }

    function checkLinkedin(){
 
        if(Meteor.user().profile.veri_link == "false"){
            window.location = '/c/start';
        }
    }


    if((window.location.pathname).includes("new")){
        checkLinkedin();
        this.setState({
            navStateJob:"none",
            navStateProfile:"none",
            navStateIntro:"none",
            navStateNewJob:"navSelected",
            navStateSkills:"none",
            navStateFeed:"none",
            navStateChallenge:"none",



        })
    } else if((window.location.pathname).includes("home")){
        checkLinkedin();
        this.setState({
            navStateIntro:"navSelected",
            navStateProfile:"none",
            navStateJob:"none",
            navStateSkills:"none",
            navStateFeed:"none",
            navStateChallenge:"none",

 
        })
    } else if((window.location.pathname).includes("jobs") || (window.location.pathname).includes("posts") ||  (window.location.pathname).includes("applicants/challenges") ||   (window.location.pathname).includes("applicants/recommended"))
         {
        checkLinkedin();
            this.setState({
            navStateIntro:"none",
            navStateJob:"navSelected",
            navStateProfile:"none",
            navStateSkills:"none",
            navStateFeed:"none",
            navStateChallenge:"none",


            })
         }

    else if((window.location.pathname).includes("intro"))
    {
        checkLinkedin();
    this.setState({
        navStateIntro:"navSelected",
        navStateProfile:"none",
        navStateJob:"none",
        navStateNewJob:"none",
        navStateSkills:"none",
        navStateChallenge:"none",
        navStateFeed:"none",

    })

    }

    else if((window.location.pathname).includes("skills"))
    {
        checkLinkedin();
    this.setState({
        navStateIntro:"none",
        navStateProfile:"none",
        navStateSkills:"navSelected",
        navStateJob:"none",
        navStateNewJob:"none",
        navStateChallenge:"none",
        navStateFeed:"none",


 
    })
    }else if((window.location.pathname).includes("challenges"))
    {
        checkLinkedin();
    this.setState({
        navStateIntro:"none",
        navStateProfile:"none",
        navStateSkills:"none",
        navStateJob:"none",
        navStateNewJob:"none",
        navStateChallenge:"navSelected",
        navStateFeed:"none",


 
    })
    }else if((window.location.pathname).includes("feed"))
    {
        checkLinkedin();
    this.setState({
        navStateIntro:"none",
        navStateProfile:"none",
        navStateSkills:"none",
        navStateJob:"none",
        navStateNewJob:"none",
        navStateChallenge:"none",
        navStateFeed:"navSelected",
    })
    }

    else{
        checkLinkedin();
        
        this.setState({
            navStateIntro:"none",
            navStateProfile:"navSelected",
            navStateJob:"none",
            navStateSkills:"none",
            navStateChallenge:"none",
            navStateFeed:"none",

        })
    }

    document.addEventListener('mousedown',this.handleClick,false)

    document.body.style = 'background: #040419;';
}



    componentDidUpdate(prevProps, prevState){
        if (!this.state.isAuthenticated) {
            this.props.history.push('/login');
        }
    }


    logout(e){
        e.preventDefault();
        Meteor.logout( (err) => {
            if (err) {
          
            } else {
                // window.location('/login')
                this.props.history.push('/login');
            }
        });
        this.props.history.push('/login');
    }

    changeView(){
      this.props.history.push("upload");
    }

    goIntro(){
        this.props.history.push('/a/intro');   
        this.setState({
            navStateIntro:"navSelected",
            navStateProfile:"none",
            navStateJob:"none",
            navStateChallenge:"none",
            navStateSkills:"none",
            navStateFeed:"none",


        })     
    }

    goSkills(){
        this.props.history.push('/c/skills');   
        this.setState({
            navStateIntro:"none",
            navStateProfile:"none",
            navStateSkills:"navSelected",
            navStateChallenge:"none",
            navStateJob:"none",
            navStateFeed:"none",


        })     
    }

    goIntroHR(){
        this.props.history.push('/b/intro');   
        this.setState({
            navStateIntro:"navSelected",
            navStateProfile:"none",
            navStateJob:"none",
            navStateSkills:"none",
            navStateChallenge:"none",
            navStateNewJob:"none",
            navStateFeed:"none",


        })     
    }

    goJobs(){
        this.props.history.push('/c/jobs');   
        this.setState({
            navStateJob:"navSelected",
            navStateProfile:"none",
            navStateIntro:"none",
            navStateNewJob:"none",
            navStateChallenge:"none",
            navStateSkills:"none",
            navStateFeed:"none",

 
        })     
    }

    goSettings(){
        this.setState({
            navStateJob:"none",
            navStateProfile:"none",
            navStateIntro:"none",
            navStateNewJob:"none",
            navStateChallenge:"none",
            navStateSkills:"none",
            navStateFeed:"none",

 
        })  

        this.setState({
            menuStyle:"user-menu-drop md-none"            
        })

        if(mode=="cand"){
            this.props.history.push('/c/settings');   
        }else{
            this.props.history.push('/b/settings');   
        }
       
    }

    goJobsCompany(){
        this.props.history.push('/c/posts');   
        this.setState({
            navStateJob:"navSelected",
            navStateProfile:"none",
            navStateIntro:"none",
            navStateSkills:"none",
            navStateChallenge:"none",
            navStateNewJob:"none",
            navStateFeed:"none",



        })     
    }


    goNewJob(){
        console.log("here")
        this.props.history.push('/c/new/job');   
        this.setState({
            navStateJob:"none",
            navStateProfile:"none",
            navStateIntro:"none",
            navStateNewJob:"navSelected",
            navStateChallenge:"none",
            navStateSkills:"none",
            navStateFeed:"none",


        })     
    }


    goToken(){
        this.props.history.push('/c/payments');   
    }

    goFeed(){
        this.props.history.push('/c/feed');   
        this.setState({
            navStateJob:"none",
            navStateProfile:"none",
            navStateIntro:"none",
            navStateNewJob:"none",
            navStateChallenge:"none",
            navStateSkills:"none",
            navStateFeed:"navSelected",


        })     
    }

    goProfile(){
        this.props.history.push('/c/profile'); 
        this.setState({
            navStateIntro:"none",
            navStateProfile:"navSelected",
            navStateJob:"none",
            navStateChallenge:"none",
            navStateSkills:"none",
            navStateFeed:"none",


            
        })       
    }


    goProfileHR(){
        this.props.history.push('/c/user'); 
        this.setState({
            navStateIntro:"none",
            navStateProfile:"navSelected",
            navStateJob:"none",
            navStateNewJob:"none",
            navStateSkills:"none",
            navStateChallenge:"none",
            navStateFeed:"none",


            
        })       
    }



    goChallenges(){
        this.props.history.push('/c/challenges'); 
        this.setState({
            navStateIntro:"none",
            navStateProfile:"none",
            navStateJob:"none",
            navStateNewJob:"none",
            navStateSkills:"none",
            navStateChallenge:"navSelected",
            navStateFeed:"none",

        })       
    }

    componentWillUnMount(){
        document.removeEventListener('mousedown',this.handleClick,false)
    }

    handleClick = (e) =>{
    
       if(this.node.contains(e.target) || e.target.id=="dp_clk"){
           return
       }
       
       this.handleClickOutside()
    }
   
    handleClickOutside=(e)=>{
        
        this.setState({
            menuStyle:"user-menu-drop md-none"            
        })
    }

    openMenu(){
 
    if(this.state.menuStyle=="user-menu-drop md-none"){
        this.setState({
            menuStyle:"user-menu-drop"            
        })
    }else{
        this.setState({
            menuStyle:"user-menu-drop md-none"            
        })
    }
    }
 
   



    render(){

        if(this.state.notif==undefined || this.state.notif==null){
            return(<div></div>)
        }
    


      // NOTIFICATION ICON 
        var  n_len = Object.keys(this.state.notif).length;

        notif_disp = null;

        if(n_len==0){
            notif_disp = <div className="pp-white"><br/><br/><center>No New Notifications</center></div>
        }else{
            notif_disp = this.state.notif.map(notif=>{
                var s_cls = "single-notification-box"
                var c_dot = "dnone1"

                function goAction(){
                    Meteor.call('clearNotifications',Meteor.userId(),()=>{})
                    window.location = notif.action;
                }
        

                if(notif.read==false){
                     s_cls = "single-notification-box new_notif_bg"
                     var c_dot = "dnone0"
                }
                return(<div><a className="notif_action" onClick={()=>{goAction()}}><div className={s_cls} key={notif._id}> <p className="notif_title"><span className={c_dot}>•</span>{notif.title} <span className="notif_date">{notif.date}</span></p><p className="notif_content">{notif.content.replace(/`/g, "")}</p></div></a></div>)})
            
            }
        

        var n_cnt = 0;
        var xx = this.state.notif
        for(i in xx ){
            if(!xx[i].read){
                ++n_cnt
            }else{
                break;
            }
        }

        if(n_cnt>99){
            n_cnt="99+";
        }



        if(n_cnt==0){
            notif_icon = <span onClick={this.openSlider} className="fa fa-bell cand-cont-notification-icon"/>
        }else{
            // Finding the number of notifications
            notif_icon =<div onClick={this.openSlider} className="nf32"><div className="nt_counter_label">{n_cnt}</div> <span onClick={this.openSlider} className="fa fa-bell cand-cont-notification-icon"/></div>

        }

 


        // END OF NOTIFICATION ICON

        function myFunction() {
            document.getElementById("menu_user").classList.toggle("show");
        }

        window.onclick = function(event) {
            if (!event.target.matches('.user-icon')) {

                var dropdowns = document.getElementsByClassName("menu_user");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }


        // Navigation Links

        function newJob(){
            this.props.history.push('/p/job');
            }


        function activeJobs(){
            this.props.history.push('/p/home');
            }
 
        if(!showDashboard){
            return(<div className="center-hold"><div className="center-align"><MoonLoader

            className={override}
            sizeUnit={"px"}
            size={40}
            color={'#3D85F6'}
            loading={true}
        
          /></div></div>) 
        }
        
        if (mode=="cand"){
            headerTwo = <div className="cand-menu-side"><ul className="cand-menu">
                <li data-tip="Feed" onClick={this.goFeed} className={"cand-menu-item " + this.state.navStateFeed}><center><span className="fa fa-th-list fs-cand-db"/></center></li>
                <li data-tip="Jobs" onClick={this.goJobs} className={"cand-menu-item " + this.state.navStateJob}><center><span className="fa fa-briefcase fs-cand-db"/></center></li>
                <li data-tip="Messages" onClick={this.goIntro} className={"cand-menu-item " + this.state.navStateIntro}><center><span className="fa fa-comment fs-cand-db"/></center></li>
                <li data-tip="Skills" onClick={this.goSkills} className={"cand-menu-item " + this.state.navStateSkills}><center><span className="fa fa-paint-brush fs-cand-db"/></center></li>
                <li data-tip="Your Profile" onClick={this.goProfile} className={"cand-menu-item " + this.state.navStateProfile}><center><span className="fa fa-user fs-cand-db"/></center></li>
            </ul>
        </div>;

        token =null;
        

        }else{
            headerTwo = <div className="cand-menu-side"><ul className="cand-menu">
            <li data-tip="Applicants" onClick={this.goJobsCompany} className={"cand-menu-item " + this.state.navStateJob}><center><span className="fa fa-briefcase fs-cand-db"/></center></li>
            <li data-tip="New Job" onClick={this.goNewJob} className={"cand-menu-item " + this.state.navStateNewJob}><center><span className="fa fa-plus-circle fs-cand-db"/></center></li>
            <li data-tip="Messages" onClick={this.goIntroHR} className={"cand-menu-item " + this.state.navStateIntro}><center><span className="fa fa-comment fs-cand-db"/></center></li>
            <li data-tip="Challenges" onClick={this.goChallenges} className={"cand-menu-item " + this.state.navStateChallenge}><center><span className="fa fa-cubes fs-cand-db"/></center></li>
            <li data-tip="Profile" onClick={this.goProfileHR} className={"cand-menu-item " + this.state.navStateProfile}><center><span className="fa fa-user fs-cand-db"/></center></li>
            
        </ul>
    </div>;

            token = <div onClick={this.goToken} className="token_meter_header"><img src="/img/coin.png" className="token-remain-coin"/>

        <p className="token-remain">{Meteor.user().profile.token}</p>
            </div>
      
        }





          if(this.state.userInfo==null){
              return(<div className="center-hold"><div className="center-align"><MoonLoader

              className={override}
              sizeUnit={"px"}
              size={40}
              color={'#3D85F6'}
              loading={true}
          
            /></div></div>)
          }


        //   Header title 

        if((window.location.pathname).includes("/c/new/job")){
            title = "New Job";
            subTitle = "Create a public job post to start accepting candidates"
        } else if((window.location.pathname).includes("/b/intro")) {
            title = "Messages"
            subTitle = "Lists all the candidates shortlisted by you"
        }else if((window.location.pathname).includes("/a/intro")) {
            title = "Messages"
            subTitle = "Shows you all the responses that you have received from pitched jobs"
        }else if((window.location.pathname).includes("/c/jobs")) {
            title = "Jobs"
            subTitle = "Lists all the jobs currently active on our platform curated just for you"
        } else if((window.location.pathname).includes("/c/user")||(window.location.pathname).includes("/c/profile")) {
            title = "Profile"
            subTitle = "View and edit your Stackraft profile"
        } else if((window.location.pathname).includes("/c/posts") || (window.location.pathname).includes("d/applicants/challenges") || (window.location.pathname).includes("c/applicants/pitches")) {
            title = "Applicants";
            subTitle = "View & Manage the candidates who have applied for your jobs"
        } else if((window.location.pathname).includes("c/applicants/recommended")) {
            title = "Recommendations";
            subTitle = "View & Manage the candidates who have applied for your jobs"
        }else if((window.location.pathname).includes("/c/skills")) {
            title = "Skills"
            subTitle = "Grow & Manage your skills on Stackraft"
        }else if((window.location.pathname).includes("/c/challenges")) {
            title = "Challenges"
            subTitle = "Grow & Manage your skills on Stackraft"
        }else if((window.location.pathname).includes("/c/settings")) {
            title = "Settings"
        }else if((window.location.pathname).includes("/b/settings")) {
            title = "Settings"
        }else if((window.location.pathname).includes("/c/feed")) {
            title = "Feed"
        }else if((window.location.pathname).includes("/c/payments")) {
            title = "Tokens"
        }
 

        // End of header title

           
        return (
                

           
    <div>
            <ReactTooltip className="toolTip" effect="solid" place="right" />
       

    <div className="left-pane-cand-outer"> 
        <div className="left-pane-cand">
           
                  
                <div className="db-cand-logo-hold">
                 <center> <img className="logo-header-db-cand" src="/img/ic_logo.png"/> </center>
                </div>

                  <br/>
                
                
                  {/* Menu Items */}
                  
                 {headerTwo}

                  <div className="sidebar-bottom">
                  <ul className="menu-list signout-txt">
                        <li onClick={this.goSettings}><img className="menu-list-icon" src="/img/icons/settings.png"/></li>
                  </ul>
                  </div>
        
        </div>
                  


        </div>

        <div className="top-header-cand">

            <div className="thc-left">
                <p className="thc-header-title">{title}</p>
                {/* <p className="thc-header-sub-title">{subTitle}</p> */}
            </div>

            <div className="thc-right">
                {token}
                {notif_icon}
                 <img id="dp_clk" onClick={this.openMenu} className="thc-dash-pp" src={this.state.userInfo.dp}/>
                <p className="thc-dash-name">{this.state.userInfo.name}</p>
                <div ref={node => this.node =node} className={this.state.menuStyle}>
                    <center>
                        <img className="menu-drop-dp" src={this.state.userInfo.dp}/>
                        <p className="menu-drop-fn">{this.state.userInfo.name.split(" ")[0]}</p>
                        <p className="menu-drop-email">{this.state.userInfo.email}</p>
                    </center>

                    <div onClick={this.goSettings}className="menu-drop-item-holder"><img className="menu-d-ic" src="/img/icons/menu-s.png"/><p className="menu-d-i-text">Settings</p></div>

                    <div onClick={this.logout}className="menu-drop-item-holder"><img className="menu-d-ic" src="/img/icons/menu-so.png"/><p className="menu-d-i-text">Sign Out</p></div>


                </div>
            </div>
        </div>


          <div className="right-pane-cand">
              <div className="child-hold">
              {this.props.children}
              </div>
          </div>
              

<div className="angela">
      <Slider  
          isOpen={this.state.isOpen}
          onOutsideClick={this.closeSlider}>
  
          <div>

          <div className="job_actions_header">
              <span onClick={this.closeSlider} className="db_back fa fa-close"/>
              <p className="job_act_name notif_tt23">Notifications</p>
          </div>
            </div>

            <div className="notif-contents-area">
            
                {notif_disp}
            </div>
      </Slider> 
 </div>

    </div>
        );
    }
}

export default withRouter(CandContainer);