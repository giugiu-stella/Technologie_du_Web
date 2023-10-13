const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    

    const users = new Users.default(db);
    const messages = new Messages.default(db);

    //USER
    //CONNEXION
    router.post("/user/login", async (req, res) => {
        console.log(req.body);
        try {
            const {login, password} = req.body;
            
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    message:"Missing fields"
                });
                return;
            }
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Unknown user"
                });
                return;
            }
            const user = await users.checkpassword(login, password);
            if (user) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Internal error"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.user = user;
                        res.status(200).json({
                            status: 200,
                            message: "User successfully logged in",
                            user: req.session.user
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "Invalid login and or password"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "Internal error"
            });
        }
    });


    //INSCRIPTION
    router.put("/user/signup", async (req, res) => {
        const {login, mail, password, passwordbis} = req.body;
        try {
            if (!login || !mail || !password || !passwordbis) {
                res.status(400).json({
                    status: 400,
                    message: "Missing fields"
                });
                return;
            }
            if (password != passwordbis){
                res.status(403).json({
                    status: 403,
                    message: "Password confirmation does not match"
                });
                return;
            }
            const user = await users.create(login, password, mail);
            res.status(201).json({
                status: 201,
                message: "User successfully registered",
                user: user
            });
        }
        catch(err){
            res.status(500).send("Failed updating database");
        }
    });


    //FOLLOW
    router.post("/user/:idsrc/:iddest/follow", async (req, res) => {
        try {
            await users.follow(req.params.idsrc, req.params.iddest);
            res.status(201).json({
                status: 201,
                message: "User successfully followed"
            });
        }
        catch (err){
            res.status(500).send("You already follow this user");
        }
    });


    //UNFOLLOW
    router.post("/user/:idsrc/:iddest/unfollow", async (req, res) => {
        try {
            await users.unfollow(req.params.idsrc, req.params.iddest);
            res.status(201).json({
                status: 201,
                message: "User successfully unfollowed"
            });
        }
        catch (err){
            res.status(500).send("You do not follow this user");
        }
    });


    //TROUVER UN UTILISATEUR EN PARTICULIER
    router.get("/user/:login", async (req, res) => {
        try {
            const user = await users.getOneUser(req.params.login);
            if (user){
                res.status(200).json({
                    status: 200,
                    message: "Found user",
                    user: user
                });
            }
            else {
                res.status(404).json({
                    status: 404,
                    message: "Unknown user"
                })
            }
        }
        catch (err){
            res.status(500).send("Internal error");
        }
    });


    //LISTE DES FOLLOWERS
    router.get("/user/:login/followers", async (req, res) => {
        try {
            const user = await users.getOneUser(req.params.login);
            res.status(200).json({
                status: 200,
                message: "List of followers",
                followersList: user.followers
            })
        }
        catch (err){
            res.status(500).send("Internal error");
        }
    });


    //LISTE DES FOLLOWINGS
    router.get("/user/:login/followings", async (req, res) => {
        try {
            const user = await users.getOneUser(req.params.login);
            res.status(200).json({
                status: 200,
                message: "List of followings",
                followersList: user.followings
            })
        }
        catch (err){
            res.status(500).send("Internal error");
        }
    });


    //MODIFIER PROFIL
    router.post("/user/:userid/profil", async (req, res) => {
        const {newpdp, newbio} = req.body;
        try {
            await users.modifProfil(req.params.userid, newpdp, newbio);
            res.status(201).json({
                status: 201,
                message: "Profile modified",
                newpdp: newpdp,
                newbio: newbio
            });
        }
        catch(err){
            res.status(500).send("Failed updating database");
        }
    });


    //LISTE DES UTILISATEURS
    router.get("/user", async (req, res) => {
        try {
            const data = await users.getUsers();
            console.log(data);
            res.status(200).json({
                status: 200,
                message: "List of users",
                users: data
            })
        }
        catch(e){
            res.status(500).json({status: 500, message: "Failed"});
        }
    })


    //SUPPRESSION DU COMPTE
    router.delete("/user/:user_id/delete", async(req, res) => {
        try {
            await users.delete(req.params.user_id);
            res.status(201).json({
                status: 201,
                message: "User successfully deleted"
            });
        }
        catch(err){
            res.status(500).send("Could not delete this user");
        }
    });


    //DECONNEXION        
    router.get("/user/logout", async (req, res) => {
        req.session.destroy((err) => { 
            if(err){
                res.status(500).send("Error logging out")
            }
            else{
                res.status(200).send("User successfully logged out")
            }
        });
        return;
    });



    //MESSAGE (TWEETS ET DM)
    //POSTER UN MESSAGE
    router.put("/message/:userlogin/post", async (req, res) => {
        const {srcpdp, destlogin, contenu, repliedTo} = req.body;
        try {
            if (!contenu) {
                res.status(400).json({
                    status: 400,
                    message: "Missing fields"
                });
                return;
            }
            const messageid = await messages.create(req.params.userlogin, srcpdp, destlogin, repliedTo, contenu);
            res.status(201).json({
                status: 201,
                message: "Message successfully posted",
                id: messageid
            });
        }
        catch(err){
            res.status(500).send("Failed posting message");
        }
    });


    //AIMER UN MESSAGE
    router.post("/message/:message_id/:userlogin/like", async (req, res) => {
        try {
            await messages.like(req.params.message_id, req.params.userlogin);
            res.status(200).json({
                status: 200,
                message: "Message liked",
                message_id: req.params.message_id
            });
        }
        catch(e) {
            res.status(500).send("Failed liking message");
        }
    });


    //NE PLUS AIMER UN MESSAGE
    router.post("/message/:message_id/:userlogin/dislike", async (req, res) => {
        try {
            await messages.dislike(req.params.message_id, req.params.userlogin);
            res.status(200).json({
                status: 200,
                message: "Message liked",
                message_id: req.params.message_id
            });
        }
        catch(e) {
            res.status(500).send("Failed liking message");
        }
    });


    //LISTE DES POSTS
    router.get("/message", async (req, res) => {
        try {
            const data = await messages.getPosts();
            console.log(data);
            res.status(200).json({
                status: 200,
                message: "List of posts",
                posts: data
            })
        }
        catch(e){
            res.status(500).json({status: 500, message: "Failed"});
        }
    })

    //TROUVER UN POST EN PARTICULIER
    router.get("/message/:messageid", async (req, res) => {
        try {
            const data = await messages.getOnePost(req.params.messageid);
            res.status(200).json({
                status: 200,
                message: "post found",
                post: data 
            })
        }
        catch(e){
            res.status(500).json({status: 500, message: "Failed"});
        }
    })

    return router;
}
exports.default = init;

