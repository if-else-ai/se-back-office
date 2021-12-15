<template>

	<div id="signin">
		<div class="signin-form">
			<form @submit.prevent="onSubmit">
				<div class="input">
					<label for="email">Mail</label>
					<input id="email" v-model="email" />
				</div>
				<div class="input">
					<label for="password">Password</label>
					<input type="password" id="password" v-model="password" />
				</div>
				<div class="submit">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	</div>

</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},


	methods: {
		onSubmit() {
			const formData = {
				email: this.email,
				password: this.password,
			};
			this.$store.dispatch("login", {
				email: formData.email,
				password: formData.password,
			});
		},
	},


};
</script>

<style scoped>
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
