//
// Google maps
//

var GoogleMap = (function() {
    var $map = document.getElementById('map-default'),
        lat,
        lng,
        zoom;

    function initMap(map) {

        lat = map.getAttribute('data-lat');
        lng = map.getAttribute('data-lng');
        zoom = map.getAttribute('data-zoom') ? parseInt(map.getAttribute('data-zoom')) : 12;

        var myLatlng = new google.maps.LatLng(lat, lng);

        var mapOptions = {
            zoom: zoom,
            scrollwheel: false,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }

        map = new google.maps.Map(map, mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
        });

        var contentString = '<div class="info-window-content"><h2>{{ site.product.name }} {{ site.product.name_long }}</h2>' +
            '<p>{{ site.product.description }}</p></div>';

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
