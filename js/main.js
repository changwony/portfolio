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
});
$(window).load(function(){
	
});