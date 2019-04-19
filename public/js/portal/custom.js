(function($){
	"use strict";

  /*------ Testimonial 1 Script ----*/
	$('.testimonial-carousel').slick({
	  slidesToShow:2,
	  arrows: false,
	  autoplay:true,
	  responsive: [
		{
		  breakpoint: 768,
		  settings: {
			arrows: false,
			centerPadding: '0px',
			slidesToShow:2
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			arrows: false,
			centerPadding: '0px',
			slidesToShow: 1
		  }
		}
	  ]
	});

	/*--- Single Side Slide ---*/
	$('.single-side-slide').slick({
	  centerMode: true,
	  centerPadding: '0px',
	  slidesToShow:1,
	  responsive: [
		{
		  breakpoint: 768,
		  settings: {
			arrows:true,
			centerMode: true,
			centerPadding: '0px',
			slidesToShow:1
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			arrows:true,
			centerMode: true,
			centerPadding: '0px',
			slidesToShow: 1
		  }
		}
	  ]
	});

	/*---- List Slide ---*/
	$('.list-slider').slick({
	  centerMode: true,
	  autoplay: true,
	  arrows: false,
	  centerPadding: '0px',
	  slidesToShow: 3,
	  responsive: [
		{
		  breakpoint: 768,
		  settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '0px',
			slidesToShow: 2
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			arrows: false,
			centerMode: true,
			centerPadding: '0px',
			slidesToShow: 1
		  }
		}
	  ]
	});

	/*----- Fast Click Select ------*/
	  $('select').niceSelect();

})(jQuery);
