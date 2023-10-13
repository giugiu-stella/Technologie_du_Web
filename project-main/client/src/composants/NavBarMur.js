import React, { Component } from 'react';
import Recherche from './Recherche';
import { ReactComponent as NewPost } from '../img/newPost.svg';
import { ReactComponent as Send } from '../img/send.svg';
import { ReactComponent as General } from '../img/trending.svg';

class NavBarMur extends Component {
    constructor(props){
        super(props);
        this.state = {boutonOn : false}
        this.ecrirePost = this.ecrirePost.bind(this);
        this.prepareData = this.prepareData.bind(this);
        this.refPost = React.createRef();
    }

    ecrirePost(){
        this.setState(({boutonOn}) => ({boutonOn: !boutonOn}))
    }

    prepareData(e){
        e.preventDefault();
        var post = document.getElementById("post").required;
        
        const data = {
            srcpdp: this.props.pdp,
            destlogin: "",
            contenu: this.refPost.current.value,
            repliedTo: ""
        };

        this.ecrirePost();
        this.props.sendMessage(data);
    }

    render() {
        return (
            <div className='navbarMur'>
                <div className='header'>
                    <button className='newPost' title='Nouveau post' onClick={this.ecrirePost}>
                        <NewPost />
                    </button>
                    
                    <Recherche setPageCourante={this.props.setPageCourante} pageCourante="accueil" sendMessage={this.props.sendMessage} sendLikeMessage={this.props.sendLikeMessage} sendDislikeMessage={this.props.sendDislikeMessage} sendComment={this.props.sendComment} posts={this.props.posts} login={this.props.login} setrecherche={this.props.setrecherche}/>

                    <button className='trending' title='Général' onClick={this.props.updatePosts}>
                        <General />
                    </button>
                </div>

                {this.state.boutonOn &&
                    <form className='ecrireUnPost' onSubmit={this.prepareData}>
                        <p>Les posts sont limités à 300 caractères.</p>
                        <textarea
                            ref={this.refPost}
                            id="post"
                            maxLength={300}
                            className='text-input'
                            type="text"
                            placeholder="Quoi de neuf ?"
                            required
                        />
                        <button className='send' title='Envoyer' type='submit'>
                            <Send />
                        </button>
                    </form> 
                }
            </div>
        );
    }
}

export default NavBarMur;