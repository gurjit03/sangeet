

///// NOTE :- IN ORDER TO PLAY SOUNDS , YOU HAVE TO PROVIDE THE SOUNDS ALONG 
////// WITH sound.js file
var sounds , assetPath = "./audioPath/";


    sounds = [
/// Lower Octave ----- C2 Octave ///    
     {src:"-Sa.ogg", id:"-Sa"},
     {src:"-re.ogg", id:"-re"},
     {src:"-Re.ogg", id:"-Re"},
     {src:"-ga.ogg", id:"-ga"},
     {src:"-Ga.ogg", id:"-Ga"},
     {src:"-ma.ogg", id:"-ma"},
     {src:"-Ma.ogg", id:"-Ma"},
     {src:"-Pa.ogg", id:"-Pa"},
     {src:"-dha.ogg", id:"-dha"},
     {src:"-Dha.ogg", id:"-Dha"},
     {src:"-ni.ogg", id:"-ni"},
     {src:"-Ni.ogg", id:"-Ni"},   

/// Middle Octave ---- C3 Octave ///     
     {src:"Sa.ogg", id:"Sa"},
     {src:"re.ogg", id:"re"},
     {src:"Re.ogg", id:"Re"},
     {src:"ga.ogg", id:"ga"},
     {src:"Ga.ogg", id:"Ga"},
     {src:"ma.ogg", id:"ma"},
     {src:"Ma.ogg", id:"Ma"},
     {src:"Pa.ogg", id:"Pa"},
     {src:"dha.ogg", id:"dha"},
     {src:"Dha.ogg", id:"Dha"},
     {src:"ni.ogg", id:"ni"},
     {src:"Ni.ogg", id:"Ni"},

//// Upper Octave ------- C4 Octave ///     
     {src:"Sa-.ogg", id:"Sa-"},
     {src:"re-.ogg", id:"re-"},
     {src:"Re-.ogg", id:"Re-"},
     {src:"ga-.ogg", id:"ga-"},
     {src:"Ga-.ogg", id:"Ga-"},
     {src:"ma-.ogg", id:"ma-"},
     {src:"Ma-.ogg", id:"Ma-"},
     {src:"Pa-.ogg", id:"Pa-"},
     {src:"dha-.ogg", id:"dha-"},
     {src:"Dha-.ogg", id:"Dha-"},
     {src:"ni-.ogg", id:"ni-"},
     {src:"Ni-.ogg", id:"Ni-"},

	];
	createjs.Sound.registerSounds(sounds,assetPath);
 
///// This function will detect the octave and give the sign 
//// accordingly & remove those symbols from the original swar , it takes two parameters
function assignSymbolToOctave(swar,selectedLanguage) {
    
    if(selectedLanguage === 'gurmukhi') {
        if(swar.match(/^\./)) {
            return [swar.replace(/\./,"-"),"l"];
        } else if(swar.match(/([a-zA-Z\']+[N\.])$/g)) {
            return [swar.replace(/N/,"-"),"h"];
        } else {
            return [swar,"m"];
        }
    } else if(selectedLanguage === 'english' ) {
        if(swar.match(/^\./)) {
            return [swar.replace(/\./,"-"),"l"];            
        } else if(swar.match(/\.$/)) {
            return [swar.replace(/\.$/,"-"),"h"];
        } else {
            return [swar,"m"];
        }
    } else {
        return [swar,"m"];
    }
}

/// THis function checks the Octave and return back the number
/// for that corresponding octave.
function checkOctaveEng(swar) {
    if(swar.match(/^\-/)){
        return 1;
    } else if(swar.match(/\-$/)) {
        return 3;
    } else {
        return 2;
    }
} 
function checkOctave(swar) {
    return checkOctaveEng(swar);
}

/// This object below will give the octave , its proper symbol (for english)
//function giveOctaveSymbol


function getSamples(url) {
    var obj;
    var AJAX_req = new XMLHttpRequest();
    AJAX_req.open( "GET", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/json");
 
    AJAX_req.onreadystatechange = function()
    {
        if( AJAX_req.readyState == 4 && AJAX_req.status == 200 )
        {
           obj = JSON.parse(AJAX_req.response);
           //return object; 
        }
    }
   AJAX_req.send();
   return obj;
}
//getSamples('../prj2/samples/khuda_jaane.json');

/// This function will work similarly to the playNotation function and will accept
/// the complete music object as it's parameter and
function createAndPlayMusic(object) {
    
    var notation = object.notation;
    var selectedLanguage = object.language || "english";
    var tempo = object.tempo;
    var taal = object.taal;
    var name = object.name;
    //Then call the playNotation function with these paramaters;
    playNotation(notation,selectedLanguage,tempo,taal);
}

/// This function will detect the delaytime given along with the function.
function detectDelaytime(swar) {
    var nums = swar.match(/\d+/g);
    var originalSwar = swar.match(/\.?[a-zA-Z]+[N\.]?/g);
    console.log(swar , originalSwar);
    if(nums) {
        var delaytime = nums[0] + (nums[1] ? '.'+nums[1] : '') ;
        var originalSwar = originalSwar.join('');
        return [originalSwar,Number(delaytime)];
    }else {
        return [swar];
    }
}

///This function will remove the extended time given along the swar/note.
function removeDelayTime(swar) {
    return swar.match(/\d+[\.\d+]?/g) ? swar.replace(/\d+[\.\d+]?/g,"") : swar;
}            
        
function playNotation(notationArray,selectedLanguage,tempoGiven,taal) {
    
    /// tempo will be in bpm,
    /// Taal will define what the tabla taal will be used along with the song or shabad
    var tempo,taal,i = 0,delayTime = 0;

    tempo = tempoGiven || 60;
    tempo = Number((1000/Number((tempo / 60).toFixed(2))).toFixed(2))
    console.log(tempo);
    stoptime = tempo + 250;
    console.log(stoptime);
    if(selectedLanguage == 'gurmukhi') {
        for( i = 0; i < notationArray.length; i++) {
            ///storing the original note
            var originalNotation = notationArray[i];

            ///Now in this step first of all we will remove the extend time
            //if any 
            var noteWithoutDelay = removeDelayTime(originalNotation);
            
            /// Here basically we are giving back the array of 2
            /// where the first part tells about the swar/Note and /// 2nd about its octave.
            var assignedOctave = assignSymbolToOctave(noteWithoutDelay,selectedLanguage);
           
           //This will return back the middle octave swar/Note !
            var removedOctaveSymbolSwar = removeOctaveSymbol(assignedOctave[0]);  
            console.log(removedOctaveSymbolSwar);
            
            /// This will select the appropriate Swar/Note
            var swar = selectSwar(removedOctaveSymbolSwar,selectedLanguage);

            /// whether some delay is needed or not
            var noteArray = detectDelaytime(originalNotation);
            console.log(noteArray);
            
            ////playing the swar with proper octave attached to it    
             if(noteArray.length === 2) {
                var delayAdd = tempo * noteArray[1] - tempo;
                //console.log(delayAdd," --- ",delayTime);
                console.log('if state - '+assignedOctave[0],delayTime);
                
                playSwar(attachOctaveSymbol(swar,assignedOctave[1]),delayTime,stoptime + delayAdd);    
                delayTime += delayAdd + tempo;
                //console.log('next delay - '+delayTime);
            } else {
            ////playing the swar with attaching the octave back to it   
                playSwar(attachOctaveSymbol(swar,assignedOctave[1]),delayTime,stoptime);
                delayTime += tempo;
            }
        }    
    } else if(selectedLanguage == 'english') {
        
        for(i = 0; i < notationArray.length; i++) {
            
            /// Here basically we are giving back the array of 2
            /// where the first part tells about the swar and /// 2nd about its octave.
            var originalNotation = notationArray[i];

            ///Symbol is assigned without any delaytime in between if any
            var assignedOctave = assignSymbolToOctave(removeDelayTime(originalNotation),selectedLanguage);
            
            console.log(assignedOctave + " assigned Octave");
            // this is the part that is returned by the 
            var noteArray = detectDelaytime(originalNotation);
            
           if(noteArray.length === 2) {
                var delayAdd = tempo * noteArray[1] - tempo;
                playSwar(assignedOctave[0],delayTime,stoptime + delayAdd);    
                delayTime += delayAdd + tempo;
               console.log('next delay - '+delayTime);
            } else {

            ////playing the swar without attaching the octave back to it
            /// No concept of Octaves is needed here , as the code is designed using 
            /// This notation.   
                playSwar(assignedOctave[0],delayTime,stoptime);
                console.log(assignedOctave[0],delayTime);
                delayTime += tempo;
            }
        }                
    }   
}

/// These functions will basically add or remove the octave symbol being used .

function attachOctaveSymbol(swar,assignedOctave) {
    if(assignedOctave === 'l' || assignedOctave === 1 ) {
        return "-"+swar;
    } else if(assignedOctave === 'h' || assignedOctave === 3) {
        return swar+"-";
    } else {
        return swar;
    }
}

function removeOctaveSymbol(detectedOctave) {
    return detectedOctave.replace("-","");
}

function playSwar(swarToPlay,startdelay,stoptime,repeatTime) {
	var ppc = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY ,delay : startdelay,loop: 0, volume: 0.5});
//	noteTime = new Date().getTime();
// console.log(noteTime - currentTime);

    var instance = createjs.Sound.play(swarToPlay,ppc);
    stoptime = startdelay + stoptime;
    stopSwar(instance,stoptime);
}

//This function will basically stops the magically playing swaaras.

function stopSwar(inst, delay) {
	window.setTimeout(function() {
		inst.stop();	
	},delay);
}
		
/// This function will basically reduce the indexed character out of the string.
function replaceAt(str,index) {
    var origStr = str;
    return str.substr(0,index) + origStr.substr(index+1,origStr.length);
}


//This function will return back the selected Swar     
function selectSwar(input,selectedOption) {
	var inputProcessed = input.replace(/[\d+]\.?[\d+]/g,"");
    switch(selectedOption) {
        case 'gurmukhi' :  return genFreqSwarGurmukhi(inputProcessed);
        break;
            
        case 'devnagri' : return selectSwarDevnagri(inputProcessed);
        break;
            
        case 'english' : return selectSwarEnglish(inputProcessed);
        break;
        
        default : return false;
    }
}
    
function genFreqSwarGurmukhi(input) {
    switch(input) {
        case 's' : return 'Sa';
        break;
            
        case 'r' : return 'Re';
        break;

        case 'ru' : return 're';
        break;

        case 'gu' : return 'ga';
        break;
             
        case 'g' : return 'Ga';
        break;
            
        case 'm' : return 'ma';
        break;

        case 'm\'' : return 'Ma';
        break;
        
        case 'p' : return 'Pa';
        break;

        case 'Du' : return 'dha';
        break;
        
        case 'D' : return 'Dha';
        break;
            
        case 'n' : return 'Ni';
        break;
        
        case 'nu' : return 'ni';
        break;

        case 'sN' : return 'Sa-';
        break;    
    }
}

                            
