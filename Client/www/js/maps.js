(function (global) {
    "use strict";

    function onDeviceReady() {
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);
        loadMapsApi();
    }

    function onOnline() {
        loadMapsApi();
    }

    function onResume() {
        loadMapsApi();
    }

    function loadMapsApi() {
        if (!navigator.network || navigator.connection.type === Connection.NONE) {
            console.log("Offline mode. Skipping Maps API load.");
            return;
        }
        
        if (global.google && global.google.maps) {
            console.log("Google Maps API already loaded.");
            return;
        }

        //TODO: Add your own Google maps API key to the URL below.
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBJy_AGYB-28QgqxYPdssBLMTglPOrSXTM&callback=onMapsApiLoaded')
        .fail(function() {
            console.error("Failed to load Google Maps API.");
        });
    }

    global.onMapsApiLoaded = function () {
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
        });
    };

    document.addEventListener("deviceready", onDeviceReady, false);
})(window);
