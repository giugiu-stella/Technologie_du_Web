const { resolve } = require("path");

class Users {
  	constructor(db) {
    	this.db = db;
	}

	create(login, password, mail) {
		return new Promise((resolve, reject) => {
			this.db.users.insert({
				login : login, 
				password : password, 
				mail : mail,
				followers : [],
				followings : [],
				pdp : "ppNotFound.png"
			}, function(err, user) {
				if (err){
					reject();
				}
				else {
					resolve(user);
				}
			}); 
		});
	}

	getOneUser(login) {
		return new Promise((resolve, reject) => {
			this.db.users.findOne({login: login}, function(err, doc){
				if (err){
					reject();
				}
				else {
					resolve(doc);
				}
			});
		});
	}

	getUsers() {
		return new Promise((resolve, reject) => {
			this.db.users.find({}, function(err, doc){
				if (err){
					reject();
				}
				else {
					resolve(doc);
				}
			});
		});
	}

	async exists(login) {
		return new Promise((resolve, reject) => {
			this.db.users.find({login : login}, function(err, doc){
				if (err){
					reject();
				}
				else {
					if (doc.length == 0){
						resolve(false);
					}
					resolve(true);
				}
			});
		});
	}

	checkpassword(login, password) {
		return new Promise((resolve, reject) => {
			this.db.users.findOne({
				login: login, 
				password: password
			}, function(err, doc) {
				if (err){
					reject();
				}
				else {
					resolve(doc);
				}
			});
		});
	}

	follow(loginsrc, logindest) {
		return new Promise((resolve, reject) => {
			this.db.users.update({login:loginsrc}, {$push: {followings:logindest}}, {upsert: false}, function(err){
				if (err)
					reject();
			});
			this.db.users.update({login:logindest}, {$push: {followers:loginsrc}}, {upsert: false}, function(err){
				if (err)
					reject();
			});
			resolve();
		})
	}

	unfollow(loginsrc, logindest) {
		return new Promise((resolve, reject) => {
			this.db.users.update({login:loginsrc}, {$pull: {followings:logindest} }, {upsert: false}, function(err){
				if (err)
					reject();
			});
			this.db.users.update({login:logindest}, {$pull: {followers:loginsrc} }, {upsert: false}, function(err){
				if (err)
					reject();
			});
			resolve();
		})
	}

	modifProfil(userid, newpdp, newbio) {
		return new Promise((resolve, reject) => {
			this.db.users.update({_id:userid}, {$set: {pdp: newpdp, bio: newbio}}, {}, function (err) {
				if(err){
					reject();
				}
				resolve();
			})
		})
	}

	delete(userid) {
		return new Promise((resolve, reject) => {
			this.db.users.remove({_id:userid}, {}, function(err) {
				if (err)
					reject(err);
				else
					resolve();
			})
		})
	} 
}

exports.default = Users;
