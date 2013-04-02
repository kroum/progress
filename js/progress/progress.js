(function() {
	progress = function(el, options){
		var _stuff, _container, fillSizeName,
		opts = {
			direction: "hor",
			stuffSize: 500,

			min_value: 0,
			max_value: 300,
			currentPosition: 0,
			sections: [],

			css: "style/progress.css",
			cssClass: "progress__container",

			bottomOffset: 0,

			hasBottom: false,
			hasTop: false,

			discrete: false,
			stepSize: 0,
			
			onDisplay: function() {},
			onHide: function() {}
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
		if (!opts.sections.length)
			opts.sections = [{min:opts.min_value, max: opts.max_value, size: opts.stuffSize}];
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

		var
		_defineInitSection = function(val) {
			if (isNaN(val) || val < opts.min_value) {
				return -1;
			} else {
				var sectionsLength = opts.sections.length;
				if (sectionsLength < 1) {
					return 0;
				} else {
					if (val >= opts.max_value) {
						return sectionsLength - 1;
					} else {
						for (var i=0;i<sectionsLength;i++) {
							if (val < opts.sections[i]["max"]) {
								return i;
							}
						}
					}
				}
			}
		},
		_findPosInSection = function(val, minVal, maxVal, sectionSize, step) {
			if (val > maxVal) val = maxVal;

			var pos = Math.floor(sectionSize * ((val - minVal) / (maxVal - minVal)));
			if (!isNaN(step) && parseInt(step) > 0) {
				pos = Math.floor(pos / step) * step;
			}

			return pos;
		},
		_definePos = function(val) {
			var sectionId = _defineInitSection(val), currPos = 0;

			if (1 > opts.sections.length) {
				currPos = _findPosInSection(val, opts.min_value, opts.max_value, opts.stuffSize, opts.stepSize);
			} else {
				currPos = _findPosInSection(val, opts.sections[sectionId]["min"], opts.sections[sectionId]["max"], opts.sections[sectionId]["size"], opts.stepSize);
				for (var i=0; i<sectionId; i++) {
					currPos += opts.sections[i]["size"];
				}
			}
			opts.currentPosition = currPos;
			return currPos;
		};

		this.set = function(val, duration) {
			if (!isNaN(val) && val > opts.min_value) {
				_stuff.style.display = "block";
				_stuff.style[fillSizeName] = _definePos(val)+"px";
				opts.onDisplay();
			} else {
				opts.onHide();
				_stuff.style.display = "none";
				_stuff.style[fillSizeName] = 0;
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
