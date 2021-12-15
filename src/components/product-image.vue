<template>
    <v-card
        class="product__images"
        flat
        v-if="images"
    >
        <div class="product__sub-image">
            <v-item-group>
                <v-card outlined>
                    <div
                        v-for="(image, index) in images
                            "
                        :key="index"
                    >
                        <v-img
                            :class="{
                                active: image.active,
                            }"
                            :src="image.src"
                            width="80"
                            height="80"
                            contain
                            @click="setActiveImage(index)"
                        />
                    </div>
                </v-card>
            </v-item-group>
        </div>
        <div outlined class="product__main-image">
            <v-img height="600" contain :src="currentImage" />
        </div>
    </v-card>
</template>

<script>
export default{
    name: "product-image",
    props: ['images', 'currentImage'],

    data: () => ({
        failedImage: 'https://cdn.shopify.com/s/files/1/0335/2087/7700/products/gmk_olivia_plusplus_keyboard_no1rev2wkl_ortho_top_vertical.jpg?v=1601032933',
        failedImage2: 'https://www.oliviaplus.plus/renders/0.jpg'
	}),

    created(){

    },

    methods: {
        setActiveImage(index) {
			let item = this.images[index];

			let newImage = this.images.map(
				item => {
					return {
						src: item.src,
						active: false
					}
				}
			)
			if(item.active === false){
				item.active = !item.active;
			}

			this.$set(newImage, index, item);
            this.$emit('setImage', this.images[index].src)
            this.$emit('setImageSet', newImage)
		}
    }

};
</script>

<style scoped>
.active {
	border: 1px solid black;
	transition: all 0.4s;
}
.product__images {
	display: flex;
	flex-direction: row;
}

.product__images img {
	max-width: 100%;
	max-height: 100%;
}

.product-small-image {
	cursor: pointer;
}
.product__sub-image {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.product__main-image {
	border-right: none;
	border-top: none;
	border-bottom: none;
	overflow: hidden;
	flex-grow: 1;
}

</style>
