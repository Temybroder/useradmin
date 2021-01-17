//
// Select2
//

'use strict';

var Select = (function() {

	var $select = $('[data-toggle="select"]');

	function init($this) {
		var options = {};

		$this.select2(options);
	}

	if ($select.length) {
		$select.each(function() {
			init($(this));
		});
	}

})();
