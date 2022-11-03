 $(function(){

	var mouseCursor = document.querySelector('.cursor');
	var projectLinks = document.querySelectorAll('.project-sec .p-box');
	var basicLinks = document.querySelectorAll('.btn-pr-more, .btn-link-basic, .btn-link-contact, .go-top');
	var textZoom = document.querySelectorAll('.about-me p');
	
	window.addEventListener('scroll', cursor);
	window.addEventListener('mousemove', cursor);
	
	function cursor(e) {
		mouseCursor.style.left = e.pageX + 'px';
		mouseCursor.style.top = e.pageY - pageYOffset + 'px';
	}
	if (window.NodeList && !NodeList.prototype.forEach) { //ie forEach
		NodeList.prototype.forEach = Array.prototype.forEach;
	}
	projectLinks.forEach(function(link) {
		link.addEventListener('mouseover', function(){
			mouseCursor.classList.add('link-project');
			//mouseCursor.style.zIndex = '-1';
			link.classList.add('link-active');
		});
		link.addEventListener('mouseleave', function(){
			mouseCursor.classList.remove('link-project');
			//mouseCursor.style.zIndex = '1000';
			link.classList.remove('link-active');
		});
	});

	basicLinks.forEach(function(link) {
		link.addEventListener('mouseover', function(){
			mouseCursor.classList.add('link-basic');
		});
		link.addEventListener('mouseleave', function(){
			mouseCursor.classList.remove('link-basic');
		});
	});

	textZoom.forEach(function(link) {
		link.addEventListener('mouseover', function(){
			mouseCursor.classList.add('text-zoom');
		});
		link.addEventListener('mouseleave', function(){
			mouseCursor.classList.remove('text-zoom');
		});
	});

	$('.modal-open').on('click', function(){
		$( $(this).attr('href') ).fadeIn(300).addClass('on').append('<button type="button" class="btn-modal-gotop"><span class="blind">위로가기</span></button>');
		$('body').addClass('modal-scroll');
		$(this).attr('data-focus','on');
		$('.btn-modal-gotop').click(function(){
			$('.modal-wrap').animate({
				scrollTop:0
			},400);
				return false;
		});
	});
	$('.btn-modal-close').on('click', function(){
		$(this).closest('.modal-wrap').fadeOut(300).removeClass('on');
		$('body').removeClass('modal-scroll');
		$('.btn-modal-gotop').remove();
		$('a[data-focus~=on]').focus();
		window.setTimeout(function(){
			$('a[data-focus~=on]').removeAttr('data-focus');
		},500);
	});

 });