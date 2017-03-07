Template.contact_us.events({
   'click .submit_mail' : function(tmpl,e){
       //e.preventDefault();
       var email_id = $(document).find('.email_id').val();
       var subject = $(document).find('.email_subject').val();
       var message = $(document).find('.message').val();
       //var email = tmpl.find('.email_id').val();
       Meteor.call('sendEmail',email_id, subject, message , function(error,result ) {
			toastr.options.positionClass = "toast-top-right";
			if(error) {
				toastr.error(error.reason);
			} else {
				toastr.success("Your mail has been send succesfully..!");
       			$(document).find('.email_subject').val('');
       			$(document).find('.message').val('');
			}
		});
   }
});