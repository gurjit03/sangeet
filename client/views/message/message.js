Template.message.helpers({
	canDelete : function(){
		/// Meteor.user().username gives currently logged in user.
		return myChat.canDeleteMessage(this.username);
	}
})
Template.message.events({
  'click .delete-msg' : function(event,tmpl) {
  	Messages.remove(this._id);
  	Toastr.error("Your message is deleted.");
  },
});