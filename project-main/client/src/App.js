import React, { Component } from 'react';
import Navigation from './Navigation';
import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:4000/api",
    timeout:1000,
    headers: {
        "Custom-Header":"header",
        "Access-Control-Allow-Origin":"*",
        "Content-Type":"application/json",
    }
});

class App extends Component {
    constructor(){
        super();
        this.state = {
            pageCourante: 'connexion',
            isConnected: false,
            userid: "",
            login: "",
            pdp: "",
            followers: [],
            followings: [],
            bio: "",
            posts: [],
            users: [],
            userVisited: {}
        };
        this.getConnected = this.getConnected.bind(this);
        this.logout = this.logout.bind(this);
        this.setPageCourante = this.setPageCourante.bind(this);
        //API -> user
        this.sendLogin = this.sendLogin.bind(this);
        this.sendSignup = this.sendSignup.bind(this);
        this.sendModifProfil = this.sendModifProfil.bind(this);
        this.sendLogout = this.sendLogout.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.updateUsers = this.updateUsers.bind(this);
        this.seeProfile = this.seeProfile.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        //API -> message
        this.sendMessage = this.sendMessage.bind(this);
        this.sendLikeMessage = this.sendLikeMessage.bind(this);
        this.sendDislikeMessage = this.sendDislikeMessage.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
    }

    componentDidMount(){
        this.updatePosts();
        this.updateUsers();
    }

    getConnected(user){
        this.setState({
            pageCourante: 'accueil',
            isConnected: true,
            userid: user._id,
            login: user.login,
            pdp: user.pdp,
            followers: user.followers,
            followings: user.followings,
            bio: user.bio
        });
        this.updateUsers();
    }

    logout(){
        this.setState({
            pageCourante: 'connexion',
            isConnected: false,
            userid: "",
            login: "",
            pdp: "",
            followers: [],
            followings: [],
            bio: "",
            posts: []
        })
    }

    setPageCourante(page){
        this.setState({
            pageCourante:page,
        })
    }

    sendLogin(data){
        api.post("/user/login", data)
        .then((res) => this.getConnected(res.data.user))
        .catch((err) => {console.log(err.response.data)});

        return false;
    }

    seeProfile(login){
        api.get(`user/${login}`)
        .then((res) => this.setState({
            userVisited: res.data.user,
            pageCourante: "autreprofil"
        }))
        .catch((err) => {console.log(err.response.data)});
    }

    updateUsers(){
        api.get("/user")
        .then((res) => this.setState({
            users: res.data.users
        }))
        .catch((err) => {console.log(err.response.data)});
    }

    sendSignup(data){
        api.put("/user/signup", data)
        .then((res) => {this.getConnected(res.data.user)})
        .catch((err) => {console.log(err.response.data)});

        return false;
    }

    sendModifProfil(data){
        api.post(`/user/${this.state.userid}/profil`, data)
        .then((res) => {this.setState({
            pdp: res.data.newpdp,
            bio: res.data.newbio
        })})
        .catch((err) => {console.log(err.response.data)});
    }

    follow(loginsrc, logindest){
        api.post(`/user/${loginsrc}/${logindest}/follow`)
        .then(this.updateUsers)
        .catch((err) => {console.log(err.response.data)});
    }

    unfollow(loginsrc, logindest){
        api.post(`/user/${loginsrc}/${logindest}/unfollow`)
        .then(this.updateUsers)
        .catch((err) => {console.log(err.response.data)});
    }

    sendLogout(){
        api.get("/user/logout")
        .then(this.logout)
        .catch((err) => {console.log(err.response.data)});
    }

    deleteAccount(){
        api.delete(`/user/${this.state.userid}/delete`)
        .then(this.logout)
        .catch((err) => {console.log(err.response.data)});
    }


    sendMessage(data){
        api.put(`/message/${this.state.login}/post`, data)
        .then(this.updatePosts)
        .catch((err) => {console.log(err.response.data)});
    }

    updatePosts(){
        api.get("/message")
        .then((res) => this.setState({
            posts: res.data.posts
        }))
        .catch((err) => {console.log(err.response.data)});
    }

    sendLikeMessage(message_id){
        api.post(`/message/${message_id}/${this.state.login}/like`)
        .catch((err) => {console.log(err.response.data)});
    }

    sendDislikeMessage(message_id){
        api.post(`/message/${message_id}/${this.state.login}/dislike`)
        .catch((err) => {console.log(err.response.data)});
    }

    render() {
        return (
            <div>
                <Navigation
                    isConnected={this.state.isConnected} 
                    pageCourante = {this.state.pageCourante}
                    posts = {this.state.posts}
                    userid = {this.state.userid}
                    login = {this.state.login}
                    pdp = {this.state.pdp}
                    followers = {this.state.followers}
                    followings = {this.state.followings}
                    bio = {this.state.bio}
                    users = {this.state.users}
                    userVisited={this.state.userVisited}
                    setPageCourante={this.setPageCourante}
                    sendLogin={this.sendLogin}
                    sendSignup={this.sendSignup}
                    sendModifProfil={this.sendModifProfil}
                    sendLogout={this.sendLogout}
                    deleteAccount={this.deleteAccount}
                    sendMessage={this.sendMessage}
                    sendLikeMessage={this.sendLikeMessage}
                    sendDislikeMessage={this.sendDislikeMessage}
                    updatePosts={this.updatePosts}
                    seeProfile={this.seeProfile}
                    follow={this.follow}
                    unfollow={this.unfollow}
                /> 
            </div>
        );
    }
}

export default App;
