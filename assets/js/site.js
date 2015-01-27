(function($) {
$(window).resize(function() {
	$('#main-content').css('min-height', $(window).height() - $('header:visible').height());
});
$(window).scroll(function() {
	if ($(window).scrollTop() > 200){
		$('body').addClass('float-header');
	} else {
		$('body').removeClass('float-header');
	}

	$('#delivery-wrap .close').click();
});

$(document).ready(function() {
	$('li[class^="nav-"] a, a[class^="nav-"]').each(function() {
		if(cur_page_url == $(this).attr('href')) {
			$(this).addClass('active');
			if($(this).parent().is('li')) {
				$(this).parent().addClass('active');
			}
		}
	});

	$('.delivery-button').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('#delivery-wrap').toggleClass('active');
		return false;
	});
	$('#delivery-wrap .close').click(function(e) {
		e.preventDefault();
		$('.delivery-button').removeClass('active');
		$('#delivery-wrap').removeClass('active');
		return false;
	});
	$('a.nav-email-signup').fancybox({
		padding: 0,
		autoWidth: true,
		content: $('#signup-wrap')
	});
	$('#nav-button').sidr({
		name: 'sidr-right',
		side: 'right',
		source: '#mobile-nav-wrap',
		renaming: false
	});
	$('#signup-form').submit(function(e) {
		e.preventDefault();
		if(!$(this).is(':invalid')) {
			$.ajax({
			  type: "POST",
			  crossDomain: true,
			  dataType: "script",
			  url: $('#signup-form').attr('action'),
			  data: $('#signup-form').serialize(),
			  success: function(jqXHR, textStatus) {
				$('#signup-form .thankyou').show();
				setTimeout(function() {$.fancybox.close( true ); }, 1000);
				$('#signup-form p').hide();
			  }
			});
		}
		return false;
	});
	$('#order-form').submit(function(e) {
		if(!$(this).is(':invalid')) {
			e.preventDefault();
			$.ajax({
			  type: "POST",
			  url: $('#order-form').attr('action'),
			  data: $('#order-form').serialize(),
			  success: function(jqXHR, textStatus) {
				$('#order-form').next('.thank-you').show();
			  }
			});
			return false;
		}
	});

	$(window).resize();
});


})(jQuery);