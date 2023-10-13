import React, { Component } from 'react';
import { ReactComponent as Like } from '../img/like_vide.svg';
import { ReactComponent as Dislike } from '../img/like_plein.svg';
import { ReactComponent as Comment } from "../img/comment.svg";
import { ReactComponent as Share } from "../img/share.svg";

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.message_id,
            author: this.props.author,
            contenu: this.props.contenu,
            date: this.props.date,
            liked: this.props.liked,
            likes: this.props.likes,
            comments: this.props.comments
        };
        this.likePost = this.likePost.bind(this);
        this.dislikePost = this.dislikePost.bind(this);
    }

    likePost(){
        this.setState ({
            liked: true
        });
        this.props.sendLikeMessage(this.state.id);
        // => serveur
    }

    dislikePost(){
        this.setState({
            liked: false
        })
        this.props.sendDislikeMessage(this.state.id);
        // => serveur
    }

    render() {
        return (
            <div className='post'>
                <div className='header'>
                    <div className='photo'>
                        <button className='icon-button' title='Voir' onClick={() => this.props.seeProfile(this.state.author)}>
                            <img src={this.props.pdp} />
                        </button>
                    </div>
                    <div className='pseudo'>
                        {this.state.author}
                    </div>
                    <div className='date'>
                        {this.state.date}
                    </div>
                </div>
                <div className='contenu'>
                    {this.state.contenu}
                </div>
                <div className='action'>
                    <div className='actionspace'>
                        { this.state.liked ? 
                            <button className='dislike-button' title="Je n'aime plus" onClick={this.dislikePost}>
                                <Dislike />
                            </button>
                            : 
                            <button className='like-button' title="J'aime" onClick={this.likePost}>
                                <Like />
                            </button>
                        }
                        <small>{this.state.likes.length}</small>
                    </div>
                    <div className='actionspace'>
                        <button className='icon-button' title="Commenter">
                            <Comment />
                        </button>
                        <small>{this.state.comments.length}</small>
                    </div>
                    <div className='actionspace'>
                        <button className='icon-button' title="Partager">
                            <Share />
                        </button>
                    </div>
                </div>

                
                {this.state.boutonComments && 
                <div className='comments'>
                    <form>
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
                    </form>
                </div>}
            </div>
        );
    }
}

export default Post;