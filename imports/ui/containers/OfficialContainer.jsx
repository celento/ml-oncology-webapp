import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory,withRouter } from 'react-router-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
 
import { MoonLoader} from 'react-spinners';
import { css } from 'react-emotion';
import ReactTooltip from 'react-tooltip'
import { patientDB } from '../../collections/patientDB';
import { doctorDB } from '../../collections/doctorDB';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  RobotOutlined,
  MessageOutlined,
  RadarChartOutlined
} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
  

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;

`;
var showDashboard=true;
var mode=null;
 
 
class OfficialContainer extends TrackerReact(React.Component) {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        
        this.state = {
          
            userInfof:null,
            isAuthenticated:this.getMeteorData().isAuthenticated,
            collapsed: false,
            hasRole:this.getRoleData().hasRole,
         
        };

        this.goN1 = this.goN1.bind(this);
        this.goN2 = this.goN2.bind(this);
        this.goN3 = this.goN3.bind(this);
        this.goN4 = this.goN4.bind(this);
 
    }

    goN1(){
        this.props.history.push('/official/home');
    }
    goN2(){
        this.props.history.push('/official/feed');
    }
    goN3(){
        this.props.history.push('/official/notifications');
    }
    goN4(){
        this.props.history.push('/official/stats');
    }

    getMeteorData(){
        return { isAuthenticated: Meteor.userId() !== null };
    }
    getRoleData(){
      
        return { hasRole: Roles.userIsInRole(Meteor.userId(), 'doctor') };
    }

    componentDidMount(){
       
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
 
    componentWillMount(){

        if (!this.state.isAuthenticated){
            this.props.history.push('/login');
            

        }

     Tracker.autorun(()=>{
        if(Roles.subscription.ready()){
        if (!Roles.userIsInRole(Meteor.userId(), 'doctor')) {
            this.props.history.push('/login');
        }else{
             
            if (Roles.userIsInRole(Meteor.userId(), 'doctor')){
                Meteor.subscribe('doctor-userid',Meteor.userId());
                this.setState({
                    userInfo : doctorDB.find({userID:Meteor.userId()}).fetch()[0]
                })
            } else {
               alert("Something went wrong")
            }

            this.forceUpdate()
        }
    }else{
        showDashboard = false;
    }
     })
 
 
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
                this.props.history.push('/login');
            }
        });
        this.props.history.push('/login');
    }


    render(){

        console.log("this.state.userInfo")
        if(this.state.userInfo==null){
            return(<div></div>)
        }
         
        return (
         
 
    <div>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo">
              <center>
              <img className="logo-navbar-off" src='/img/icon_m.png'/>

              </center>

          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item onClick={this.goN1} key="1">
              <PieChartOutlined />
              <span>All Records</span>
            </Menu.Item>
            <Menu.Item onClick={this.goN2}  key="2">
              <RadarChartOutlined />
              <span>Live Feed</span>
            </Menu.Item>

            <Menu.Item onClick={this.goN3}  key="3">
              <MessageOutlined/>
              <span>Notifications</span>
            </Menu.Item>

            <Menu.Item onClick={this.goN4}  key="4">
              <RobotOutlined />
              <span>Stats</span>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout className="site-layout">
          
          <Content style={{ margin: '0 16px' }}>
             
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
               {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
    </div>
        );
    }
}

export default withRouter(OfficialContainer);