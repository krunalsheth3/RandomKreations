
/**************************************************************************************
****************************  Util functions for all javascripts  *********************
****************************  Uses revealing Module pattern       *********************
/*************************************************************************************/

// Creating a common namespace 
var utilRandomKreations; 

utilRandomKreations = (function(){	

	/*
	 * Format the way in which telephone number needs to be displayed
	 */
	function _formatPhoneNum(phone) {
		var numbers = phone.replace(/\D/g, '');
		if(numbers == ""){
			
		} else{						
		    char = {0:'(',3:') ',6:' - '};
		    phone = '';
		    for (var i = 0; i < 10; i++) {
		    	if(numbers[i] != null)
		    		if(! isNaN(numbers[i]))
		    			phone += (char[i]||'') + numbers[i];
		    }
		}
		
		return phone;
	}
	
	/*
	 * Scroll up for the next page to be visible from the top
	 */
	function _scrollTop(){
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500, 'swing');
	}
	
	/*
	 * Scroll bottom for the next page to be visible from the bottom
	 */
	function _scrollBottom(){
		$("html, body").animate({
			scrollTop : $('body').height()
		}, 800, 'swing');
	}
	
	/*
	 * returns the pointers to each of the above functions. The internal
	 * function makes a call to these helper functions by using the namespace
	 * eg: utilNameSpace.showErrorTag--> _showErrorTag The mapping provided
	 * below works like a Hashmap with Key and its value pair
	 */
	return{	
		formatPhoneNum: _formatPhoneNum,
		scrollTop: _scrollTop,
		scrollBottom: _scrollBottom
		
	};
}) ();