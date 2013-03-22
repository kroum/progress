(function() {
	progress = function(el, options){
		var _stuff, _container, fillSizeName,
		opts = {
			direction: "hor",
			stuffSize: 500,

			min_value: 0,
			max_value: 300,
			current_value: 0,

			css: "style/progress.css",
			cssClass: "progress__container",

			bottomOffset: 0,

			hasBottom: false,
			hasTop: false,

			discrete: false,
			stepSize: 0,
			
			onDisplay: function() {}
		};
		opts.sections = [{min:opts.min_value, max: opts.max_value, size: opts.stuffSize}];

		// initialization
		// 1. Extend the default options with the user data
		if ("object" == typeof(options) && null != typeof(options)) {
			for (var idx in options) {
				if (options.hasOwnProperty(idx)) {
					opts[idx] = options[idx];
				}
			}
		}
		fillSizeName = ("vert" == opts.direction) ? "height" : "width";

		// 2. styles loading 
		window.progressStyles = window.progressStyles || {};
		if ("undefined" == typeof(window.progressStyles[opts.css])) {
			var st = document.createElement("link");
			st.rel = "stylesheet";
			st.href = opts.css;
			st.media = "screen";
			document.getElementsByTagName("head")[0].appendChild(st);
			window.progressStyles[opts.css] = st;
		}

		// creation of the progress elements
		if ("undefined" == typeof this._instance) {
			this._instance = this;

			_stuff = document.createElement("div");
			_stuff.className = opts.cssClass + "__stuff";
			if ("vert" == opts.direction) {
				_stuff.style.bottom = opts.bottomOffset;
			} else {
				_stuff.style.left = opts.bottomOffset;
			}

			_container = document.createElement("div");
			_container.className = opts.cssClass;

			_container.appendChild(_stuff);
			el.appendChild(_container);
		}
		
		this.set = function(val, duration) {
			if (!isNaN(val) && val > opts.min_value) {
				_stuff.style.display = "block";
				_stuff.style[fillSizeName] = val+"%";
				opts.onDisplay();
			}
		};

	};
	return progress;
})();

if ("function" == typeof jQuery) {
	jQuery.fn.progress = function(options) {
		var self = this;
		var _items = this.each(function(){
			if ("undefined" == typeof(this.progress)) {
				this.progress = new progress(this, options);
			}
		});
		return {
			set: function(val, duration) {
				self.each(function() {
					this.progress.set(val, duration);
				});
			}
		};
	};
}
