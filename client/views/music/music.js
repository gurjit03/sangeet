Template.music.helpers({
	'getthis' : function() {
		console.log(this , "this vlaue");
	}
});

Template.music.events({
	'click .delete': function() {
		/*console.log("______");
			console.log(this.classical);*/
			var id = this.song._id;
		if(this.classical) {
			console.log(this.classical);
			Meteor.call('removeClassicalMusic',id);
		}
		else
			Meteor.call('removeMusic',id);
		
		toastr.options.positionClass = "toast-top-right";
		toastr.error('Your music with id ' + id + ' has been deleted...!');
	}
})