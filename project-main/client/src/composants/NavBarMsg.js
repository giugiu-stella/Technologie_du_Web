import React, { Component } from 'react';
import { ReactComponent as NewPost } from '../img/newPost.svg'; 
import { ReactComponent as Send } from '../img/send.svg';

class NavBarMsg extends Component {
    constructor(props){
        super(props);
        this.state = {buttonOn : false}
        this.ecrirem = this.ecrirePost.bind(this);
        this.prepareDatamsg = this.prepareData.bind(this);
        this.refPost = React.createRef();
    }

    ecrirem(){
        this.setState(({buttonOn }) => ({buttonOn : !buttonOn }))
    }

    prepareDatamsg(e){
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
            <div className='navbarMsg'>
                <div className='headermsg'>
                    <button className='newmsg' title='Nouveau post' onClick={this.ecrirem}>
                        <NewPost />
                    </button>
                </div>

                {this.state.buttonOn ?
            
                        <div>
                        oui
                        </div> 
                : null}
            </div>
        );
    }
}

export default NavBarMsg;