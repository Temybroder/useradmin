//
// Card
//

'use strict';

// Cookies

var Cookies = (function() {

	// Variables

	var $modal = $("#modal-cookies");


	// Methods

	function show($this) {
        var cookies = localStorage.getItem('modal_cookies');

        if(! cookies) {
            $this.modal('show')
        }
	}

	function hide($this) {
		$this.modal('hide')
	}

	// Events

	if ($modal.length) {
		show($modal);

        $modal.on('hidden.bs.modal', function (e) {
            localStorage.setItem('modal_cookies', 1);
        })
	}

})();
