Template.classicSong.onRendered(function() {
	var data = this.data;
	console.log(data);
	var rows = Math.ceil(data.notation.length/returnColNumber(data.taalName));
	console.log(rows , " rows -------------");
	$(function(){
		//console.log(this , " what is this here");
		//True indicates whether we want to add the row button below
		createNotation(data.taalName,false,rows);
		fillNotation(data.notation);	
	});
});

Template.classicSong.events({
	'click .playBtn' : function(tmpl , e ) {
		 console.log(obj);
		 var obj = {};
		 obj.language = this.language;
		 obj.tempo = this.tempo;
		 obj.notation = this.notation;
		

		playNotationFromData(obj);
	}
})