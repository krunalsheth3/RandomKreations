/**
 * 
 */

$(document).ready(function() {
	$("#contactUsSubmit").click(function() {
		var name = $("#name").val();
		var email = $("#email").val();
		var message = $("#message").val();
		var phone = $("#phone").val();
		
		var form = $("#main-contact-form");
		
		if(name !== "" && email != "" && message != ""){
		
		
			$.ajax({
				  type: "POST",
				  url: "../phpmailertesting/test1.php",
				  dataType: "json",
				  data: {
					name : name,
					email : email,
					message : message,
					phone : phone
				},
				beforeSend: function(){
					showSpinner(true);
				
				},
				success: function(data){
					showSpinner(false);
					$("#main-contact-form")[0].reset(); // To reset form fields on success.
				},
				error: function(data){
					$("#spinner").addClass("hidden");
					$("#emailFailure").removeClass("hidden");
					$("#contactUsSubmit").prop("disabled", false);
				}
			});
			

		} else {
			console.log("fill the form");
		}
												
	});
	
	/*
	* funciton to enable/disable and hide/show spinner
	*/
	function showSpinner(flag){
		if(flag) {
			$("#spinner").removeClass("hidden");
			$("#emailFailure").addClass("hidden");
			$("#contactUsSubmit").prop("disabled", true);
			 
		} else {
			$("#spinner").addClass("hidden");
			$("#emailFailure").addClass("hidden");
			$("#emailSuccess").removeClass("hidden");
			$("#contactUsSubmit").prop("disabled", false);
		}
	}
});



/*
*  Formatting User telephone number
*/
$("#phone").keyup(function(){
	var formattedNumber = utilRandomKreations.formatPhoneNum($("#phone").val());
	$("#phone").val(formattedNumber);
});