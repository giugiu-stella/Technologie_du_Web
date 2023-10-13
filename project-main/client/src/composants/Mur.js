import React, { Component } from 'react';
import Post from './Post';
import NavBarMur from './NavBarMur';
import MurRecherche from './Recherche';

class Mur extends Component {
    constructor(props){
        super(props);
    }

    render() {
        var posts;
        if (this.props.pageCourante== "accueil"){
            posts=this.props.posts.filter((p) => this.props.followings.indexOf(p.srclogin) != -1 || p.srclogin == this.props.login);
        }
        if (this.props.pageCourante== "profil"){
            posts=this.props.posts.filter((p)=> (p.srclogin == this.props.login));
        }
        if (this.props.pageCourante== "recherche"){
            posts=this.props.posts.filter((p) => p.srclogin == this.props.recherche || p.contenu.includes(this.props.recherche));
        }
        
        posts.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });

        return (
            <div>
                {(this.props.pageCourante === "accueil") &&
                <NavBarMur setPageCourante={this.props.setPageCourante} sendMessage={this.props.sendMessage} sendLikeMessage={this.props.sendLikeMessage} sendDislikeMessage={this.props.sendDislikeMessage} sendComment={this.props.sendComment} posts={this.props.posts} login={this.props.login} pdp={this.props.pdp} setrecherche={this.props.setrecherche}/>}

                <div>
                    {posts.map((p) => <Post 
                        key={p._id}
                        message_id={p._id}
                        pdp={p.srcpdp}
                        author={p.srclogin} 
                        contenu={p.contenu} 
                        date={p.date.slice(4, 24)} 
                        likes={p.likes} 
                        comments={p.comments} 
                        sendMessage={this.props.sendMessage} 
                        sendLikeMessage={this.props.sendLikeMessage} 
                        sendDislikeMessage={this.props.sendDislikeMessage}
                        seeProfile={this.props.seeProfile} />)}
                </div>
            </div>
        );
    }
}

export default Mur;