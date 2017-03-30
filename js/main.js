$( document ).ready(function() {
var login;
var getuser;
var adduser;
var addstreet;
var restaurant;

restaurant = new Vue({
	el:'#restaurants',
	data:{
		all:[]
	},
	methods:{
		getrestaurant:function(){
			this.$http.get('http://40.76.4.149:8000/restaurant',{Authorization: 'Bearer '+ window.localStorage.log}).then(response=>{
				console.log(response)
				this.all = response.body
				this.all.forEach(function(res){
					//console.log(res.name)
					this.all.push({id:res.id,name:res.name})
				});
			},response=>{
				console.log(response)
			});
		}
	}
});

login = new Vue({
		el: '#login',
		data:{
			token:''
		},
		methods:{
			loggin:function(e){
				e.preventDefault();
				var credentials = {
					'email':document.getElementById('email').value,
					'password':document.getElementById('pass').value
				};

				this.$http.post('http://40.76.4.149:8000/admin/login',credentials).then(response=>{
					// console.log(response)
					this.token = response.body.token;
					window.localStorage.log = response.body.token;
					window.location.href='home.html'
				},response=>{
					console.log(response)
				})
			}
		}
	});
	
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
					document.getElementById('start').value=this.address[0].street;
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
restaurant.getrestaurant();

//semantic ui
    $(document).on('click','#Uadd',function(){
		$('#useradd').modal('show')
 	})
	$(document).on('click','#addstreet',function(){
		$('#street').modal('show')
	}) 
	$(document).on('click','.cancelar',function(){
		$('.ui.modal').modal('hide')
	}) 
})
