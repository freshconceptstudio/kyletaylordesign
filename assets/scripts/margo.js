(function($) {

	'use strict';

	var win = $(window);

	/** viewport dimensions */
	var ww = win.width();
	var wh = win.height();



	/** hero heights */
	$('.hero').css('height', wh * .7);



	/** nav */
	$('#menu li .submenu').hide();

	$('#menu li.has-submenu a').on('click', function() {

		var submenu = $(this).next('.submenu');

		if (submenu.is(':visible')) {
			submenu.slideUp();
		}

		if (submenu.is(':hidden')) {
			$('#menu li.has-submenu a').next('.submenu').slideUp();
			submenu.slideDown();
		}

		if ($(this).parent().find('ul').children().length == 0) return true;
		else return false;

	});

	$('#burger').on('click', function() {
		if (!$('#site-nav').hasClass('open')) {
			openNav();
		} else {
			closeNav();
		}
	});

	function openNav() {
		$('#site-nav, #main-overlay').addClass('nav-open');
	}

	function closeNav() {
		$('#site-nav, #main-overlay').removeClass('nav-open');
		$('#menu li.has-submenu a').next('.submenu').slideUp();
	}

	$('#nav-close, #main-overlay').on('click', function() {
		closeNav();
	});



	/** background images */
	$('.imageBG').each(function() {
		var image = $(this).data('img');

		$(this).css({
			backgroundImage: 'url(' + image + ')',
			backgroundSize: 'cover',
			backgroundPosition: 'center top'
		});
	});



	/** grid */
	function grid() {
		var container = $('.grid');

		for (var i = 0; i < container.length; i++) {
			var active_container = $(container[i]);
			var container_width = active_container.width();

			var items = active_container.find('.entry');

			var cols = parseInt(active_container.data('cols'), 10);
			var margin = parseInt(active_container.data('margin'), 10);
			var height = parseFloat(active_container.data('height'));
			var double_height = parseFloat(active_container.data('double-height'));

			if (!margin) margin = 0;
			if (!double_height) double_height = 2;

			// set margins to the container
			active_container.css('padding', Math.floor(margin / 2) + 'px');

			if (ww >= 1000) {
				if (!cols) cols = 3;
			} else if (ww >= 700) {
				if (cols !== 1) cols = 2;
			} else {
				cols = 1;
			}

			var items_width = Math.floor((container_width / cols) - margin);
			var items_height = Math.floor(items_width * height);
			var items_double_height = items_height * double_height;
			var items_margin = Math.floor(margin / 2);

			items.each(function() {
				$(this).css('width', items_width + 'px');
				$(this).css('height', items_height + 'px');
				$(this).css('margin', items_margin + 'px');

				if (!height) $(this).css('height', 'auto');
				if ($(this).hasClass('w2') && ww >= 700) $(this).css('width', (items_width * 2) + (items_margin * 2) + 'px');
				if ($(this).hasClass('h2') && ww >= 700) $(this).css('height', items_double_height + (items_margin * 2) + 'px');
			});

			// isotope
			active_container.isotope({
				itemSelector: '.entry',
				masonry: {
					columnWidth: items_width + margin
				}
			});
		};

	}

	grid();



	/** Ajax contact form */
	$('#contact-form').on('submit', function() {
		var action = $(this).attr('action');

		$('#contact-messages').slideUp(500, function() {

			$('#contact-messages').hide();
			$('#submit').attr('disabled', 'disabled');

			$.post(action, {
				name: $('#name').val(),
				email: $('#email').val(),
				comment: $('#comment').val()
			}, function(data) {
				document.getElementById('contact-messages').innerHTML = data;
				$('#contact-messages').slideDown(500);
				$('#submit').removeAttr('disabled');
				if (data.match('success') != null)
					$('#contact-form').slideUp(500);
			});

		});

		return false;
	});



	/** wait for window load */
	win.on('load', function() {
		setTimeout(function() {
			$('#site-loading').addClass('hide');
		}, 1000);

		grid();
	});



	/** resize */
	win.on('resize', function() {

		ww = win.width();
		wh = win.height();

		$('.hero').css('height', wh * .7);

		closeNav();

		grid();

	});

})(jQuery);
