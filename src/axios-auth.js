import axios from "axios";

const instance = axios.create({
	baseURL: "localhost:3000",
});

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance;
