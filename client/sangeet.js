toastr.options = {
		  "closeButton": true,
		  "debug": true,
		  "newestOnTop": false,
		  "progressBar": true,
		  "positionClass": "toast-bottom-right",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "3000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
}
		
var script = document.createElement('link');
script.setAttribute('href', 'https://fonts.googleapis.com/css?family=Ubuntu' );
document.getElementsByTagName('head')[0].appendChild(script);

var script1 = document.createElement('link');
script1.setAttribute('rel', 'stylesheet');
script1.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' );
document.getElementsByTagName('head')[0].appendChild(script1);



Template.registerHelper('formatDate',function(timestamp){
    return new Date(timestamp).toLocaleString(); 
});

Template.registerHelper('getDay', function(timestamp){
	var a = new Date(timestamp*1000);
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	return days[a.getDay()];
});
