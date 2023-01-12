$(function(){

	/*--------------------------------------------------------------------------
	| Language Switcher
	|--------------------------------------------------------------------------*/

	// Click : Toggle
	$(".__language-switcher__btn").on("click", function(e){
		e.preventDefault();
		$(this).parent().toggleClass("open");
	});



});
