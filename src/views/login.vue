<template>
	<div id="signin">
		<div class="signin-form">
			<v-card class="elevation-12">
				<v-toolbar dark color="primary">
					<v-toolbar-title
						>{{
							isRegister
								? stateObj.register.name
								: stateObj.login.name
						}}
						</v-toolbar-title
					>
				</v-toolbar>
				<v-card-text>
					<form
						ref="form"
						@submit.prevent="isRegister ? register() : login()"
					>
						<v-text-field
							v-model="email"
							name="email"
							label="Email"
							type="text"
							placeholder="email"
							required
						></v-text-field>

						<v-text-field
							v-model="password"
							name="password"
							label="Password"
							type="password"
							placeholder="password"
							required
						></v-text-field>

						<v-text-field
							v-if="isRegister"
							v-model="confirmPassword"
							name="confirmPassword"
							label="Confirm Password"
							type="password"
							placeholder="cocnfirm password"
							required
						></v-text-field>
						<div class="red--text">{{ errorMessage }}</div>
						<v-btn
							type="submit"
							class="mt-4"
							color="primary"
							value="log in"
							>{{
								isRegister
									? stateObj.register.name
									: stateObj.login.name
							}}</v-btn
						>
						<div
							class="grey--text mt-4 register-button"
							v-on:click="isRegister = !isRegister"
						>
							{{ toggleMessage }}
						</div>
					</form>
				</v-card-text>
			</v-card>
		</div>
	</div>
</template>

<script>
export default {
	data: () => {
		return {
			email: "",
			password: "",
			confirmPassword: "",
			isRegister: false,
			errorMessage: "",
			stateObj: {
				register: {
					name: "Register",
					message: "Aleady have an Acoount? login.",
				},
				login: {
					name: "Login",
					message: "Register",
				},
			},
		};
	},
	methods: {
		login() {
			const { email, password } = this;
			this.$store.dispatch('login', {email: email, password: password})
		},
		register() {
			if (this.password == this.confirmPassword) {
				this.isRegister = false;
				this.errorMessage = "";
				this.$refs.form.reset();
				this.$store.dispatch('register', {email: this.email,password: this.password})
			} else {
				this.errorMessage = "password did not match";
			}
		},
	},
	computed: {
		toggleMessage: function() {
			return this.isRegister
				? this.stateObj.register.message
				: this.stateObj.login.message;
		},
	},
};
</script>

<style scoped>
.register-button {
	cursor: pointer ;
	transition: all 0.3s ease-in;
}

.register-button:hover {
	color: blue !important;
	transition: all 0.3s ease-in;
}

.signin-form {
	display: flex;
	flex-direction: column;
	width: 400px;
	margin: 20vh auto;
	border: 1px solid rgb(155, 155, 155, 0.5);
	padding: 20px;
	border-radius: 6px;
	box-shadow: 1px 2px 3px #ccc;
}

.input {
	margin: 10px auto;
}

.input label {
	display: block;
	color: #4e4e4e;
	margin-bottom: 6px;
}

.input input {
	font: inherit;
	width: 100%;
	padding: 6px 12px;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 6px;
}

.input input:focus {
	outline: none;
	border: 1px solid #720d0d;
	border-radius: 6px;
	background-color: #eee;
}

.submit {
	display: flex;
	flex-direction: column;
}

.submit button {
	margin-top: 16px;
	border: 1px solid #8d0808;
	border-radius: 6px;
	color: #8d0808;
	padding: 10px 20px;
	font: inherit;
	cursor: pointer;
}

.submit button:hover,
.submit button:active {
	background-color: #8d0808;
	color: white;
	transition: all 0.2s ease-out;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
	border: 1px solid #ccc;
	border-radius: 6px;
	background-color: transparent;
	color: #ccc;
	cursor: not-allowed;
}
</style>
