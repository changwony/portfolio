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
							$('body').delay(2500).queue(function(next) {
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

	gsap.utils.toArray('.about-area').forEach(function(section){

		var aboutDim = gsap.timeline({
			scrollTrigger: {
				trigger: '.vod-coding',
				start: 'top bottom',
				end: 'top',
				scrub: 0.2,
			},
			defaults: {ease: 'none'}
		});
		aboutDim.fromTo(section.querySelector('.v-dim'), {opacity: 1}, {opacity: 0}, 0)
		.fromTo(section.querySelector('.about-text'), {opacity: 0, top: '30%'}, {opacity: 1, top: '0%'}, 0);

		var aboutArea = gsap.timeline({
			scrollTrigger: {
				trigger: '.about-area',
				start: 'top',
				end: '+=300%',
				scrub: 0.2,
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

	});

});
$(window).load(function(){
	
});