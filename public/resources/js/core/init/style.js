//
// Style
// Style helper function to get colors and more
//

var PurposeStyle = (function() {

	// Variables

	var style = getComputedStyle(document.body);
    var colors = {
    		gray: {
    			100: '#f6f9fc',
    			200: '#e9ecef',
    			300: '#dee2e6',
    			400: '#ced4da',
    			500: '#adb5bd',
    			600: '#8898aa',
    			700: '#525f7f',
    			800: '#32325d',
    			900: '#212529'
    		},
    		theme: {
    			'primary': style.getPropertyValue('--primary') ? style.getPropertyValue('--primary').replace(' ', '') : '#008aff',
    			'info': style.getPropertyValue('--info') ? style.getPropertyValue('--info').replace(' ', '') : '#50b5ff',
    			'success': style.getPropertyValue('--success') ? style.getPropertyValue('--success').replace(' ', '') : '#5cc9a7',
    			'danger': style.getPropertyValue('--danger') ? style.getPropertyValue('--danger').replace(' ', '') : '#f25767',
    			'warning': style.getPropertyValue('--warning') ? style.getPropertyValue('--warning').replace(' ', '') : '#FFBE3D',
                'dark': style.getPropertyValue('--dark') ? style.getPropertyValue('--dark').replace(' ', '') : '#171347'
    		},
    		transparent: 'transparent',
    	},
		fonts = {
			base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
		}

	// Return

	return {
		colors: colors,
		fonts: fonts
	};

})();
