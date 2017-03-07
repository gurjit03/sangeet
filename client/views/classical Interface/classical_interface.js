var songname,raagname , taalname ;
Template.classicalInterface.onRendered(function() {
	console.log(this.data);
	//console.log(window);
	var self = this;
	songname = this.data.songName;
	raagname = this.data.raagName;
	taalname = this.data.taalName;
	$(function(){
		//console.log(this , " what is this here");
		//True indicates whether we want to add the row button below
		createNotation(self.data.taalName,true);	
	});
})

Template.classicalInterface.events({
	'click .saveComposition' : function(event,tmpl) {
		event.preventDefault();
		
		var musicObj = {};
		musicObj.name = songname;
		musicObj.raag = raagname;
		musicObj.taal = taalname;
		musicObj.notation = returnNotation();
		console.info( musicObj.notation);
		musicObj.tempo = Number(tmpl.find('.tempo').value);

		musicObj.language = 'english';
		Meteor.call('addClassicalMusic',musicObj,function(error,result){
			if(error)
				alert(error.reason);

			else
				console.log(musicObj);
				console.log("Music added successfully with id - ",result);
				Router.go('load');
		});
	}
})