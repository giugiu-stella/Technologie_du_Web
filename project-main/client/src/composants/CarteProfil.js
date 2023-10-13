import React, { Component } from 'react';

class CarteProfil extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <button className='carteprofil' onClick={() => this.props.seeProfile(this.props.pseudo)}>
                <div className='pdp'>
                    <img src={this.props.pdp} />
                </div>
                <div className='pseudo'>
                    {this.props.pseudo}
                </div>
            </button>
        );
    }
}

export default CarteProfil;