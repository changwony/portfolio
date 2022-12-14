var windowResizeTimer = null;
var dwidth = $(window).width();
function introAni(){
	$('body').addClass('page-loading');
	$('.i-tit').delay(100).queue(function(next) {
		$(this).addClass('active');
		next();
		var idx = $('.i-flip li').length;
		function forwardOn(){
			$('.i-flip li').each(function(index){
				var filpSpeed = 800;
				var filpIndex = index+1;
				var filpSum1 = filpSpeed + filpSpeed;
				var filpSum2 = filpSum1 + filpSpeed;
				setTimeout(function(){
					$('.i-flip li').removeClass('on');
					$('.i-flip li').eq(index).addClass('on');
					if(index === idx-1){
						// 반복일경우
						//forwardOn();
						$('.intro-box').delay(filpSum1).queue(function(next) {
							$('.intro-layer').addClass('flip-off');
							next();
						});
						setTimeout(function(){
							$('.intro-layer').removeClass('on');
							$('body').delay(2000).queue(function(next) {
								$(this).removeClass('page-loading').addClass('page-complete');
								next();
							});
						},filpSum2 + 1000);
					}
				},filpSpeed*filpIndex);
			});
		}
		forwardOn();
	});
}
$(function(){

	var introLayerObj = $('.intro-layer');
	if (introLayerObj.length) {
		introAni();
	}

	var mainWidth;
	var mainHeight;

	mainEffect();

	function mainEffect(){
		mainWidth = $('.main-intro').innerWidth();
		mainHeight = $('.main-intro').innerHeight();
		//mainWidth = window.innerWidth;
		//mainHeight = window.innerHeight; 
	}

	var maxDegrees = 100;

	window.onmousemove = function(evt) {
		var mouseX = evt.pageX/mainWidth;
		var mouseY = evt.pageY/mainHeight;
		var yDegrees = (mouseX*maxDegrees)-0.5*maxDegrees;
		var xDegrees = -0.5*((mouseY*maxDegrees)-0.5*maxDegrees);
		document.getElementsByClassName('m-figure')[0].style.transform = 'rotateY('+yDegrees+'deg) rotateX('+xDegrees+'deg)';
	}

	$('.target-link').click(function(e){
		e.preventDefault();
		var target = $(this).attr('href');
		var targetOffset = $(target).offset();
		var targetPos = targetOffset.top;
		$('html, body').animate({scrollTop : targetPos}, 1000);
	});

	gsap.registerPlugin(ScrollTrigger);
	gsap.utils.toArray('#wrap').forEach(function(section){
		ScrollTrigger.matchMedia({
			'(min-width: 1024px)': function() {
				var PLtotal = 0;
				var PLwidth = $('.project-area').outerWidth();
				var proxy = { skew: 0 },
					skewSetter = gsap.quickSetter('.p-box', 'skewX', 'deg'),
					clamp = gsap.utils.clamp(-20, 20); //동작 값
				$('.project-list').each(function(index, item){
					PLtotal += Number($(this).outerWidth());
					PLsum = PLtotal - PLwidth;
				});
				var projectList = gsap.timeline({
					scrollTrigger: {
						trigger: '.project-list',
						start: 'top',
						end: '+=200%',
						scrub: 1,
						pin: true,
						anticipatePin: 1
						/*
						onUpdate: function(self){
							var skew = clamp(self.getVelocity() / -300);
							if (Math.abs(skew) > Math.abs(proxy.skew)) {
								proxy.skew = skew;
								gsap.to(proxy, {skew: 0, duration: 1.0, ease: 'power3', overwrite: true, onUpdate: function(){skewSetter(proxy.skew)}});
							}
						}
						*/
					},
					defaults: {ease: 'none'}
				});
				projectList.fromTo(section.querySelector('.project-list'), {x: 0, yPercent: -0, rotationX: 0, rotationY: 0, rotationZ: 0}, {x: '-75.5%', yPercent: 0, rotationX: 0, rotationY: 0, rotationZ: 0}, 0); //PLsum 원래 이값
				//gsap.set('.p-box', {transformOrigin: 'right center', force3D: true});

			}, 
			'(max-width: 1023px)': function() {
			},
			'all': function() {
				var mainIntro = gsap.timeline({
					scrollTrigger: {
						trigger: '.main-intro',
						start: 'top',
						end: 'bottom',
						scrub: 1
					},
					defaults: {ease: 'none'}
				});
				mainIntro.fromTo(section.querySelector('.m-title .t-sec.nht1'), {xPercent: 0}, {xPercent: 100}, 0)
				.fromTo(section.querySelector('.m-title .t-sec.nht2'), {xPercent: 0}, {xPercent: -100}, 0)
				.fromTo(section.querySelector('.m-effect'), {rotationY: 0}, {rotationY: -270}, 0)
				.fromTo(section.querySelector('.m-figure'), {opacity: 1}, {opacity: 0}, 0);

				var mainStory = gsap.timeline({
					scrollTrigger: {
						trigger: '.main-story',
						start: 'top bottom',
						end: 'top',
						scrub: 0.5
					},
					defaults: {ease: 'none'}
				});
				mainStory.fromTo(section.querySelector('.about-photo'), {opacity: 0, yPercent: -20}, {opacity: 1, yPercent: 0}, 0)
				.fromTo(section.querySelector('.about-photo .p-thumb img'), {top: '10%'}, {top: '45%'}, 0)
				.fromTo(section.querySelector('.about-me'), {opacity:0, yPercent: 50}, {opacity:1, yPercent: 0}, 0);

				var projectArea = gsap.timeline({
					scrollTrigger: {
						trigger: '.project-area',
						start: 'top 65%',
						scrub: 1,
						toggleClass: 'active',
						onToggle: function(scrollTrigger){
							scrollTrigger.refresh()
						}
					},
					defaults: {ease: 'none'}
				});

				var projectArea = gsap.timeline({
					scrollTrigger: {
						trigger: '.contact-area',
						start: 'top 65%',
						scrub: 1,
						toggleClass: 'active',
						onToggle: function(scrollTrigger){
							scrollTrigger.refresh()
						}
					},
					defaults: {ease: 'none'}
				});

				/*
				var aboutDim = gsap.timeline({
					scrollTrigger: {
						trigger: '.vod-coding',
						start: 'top bottom',
						end: 'top',
						scrub: 0.5,
					},
					defaults: {ease: 'none'}
				});
				aboutDim.fromTo(section.querySelector('.v-dim'), {opacity: 1}, {opacity: 0}, 0)
				.fromTo(section.querySelector('.about-text'), {opacity: 0, top: '30%'}, {opacity: 1, top: '0%'}, 0);
				*/

				var aboutArea = gsap.timeline({
					scrollTrigger: {
						trigger: '.about-area',
						start: 'top',
						end: '+=250%',
						scrub: .5,
						pin: true,
						toggleClass: 'active'
						//anticipatePin: 1
					},
					defaults: {ease: 'none'}
				});
				aboutArea.fromTo(section.querySelector('.about-slogan'), {opacity: 1, top: '50%'}, {opacity: 0, top: '30%'}, 0.3)
				.fromTo(section.querySelector('.m-txt'), {opacity: 0, top: '70%'}, {opacity: 1, top: '50%'}, .8)
				.fromTo(section.querySelector('.m-txt'), {opacity: 1, top: '50%'}, {opacity: 0, top: '30%'}, 1.6)
				.fromTo(section.querySelector('.about-text .s-txt'), {opacity: 0, top: '70%'}, {opacity: 1, top: '50%'}, 2.1)
				.fromTo(section.querySelector('.about-text .s-txt'), {opacity:1}, {opacity:1}, 2.6);

				ScrollTrigger.refresh();
			}
		});

	});

	var $prfItem = $('.pr-item');
	//$prfItem.hide();
	var $prfArea = $('.pr-list');
	$prfArea.imagesLoaded(function(){
		$prfItem.addClass('on');
		$prfArea.masonry({
			itemSelector: '.pr-item',
			columnWidth: '.pr-sizer',
			horizontalOrder: true,
			percentPosition: true,
			//filtersGroupSelector: '.tab-kind'
		});
	});
	$('.tab-kind .t-item .btn-tab-cate').click(function() {
		var group = $(this).data('category');
		var group_class = "." + group;
		if(group == "*"){
			$('.pr-item').show();
			$prfArea.masonry('layout');
		   }
		else if(group != "") {
			$('.pr-item').hide();
			$(group_class).show();
			$prfArea.masonry('layout');
		} else {
			$('.pr-item').show();
			$prfArea.masonry('layout');
		}
	});
	$('.modal-open').on('click', function(){
		$( $(this).attr('href') ).fadeIn(300).addClass('on').append('<button type="button" class="btn-modal-gotop"><span class="blind">위로가기</span></button>');
		$('body').addClass('modal-scroll');
		//$(this).attr('data-focus','on');
		$prfArea.masonry();
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
		/*
		$('a[data-focus~=on]').focus();
		window.setTimeout(function(){
			$('a[data-focus~=on]').removeAttr('data-focus');
		},500);
		*/
	});

});
$(window).load(function(){
	setTimeout (function () {
		scrollTo(0,0);	
	},100);
});

$(window).on('resize', function(){
	clearTimeout(windowResizeTimer);
	windowResizeTimer = setTimeout(function(){
		//ScrollTrigger.refresh();
		var wwidth = $(window).width();
		if(dwidth!==wwidth){
			dwidth = $(window).width();
			scrollTo(0,0);	
		}
	}, 300);
});

$(window).scroll(function(){
	if($(window).scrollTop() >= 100) {
		$('#header, .scroll-down').addClass('hidden');
	}else{
		$('#header, .scroll-down').removeClass('hidden');
	}
});