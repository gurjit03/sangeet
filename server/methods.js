Meteor.methods({

	//// THis is basically used for the classical musical interface to be used.
	addClassicalMusic : function(musicObj) {
		check(musicObj , {
			name : String,
			notation : Array,
			language : Match.Optional(String),
			raag : String,
			taal : String,
			tempo : Number
		})

		if(!Meteor.user()) {
			throw new Meteor.Error('login-require','Please first login into the application.');
		}
		else if(!musicObj.name) {
			throw new Meteor.Error('name-require','Please enter the Name');
		} 
		else if (!musicObj.notation) {
			throw new Meteor.Error('no-notation' , 'Please enter the notation to store ');
		}

		var musicObj = {
			name : musicObj.name,
			raagName : musicObj.raag,
			taalName : musicObj.taal,
			notation : musicObj.notation,
			language : musicObj.language,
			tempo : musicObj.tempo,
			date : new Date()
		}
		console.log(musicObj);
		console.log(ClassicalMusic.find().count() , "The no of music in this category");
		return ClassicalMusic.insert(musicObj);
	},

	loadClassicalMusic : function(id) {
		return ClassicalMusic.findOne({ _id : id });
	},
	removeClassicalMusic : function(id) {
		ClassicalMusic.remove({_id : id});
	},

	/// Name of the song / art / music , you want to save.
	/// Other details.
	addMusic : function(musicObj) {
		var musicObj = {
			name : musicObj.name,
			completeMusic : musicObj.completeMusic,
			timeRulerObj : musicObj.timeRulerObj,
			date : new Date()
		}
		return Music.insert(musicObj);
	},
	loadMusic : function(name) {
		return Music.find({name : name});
	},
	loadAllMusic : function() {
		return Music.find();
	},
	removeMusic : function(id) {
		Music.remove({_id : id});
	},
	sendMessage : function(data) {
		check(data , {
			text : String,
			chatRoomId : Match.Optional(String)
		});
		if(!Meteor.user()) {
			throw new Meteor.Error('login-require','Please first login into the application.');
		}
		else if(!data.text) {
			throw new Meteor.Error('message-require','Please enter the message');
		}
		console.log("adding messages");

		return Messages.insert({
			username : Meteor.user().username,
			timestamp : Date.now(),
			text : data.text,
			chatRoomId : data.chatRoomId
		});
	},
	addChatRoom : function(name) {
		check(name,String);
		if(!name)
			throw new Meteor.Error('Name-Require',"Please make sure u put a name in the area provided.");

		return ChatRoom.insert({
			name : name,
			timeStamp : Date.now()
		})
	}
})
