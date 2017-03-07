
var musicInterface = document.getElementsByClassName('musicInterface');
/*var playbutton = document.createElement('input');
	playbutton.setAttribute('type', 'image');
	playbutton.setAttribute('class','button playbutton centered');
	playbutton.setAttribute('src', 'playBtn.png');*/
var timeRuler , musicNotation;

Template.song.onRendered(function(){
	
	console.log(this);
	timeRuler = createTimeRuler(this.data.timeRulerObj);
    console.info(timeRuler);
	musicNotation = createMusicNotation(this.data.completeMusic);
	/*body[0].insertBefore(musicNotation, body[0].lastChild);
	body[0].insertBefore(timeRuler, body[0].lastChild);*/
	
	musicInterface[0].insertBefore(musicNotation, musicInterface[0].lastChild);
	musicInterface[0].insertBefore(timeRuler, musicInterface[0].lastChild);
	/*musicInterface[0].insertBefore(playbutton , musicInterface[0].lastChild);
*/
});

Template.song.onDestroyed(function(){
	musicInterface[0].removeChild(musicNotation);
	musicInterface[0].removeChild(timeRuler);
})

Template.song.events({
	'click .playBtn' : function() {
		playMusicFromUI();
	}
})

Template.song.helpers({
	'renderSong' : function() {
		console.warn(this ,"is shown here---------------");
		console.info(this);
	}
});
