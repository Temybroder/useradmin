//
// Sticky
//

'use strict';

var SvgInjector = (function() {

	//
	// Variables
	//

	var $svg = document.querySelectorAll('img.svg-inject');
	var status = false;


	//
	// Methods
	//

	function init($this) {

		var options = {

		};

		SVGInjector($this, options, function(result) {
			status = true
		});
	}


	//
	// Events
	//

	if ($svg.length) {
		init($svg);
	}


	//
	// Return
	//

	return {
		status: status
	};
})();
