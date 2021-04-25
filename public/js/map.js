mapboxgl.accessToken = 'pk.eyJ1IjoieW91c2VmMDEiLCJhIjoiY2tpNTE4aXBnMm1icjJ4bXAyd21raWd3ZCJ9.aNNl_fEbFU_NxO3JuHOaAQ'; // set the access token

// set the arabic language
mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
        true // Lazy load the plugin
    );
    

    // set your custom map
    var map = new mapboxgl.Map({
      container: 'map', // The container ID
      style: 'mapbox://styles/mapbox/streets-v11', // The map style to use
      center: [ 30.531005859375,
        30.36813582872057], // Starting position [lng, lat]
      zoom: 15 // Starting zoom level
    });

    async function load() {
        async function funcName(url) {
          const data = await fetch(url);
          return await data.json();
        }
      
        let stores = await funcName('http://localhost:3000/api/v1/stores');
      
        console.log(stores);

       
       
      
        
    map.on('load', function() {
  var geocoder = new MapboxGeocoder({ // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    zoom: 15, // Set the zoom level for geocoding results
    placeholder: "Enter an endpoint...", // This placeholder text will display in the search bar
    bbox: [24.70007, 22.0, 36.86623, 31.58568] // Set a bounding box
    });



  // Add the geocoder to the map
  map.addControl(geocoder, 'top-left'); // Add the search box to the top left
  var marker = new mapboxgl.Marker({'color': '#008000'}) // Create a new blue marker

  
  geocoder.on('result', function(data) { // When the geocoder returns a result
    var point = data.result.center; // Capture the result coordinates

    map.addSource('restaurant', { // Add a new source to the map style: https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
    type: "geojson",
    data: "http://localhost:3000/api/v1/stores"
  });


   
  buildLocationList(stores);
  addMarkers();
      

  });


    
   
  
    
    
});



      /**
       * Add a marker to the map for every store listing.
      **/
      function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        stores.features.forEach(function(marker) {
          /* Create a div element for the marker. */
          var el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
          el.id = "marker-" + marker.properties.id;
          /* Assign the `marker` class to each marker for styling. */
          el.className = 'marker';
          
          /**
           * Create a marker using the div element
           * defined above and add it to the map.
          **/
          new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

          /**
           * Listen to the element and when it is clicked, do three things:
           * 1. Fly to the point
           * 2. Close all other popups and display popup for clicked store
           * 3. Highlight listing in sidebar (and remove highlight for all other listings)
          **/
          el.addEventListener('click', function(e){
            /* Fly to the point */
            flyToStore(marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker);
           
          });
        });
      }


       /**
       * Add a listing for each store to the sidebar.
      **/
      function buildLocationList(data) {
        data.features.forEach(function(store, i){
          /**
           * Create a shortcut for `store.properties`,
           * which will be used several times below.
          **/
          var prop = store.properties;

        });
      }

      /**
       * Use Mapbox GL JS's `flyTo` to move the camera smoothly
       * a given center point.
      **/
      function flyToStore(currentFeature) {
        map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 15
        });
      }

      /**
       * Create a Mapbox GL JS `Popup`.
      **/
      function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        var popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<h3>'+ currentFeature.properties.name+ '</h3>' +
            '<a href="profile.html" target="_blank"> Menu </a>' +
            '<h4>'+ currentFeature.properties.phone + '</h4>' +
            '<h4>'+ currentFeature.properties.kitchen + '</h4>'
            )
          .addTo(map);
      }


}

    // load my file
    load(); 



// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());




 // Add geolocate control to the map.
 map.addControl(
  new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true
}) , 'top-right'
);

// add scale
map.addControl(new mapboxgl.ScaleControl());



