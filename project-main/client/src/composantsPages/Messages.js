import React, { Component } from 'react';
import NavBar from '../composants/NavBar';
import Recherche from '../composants/Recherche';
import { ReactComponent as NewPost } from '../img/newPost.svg';
import { ReactComponent as Send } from '../img/send.svg'; 
import { ReactComponent as LoupeIcon } from '../img/loupe.svg';
class Messages extends Component {
    constructor(props){
        super(props);

        this.state={message : false};
        this.ecriremsg= this.ecriremsg.bind(this);
        this.prepareDat = this.prepareDat.bind(this);
        this.refPos = React.createRef();
    }

    ecriremsg(){
        this.setState(({message}) => ({message: !message}))
    }

    prepareDat(e){
        e.preventDefault();
        var post = document.getElementById("post").required;
        
        const data = {
            destlogin: "",
            contenu: this.refPost.current.value,

        };
        this.props.sendMessage(data);
    }

    render() {
        return (
            <div>
                <NavBar setPageCourante={this.props.setPageCourante} logout={this.props.logout}/>
                <div className='messages'>
                    <div className='listeConv'>
                        <div className='listeConv-head'>
                        
                        <div className='listeConv-head-gauche'>
                        
                            </div>
                            <div className='listeConv-head-droit'>
                                <button className='listeConv-head-droit-newpost' title='Nouveau post' onClick={this.ecriremsg}><NewPost/>
                                </button>

                                
                            </div>
                        </div>
                        {this.state.message ? 
                                    <div className='newmessage'>
                                        <div className='appa'>
                                        <textarea
                                ref={this.refPos}
                                id="post"
                                maxLength={50}
                                className='text-input'
                                type="text"
                                placeholder="message à ..."
                                required
                            />
                                    <button className="recher">
                                        <LoupeIcon/>
                                    </button>
                                </div></div>
                        : null}
                        <div className='listeConv-users'>
                        </div>
                    </div>
                    <div className='chatroom'>
                    <div className='chatroom-mur'>
                        </div>
                        <div className='chatroom-message'>
                        <div className='ecrireUnmsg'>
                    
                        <textarea
                            ref={this.refPos}
                            id="post"
                            maxLength={300}
                            className='text-input'
                            type="text"
                            placeholder="Votre message..."
                            required
                        />
                        <button className='sends' title='Envoyer' onClick={this.prepareDat}>
                        <Send/>
                        </button>
                    </div> 
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Messages;