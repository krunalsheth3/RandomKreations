$(document).ready(function (){	
	//test js
	var contentWindow = window.location.hash;
	if(contentWindow)
		rkNameSpace.changeContent(contentWindow);
	else{
		window.location.hash = "#home";
		rkNameSpace.changeContent("#home");
	}
		
	var prevHash = window.location.hash;
	 window.onhashchange = function () {
		 if(prevHash != window.location.hash){
			 prevHash = window.location.hash;
			 rkNameSpace.changeContent(prevHash);
		 }
	
    }
	 
	 // $(".homepage").hover( 
	 // 			function() { $("#hideGifImage").fadeIn(1000); 
	 // 	}); 
	
});	


/*
 * When the user clicks the toTop button, we want the page to scroll
 */ 
$("#toTop").click(function(event) {
	event.preventDefault();
	utilRandomKreations.scrollTop();
});

/*
 * When the user clicks the toBottom button, we want the page to scroll
 */ 
$("#toBottom").click(function(event) {
	event.preventDefault();
	// Animate the scrolling motion.
	utilRandomKreations.scrollBottom();
});


/*
 * Random Kreations NameSpace
 */
var rkNameSpace = {
		changeContent : function(prevHash){
			 switch(prevHash) {
				
			 case "#home":
				 $("#mainContent").load("main.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#home"]').parent().addClass("active");
				 $(document).prop('title', 'Random Kreations');
				 break;
			
			 case "#artworks":
				 $("#mainContent").load("paintings.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#artworks"]').parent().addClass("active");
				 break;
			 
			 case "#paintings":
				 $("#mainContent").load("paintings.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#artworks"]').parent().addClass("active");
				 $(this).collapse('hide');
				 $(document).prop('title', 'Random Kreations Paintings');
				 break;

			 case "#clocks":
				 $("#mainContent").load("clocks.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#artworks"]').parent().addClass("active");
				 $(document).prop('title', 'Random Kreations Clocks');
				 break;

			 case "#cards":
				 $("#mainContent").load("cards.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#artworks"]').parent().addClass("active");
				 $(document).prop('title', 'Random Kreations Cards');
				 break;
				 
			 case "#earrings":
				 $("#mainContent").load("earrings.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#earrings"]').parent().addClass("active");
				 $(document).prop('title', 'Random Kreations Earrings');
				 break;

			 case "#miscellanous":
				 $("#mainContent").load("miscellanous.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#artworks"]').parent().addClass("active");
				 break;
			
			 case "#exhibitions":
				 $("#mainContent").load("exhibitions.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#exhibitions"]').parent().addClass("active");
				 $(document).prop('title', 'Random Kreations Exhibitions');
				 break;
				 
			 case "#contactUs":
				 $("#mainContent").load("contactUs.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#contactUs"]').parent().addClass("active");
				 $(document).prop('title', 'Random Kreations Contactus');
				 break;	
				 
			 case "#aboutUs":
				 $("#mainContent").load("aboutUs.html");
				 $("#mainNavigation li").removeClass("active");
				 $('a[href="#aboutUs"]').parent().addClass("active");
				 $(document).prop('title', 'Random Kreations Aboutus');
				 break;
			
			 case "#facebook":
			 case "#twitter":
			 case "#googlePlus": 
				 $("#mainContent").load("404.html");
				 $("#mainNavigation li").removeClass("active");
				 break;
				 
			   default:
				   window.location.hash = "";
			   	
			 }
			 utilRandomKreations.scrollTop();
		}
};


//$( window ).resize(function() {
//	var windowMinWidth = 420;
//	if($( window ).width() < windowMinWidth){
//		console.log("in short");
//		$(".navbar-brand").html(function() {
//			return  '<img src="images/logo/rkShortLogo.jpg" class="rkLogo">'
//		});
//	}
//});
	

/*
 * This will toggle the navbars in mobile device to close if they are open
 */
$(document).on('click','.navbar-collapse.in',function(e) {
	 if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
        
    }
});





////jQuery to collapse the navbar on scroll
//$(window).scroll(function() {
//    if ($(".navbar").offset().top > 50) {
//        $(".navbar-fixed-top").addClass("top-nav-collapse");
//    } else {
//        $(".navbar-fixed-top").removeClass("top-nav-collapse");
//    }
//});















