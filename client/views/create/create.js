
Template.create.onRendered(function(){

	play = document.getElementById('play');
	save = document.getElementById('save');
	drag = document.getElementsByClassName('drag');
	drop = document.getElementsByClassName('input');
	
	timeRuler = document.getElementById('timeruler');

	notation = document.getElementById('notation');
	
	dropLength = drop.length;
	inputTotalWidth = drop[0].getBoundingClientRect().width - 2;

	/// Giving proper width to each time ruler / column
	timeRulerChildren = timeRuler.children;
	
	timeRuler.addEventListener('dragenter', dragenterHandler,false);
	timeRuler.addEventListener('dragover',dragoverHandler,false);
	timeRuler.addEventListener('drop', timeRulerDropHandler,false);
	timeRuler.addEventListener('mousedown',timeRulerMouseDownHandler,false);

	for(var i = 0; i<dropLength;i++) {
		drop[i].addEventListener('dragover', dragenterHandler, false);	
		drop[i].addEventListener('drop', dropHandler, false);
	}

	drag[0].addEventListener('dragstart', dragStartHandler, false);
	
	giveWidthToSingleTimeRuler(timeRulerChildren,inputTotalWidth);

});

Template.create.events({
	'click .savebutton' : function(evt,tmpl){
		var musicObj = {};
		var inputName = tmpl.find('.name');
		//if(inputName) {
		musicObj.name = inputName.value;
		
		var timeRulerObj = retrieveTimeRulerFromUI(timeRuler);
		musicObj.timeRulerObj = timeRulerObj;
		
		var completeMusicNotation = retrieveSwarsFromUI(document.getElementsByClassName("input"));
		musicObj.completeMusic = completeMusicNotation;
		
		Meteor.call('addMusic',musicObj,function(error,result ) {
			if(error) {
				
				toastr.error(error.reason);
			} else {
				Router.go('load');
			}
		});
		
		toastr.success("Your art has been saved with the name - "+inputName.value);
	},
	
	'click .playbutton' : function() {
		console.info(this);
		playMusicFromUI();
	}
});


