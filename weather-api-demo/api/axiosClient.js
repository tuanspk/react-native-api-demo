import axios from "axios";
import queryString from "query-string";

// setup default configuration for http requests
const axiosClient = new axios.create({
    baseURL: "https://www.metaweather.com/api",
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // handle tokens
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        // console.log(response);
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (err) => {
        // handle errors
        throw err;
    }
);

export default axiosClient;
