import axios from "axios";

const instance = axios.create({
	baseURL: "http://139.59.219.217:5101",
});

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance;
