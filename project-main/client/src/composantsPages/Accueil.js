import React, { Component } from 'react';
import CarteProfil from '../composants/CarteProfil';
import Mur from '../composants/Mur';
import NavBar from '../composants/NavBar';
import NavBarMur from '../composants/NavBarMur';
class Accueil extends Component {
    constructor(props){
        super(props);
        this.state= {
            recherche:"",
            
        }

        this.listSugg = this.props.users.filter((i) => this.props.followings.indexOf(i.login) == -1 && this.props.login != i.login);
    }

    componentDidMount(){
        this.props.updatePosts();
    }
    setrecherche(valeur){
        this.setState({recherche: valeur})
    }
    render() {
        return (
            <div>
                <NavBar setPageCourante={this.props.setPageCourante} logout={this.props.logout}/>
                <div className='accueil'>
                    <div className='mur'>
                    
                        <Mur seeProfile={this.props.seeProfile} pageCourante="accueil" setPageCourante={this.props.setPageCourante} pdp={this.props.pdp} sendMessage={this.props.sendMessage} sendLikeMessage={this.props.sendLikeMessage} sendDislikeMessage={this.props.sendDislikeMessage} updatePosts={this.props.updatePosts} posts={this.props.posts} login={this.props.login} followings={this.props.followings}
                        setrecherche={this.setrecherche}/>
                    </div>
                    <div className='suggestions'>
                        <div className='header'>
                            Ces comptes pourraient vous intéresser...
                        </div>
                        <div className='profils'>
                            {this.listSugg.map((u) => <CarteProfil key={u._id} pseudo={u.login} pdp={u.pdp} seeProfile={this.props.seeProfile} />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Accueil;