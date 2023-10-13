import React, { Component } from 'react';
import Logo from './Logo';
import { ReactComponent as HomeIcon } from '../img/accueil.svg';
import { ReactComponent as MsgIcon } from '../img/messages.svg';
import { ReactComponent as ProIcon } from '../img/profil.svg';
import { ReactComponent as LogoutIcon } from '../img/logout.svg';


class NavBar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className='navbar'>
                <div className='leftContainer'>
                    <Logo />
                    <div className='icones'>
                        <button className='icon-button' onClick={() => this.props.setPageCourante("accueil")}>
                            <HomeIcon />
                        </button>
                    </div>
                
                </div>
                <div className='rightContainer'>
                    <div className='icones'>
                        <button className='icon-button' onClick={() => this.props.setPageCourante("messages")}>
                            <MsgIcon />
                        </button>
                        <button className='icon-button' onClick={() => this.props.setPageCourante("monprofil")}>
                            <ProIcon />
                        </button>
                        <button className='icon-button' onClick={this.props.logout}>
                            <LogoutIcon/>
                        </button>
                    </div>
                </div>
            </div>
           
        );
    }
}

export default NavBar;