//
// Google maps
//

var GoogleMapCustom = (function() {
    var $map = document.getElementById('map-custom'),
        lat,
        lng,
        color,
        zoom;

    function initMap(map) {

        lat = map.getAttribute('data-lat');
        lng = map.getAttribute('data-lng');
        color = map.getAttribute('data-color');
        zoom = map.getAttribute('data-zoom') ? parseInt(map.getAttribute('data-zoom')) : 12;

        var myLatlng = new google.maps.LatLng(lat, lng);

        var mapOptions = {
            zoom: zoom,
            scrollwheel: false,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":color},{"visibility":"on"}]}]
        }

        map = new google.maps.Map(map, mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
        });

        var contentString = '<div class="info-window-content"><h5>Company Name</h5>' +
            '<p>Description comes here...</p></div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }

    if (typeof($map) != 'undefined' && $map != null) {
        google.maps.event.addDomListener(window, 'load', initMap($map));
    }
})();
