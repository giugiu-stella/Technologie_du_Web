import React, { Component } from "react";
import Logo from "../composants/Logo";

class Inscription extends Component {
    constructor(props){
        super(props);
        this.reflogin = React.createRef();
        this.refpassword = React.createRef();
        this.refpasswordbis = React.createRef();
        this.refmail = React.createRef();
        this.prepareData = this.prepareData.bind(this);
    }

    prepareData(e){
        e.preventDefault();
        var username = document.getElementById("username").required;
        var email = document.getElementById("email").required;
        var password = document.getElementById("password").required;
        var password2 = document.getElementById("password2").required;
        var check = document.getElementById("accept").required;
        
        const data = {
            login: this.reflogin.current.value,
            mail: this.refmail.current.value,
            password: this.refpassword.current.value,
            passwordbis: this.refpasswordbis.current.value
        };
        this.props.sendSignup(data);
    }
    
    render(){

        return (
            <div className="identification">
                <form className="form" onSubmit={this.prepareData}>
                    <h1>INSCRIPTION</h1>
                    <div className="form-inputs">
                        <label htmlFor="username" className="form-label">
                            Nom d'utilisateur
                        </label>
                        <input
                            ref = {this.reflogin}
                            id="username"
                            type="text" 
                            name="username" 
                            className="form-input" 
                            placeholder="Choisissez votre nom d'utilisateur"
                            required
                        />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="email" className="form-label">
                            E-mail
                        </label>
                        <input
                            ref = {this.refmail}
                            id="email"
                            type="email" 
                            name="email" 
                            className="form-input" 
                            placeholder="Entrez votre adresse e-mail"
                            required
                        />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="password" className="form-label">
                            Mot de passe
                        </label>
                        <input
                            ref = {this.refpassword}
                            id="password"
                            type="password" 
                            name="password" 
                            className="form-input" 
                            placeholder="Choisissez un mot de passe"
                            required
                        />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="password2" className="form-label">
                            Confirmation du mot de passe
                        </label>
                        <input
                            ref = {this.refpasswordbis}
                            id="password2"
                            type="password" 
                            name="password2" 
                            className="form-input" 
                            placeholder="Confirmez votre mot de passe"
                            required
                        />
                    </div>
                    <div className="checkbox-container">
                        <input id="accept" type="checkbox" required /> 
                        <span className="form-input-login">
                            <a> </a>J'accepte de céder tous mes biens à Anaïs Arnal, Carla Giuliani et Loona Macabre.
                        </span>
                    </div>
                    
                    <button type="submit" className="form-input-btn">
                        INSCRIPTION
                    </button>
                    <span className="form-input-login">Déjà parmi nous ?<a onClick={() => {this.props.setPageCourante("connexion")}}> Je me connecte</a>
                    </span>
                </form>
            </div>

        );
    }
}

export default Inscription;

