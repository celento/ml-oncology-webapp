import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withHistory,withRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Upload from '../pages/Upload';
import NavBar from "../components/NavBar";
var curr_View;
class MainContainer extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.changeView=this.changeView.bind(this);
        this.state = {
            isAuthenticated:this.getMeteorData().isAuthenticated,
            currentView: <MainPage history={this.props.history}/>,
        };
    }

    getMeteorData(){
        return { isAuthenticated: Meteor.userId() !== null };
    }

    componentWillMount(){
        if (!this.state.isAuthenticated) {
            // window.location='/login'
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (!this.state.isAuthenticated) {
            // window.location('/login')
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

    render(){

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

        return (
            <div className="main-container">
                <header>
                    <div className="header-hold">
                        <img className="d-header-logo" src="/img/logo.png"/>
                        <img onClick={myFunction} className="user-icon" src="/img/user.png"/>
                        <div id="menu_user" className="menu_user">
                            <center>
                                <ul onClick={this.logout}  className="user-menu-ul">
                                    <li className="user-menu-li" >Sign Out</li>
                                </ul>
                            </center>
                        </div>
                    </div>
                </header>
                
                <div className="child-hold">
                {this.props.children}
                </div>

            </div>
        );
    }
}

export default withRouter(MainContainer);