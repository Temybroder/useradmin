//
// Autosize
// used on textarea inputs
//

'use strict';

var TextareaAutosize = (function() {

	//
	// Variables
	//

	var $textarea = $('[data-toggle="autosize"]');

	//
	// Functions
	//

	function init() {
		autosize($textarea);
	}

	//
	// Events
	//

	if ($textarea.length) {
		init();
	}

})();
