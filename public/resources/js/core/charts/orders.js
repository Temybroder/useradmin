//
// Engagement chart
//

'use strict';

var ApexOrdersChart = (function() {

	// Variables

	var $chart = document.querySelector("#apex-orders"),
		$legendItem = $('.legend input'),
		chart;

	var colorPalette = [
		PurposeStyle.colors.theme['primary'],
		PurposeStyle.colors.theme['warning']
	]

	function init() {
		var options = {
			chart: {
				type: 'bar',
				stacked: false,
				zoom: {
					enabled: false
				},
				toolbar: {
					show: false
				},
				shadow: {
					enabled: false,
				},
				animations: {
			        enabled: true,
			        easing: 'easeinout',
			        speed: 800,
			        animateGradually: {
			            enabled: true,
			            delay: 150
			        },
			        dynamicAnimation: {
			            enabled: true,
			            speed: 350
			        }
			    }
			},
			colors: colorPalette,
			plotOptions: {
				bar: {
					columnWidth: '20%',
					endingShape: 'rounded'
				}
			},
			stroke: {
				width: 0,
				curve: 'smooth'
			},
			series: [{
				name: 'Delivered',
				type: 'bar',
				data: [50, 30, 40, 60, 80, 100, 90, 90, 70, 90, 100]
			}, {
				name: 'Rejected',
				type: 'bar',
				data: [15, 20, 20, 15, 15, 30, 20, 15, 30, 20, 30]
			}],
			markers: {
				size: 0
			},
			xaxis: {
				axisBorder: {
					show: false
				},
				axisTicks: {
					show: false
				},
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				labels: {
					style: {
						colors: PurposeStyle.colors.gray[500],
						fontSize: '13px',
						fontFamily: PurposeStyle.fonts.base,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			yaxis: {
				axisBorder: {
					show: false
				},
				axisTicks: {
					show: false
				},
				labels: {
					style: {
						color: PurposeStyle.colors.gray[500],
						fontSize: '13px',
						fontFamily: PurposeStyle.fonts.base,
						cssClass: 'apexcharts-xaxis-label',
					}
				}
			},
			legend: {
				show: false
			},
			grid: {
				borderColor: PurposeStyle.colors.gray[200],
				strokeDashArray: 3,
			},
			dataLabels: {
				enabled: false
			},
			tooltip: {
				shared: true,
				intersect: false,
				y: {
					formatter: function(y) {
						if (typeof y !== "undefined") {
							return y.toFixed(0) + " orders";
						}
						return y;
					}
				}
			}
		}

		// Get data from data attributes
		var height = $chart.dataset.height;

		// Inject synamic properties
		options.colors = colorPalette;

		options.chart.height = height ? height : 350;

		chart = new ApexCharts($chart, options);

		// Draw chart
		setTimeout(function() {
			chart.render();

			checkLegends()
		}, 300);
	}


	// check if the checkbox has any unchecked item
	// checkLegends()

	function checkLegends() {
		var allLegends = document.querySelectorAll(".legend input[type='checkbox']")

		for (var i = 0; i < allLegends.length; i++) {
			if (!allLegends[i].checked) {
				chart.toggleSeries(allLegends[i].value)
			}
		}
	}

	// toggleSeries accepts a single argument which should match the series name you're trying to toggle
	function toggleSeries(checkbox) {
		chart.toggleSeries(checkbox.value)
	}

	if ($chart) {
		init();

		return {
			toggleSeries: toggleSeries
		};
	}

})();
