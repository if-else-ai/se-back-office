<template>
	<v-container>
		<h1 class="page-header">Insert Product</h1>
		<div class="warehouse">
            <v-card class="form">
                <h3>CPU Name</h3>
                <v-text-field class="text-field" v-model="product_name" @change="validateForm" placeholder="ex. Intel core i8-8770k"/>
                <h3>Total Core</h3>
                <v-text-field class="text-field" v-model="total_core" @change="validateForm" placeholder="Number"/>
                <h3>Statistic</h3>
                
                <v-row>
                    <!-- cols is length -->
                    <v-col cols="4">
                        <v-text-field label="at time" class="text-field" v-model="time" @change="roundTime" placeholder="second"/>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field label="used core" class="text-field" v-model="used_core" @change="validateForm" placeholder="y time"/>
                    </v-col>
                    <v-col align-self="center" cols="4">
                        <v-btn @click="addStat">add stat</v-btn>
                    </v-col>
                </v-row>

                <!-- validation status-->
                <p :class="'validation-text ' + `${form_status} `"> {{ `*${stat_validation_text}` }}</p>
                
                <!-- display list of data -->
                <li v-for="(data, index) in statistic" :key="index">
                    time: {{data.time}} used_core: {{data.used_core}}
                </li>

                <!-- submit button -->
                <v-btn @click="submitForm" > enter </v-btn>
                <!-- validation status-->
                <p :class="'validation-text ' + `${form_status} `"> {{ `*${form_validation_text}` }}</p>
            </v-card>
		</div>
	</v-container>
</template>

<style src="./style.css"> </style>

<script>
export default {
	data: () => ({
        product_name: '',
        total_core: '',
        used_core: '',
        time: 0,
        statistic: [],
        validation: '',
        timeIsValid: true,
        form_validation_text: '',
        stat_validation_text: '',
        form_status: 'form-status__hidden',
        form_is_valid: false
	}),

    created(){
        
    },

    computed: {
        // products data
        products(){
            return this.$store.getters.products
        }
    },

    methods: {
        // form handler
        addStat() {
            this.validateTime()
            if(Number(this.used_core) > Number(this.total_core)){
                this.stat_validation_text = 'used core > total core'
                this.form_status = 'form-status__invalid'
            } else if (this.time < 0 ){
                this.stat_validation_text = 'time cannot be lower than 0'
                this.form_status = 'form-status__invalid'
            } else if (!this.timeIsValid){
                this.stat_validation_text = 'current time cannot be more than last time '
                this.form_status = 'form-status__invalid'
            } else {
                this.stat_validation_text = ''
                let stat = {
                    time: this.time,
                    used_core: this.used_core
                }
                this.statistic.push(stat)
                this.time+= 5
                this.used_core = ''
            }
        },
        // validate form input
        validateForm(){
             if(this.product_name === '' ){
                this.form_validation_text = 'Please enter product name'
                this.form_status = 'form-status__invalid'
                this.form_is_valid = false
            } else if(this.statistic.length === 0) {
                this.form_validation_text = 'Please enter statistic'
                this.form_status = 'form-status__invalid'
                this.form_is_valid = false
            } else if(this.total_core === ''){
                this.form_validation_text = 'Please enter total core'
                this.form_status = 'form-status__invalid'
                this.form_is_valid = false
            } else {
                this.form_validation_text = 'form is valid'
                this.form_status = 'form-status__valid'
                this.form_is_valid = true
            }

        },

        validateTime(){
            if(this.statistic.length > 0){
                let last_time = this.statistic[this.statistic.length - 1].time
                if(this.time < last_time){
                    this.timeIsValid = false
                    return
                } else {
                    this.timeIsValid = true
                }
            }
        },

        roundTime(){
            this.time = Math.ceil(this.time/5)
            this.time = this.time*5
        },

        submitForm() {
            this.validateForm()
            if(this.form_is_valid){
                let formData = {
                    product_name: this.product_name,
                    total_core: this.total_core,
                    statistic: this.statistic,
                }
                this.$store.dispatch('addProduct', formData)
            } else {
                // alert('form is not valid')
            }
        },

    }
};

</script>

