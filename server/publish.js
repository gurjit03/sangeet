Meteor.publish('music',function(){
	return Music.find({});
});

Meteor.publish('classicalMusic',function() {
	return ClassicalMusic.find({});
});

Meteor.publish('messages',function(limit){
	check(limit,Match.Optional(Number));
	if(this.userId) {
		return Messages.find({
			chatRoomId : { $eq : undefined }
		},{
			limit : limit || 10,
			sort : { timestamp : -1 }
		});
	}
	this.ready();
});

Meteor.publish('chatRoomMessages',function(chatRoomId){
	check(chatRoomId,String);
	
	if(this.userId){
		return Messages.find({
			chatRoomId : chatRoomId
		});
	}
	
	this.ready();
});

Meteor.publish('userMessages',function(username){
	check(username,String);
	console.log(username,'Server console.log');
	if(this.userId){
		return Messages.find({
			username : username
		});
	}
	this.ready();
});

Meteor.publish('userList',function() {
	if(Roles.userIsInRole(this.userId,['admin'],'all')) {
		return Meteor.users.find({});
	}
	this.ready();
});

Meteor.publish('chatRoom',function(id){
	check(id,String);
	//console.log(ChatRoom.findOne({ _id : id }));
	return ChatRoom.find({ 
		_id : id 
	});
	//this.ready();
});

Meteor.publish('chatRooms',function() {
	if(this.userId) {
		console.log("Returnnnnnninggg");
		return ChatRoom.find();
	}
	this.ready();
})