Template.classical.helpers({

});

Template.classical.events({
	'submit .taal' : function(event,tmpl) {
		event.preventDefault();
		var taalForm = $('.taal');
		var taal = taalForm[0].taalSelection.value;
		var songname = taalForm[0].songname.value;
		var raagname = taalForm[0].raag.value;
		//console.log(songname , taal , {name : songname , taal : taal});
		Router.go('classicalInterface',{name : songname , taal : taal , raag : raagname});
	}
})