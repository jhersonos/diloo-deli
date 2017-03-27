var login;
var getuser;
var adduser;
window.addEventListener('load', function () {
	
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
					//console.log(response)
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
				e.preventDefault();
				var name = document.getElementById('u-name').value;
				var phone = document.getElementById('u-phone').value;
				var email = document.getElementById('u-email').value;
				this.$http.post('http://40.76.4.149:8000/user', {name: name, phone: phone, email:email}).then((response) => {
					console.log(response);
				},response=>{
					console.log(response)
				});
			}
		}
	})

})