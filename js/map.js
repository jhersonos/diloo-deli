var map = null;
		var map2 = null;
		var marker = [];
		var marker2 = []
	
		function initialize() {
			var myLatLng = new google.maps.LatLng(-12.114194,-77.044559);
			var myLatLng2 = new google.maps.LatLng(-12.114194,-77.044559); // map 2
			var input = document.getElementById('start');
			var input2 = document.getElementById('end');
  			var searchBox = new google.maps.places.SearchBox(input);
  			var searchBox2 = new google.maps.places.SearchBox(input2);
			var myOptions = {
			  zoom: 15,
			  center: myLatLng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var myOptions2 = {
			  zoom: 15,
			  center: myLatLng2,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById('map'), myOptions);
			map2 = new google.maps.Map(document.getElementById('map2'), myOptions);
  			//search box 1
  			map.addListener('bounds_changed', function() {
			    searchBox.setBounds(map.getBounds());
			  });
  			map2.addListener('bounds_changed', function() {
			    searchBox2.setBounds(map.getBounds());
			  });
  			//searchbox1 listener function
	  		searchBox.addListener('places_changed', function() {	
	  			marker.forEach(function(marker) {
			      marker.setMap(null);
			    });
			    marker = [];
	  			if (marker && marker !="") {
			      marker.setMap(null);
			    }
			    var places = searchBox.getPlaces();

			    if (places.length == 0) {
			      return;
			    }
			    var bounds = new google.maps.LatLngBounds();
			    places.forEach(function(place) {
				      var icon = {
				        url: place.icon,
				        size: new google.maps.Size(71, 71),
				        origin: new google.maps.Point(0, 0),
				        anchor: new google.maps.Point(17, 34),
				        scaledSize: new google.maps.Size(25, 25)
				      };
				     marker.push(new google.maps.Marker({ // markers
				        map: map,
				        zoom:15,
				        draggable: false,
				        icon: icon,
				        title: place.name,
				        position: place.geometry.location
				      }));
				     if (place.geometry.viewport) {
				        // Only geocodes have viewport.
				        bounds.union(place.geometry.viewport);
				      } else {
				        bounds.extend(place.geometry.location);
				      }
			 		});
			       map.fitBounds(bounds);
			 	});
	  		// searchBox2
		  		searchBox2.addListener('places_changed', function() {	
				marker2.forEach(function(marker) {
			      marker2.setMap(null);
			    });
			    marker2 = [];
	  			if (marker2 && marker2 !="") {
			      marker2.setMap(null);
			    }
			    var places2 = searchBox2.getPlaces();

			    if (places2.length == 0) {
			      return;
			    }
			    var bounds2 = new google.maps.LatLngBounds();
			    places2.forEach(function(place) {
				      var icon2 = {
				        url: place.icon,
				        size: new google.maps.Size(71, 71),
				        origin: new google.maps.Point(0, 0),
				        anchor: new google.maps.Point(17, 34),
				        scaledSize: new google.maps.Size(25, 25)
				      };
				     marker2.push(new google.maps.Marker({ // markers
				        map: map2,
				        zoom:15,
				        draggable: false,
				        icon: icon2,
				        title: place.name,
				        position: place.geometry.location
				      }));
				     if (place.geometry.viewport) {
				        // Only geocodes have viewport.
				        bounds2.union(place.geometry.viewport);
				      } else {
				        bounds2.extend(place.geometry.location);
				      }
			 		});
			       map2.fitBounds(bounds2);
			 	});
			}
window.addEventListener('load', function () {
			initialize();
});