const { resolve } = require("path");

class Messages {
    constructor(db){
        this.db = db;
    }

    create(srclogin, srcpdp, destlogin, repliedTo, contenu) {
		var d = new Date().toString();
		return new Promise((resolve, reject) => {
			this.db.messages.insert({
				srclogin: srclogin,
				srcpdp: srcpdp,
                destlogin: destlogin,
                date: d,
                contenu: contenu,
				comments: [],
				likes: [],
				repliedTo: repliedTo
			}, function(err, message) {
				if (err){
					reject();
				}
				else {
					resolve(message._id);
				}
			}); 
		});
	}

	getOnePost(message_id){
		return new Promise ((resolve, reject) => {
			this.db.messages.findOne({_id: message_id}, function(err, docs){
				if (err){
					reject();
				}
				else {
					resolve(docs);
				}
			})
		});
	}

	getPosts() {
		return new Promise ((resolve, reject) => {
			this.db.messages.find({destlogin: ""}, function(err, docs){
				if (err){
					reject();
				}
				else {
					resolve(docs);
				}
			})
		});
	}

	like(message_id, userlogin){
		return new Promise ((resolve, reject) => {
			this.db.messages.update({_id:message_id}, {$push: {likes: userlogin}}, {upsert: false}, function(err){
				if (err)
					reject();
			});
			resolve();
		})
	}

	dislike(message_id, userlogin){
		return new Promise ((resolve, reject) => {
			this.db.messages.update({_id:message_id}, {$pull: {likes: userlogin}}, {upsert: false}, function(err){
				if (err)
					reject();
			});
			resolve();
		})
	}
}

exports.default = Messages;