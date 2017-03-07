Template.chat.helpers({
  messages : function() {
    return Messages.find({},{sort : {timestamp : -1}});
  }
});

Template.chat.helpers({
  calling : function(arg) {
    console.log("callinggggggggggg "+arg);
  }
})

Template.chat.events({
  'submit .chat' : function(e,tmpl) {
    e.preventDefault();
    
    var form = tmpl.find('.chat');
    
    var text = form.chat_area.value;

    var chatRoomId = Router.current().params.id;
    if(!text) {
      alert("Please put some message first !");
    }else {
    
    var data = {
      text : text,
      chatRoomId : chatRoomId
    };

    Meteor.call('sendMessage',data, function(err,result) {
      if(err) {
        console.log(err.reason);
        form.message.value = text;
      }else {
        form.reset();  
        console.log(result);
      }
    });
    console.log("addddded message "+text);
    
    }
    toastr.success("Chat room created.");
  }
});
