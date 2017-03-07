
//// THIS PART IS THE UI ENHANCEMENT PART , LOGIC PART IS SEPERATE.
var giveWidthToSingleTimeRuler,inputTotalWidth,timeRulerChildren,dropLength,notation,timeRuler,drop,drag,save,currentElement,startWidth,oldWidth,endWidth,currentDraggedEl,eventDirection,play;

	function giveWidthToSingleTimeRuler(timeRulerChildren,totalWidth) {
		console.log(totalWidth , " Total width ");

		var singleRulerWidth = totalWidth/timeRulerChildren.length;
		
		for(var i = 0;i < timeRulerChildren.length;i++) {
			timeRulerChildren[i].style.width = singleRulerWidth + 'px';
		}
	}

	function dragStartHandler(e) {
		//e.preventDefault();
		currentElement = this;
		e.dataTransfer.setData('text/plain', 'dummy');
	}

	////// Checking while dropping the div , whether it overlaps or not
	////// with the other children of the same div.
	function checkForOverlap(currentDropArea , leftPos,width) {
		var children = currentDropArea.children;
		for(var i = 0; i < children.length; i++) {
			var currentChild = children[i].getBoundingClientRect();
			if((leftPos <= currentChild.right && leftPos >= currentChild.left) || (leftPos + width <= currentChild.right && leftPos + width >= currentChild.left)) {
				return false;
			}
		}
		return true;
	}

	function colorClass(textContent) {
		switch(textContent) {
			case 'Sa' : return 'violet';
			break;
			case 're' : return 'blue_violet';
			break;
			case 'Re' : return 'blue';
			break;
			case 'ga' : return 'blue_green';
			break;
			case 'Ga' : return 'green';
			break;
			case 'ma' : return 'yellow_green';
			break;
			case 'Ma' : return 'yellow';
			break;
			case 'Pa' : return 'yellow_orange';
			break;
			case 'dha' : return 'orange';
			break;
			case 'Dha' : return 'red_orange';
			break;
			case 'ni' : return 'red';
			break;
			case 'Ni' : return 'red_violet';
			break;
		}
	}

	/// This will handle the dropped item
	function dropHandler(e) {
		if (currentElement) {
			//console.log(currentElement);
			if(e.preventDefault) { e.preventDefault(); }
    		if(e.stopPropagation) { e.stopPropagation(); }
			var currentElementDetails = currentElement.getBoundingClientRect();
			
			var dropAreaDetails = this.getBoundingClientRect();
			
			var swarDiv = this.previousElementSibling;
			//console.log(e.pageX);
			var swarDivDetails = swarDiv.getBoundingClientRect();
			
			if(checkForOverlap(this , e.pageX - (swarDivDetails.right/2),currentElementDetails.width)) {
				
				var left = e.pageX - dropAreaDetails.left;
				var div = document.createElement('div');
				
				div.className = 'droppedItem ';
				
				//div.style.position = 'absolute';	
				div.style.width = currentElementDetails.width+'px';
				div.style.height = (dropAreaDetails.height - 15)+'px';

				///// Give the text Node to the empty divs
				var textContent = swarDiv.textContent;

				/// this color class is assigned to the div
				var colorOfClass = colorClass(textContent);
				
				div.className += colorOfClass;

				var textNode = document.createTextNode(textContent);

				//// Get the swar div details 
				div.style.left = (left-(swarDivDetails.right/2))+'px';				
				div.addEventListener('mousedown', mouseDownHandler,false);
				div.appendChild(textNode);
				 
				///Attach the event listener.
				this.appendChild(attachOctaveHandler(div));
				currentElement = null;
			}else {
				console.info('Some notes are overlapping , plz make appropriate place for them');
			}
		}
	}


	/// This function will basically accept a div and c attach octave Handler to it.
	function attachOctaveHandler(div) {				
		var topButton = document.createElement('div');
		var bottomButton = document.createElement('div');
		topButton.className = 'octave_button top';
		bottomButton.className = 'octave_button bottom';
		topButton.addEventListener('click', octaveHandler,false);
		bottomButton.addEventListener('click',octaveHandler,false);
		div.appendChild(topButton);
		div.appendChild(bottomButton);
		return div;		
	}

	function dragenterHandler(e) {
		e.preventDefault();
	}

	function dragoverHandler(e) {
		e.preventDefault();
	}

	///// To drag the swars //////
	function mouseDownHandler(e){
		var thisElementDetails = this.getBoundingClientRect();
		
		/// Dragging from the right.  
		if(e.pageX >= thisElementDetails.right - 2 && e.pageX <= thisElementDetails.right + 2) {
			
			eventDirection = 'r';
			startWidth = e.pageX;
			oldWidth = thisElementDetails.width;
			notation.style.cursor = 'move';
			currentDraggedEl = this;
			notation.addEventListener('mousemove', mouseMoveHandler,false);
			notation.addEventListener('mouseup', mouseUpHandler,false);
		}/// While dragging left position of elements also have to be adjusted.
		else if(e.pageX < thisElementDetails.left + .04 * thisElementDetails.left && e.pageX > thisElementDetails.left - .04 * thisElementDetails.left){
			//console.log('Left side is dragged');
			eventDirection = 'l';
			endWidth = thisElementDetails.right;
			oldWidth = thisElementDetails.width;
			notation.style.cursor = 'move';
			currentDraggedEl = this;
			notation.addEventListener('mousemove', mouseMoveHandler,false);
			notation.addEventListener('mouseup', mouseUpHandler,false);	
		}  
	}

	function mouseMoveHandler(e) {
		console.log('dragging.........');
		e.preventDefault();
		//console.log('mouse is moving');
		if(eventDirection == 'r') {
			notation.style.cursor = 'move';
			endWidth = e.pageX;
			newWidth = endWidth - startWidth;
			//console.log(newWidth);
			
			currentDraggedEl.style.width = newWidth+oldWidth+'px';
			console.log(swarDivDetails);
			/// if the end of the input swar width is touched ,increase the input swar width.

		} else if(eventDirection == 'l') {
			var swarDivDetails = getSwarDivDetails(currentDraggedEl);
			
			

			notation.style.cursor = 'move';
			startWidth = e.pageX;
			
			var left = startWidth - swarDivDetails.right;
			
			currentDraggedEl.style.left = left + 'px';
			currentDraggedEl.style.width = (endWidth - startWidth) + 'px';
			
		}
	}

	function checkForTheStart(elToCheck,leftPos) {
		if(leftPos < elToCheck.getBoundingClientRect().left) {
			return 0;
		}
	}

	function checkForTheEnd(elToCheck,currentElWidth) {		
		if( currentElWidth > elToCheck.getBoundingClientRect().width ) {
			var borderWidth = 1;
			return currentElWidth - borderWidth;	
		}
	}

	/// Get the Swar div details from the dragging swar/ box.
	function getSwarDivDetails(currentdragEl) {
		return currentdragEl.parentNode.previousElementSibling.getBoundingClientRect();
	}

	function mouseUpHandler(e) {
		//var newWidth;
		e.preventDefault();
		//console.log('mouse up is called');
		notation.removeEventListener('mousemove', mouseMoveHandler);
		notation.removeEventListener('mouseup', mouseUpHandler);
		notation.style.cursor = 'initial';
		if(eventDirection == 'l') {
			var isStartOfDiv = checkForTheStart(currentDraggedEl.parentNode,
                                        currentDraggedEl.getBoundingClientRect().left);
			if(typeof isStartOfDiv === 'number') {
				currentDraggedEl.style.left = isStartOfDiv + 'px';
			}
		}
		else if(eventDirection == 'r') {
			var currentElDetail = currentDraggedEl.getBoundingClientRect();
			var elementToCheck = currentDraggedEl.parentNode;
			var isEndOfDiv = checkForTheEnd(elementToCheck,
                            currentElDetail.left + currentElDetail.width -elementToCheck.previousElementSibling.getBoundingClientRect().right);
			if(typeof isEndOfDiv === 'number') {
				currentDraggedEl.parentNode.style.minWidth = isEndOfDiv + 'px';
				currentDraggedEl.parentNode.style.width = 'auto';
			}
		}
	}

//////	All the above work till now is for the swars that should be dragged.

///Allowing the timeruler to add more time in seconds

	function dragenterHandler(e) {
		e.preventDefault();
	}

	function dragoverHandler(e) {
		e.preventDefault();
	}

	function timeRulerDropHandler(e) {
		//alert("Drop occurs");
		var children = this.children;
		var data = Number(children[children.length - 1].textContent) + 1;
		var timeStamp = document.createElement('div');
		var text = document.createTextNode(data);
		var singleW = children[0].getBoundingClientRect().width;
		timeStamp.className = 'time';

		timeStamp.style.width = singleW + 'px';
		console.warn(singleW);
		timeStamp.appendChild(text);
		var thisElWidth = this.getBoundingClientRect().width;
		this.style.width = (thisElWidth + singleW + 1) + 'px';
		this.appendChild(timeStamp);
	}


//// Dragging the timeRuler so that the size of individual div's can be increased.
	var body = document.getElementsByTagName('body');

	function timeRulerMouseDownHandler(e) {
		var timeRulerDetails = this.getBoundingClientRect();
		if(e.pageX >= timeRulerDetails.right - .04 * timeRulerDetails.right) {
			//alert('now ok');
			startWidth = timeRulerDetails.left;
			
			body[0].style.cursor = 'move';
			document.addEventListener('mousemove', timeRulerMouseMove,false);
			document.addEventListener('mouseup', timeRulerMouseUp,false);
		}
	}

	function timeRulerMouseMove(e) {
		endWidth = e.pageX;
		//console.info(e.pageX);
		var totalWidth = endWidth - startWidth;
		timeRuler.style.minWidth = (totalWidth + timeRuler.children.length) + 'px';
		timeRuler.style.width = 'auto';
		// This function will assign width to each time div inside the time Ruler.
		giveWidthToSingleTimeRuler(timeRulerChildren,totalWidth);
	} 

	function timeRulerMouseUp(e) {
		body[0].style.cursor = 'initial';
		document.removeEventListener('mousemove', timeRulerMouseMove);
		document.removeEventListener('mouseup', timeRulerMouseUp);
	}


///////// NoW The LOGiC PaRt starts /////////////

/// This function will handle the octave part , means increase or decrease the octave as required.
function octaveHandler() {
	var swar = this.parentNode.textContent;
	var highest = 3;
	var lowest = 1;
	var octave = checkOctave(swar);	
	if(this.classList[1] == 'top') {
		///using raag-framework.js function
		swar = octave === highest ? swar : attachOctaveSymbol(removeOctaveSymbol(swar),++octave);
		console.info(swar);
	
	}else {

		swar = octave === lowest ? swar : attachOctaveSymbol(removeOctaveSymbol(swar),--octave);
		//console.info(swar);
	}
	this.parentNode.firstChild.nodeValue = swar;
	console.log(this.parentNode);
}

//// Now this part belongs to the playing music 
function playMusicFromUI() {
	var inputDivCollection = document.getElementsByClassName('droppedItem');
	

	var requiredSwarDetails = sortTheObject(getRequiredSwarDetails(inputDivCollection));
	console.warn(requiredSwarDetails);


	for( var i = 0; i < requiredSwarDetails.length ;++i) {
		// Play the notes with the required parameters
		playSwar(requiredSwarDetails["swar"+i].name,requiredSwarDetails["swar"+i].delayTime,requiredSwarDetails["swar"+i].timeOfPlay + 150);
	}

}

/// This function will sort the object on the basis of the delaytime and return the sorted object.
function sortTheObject(RequiredSwarDetails) {
	for ( var i = 0; i < RequiredSwarDetails.length;++i) {
		for( var j = 0; j<RequiredSwarDetails.length - 1;++j) {
			if(RequiredSwarDetails["swar"+(j + 1)].delayTime < RequiredSwarDetails["swar"+j].delayTime) {
				var temp = {};
				temp  = RequiredSwarDetails["swar"+j]; 
				RequiredSwarDetails["swar"+j] = RequiredSwarDetails["swar"+(j+1)];
				RequiredSwarDetails["swar"+(j+1)] = temp;
			}
		}
	}
	return RequiredSwarDetails;
}

function comparator(a,b) {
	return a >= b ? true : false;
}

///This function will accept the input div collection & give back the necessary details back.
function getRequiredSwarDetails(inputDivCollection) {
	/// This object will contain all the required details that are deduced from the UI
	/// and add them to differenct properties.
	/*
		1. First the Name property.
		2. time in milliseconds.
		3. delaytime for each note deduced from the UI.
	*/
	var requiredSwarDetails = {};

	var time = document.getElementsByClassName('time');
	//console.info(time[0].getBoundingClientRect().width);
	
	//// Get the details for the one input box.
	var swarDescDiv = getSwarDivDetails(inputDivCollection[0]);

	var widthOfSingleRuler = time[0].getBoundingClientRect().width; 

	for(var i = 0; i < inputDivCollection.length; i++ ) {
		
		requiredSwarDetails["swar"+i] = {};
		var currentInputSwar = inputDivCollection[i].getBoundingClientRect();
		
		// Getting the name of the Swar.
		requiredSwarDetails["swar"+i].name = inputDivCollection[i].textContent;
		
		//// How long the swar will be played.
		requiredSwarDetails["swar"+i].timeOfPlay = Number((currentInputSwar.width / widthOfSingleRuler * 1000).toFixed(2)); 
		
		///// The delay of each swar.
		requiredSwarDetails["swar"+i].delayTime = Number(((currentInputSwar.left - (swarDescDiv.right + 1)) / widthOfSingleRuler * 1000).toFixed(2)); 
	}

	requiredSwarDetails.length = inputDivCollection.length;

	return requiredSwarDetails;
}


///////////// SAVE.JS METHODS /////////////////
function retrieveTimeRulerFromUI(timeRuler) {
	var timeRulerObj = {};
	var children = timeRuler.children;

	timeRulerObj.children = {};
	
	timeRulerObj.children.total = children.length;
	timeRulerObj.children.width = children[0].style.width;
	timeRulerObj.children.className = children[0].className;
	
	///timeRulerAllDetails have been defined here.
	var timeRulerAllDetails = window.getComputedStyle(timeRuler);
	
	timeRulerObj.left = timeRulerAllDetails.left;
	timeRulerObj.minWidth = timeRulerAllDetails.minWidth;
	timeRulerObj.width = timeRulerAllDetails.width;
	timeRulerObj.height = timeRulerAllDetails.height;
	timeRulerObj.className = timeRuler.className;
	return timeRulerObj;
}


// This function will get the retrieve the input Swars details from the UI
// Make a notation object and return back that object which will contain all the details of the width 
// of each input swar , and its children.
function retrieveSwarsFromUI(inputDivCollection) {
	var notation = {};
	var leftSwarDiv;
	//inputDivCollection
	for( var i = 0 ; i < inputDivCollection.length; ++i) {
		notation["inputDiv"+(i+1)] = {};
		notation["inputDiv"+(i+1)].name = inputDivCollection[i].previousElementSibling.textContent;
		
		leftSwarDiv = inputDivCollection[i].previousElementSibling.getBoundingClientRect().right;

		notation["inputDiv"+(i+1)].width = inputDivCollection[i].clientWidth+"px";
		

		notation["inputDiv"+(i+1)].children = {};
		notation["inputDiv"+(i+1)].children.total = inputDivCollection[i].children.length;

		for( var j = 0; j < inputDivCollection[i].children.length;++j) {
			var currentChild = inputDivCollection[i].children[j].getBoundingClientRect();
				
			notation["inputDiv"+(i+1)].children["child"+(j+1)] = {};
			notation["inputDiv"+(i+1)].children["child"+(j+1)].left = (currentChild.left - leftSwarDiv - 1) + 'px';
			notation["inputDiv"+(i+1)].children["child"+(j+1)].width = currentChild.width  + 'px';
			notation["inputDiv"+(i+1)].children["child"+(j+1)].height = (currentChild.height - 2) + 'px';
			notation["inputDiv"+(i+1)].children["child"+(j+1)].name = inputDivCollection[i].children[j].textContent;
			console.log(notation["inputDiv"+(i+1)].children["child"+(j+1)].name);
			

			notation["inputDiv"+(i+1)].children["child"+(j+1)].className = inputDivCollection[i].children[j].className;	 			
		} 
				
	}
	notation.total = inputDivCollection.length;
	return notation;
}


///////////////// LOAD JS METHODS //////////////////////////////

function createTimeRuler(timeRulerObj) {
	var timeDivsFrag = document.createDocumentFragment();
	var children = timeRulerObj.children;
	var timeRuler = document.createElement('div');
	timeRuler.setAttribute('id', 'timeRuler');
	for( var i = 0; i < children.total; ++i ) {
		var timeDiv = document.createElement('div');
		timeDiv.className = children.className;
		timeDiv.style.width = children.width;
		console.log(timeDiv.style.width);
		timeDiv.textContent = i + 1;
		timeRuler.appendChild(timeDiv);
		//console.info(timeRuler);
	}

	//console.log(timeDivsFrag);

	/// Parent Div.
	timeRuler.className = timeRulerObj.className;
	timeRuler.style.width = timeRulerObj.width;
	timeRuler.style.height = timeRulerObj.height;
	timeRuler.style.minWidth = timeRulerObj.minWidth;
    timeRuler.addEventListener('mousemove',timeRulerMouseDownHandler,false);
	//timeRuler.appendChild(timeDivsFrag);
	return timeRuler;
}

/// This function will take inputDiv & return back the notation ready to be appended into the 
/// the body.
function createMusicNotation(musicNotObj) {
	// Main div which is for the complete notation.
	var notation = document.createElement('div');
	notation.setAttribute('id', 'notation');
	var swarContainer = document.createElement('div');
	swarContainer.className = "all";

	for(var i = 0; i < musicNotObj.total; ++i) {
		var container = document.createElement('div');
		var swarsDesc = document.createElement('div');
		var swarsInput = document.createElement('div');
		var clear = document.createElement('div');
		
		container.className = "container";
		/// 1. Giving the proper swar/note to the swarsDescriptionDiv
		/// give proper className to it.
		swarsDesc.textContent = musicNotObj["inputDiv"+(i+1)].name;
		swarsDesc.className = 'swars';

		/// 2. Main part is to give the proper class to the swars input
		swarsInput.className = 'input swars';
		swarsInput.style.width = musicNotObj["inputDiv"+(i+1)].width;

		for( var j = 0 ; j < musicNotObj["inputDiv"+(i+1)].children.total; ++j) {
			var droppedItemDiv = document.createElement('div');
			/// Name of the swar.
			var data = musicNotObj["inputDiv"+(i+1)].children["child"+(j+1)].name;
			//console.log(data);
			var textContent = document.createTextNode(data);

			droppedItemDiv.className = musicNotObj["inputDiv"+(i+1)].
            children["child"+(j+1)].className;
			droppedItemDiv.style.left	= 
                musicNotObj["inputDiv"+(i+1)].children["child"+(j+1)].left;
			droppedItemDiv.style.width = 
                musicNotObj["inputDiv"+(i+1)].children["child"+(j+1)].width; 
			droppedItemDiv.style.height = 
                musicNotObj["inputDiv"+(i+1)].children["child"+(j+1)].height; 
			droppedItemDiv.appendChild(textContent);

			var droppedDivWithOctaves = attachOctaveHandler(droppedItemDiv);
			

			swarsInput.appendChild(droppedDivWithOctaves);
		}

		///3. Give the clear class to the last final div of the octave.
		clear.className = 'clear';
		
		///4. Finaly append all the div's inside the container class
		container.appendChild(swarsDesc);
		container.appendChild(swarsInput);
		container.appendChild(clear);

		swarContainer.appendChild(container);
	}

	notation.appendChild(swarContainer);
	return notation;
}




