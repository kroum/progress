(function() {
	progress = function(el, options){
		var defaults = {
			direction: "horizontal",
			size: 500,
			min_value: 0,
			max_value: 300,
			current_value: 0,
			
			css: "style/progress.css",
			class: "progress"
		};
		
		this.set = function(val, duration) {
		};
		
		// initialization
		
	}
	return progress;
})()

if ("function" == typeof jQuery) {
	jQuery.fn.progress = function(options) {
		return this.each(function(){
			$(this).progress = new progress(this, options);
		});
	}
}
