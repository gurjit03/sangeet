
// In your server code: define a method that the client can call

/// Customing the email Templates 

Accounts.emailTemplates.siteName = "Ishwerdas";
Accounts.emailTemplates.from     = "Ishwerdas <admin@ishwerdas.com>";

Accounts.emailTemplates.verifyEmail = {
  subject : function() {
    return "[Ishwerdas] Verify Your Email Address";
  },
  text : function( user, url ) {
    var emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@ishwerdas.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};


Meteor.methods({
  sendEmail: function (from, subject, text) {    
      check([from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({                                                               
      to : 'gurjitmehta@gmail.com',
      from : from,
      replyTo : from || undefined,     
      subject: "Sangeet "+subject,
      text: text
    });
      
  }
});
