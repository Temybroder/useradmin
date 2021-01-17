//
// Toggle password visibility
//

'use strict';

var PasswordText = (function() {

	//
	// Variables
	//

	var $trigger = $('[data-toggle="password-text"]');


	//
	// Methods
	//

	function init($this) {
		var $password = $($this.data('target'));

		$password.attr('type') == 'password' ? $password.attr('type', 'text') : $password.attr('type', 'password');

		return false;
	}


	//
	// Events
	//

	if ($trigger.length) {
		// Init scroll on click
		$trigger.on('click', function(event) {
			init($(this));
		});
	}

})();
