<template>
	<v-carousel
		cycle
		height="600"
		hide-delimiter
		delimiter-icon="mdi-checkbox-blank-circle-outline"
		hide-delimiter-background
		show-arrows-on-hover
	>
		<v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
		</v-carousel-item>
	</v-carousel>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					src: "https://wallpaperaccess.com/full/2126183.jpg",
				},
				{
					src:
						"https://external-preview.redd.it/NM4s5l1oPe6iE2nD2HGueHhV9xTCmpDrGVqtveo2xNA.jpg?auto=webp&s=a3c3e52fc8e7da8fa9293847e1e5a61f56cabb10",
				},
				{
					src: "https://wallpaperaccess.com/full/6432448.jpg",
				},
			],
		};
	},
};
</script>
