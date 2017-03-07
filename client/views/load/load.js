Template.load.events({
	
});

Template.load.onCreated(function(){
    /*var self = this;
    self.autorun(function(){
        self.subscribe('music');
    });*/
});

Template.load.helpers({
	'Music' : function() {
        return Music.find({});   
    },
    'classicalMusic' : function() {
    	return ClassicalMusic.find({});
    }
})