import React, { Component } from 'react';
import Accueil from './composantsPages/Accueil';
import Login from './composantsPages/Login';
import Inscription from './composantsPages/Inscription';
import Messages from './composantsPages/Messages';
import Profil from './composantsPages/Profil';
class Navigation extends Component {
    constructor(props){
        super(props);
    }

    render() {
        if (this.props.isConnected === false){
            if (this.props.pageCourante === "connexion") {
                return (
                    <nav>
                        <Login setPageCourante = {this.props.setPageCourante} sendLogin = {this.props.sendLogin} />
                    </nav>
                );
            }
            if (this.props.pageCourante === "inscription") {
                return (
                    <nav>
                        <Inscription setPageCourante = {this.props.setPageCourante} sendSignup = {this.props.sendSignup} />
                    </nav>
                )
            }
        } 
        else {
            if (this.props.pageCourante === "accueil"){
                return (
                    <nav>
                        <Accueil 
                            setPageCourante={this.props.setPageCourante} 
                            logout={this.props.sendLogout} 
                            login = {this.props.login}
                            sendMessage={this.props.sendMessage} 
                            sendLikeMessage={this.props.sendLikeMessage} 
                            sendDislikeMessage={this.props.sendDislikeMessage}
                            posts={this.props.posts}
                            updatePosts = {this.props.updatePosts}
                            pdp={this.props.pdp}
                            users={this.props.users}
                            followings = {this.props.followings}
                            seeProfile={this.props.seeProfile}
                        />
                    </nav>
                );
            }
            if (this.props.pageCourante === "messages"){
                return (
                    <nav>
                        <Messages setPageCourante={this.props.setPageCourante} logout={this.props.sendLogout} sendMessage={this.props.sendMessage}/>
                    </nav>
                );
            }
            if (this.props.pageCourante === "monprofil"){
                return (
                    <nav>
                        <Profil 
                            pageCourante="monprofil"
                            setPageCourante={this.props.setPageCourante} 
                            logout={this.props.sendLogout} 
                            userid = {this.props.userid}
                            login = {this.props.login}
                            pdp = {this.props.pdp}
                            followers = {this.props.followers}
                            followings = {this.props.followings}
                            bio = {this.props.bio}
                            posts = {this.props.posts}
                            sendModifProfil = {this.props.sendModifProfil}
                            users={this.props.users}
                            seeProfile={this.props.seeProfile}
                        />
                    </nav>
                );
            }
            if (this.props.pageCourante === "autreprofil"){
                return (
                    <nav>
                        <Profil 
                            pageCourante="autreprofil"
                            setPageCourante={this.props.setPageCourante} 
                            logout={this.props.sendLogout} 
                            login = {this.props.login}
                            followers = {this.props.followers}
                            followings = {this.props.followings}
                            bio = {this.props.bio}
                            posts = {this.props.posts}
                            sendModifProfil = {this.props.sendModifProfil}
                            users={this.props.users}
                            userVisited={this.props.userVisited}
                            follow={this.props.follow}
                            unfollow={this.props.unfollow}
                            seeProfile={this.props.seeProfile}
                        />
                    </nav>
                );
            }
        }
    }
}

export default Navigation;
