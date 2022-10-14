var windowResizeTimer = null;
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

	gsap.registerPlugin(ScrollTrigger);
	gsap.utils.toArray('#wrap').forEach(function(section){
		ScrollTrigger.matchMedia({
			'(min-width: 1024px)': function() {
				var PLtotal = 0;
				var PLwidth = $('.project-area').outerWidth();
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
					},
					defaults: {ease: 'none'}
				});
				projectList.fromTo(section.querySelector('.project-list'), {x: 0}, {x: '-68%'}, 0); //PLsum 원래 이값
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
				.fromTo(section.querySelector('.m-title .t-sec.nht2'), {xPercent: 0}, {xPercent: -100}, 0);

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
						toggleClass: 'active'
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
				.fromTo(section.querySelector('.s-txt'), {opacity: 0, top: '70%'}, {opacity: 1, top: '50%'}, 2.1)
				.fromTo(section.querySelector('.s-txt'), {opacity:1}, {opacity:1}, 2.6);

				ScrollTrigger.refresh();
			}
		});

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
	}, 1000);
});