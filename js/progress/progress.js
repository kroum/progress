(function() {
	progress = function(el, options){
		var opts = {
			direction: "horizontal",
			size: 500,
			min_value: 0,
			max_value: 300,
			current_value: 0,
			
			css: "style/progress.css",
			class: "progress",
			
			discrete: false,
			step: 0
		};
		
		this.set = function(val, duration) {
		};
		
		// initialization
		// 1. Extend the default options with the user data
		if ("object" == typeof(options) && null != typeof(options)) {
			for (var idx in options) {
				if (options.hasOwnProperty(idx)) {
					opts[idx] = options[idx];
				}
			}
		}
		
		// 2. load styles
		window.progressStyles = window.progressStyles || {};
		if ("undefined" == typeof(window.progressStyles[opts.css])) {
			var st = document.createElement("LINK");
			st.rel = "stylesheet";
			st.href = opts.css;
			st.media = "screen";
			document.head.appendChild(st);
			window.progressStyles[opts.css] = st;
		}
		
		// create the progress elements
		
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
