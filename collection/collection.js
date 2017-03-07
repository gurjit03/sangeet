Music = new Mongo.Collection('music');

ClassicalMusic = new Mongo.Collection('classicalmusic');

Messages = new Mongo.Collection('messages');

ChatRoom = new Mongo.Collection('chatroom');

var Schemas = {};

/////Defining the schema for the Messages object

Schemas.Message = new SimpleSchema({
    username : {
    	type : String
    },
    timestamp : {
    	type : Number
    },
    text : {
    	type : String
    },
    chatRoomId : {
        type : String,
        optional : true
    }
});

Messages.attachSchema(Schemas.Message);	

/////Defining the schema for the classicalMusic object
/*
Schemas.CMusic = new SimpleSchema({
    name : {
        type : String,
        max : 50
    },
    notation : {
        type : [],
        optional : true
    },
    language : {
        type : String,
        max : 30
    },
    tempo : {
        type : Number,
        min : 30,
        max : 500
    },
    date : {
        type : Date
    }
})

ClassicalMusic.attachSchema(Schemas.CMusic);
*/
// Defining the schema for the chatRoom //
Schemas.ChatRoom = new SimpleSchema({
	name : {
		type : String,
		max : 30
	},
	timeStamp : {
		type : Number
	}
});

ChatRoom.attachSchema(Schemas.ChatRoom);	

