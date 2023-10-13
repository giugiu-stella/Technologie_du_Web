import React, { Component } from 'react';
import Post from '../composants/Post';
import NavBar from '../composants/NavBar';
import Mur from '../composants/Mur';
import CarteProfil from '../composants/CarteProfil';

class Profil extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            boutonModifProfil: false,
            boutonFollowing: false,
            boutonFollower: false,
            file: this.props.pdp
        }

        this.modifProfil = this.modifProfil.bind(this);
        this.voirFollowing = this.voirFollowing.bind(this);
        this.voirFollower = this.voirFollower.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.prepareModif = this.prepareModif.bind(this);
        this.suivre = this.suivre.bind(this);
        this.passuivre = this.passuivre.bind(this);
        this.refBio = React.createRef();

        if (this.props.pageCourante == "monprofil"){
            this.listFollowers = this.props.users.filter((i) => this.props.followers.indexOf(i.login) != -1);
            this.listFollowings = this.props.users.filter((i) => this.props.followings.indexOf(i.login) != -1);
        }
        else {
            this.numFollowers = this.props.userVisited.followers.length;
            this.numFollowings = this.props.userVisited.followings.length;
            this.listFollowers = this.props.users.filter((i) => this.props.userVisited.followers.indexOf(i.login) != -1);
            this.listFollowings = this.props.users.filter((i) => this.props.userVisited.followings.indexOf(i.login) != -1);
        }
    }

    modifProfil(e){
        this.setState(({boutonModifProfil}) => ({boutonModifProfil: e}))
    }

    voirFollowing(e){
        this.setState(({boutonFollowing}) => ({boutonFollowing: e}))
    }

    voirFollower(e){
        this.setState(({boutonFollower}) => ({boutonFollower: e}))
    }

    handleChange(event) {
        this.setState({
            file: event.target.files[0].name
        })
    }

    prepareModif(){
        const data = {
            newpdp: this.state.file,
            newbio: this.refBio.current.value,
        };

        this.modifProfil(false);
        this.props.sendModifProfil(data);
    }

    suivre(){
        this.numFollowers++;
        this.props.follow(this.props.login, this.props.userVisited.login)
    }

    passuivre(){
        this.numFollowers--;
        this.props.unfollow(this.props.login, this.props.userVisited.login)
    }

    render() {
        return (
            <div>
                <NavBar setPageCourante={this.props.setPageCourante} logout={this.props.logout}/>
                
                <div className='profil'>
                    <div className='profil-header'>
                        <div className='profil-header-gauche'>
                            <div className="profileUserImg"> 
                                {this.props.pageCourante === "monprofil" ? <img src={this.props.pdp} />
                                : <img src={this.props.userVisited.pdp} />}
                            </div>
                            {this.props.pageCourante === "monprofil" ?
                            <button className='profilaction' onClick={() => this.modifProfil(true)}>
                                Modifier mon profil
                            </button>
                            :
                            <>
                                {this.props.followings.indexOf(this.props.userVisited.login) == -1 ? 
                                    <button className='profilaction' onClick={this.suivre}>
                                        Suivre 
                                    </button>
                                : <button className='profilaction' onClick={this.passuivre}>
                                    Ne plus suivre 
                                </button>}
                            </>}
                        </div>
                        <div className='profil-header-droit'>
                            <div className='up'>
                                <div className='username'>
                                    {this.props.pageCourante === "monprofil" ? this.props.login
                                    : this.props.userVisited.login}
                                </div>
                            </div>
                            <div className='info'>
                                <a className='follower' onClick={() => this.voirFollower(true)}>
                                    {this.props.pageCourante === "monprofil" ? this.props.followers.length
                                    : this.numFollowers} abonnés
                                </a>
                                <a className='follower' onClick={() => this.voirFollowing(true)}>
                                    {this.props.pageCourante === "monprofil" ? this.props.followings.length
                                    : this.numFollowings} abonnements
                                </a>
                            </div>
                            {this.props.pageCourante === "monprofil" ?
                                <div className='bio'>
                                    {this.props.bio ? <div className='biotext'>{this.props.bio}</div>
                                    : <p>Vous n'avez pas écrit de biographie.</p>
                                    }
                                </div>
                            : <div className='bio'>
                                {this.props.userVisited.bio ? <div className='biotext'>{this.props.userVisited.bio}</div>
                                : <p>Cet utilisateur n'a pas écrit de biographie.</p>
                                }
                            </div>}
                            
                        </div>
                    </div>

                    <div className='mur'>
                        <div className='mesposts'>
                            {this.props.pageCourante === "monprofil" ?
                                <Mur seeProfile={this.props.seeProfile} pageCourante="profil" posts={this.props.posts} login={this.props.login}/>
                            : <Mur seeProfile={this.props.seeProfile} pageCourante="profil" posts={this.props.posts} login={this.props.userVisited.login}/>}
                        </div>
                    </div>
                </div>

                {this.state.boutonFollower &&
                (<div className='popup-box'>
                    <div className='boxFollow'>
                        <div className='boxheader'>
                            <h3>Abonnés</h3>
                            <span className='cross' onClick={() => this.voirFollower(false)} >&#10005;</span>
                        </div>
                        <div onClick={() => this.voirFollower(false)}>
                            {this.listFollowers.map((f) => <CarteProfil key={f._id} pseudo={f.login} pdp={f.pdp} seeProfile={this.props.seeProfile} />)}
                        </div>
                    </div>
                </div>)}

                {this.state.boutonFollowing &&
                (<div className='popup-box'>
                    <div className='boxFollow'>
                        <div className='boxheader'>
                            <h3>Abonnements</h3>
                            <span className='cross' onClick={() => this.voirFollowing(false)} >&#10005;</span>
                        </div>
                        <div onClick={() => this.voirFollowing(false)}>
                            {this.listFollowings.map((f) => <CarteProfil key={f._id} pseudo={f.login} pdp={f.pdp} seeProfile={this.props.seeProfile} />)}
                        </div>
                    </div>
                </div>)}

                {this.state.boutonModifProfil &&
                (<div className='popup-box'>
                    <div className='boxModif'>
                        <div className='boxheader'>
                            <h3>Modifier mon profil</h3>
                            <span className='cross' onClick={() => this.modifProfil(false)} >&#10005;</span>
                        </div>
                        <div className='box'>
                            <p>Photo de profil:</p>
                            <div className='box2'>
                                <input type="file" onChange={this.handleChange} accept=".jpg, .png, .jpeg"/>
                                <div className='preview'>
                                    <img src={this.state.file}/>
                                </div>
                            </div>
                        </div>
                        <div className='box'>
                            <p>Biographie:</p>
                            <div className='box2'>
                                <textarea
                                    ref={this.refBio}
                                    maxLength={150}
                                    className='text-input'
                                    type="text"
                                    placeholder={this.props.bio ? this.props.bio : "Dîtes-nous ce qui vous vient à l'esprit."}
                                />
                            </div>
                        </div>

                        <div className='saveButtonBox'>
                            <button className='saveButton' onClick={this.prepareModif}>
                                Sauvegarder les modifications
                            </button>
                        </div>
                    </div>
                </div>)}
            </div>
        );
    }
}

export default Profil;