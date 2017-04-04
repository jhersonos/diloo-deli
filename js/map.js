		var map = null;
		var map2 = null;
		var marker = [];
		var marker2 = []
		var map_start = null;

		/****************** map init default*****************/
		function init(){
			var myLatLng = new google.maps.LatLng(-12.114398, -77.044565);
			var myOptions = {
			  zoom: 15,
			  center: myLatLng,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map_start = new google.maps.Map($('#map-start')[0], myOptions);
			var marker = new google.maps.Marker({
			  position: myLatLng,
			  map: map_start,
			  title:"Hello World"
			});
		}
		/**************************************************/

		/***********************map address ***************/
		function info(marker) {
			var markerLatLng = marker.getPosition();
				infoWindow.setContent([
						'<strong>La posicion del marcador es:</strong><br/>',
						markerLatLng.lat(),
						', ',
						markerLatLng.lng(),
						'<br/>Arrástrame y haz click para actualizar la posición.'
				].join(''));
				var lnt = markerLatLng.lat();
				var lng = markerLatLng.lng();
				document.getElementById('s-lat').value=lnt;
				document.getElementById('s-lng').value=lng;
				infoWindow.open(map, marker);
			}
		function initialize() {
			 var input = document.getElementById('end');
				var searchBox = new google.maps.places.SearchBox(input);

		    var myLatlng = new google.maps.LatLng(-12.114398, -77.044565);

		    var myOptions = {
		      zoom: 15,
		      center: myLatlng,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    }

		    map = new google.maps.Map($("#map2").get(0), myOptions);

		    infoWindow = new google.maps.InfoWindow();

		    var marker = new google.maps.Marker({
		        position: myLatlng,
		        draggable: true,
		        map: map,
		        title:"Ejemplo marcador arrastrable"
		    });
		    google.maps.event.addListener(marker, 'click', function(){
		        info(marker);
		    });

			
			}
/***********************************************************/
window.addEventListener('load', function () {
			initialize();
			init();
});

	document.getElementById('s-start').addEventListener('change',function(){
	document.getElementById('map-start').setAttribute('style','display:none;')
	document.getElementById('maps').setAttribute('style','display:block;')
		var map = null;
		var infoWindow = null;
		function openInfoWindow(marker) {
		    var markerLatLng = marker.getPosition();
		    infoWindow.setContent([
		        '<strong>La posicion del marcador es:</strong><br/>',
		        markerLatLng.lat(),
		        ', ',
		        markerLatLng.lng(),
		        '<br/>Arrástrame y haz click para actualizar la posición.'
		    ].join(''));
		    infoWindow.open(map, marker);
		}

	var sl = document.getElementById('s-start').value;
			if (sl != "" ) {
				separador = " ", // un espacio en blanco
			    
			    arreglo = sl.split(separador);//guarda lat y lng de cada direccion 

				var myLatlng = new google.maps.LatLng(arreglo[0],arreglo[1]);
				
			}else{
		    var myLatlng = new google.maps.LatLng(20.68017,-101.35437);
			}
		    var myOptions = {
		      zoom: 13,
		      center: myLatlng,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    }

		    map = new google.maps.Map($("#maps").get(0), myOptions);

		    infoWindow = new google.maps.InfoWindow();

		    var marker = new google.maps.Marker({
		        position: myLatlng,
		        draggable: true,
		        map: map,
		        title:"Ejemplo marcador arrastrable"
		    });

		    google.maps.event.addListener(marker, 'click', function(){
		        openInfoWindow(marker);
		    });
})