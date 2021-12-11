<template>
	<v-container>
			<div class="profile-container pt-4">
				<v-card class="profile-menu" width="400" max-height="400" elevation="8">
					<v-list>
						<v-list-item class="py-1">
							<v-icon class="mr-6">mdi-account</v-icon>
							<v-list-item-title  class="">
								Punnarat Rattanapawan
							</v-list-item-title>
						</v-list-item>
						<v-divider class="mx-6"></v-divider>

						<v-list nav>
							<v-list-item-group mandatory color="red darken-4">
								<v-list-item
									v-for="item in menuList"
									:key="item.title"
									:class="item.class"
									router
									:to="item.path"
								>
									<!-- icon & name-->
									<v-list-item-icon>
										<v-icon>{{ item.icon }}</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title>{{
											item.title
										}}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								
							</v-list-item-group>
						</v-list>
					</v-list>
				</v-card>
				
				<v-card elevation="0">
					<v-card class="pl-4" elevation="8" width="1100" min-height="600"> 
						<v-card-title class="mb"> จัดการบัญชีผู้ใช้</v-card-title>
						<v-divider class="mx-4"></v-divider>
					</v-card>
					<v-card class="mt-6 pl-4" elevation="8" width="1100" height="400"> 
						<v-card-title> จัดการรหัสผ่าน</v-card-title>
						<v-divider class="mx-4"></v-divider>
					</v-card>
				</v-card>
			</div>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		menuList: [
			{ title: "Account", icon: "mdi-account" },
			{ title: "Order History", icon: "mdi-account" },
		],
	}),
};
</script>

<style scoped>

.profile-container {
	display: flex;
	flex-direction: columns;
	justify-content: center;
}

.profile-menu {
	margin-right: 8rem;
}

.profile__item {
	color: rgb(247, 247, 247);
	cursor: pointer;
}

.profile__item:hover {
	color: black;
}


</style>
