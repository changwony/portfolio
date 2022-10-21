 $(function(){

	var mouseCursor = document.querySelector('.cursor');
	var projectLinks = document.querySelectorAll('.project-sec .p-box');
	var basicLinks = document.querySelectorAll('.btn-pr-more');
	
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

	

 });