<template>
	<v-container>
		<h1 class="page-header">Products Dashboard</h1>
		<div class="product">
            <v-card class="form" v-for="(product, index) in sortedProduct" :key="index" >
                <h3>Product Name: {{ product.product_name }}</h3>
                <h3>total_core :{{ product.total_core }}</h3>
                <h3>statistic:</h3>
                <li class="" v-for="(product, index) in product.statistic" :key="index">
                    {{`${index + 1}.time:${product.time} used_core: ${product.used_core}` }}
                </li>
            </v-card>
		</div>
	</v-container>
</template>

<style src="./style.css"> </style>

<script>
export default {
	data: () => ({

	}),

    computed: {
        sortedProduct(){
            let products = this.$store.getters.products
            // sort product used_core
            products.forEach(product => {
                product.statistic.sort((a, b) => {
                    return b.used_core - a.used_core
                })
            })

            // remove object after index 15 if statistic length > 15
            products.forEach(product => {
                let n = product.statistic.length > 15 ? 15 : product.statistic.length;
                product.statistic = product.statistic.slice(0,n)
            })

            return products
        },
    },

    // before render component -> get product
    created(){
        this.$store.dispatch('getProducts')
    },

    methods: {

    }
};
</script>



