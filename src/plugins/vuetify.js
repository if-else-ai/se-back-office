import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
	// icon used
	icons: {
		iconfont: "mdi",
	},

	theme: {
		themes: {
			light: {
				primary: "#1e1e1f",
				secondary: "#424242",
				accent: "#82B1FF",
				error: "#FF5252",
				info: "#2196F3",
				success: "#4CAF50",
				warning: "#FFC107",
			},
		},
	},
});
