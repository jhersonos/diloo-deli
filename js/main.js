var restaurant;
var getuser;
var adduser;
var addstreet;
var getprod;
var addrest;
var addprod;
/*****************get restaurant and set to select **************/
restaurant = new Vue({
	el:'#restaurants',
	data:{
		all:[]
	},
	methods:{
		getrestaurant:function(){
			var self = this;
			self.$http.get('http://40.76.4.149:8000/restaurant',{Authorization: 'Bearer '+ window.localStorage.log}).then(response=>{
				self.all = response.body
				//console.log(self.all)
				var box = document.getElementById('rest');
				var sel = document.getElementById('p-restaurant')
				var option;
				self.all.forEach(function(res){
					option = document.createElement('option');
					option2=document.createElement('option');
					option.value = res.id; 
					option.text  = res.name;
					option2.value = res.id; 
					option2.text  = res.name;
					box.add(option)
					sel.add(option2)
				})
			},response=>{
				console.log(response)
			});
		}
	}
});

/**************get user info to show :3****************/
	
	getuser = new Vue({
		el:'#cont',
		data:{
			user:{},
			address:[]
		},
		methods:{
			list:function(){
				var phone = document.getElementById('phone').value;
				this.$http.get('http://40.76.4.149:8000/user/findOne?phone='+phone,{Authorization: 'Bearer '+ window.localStorage.log}).then(response=>{
					console.log(response)
					this.user = response.body.user
					this.address = response.body.address
					//script set information user
					document.getElementById('name').value=this.user.name;
					document.getElementById('cell').value=this.user.phone;
					document.getElementById('email').value=this.user.email;
					var opt;
					var sl = document.getElementById('s-start');
					$('#s-start').find('option').remove().end();
					if(this.address.length > 0){
						var i =0 ;
						var object,lng,lat,pt; 
						this.address.forEach(function(res){
							object = JSON.parse(res.position);
							lat	   = object.lat;
							lng    = object.lng;
							pt		= lat + " " + lng;
							console.log(pt)
							opt=document.createElement('option');
							opt.value=pt;
							opt.text=res.street;
							sl.add(opt)
							i++;
						})
					}
					//document.getElementById('start').value=this.address[0].street;
					
					document.getElementById('start').focus();
				},response=>{
					console.log(response)
				})
			}
		}
	})

	adduser = new Vue({
		el:'#useradd',
		data:{},
		methods:{
			add:function(e){
				console.log('proccesing')
				e.preventDefault();
					var name = document.getElementById('u-name').value;
					var phone = document.getElementById('u-phone').value;
					var email = document.getElementById('u-email').value;
				this.$http.post('http://40.76.4.149:8000/user', {name: name, phone: phone, email:email}).then((response) => {
					console.log(response);
					$('#street').modal('show')
				},response=>{
					console.log(response)
					if(response.status == 500){
						alert('usuario ya registrado')
					}else if(response.status == 403){
						alert('complete formulario o ingrese datos correctos')
					}
				});
			}
		}
	})

	addstreet = new Vue({
		el:'#street',
		data:{},
		methods:{
			addStreet:function(e){
				e.preventDefault();
				var phone = document.getElementById('s-phone').value;
				this.$http.get('http://40.76.4.149:8000/user/findOne?phone='+phone,{Authorization: 'Bearer '+ window.localStorage.log}).then(response=>{
					console.log(response.body.user.id);
					this.addStreets(response.body.user.id);
				},response=>{
					console.log(response)
				})
			},addStreets:function(id){
				var street = document.getElementById('end').value;
				var lat = document.getElementById('s-lat').value;
				var lng = document.getElementById('s-lng').value;
				var position = {
					lat:lat,
					lng:lng
				};
				this.$http.post('http://40.76.4.149:8000/user/address', {user: id, street: street, position:position}).then((response) => {
						console.log(response);
						//$('#street').modal('show')
					},response=>{
						console.log(response)
					});
			}
		}
	});

	getprod = new Vue({
		el:'#productos',
		data:{
			producto : []
		},
		methods:{
			getProduct:function(id){
				var url ='http://40.76.4.149:8000/restaurant/'+id+'/products';
				this.$http.get(url,{Authorization: 'Bearer '+ window.localStorage.log}).then(response=>{
					console.log(response)
					this.producto=response.body;
					var select = document.getElementById('prod');
					select.removeAttribute('disabled');
					$('#prod').find('option').remove().end();
					var def=document.createElement('option');
					def.value="";
					def.text="-- Seleccione producto --";
					select.add(def);
					this.producto.forEach(function(res){
						option = document.createElement('option');
						option.value = res.id; 
						option.text  = res.name;
						select.add(option)
					})
				},response=>{
					console.log(response)
				})
			}
		}
	});

	addrest = new Vue({
		el:'#mrest',
		data:{

		},
		methods:{
			create:function(e){
				e.preventDefault();
				var name = document.getElementById('name-restaurant').value;
				this.$http.post('http://40.76.4.149:8000/restaurant', {name:name}).then((response) => {
						console.log(response);
						if(response.status == 201){
							location.reload();
						}
					},response=>{
						console.log(response)
					});
			}
		}
	});

	addprod = new Vue({
		el:'#mprod',
		data:{

		},
		methods:{
			create:function(e){
				e.preventDefault();
				var name = document.getElementById('name-product').value;
				var tipo = document.getElementById('tipo-prod').value;
				var restaurant = document.getElementById('p-restaurant').value;
				var precio = document.getElementById('p-precio').value;	
				this.$http.post('http://40.76.4.149:8000/product', {name:name,type:tipo,restaurant:restaurant,price:precio}).then((response) => {
						console.log(response);
						if(response.status == 201){
							location.reload();
						}
					},response=>{
						console.log(response)
					});
			}
		}
	});


restaurant.getrestaurant();
//function 
		function initialize() {
			 var input = document.getElementById('end');
				var searchBox = new google.maps.places.SearchBox(input);

		    var myLatlng = new google.maps.LatLng(-12.114398, -77.044565);

		    var myOptions = {
		      zoom: 15,
		      center: myLatlng,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    }

		    map_addres = new google.maps.Map($("#map2").get(0), myOptions);

		    infoWindow = new google.maps.InfoWindow();

		    var marker = new google.maps.Marker({
		        position: myLatlng,
		        draggable: true,
		        map: map_addres,
		        title:"Ejemplo marcador arrastrable"
		    });
			
			google.maps.event.addListener(marker, 'click', function(){
		        info(marker);
		    });

			}
//semantic ui
    $(document).on('click','#Uadd',function(){
		$('#useradd').modal('show')
 	})
	$(document).on('click','#addstreet',function(){
		$('#street').modal('show')
		initialize();
	}) 
	$(document).on('click','.cancelar',function(){
		$('.ui.modal').modal('hide')
	}) 
	$(document).on('click','#addrest',function(){
		$('#mrest').modal('show')
		google.maps.event.trigger(map_addres, 'resize');
	})
	$(document).on('click','#addprod',function(){
		$('#mprod').modal('show')
	})
	$(document).on('change','#rest',function(){
		var id = $('#rest').val();
		getprod.getProduct(id);
	})


