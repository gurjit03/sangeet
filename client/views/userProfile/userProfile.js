Template.userProfile.helpers({
	'user' : function() {
		console.log(this,"thiiiiiiiiiiiissssss");
	}
})

Template.eachUser.helpers({
	'notItSelf' : function(username) {
		return !(Meteor.user().username == username); 
	}
})