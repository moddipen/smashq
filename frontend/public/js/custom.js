var mobileHover = function() {
	$('*').on('touchstart', function() {
		$(this).trigger('hover')
	}).on('touchend', function() {
		$(this).trigger('hover')
	})
};
mobileHover();

/******** Login/SignUp Tab ********/
if ($(".login-tabs-nav").length) {
	$('.login-tabs-nav a').on('click', function (event) {
		event.preventDefault();

		$('.tab-active').removeClass('tab-active');
		$(this).parent().addClass('tab-active');
		$('.login-tabs-content .login-tab-box').hide();
		$($(this).attr('href')).show();
	});
	$('.login-tabs-nav a:first').trigger('click');
};

/******** User Profile Tab ********/
if ($(".profile-post-list").length) {
	$('.profile-post-list a').on('click', function (event) {
		event.preventDefault();

		$('.tab-active').removeClass('tab-active');
		$(this).parent().addClass('tab-active');
		$('.profile-post-content-box').hide();
		$($(this).attr('href')).show();
	});
	$('.profile-post-list a:first').trigger('click');
};

/******** User Profile Edit List ********/
if ($(".mob-menu-list").length) {
	$('.mob-menu-list a').on('click', function (event) {
		event.preventDefault();
		$(this).parents('.edit-option-list').toggleClass('active');
		$(this).parents('.edit-option-list').find('ul').slideToggle();
	});		
}

/******** Header Profile Dropdown ********/
if ($(".head-profile-box").length) {
	$(".head-profile-box > a").click(function(){
		event.preventDefault();
	  	$(".head-profile-box-dropdown").slideToggle();
	  	$(".head-profile-box-dropdown").toggleClass('active');
	});
	$(".head-profile-box-dropdown ul li a").click(function(){
	  	$(".head-profile-box-dropdown").hide();
	});
}

/******** Header Profile Dropdown ********/
if ($(".profile-post-popup-likes-box .likes-icon").length) {
	$(document).on('click','.profile-post-popup-likes-box .likes-icon i',function(){
	  	$(this).parent('.likes-icon').toggleClass('liked');
	});
}

/******** Header Profile Dropdown ********/
if ($(".inline-popup").length) {
	$('.inline-popup').magnificPopup({
	  type: 'inline',
	  removalDelay: 100,
    closeOnBgClick: false,
	  callbacks: {
	    beforeOpen: function () {
        this.st.mainClass = this.st.el.attr('data-effect');
      },
      beforeOpen: function() {
        $('body').addClass('mfp-active');
      },
      beforeClose: function() {
        $('body').removeClass('mfp-active');
      }
	  },
	   midClick: true
	});
}


/******** Header Profile Dropdown ********/
if ($(".profile-post-popup-slider").length) {
	$('.profile-post-popup-slider').slick({
		autoplay: false,
		swipe: false,
		infinite: false,
		arrows: true,
		fade: false,
		dots: false,
		prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
		nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
	});
	$('.profile-post-popup-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {

		if (nextSlide == slick.slideCount - 1) {
			$('.slick-next').hide();
			$('.slick-prev').show();
		} else if (nextSlide != slick.slideCount - 1 && nextSlide != 0) {
			$('.slick-next').show();
			$('.slick-prev').show();
		} else if (currentSlide == 0 || nextSlide == 0) {
			$('.slick-next').show();
			$('.slick-prev').hide();
		}

	});

	$('.profile-post-item .inline-popup').click(function () {
		setTimeout(function () {
			$('.profile-post-popup-slider').slick('refresh');
		});
	})

}

/******** Likes popup ********/
if ($(".likes-popup").length) {
	$('.likes-popup').on('click', function (event) {
		event.preventDefault();
		$(this).parents('.likes-people').next('.likes-popup-bg').show();
	});
	$('.likes-popup-content .close').on('click', function (event) {
		event.preventDefault();
		$(this).parents('.likes-popup-bg').hide();
	});
}