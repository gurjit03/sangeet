Router.configure({
	'layoutTemplate' : 'main'
}); 


/*Router.route('/create');*/
Router.route('/', {
	name : 'create'
});

Router.route('/load',{
	name : 'load',
	waitOn : function() {
		return [
			Meteor.subscribe('music'),
			Meteor.subscribe('classicalMusic')
		];
	}
});

Router.route('/samples');
Router.route('/help');
Router.route('/contact_us' , function(){
	this.render('contact_us');
});

Router.route('/classical');

Router.route('/classicalInterface/:name/:taal/:raag', {
	name : 'classicalInterface',
	data : function() {
		return {
			taalName : this.params.taal,
			songName : this.params.name,
			raagName : this.params.raag
		}
	}
});

Router.route('classicSong/:id' , {
	name : 'classicSong',
	waitOn : function() {
		return Meteor.subscribe('classicalMusic');
	},
	data : function() {
		return ClassicalMusic.findOne({_id : this.params.id});
	}
});

Router.route('song/:id',{
	name : 'song',
	waitOn : function() {
		return Meteor.subscribe('music');
	},	
	data : function() {
		return Music.findOne({_id : this.params.id});
	}
})

Router.route('/chat',{
	name : 'chathome',
	waitOn : function() {
		return Meteor.subscribe('messages',10);
	}/*,
	data : function() {
		return {
			messages : Messages.find()
		};
	}*/
});

Router.route('/users/:username',{
	name : 'userProfile',
	// a place to put your subscriptions
  	subscriptions: function() {
    	this.subscribe('userMessages',this.params.username).wait();

	    // add the subscription to the waitlist
	    this.subscribe('userList').wait();
  	},
	data : function() {
		return {
			username : this.params.username,
			messages : Messages.find(),
			usersList : Meteor.users.find()
		};
	}
});

Router.route('/chatRoom/:id',{
	name : 'chatRoom',
	waitOn : function() {
		return [
			Meteor.subscribe('chatRoom',this.params.id),
			Meteor.subscribe('chatRoomMessages',this.params.id)
		] 
	},
	data : function() {
		return ChatRoom.findOne({_id : this.params.id});
	}
})

Router.route('/createChatRoom',{
	name : 'createChatRoom'
})

Router.route('/chatRooms',{
	name : 'chatRooms',
	waitOn : function() {
		return Meteor.subscribe('chatRooms');
	},
	data : function() {
		return ChatRoom.find().fetch();
	}
})