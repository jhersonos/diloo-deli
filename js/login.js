var login;
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
				console.log('processing...')
				this.$http.post('http://40.76.4.149:8000/admin/login',credentials).then(response=>{
					this.token = response.body.token;
					window.localStorage.log = response.body.token;
					window.location.href='home.html'
				},response=>{
					console.log(response)
				})
			}
		}
	});