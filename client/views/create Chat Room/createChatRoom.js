Template.createChatRoom.events({
	'submit .chatRoomForm' : function(evnt,tmpl) {
		evnt.preventDefault();
		var name = $(document).find('.chatRoomName').val();
		console.log(name);
		Meteor.call('addChatRoom',name,function(error,result){
			if(error) {
				alert(error.reason);
			} else {
				Router.go('chatRoom',{id : result});
			}	
		});
	}
})