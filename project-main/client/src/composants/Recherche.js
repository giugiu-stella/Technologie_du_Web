import React, { Component } from 'react';
import { ReactComponent as LoupeIcon } from '../img/loupe.svg';
import { ReactComponent as StopIcon} from '../img/stop.svg';
import Mur from '../composants/Mur';

class Recherche extends Component {
    constructor(props){
        super(props);
        this.state= {
            boutonRecherche:false,
        }
        this.refsearch=React.createRef();
        this.handleclick = this.handleclick.bind(this);
        this.prepareData = this.prepareData.bind(this);
    }

   
    handleclick(e){
        this.setState({boutonRecherche: e})
    }


    prepareData(e){
        e.preventDefault();
    }

    render() {

        return(
            <div className='recherche'>
                <form className="form" onSubmit={this.prepareData}>
                <input
                    ref={this.refsearch}
                    id="recherche"
                    className='search-input'
                    type="search"
                    placeholder="Rechercher dans CAL"
                />
                </form>
                
                <button type="submit" className="loupe" onClick={() => this.handleclick(true)}>
                    <LoupeIcon/>
                </button>


                {this.state.boutonRecherche &&
                <div className="popup-box">
                    <div className='murrecherche'>
                        <div className='boxheader'>
                            <h3>Résultats pour "{this.refsearch.current.value}"</h3>
                            <span className='cross' onClick={() => this.handleclick(false)} >&#10005;</span>
                        </div>
                        <Mur pageCourante="recherche" sendMessage={this.props.sendMessage} sendLikeMessage={this.props.sendLikeMessage} sendDislikeMessage={this.props.sendDislikeMessage} sendComment={this.props.sendComment} posts={this.props.posts}  recherche={this.refsearch.current.value}/>
                    </div>
                </div>}

            </div>
        );
    }
}

export default Recherche;