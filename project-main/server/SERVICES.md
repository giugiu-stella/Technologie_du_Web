---------- SERVICES DE L'API ----------

------- COTE USER:
----Nom du web service: INSCRIPTION
    URL du web service: /user/signup
    Description du service: création d'un compte personnel
    Parametres en entree: login, mail, password et password confirmation
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: User successfully registered,
        id: Aicwrf6BTqXL1cq2
    }
    Erreurs possibles: Champs manquants, Confirmation de mot de passe incorrecte, Erreur interne
    Avancement du Service: FAIT
    Classes/Fichiers JavaScript: api.js, users.js
    Informations additionnelles

----Nom du web service: CONNEXION
    URL du web service: /user/login
    Description du service: connexion à son compte personnel
    Parametres en entree: login, password
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: User successfully logged in
        userid: Aicwrf6BTqXL1cq2
    }
    Erreurs possibles: Champs manquants, Utilisateur inconnu, Erreur interne, Identifiant ou mdp invalides
    Avancement du Service: FAIT
    Classes/Fichiers JavaScript: api.js, users.js
    Informations additionnelles

----Nom du web service: DECONNEXION
    URL du web service: /user/logout
    Description du service: déconnexion => destruction de la session utilisateur
    Parametres en entree: 
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: User successfully logged out
    }
    Erreurs possibles: Erreur interne (middleware)
    Avancement du Service: FAIT
    Classes/Fichiers JavaScript: api.js, users.js
    Informations additionnelles

----Nom du web service: DESINSCRIPTION
    URL du web service: /user/:userid/delete
    Description du service: suppression de son compte personnel
    Parametres en entree: dans l'url => userid
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: User successfully deleted
    }
    Erreurs possibles: Erreur interne
    Avancement du Service: FAIT
    Classes/Fichiers JavaScript: api.js, users.js
    Informations additionnelles

----Nom du web service: FOLLOW
    URL du web service: /user/:idsrc/:iddest/follow
    Description du service: suivre un autre utilisateur
    Parametres en entree: dans l'url => idsrc = id de celui qui souhaite suivre, iddest = id de celui qui va être suivi
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 500,
        message: You already follow this user
    }
    Erreurs possibles: Utilisateur déjà dans les abonnements
    Avancement du Service: FAIT
    Classes/Fichiers JavaScript: api.js, users.js
    Informations additionnelles

----Nom du web service: UNFOLLOW
    URL du web service: /user/:idsrc/:iddest/unfollow
    Description du service: ne plus suivre un autre utilisateur
    Parametres en entree: dans l'url => idsrc = id de celui qui souhaite arrêter de suivre, iddest = id de celui qui ne va plus être suivi
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 500,
        message: You do not follow this user
    }
    Erreurs possibles: Utilisateur pas encore dans les abonnements
    Avancement du Service: FAIT
    Classes/Fichiers JavaScript: api.js, users.js
    Informations additionnelles

----Nom du web service: LISTE DES FOLLOWERS
    URL du web service: /user/:userid/followers
    Description du service: liste des comptes qui suivent l'utilisateur
    Parametres en entree: dans l'url => userid = id de l'utilisateur
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: list of followers,
        data: liste des followers
    }
    Erreurs possibles: Erreur interne
    Avancement du Service: EN COURS
    Classes/Fichiers JavaScript: api.js, users.js
    Informations additionnelles

----Nom du web service: LISTE DES FOLLOWINGS
    URL du web service: /user/:userid/followings
    Description du service: liste des comptes suivis par l'utilisateur
    Parametres en entree: dans l'url => userid = id de l'utilisateur
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: list of followings,
        data: liste des followings
    }
    Erreurs possibles: Erreur interne
    Avancement du Service: PAS FAIT
    Classes/Fichiers JavaScript: api.js, users.js
    Informations additionnelles




------- COTE MESSAGES:
----Nom du web service: POST
    URL du web service: /message/post
    Description du service: poster un message (public=tweet ou privé=dm)
    Parametres en entree: srclogin, destlogin, contenu
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 400,
        message: Missing fields
    }
    Erreurs possibles: Champs manquants, Erreur interne
    Avancement du Service: FAIT
    Classes/Fichiers JavaScript: api.js, messages.js
    Informations additionnelles

----Nom du web service: LISTE DE POSTS
    URL du web service: /message/userid
    Description du service: afficher les posts des comptes suivis ainsi que par l'utilisateur lui-même
    Parametres en entree: dans l'url => userid
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: List of posts,
        posts: liste des posts
    }
    Erreurs possibles: Erreur interne
    Avancement du Service: EN COURS
    Classes/Fichiers JavaScript: api.js, messages.js
    Informations additionnelles

----Nom du web service: LIKE
    URL du web service: /message/:message_id
    Description du service: liker un message (tweet)
    Parametres en entree: dans l'url => id du message
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: Message liked
    }
    Erreurs possibles: Erreur interne
    Avancement du Service: EN COURS
    Classes/Fichiers JavaScript: api.js, messages.js
    Informations additionnelles

----Nom du web service: DISLIKE
    URL du web service: /message/:message_id
    Description du service: ne plus liker un message (tweet)
    Parametres en entree: dans l'url => id du message
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: Message disliked
    }
    Erreurs possibles: Erreur interne
    Avancement du Service: PAS FAIT
    Classes/Fichiers JavaScript: api.js, messages.js
    Informations additionnelles

----Nom du web service: SUPPRIMER
    URL du web service: /message/:user_id/:message_id/delete
    Description du service: supprimer un message que l'on a posté
    Parametres en entree: dans l'url => id de l'utilisateur auteur du message, id du message
    Format de sortie: json
    Exemple de sortie: 
    {
        status: 200,
        message: Message deleted
    }
    Erreurs possibles: Erreur interne
    Avancement du Service: PAS FAIT
    Classes/Fichiers JavaScript: api.js, messages.js
    Informations additionnelles


table USER:
login -> string
profilepic -> string
password -> string
mail -> string
followers -> array: _id des gens qui nous suivent
followings -> array: _id des gens suivis
_id (automatique)

table MESSAGE:
srcid -> string
destid (si c'est un post sur le mur : pas renseigné, sinon lid du destinataire) -> string
date -> objet Date toString (UTC)
contenu -> string
repliedTo -> message (vide si ce n'est pas une réponse à un post déjà existant)
reponses -> array: messages
likes -> array: _id des gens ayant liké
_id (automatique)