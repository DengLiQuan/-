function resizeAll(){
	$('.toolbar .item').hide();
	var offset = $('.page').offset();
	$(window).scroll(function () {
	 var scrollTop = $(window).scrollTop();
	 if(offset.top < scrollTop){
	  	$('.toolbar .item').show();
	 }else{
	  	 $('.toolbar .item').hide();
	 }
	});
}


$(document).ready(function(){
	resizeAll();
}) 
$(window).resize(function() {
	resizeAll()
});