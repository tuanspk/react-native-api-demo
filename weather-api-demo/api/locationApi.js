import axiosClient from "./axiosClient";

const locationApi = {
    get: (woeid) => {
        const url = `/location/${woeid}`;
        return axiosClient.get(url);
    },
    search: (city) => {
        const url = `/location/search/?query=${city}`;
        return axiosClient.get(url);
    },
};

export default locationApi;
