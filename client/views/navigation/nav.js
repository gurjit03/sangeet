/*var translated = false;
Template.nav.events({
	'click .gn-icon-menu ' : function(event,tmpl) {
		
		var mainMenu = tmpl.find('.mainMenu');
		var navIcon = tmpl.find('.nav_icon');
		console.log(navIcon.children[0]);
		if(!translated){
			mainMenu.style.transform = 'translateX(0)';
			navIcon.children[0].setAttribute('width','55px');
			navIcon.children[0].setAttribute('height','55px');
			
			setTimeout(function(src) {
				navIcon.children[0].setAttribute('src', 'cancel.png');	
			}, 450);

			translated = true;
		} else {
			
			setTimeout(function(src) {
				navIcon.children[0].setAttribute('src', 'menu.png');	
			}, 100);
			mainMenu.style.transform = 'translateX(-1000px)';
			translated = false;
		}
		console.log(getComputedStyle(mainMenu));
		mainMenu.transform = 'translateX(0)';
		console.log();
	} 
})*/