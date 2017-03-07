		var taal , notation , composition , margin;

		function widthSingleCol(totalCol) {
			/// Get the width of the computed notation div/
			notation = document.getElementById('notation');
			composition = document.getElementById('composition');
			
			var not_proc = getComputedStyle(notation);

			///Get the width in the number.
			var width = Number(not_proc.width.replace("px",''));
			
			//Getting the width of single div/col.
			var divWS = (width - (width * 0.05))/ totalCol;
			
			//var divWS = (width - totalMargin ) / totalCol;
			
			margin = 0.1 * divWS;
			console.log(margin , divWS);
			divWS = divWS - (margin * 2);

			console.log(divWS , "width of single div");
			return divWS;
		}

		// This function basically return the total Columns and width of a single div.
		function returnTotalColsAndDivWS(selectedTaal) {
			var totalCol,divWS;
			
			//console.log(Number(width));
			taal = selectedTaal;
			console.log(taal);
		
			totalCol = returnColNumber(taal);
			console.log(totalCol)
			///Width of a single div/	
			divWS = widthSingleCol(totalCol);
			console.log(divWS);

			return {
				taal : taal,
				totalCol : totalCol,
				divWS : divWS
			}
		}

		function createNotation(selectedTaal , RowBtn , rows) {				
			var docFrag,data;
			
			data = returnTotalColsAndDivWS(selectedTaal);
			
			console.info(data , " ------ data obj");

			///Here we will get the document fragment of the data.
			docFrag = makeCompositionStructure(data.divWS , data.totalCol, RowBtn, rows);
			console.log(docFrag);

			///Finally after getting the data append it to the document.
			//docFrag.appendChild(button);	
			composition.appendChild(docFrag);

			if(RowBtn) {
				var addRowBtn = document.getElementsByClassName('add_row');
				console.log(addRowBtn);
			
				addRowBtn[0].addEventListener('click',add_row ,false);
			
				var playSongBtn = document.getElementsByClassName('play_song');	
				console.log(playSongBtn);
			
				playSongBtn[0].addEventListener('click',playNot,false);
		
			}

		}

		///This function will be used to create fixed notation //////


		function add_row() {
			var totalCol = returnColNumber(taal);
			var divWS = widthSingleCol(totalCol);
			var docFrag = document.createDocumentFragment();
			var comFirstChild = composition.children[0]; //Refer to the child nodes of composition.
			
			console.log(this);

			for(var i = 0 ; i < totalCol ; i++) {
				var col = document.createElement('div');
				var input = document.createElement('input');
				
				col = giveColumnStyle(col , divWS , margin , 'col');
				input = giveInputElementStyle(input , divWS, 'input_swar')
				col.appendChild(input);
				docFrag.appendChild(col);
				// comChild[i].children[0].parentNode.appendChild(input);
			}
			comFirstChild.parentNode.insertBefore(docFrag, this);	
		}

		function giveColumnStyle(col , divWS , margin , className) {
			col.style.width = divWS+'px';
			col.style.margin = '1%';
			col.style.marginLeft = margin+'px';
			col.style.marginRight = margin+'px';
			col.className = className;
			return col;		
		}

		function giveInputElementStyle(input , divWS, className) {
			input.setAttribute('type', 'text');
			input.className = className;
			input.style.width = divWS + 'px';
			return input;
		}

		/// This will return a composition structure by returning a document fragment.
		function makeCompositionStructure(divWS, totalCol, addRowBtn , rows) {
			var attachCounting = true;

			var docFrag = document.createDocumentFragment();
			// Button in the composition
			if(addRowBtn) {
				var button = document.createElement('input');
				button.setAttribute('type', 'button');
				button.setAttribute('value', 'add row');
				button.className = 'add_row niceButton';
			

				var playBtn = document.createElement('input');

				playBtn.setAttribute('type', 'button');
				playBtn.setAttribute('value', 'Play');
				playBtn.className = 'play_song playBtn shiftRight';
			}
				
			
		
			/// No of rows to build		
			var rows = rows;
			var totalColsIntoRows = totalCol * (rows || 1);

			for(var i = 0 ; i < totalColsIntoRows; ++i) {
				var col = document.createElement('div');
				
				var input = document.createElement('input');
				
				col = giveColumnStyle(col , divWS , margin , 'col');
				
				input = giveInputElementStyle(input , divWS, 'input_swar');
				
				if( i < totalCol ) {
					var num = document.createElement('div');
					num.className = 'num'
					num.innerHTML = i+1;
					num.style.width = divWS;	
					col.appendChild(num);
				}	
				
				col.appendChild(input);
				docFrag.appendChild(col);
			}

			if(addRowBtn)	{
				docFrag.appendChild(button);
				docFrag.appendChild(playBtn);
			
			}
			
			return docFrag;
		}

		// This function here will play the Notation.
		function playNot() {
			
			var notationArray = returnNotation();
			var tempo = document.getElementsByClassName('tempo');

			console.log(notationArray);
			playNotation(notationArray,'english',Number(tempo[0].value));
			//window.notationA = notationArray;
			
		}

		function playNotationFromData(obj) {
			playNotation(obj.notation,obj.language,obj.tempo);
		}

		//// This function will basically return 
		function returnNotation() {
			var notationArray = [];
			var swars = document.getElementsByClassName('input_swar');

			for ( var i = 0; i < swars.length;i++) 
				notationArray.push(swars[i].value.trim());
			
			return notationArray;
		}

		// Returns the total Number of Columns according to the taal.
		function returnColNumber(taal) {
			switch(taal) {
				case 'tin' : return 16;
				break;
				case 'dadra' : return 6;
				break;
				case 'kehrwa' : return 8;
				break;
				case 'Ek' : return 12;
				break;
				case 'Jhap' : return 10;
				break;
 			}
		}

		//// Fill the columns with notation.
		function fillNotation(notation) {
			var columns = document.getElementsByClassName('input_swar');
			for(var i = 0 ; i < notation.length ; i++) {
				columns[i].value = notation[i];
			}
		}