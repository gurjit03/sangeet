function loadHandler() {
	Session.set('loading',true);
}

Template.main.onCreated(function() {
	//window.addEventListener('load', loadHandler);
	Session.set('loading',true);	
});

Template.main.helpers({
	'complete' : function() {
		//Session.get('currentUser');
		// calling the raag-framework method.
		return Session.get('loading');
	} 
})