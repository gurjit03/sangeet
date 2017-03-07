myChat = {
	canDeleteMessage : function(username){
		var currentUser = Meteor.user();
		return (username == currentUser.username) ||
			Roles.userIsInRole(currentUser._id,['admin'],'all');
	}
}