import React, { Component, useState } from "react";


class Login extends Component {
    constructor(props){
        super(props);
        this.prepareData = this.prepareData.bind(this);
        this.reflogin = React.createRef();
        this.refpassword = React.createRef();
    }
    
    prepareData(e){
        e.preventDefault();
        var username = document.getElementById("username").required;
        var password = document.getElementById("password").required;
        
        const data = {
            login: this.reflogin.current.value,
            password: this.refpassword.current.value,
        };
        this.props.sendLogin(data);
    }
    
    render() {

        return (
            <div className="identification">
                <form className="form" onSubmit={this.prepareData}>
                    <h1>CONNEXION</h1>
                    <div className="form-inputs">
                        <label htmlFor="username" className="form-label">
                            Nom d'utilisateur : 
                        </label>
                        <input
                            ref={this.reflogin}
                            id="username"
                            type="text" 
                            name="username" 
                            className="form-input" 
                            placeholder="Entrez votre nom d'utilisateur"
                            required
                        />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="password" className="form-label">
                            Mot de passe :
                        </label>
                        <input
                            ref={this.refpassword}
                            id="password"
                            type="password" 
                            name="password" 
                            className="form-input" 
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                        <span className="form-input-login">Oubli de mot de passe ?<a onClick={() => this.props.setPageCourante("recuperermdp")}> Je récupère mon mot de passe</a>
                        </span>
                    </div>
                    <button type="submit" className="form-input-btn">
                        CONNEXION
                    </button>
                    <span className="form-input-login">Pas encore parmi nous ? <a onClick={()=>this.props.setPageCourante("inscription")}>Je m'inscris</a>
                    </span>
                </form>
            </div>
        );
    }
}

export default Login;