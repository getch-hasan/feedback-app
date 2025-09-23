const { getToken } = require("@/utils/helpers");
const { default: axios } = require("axios")
const apiUrl = "http://127.0.0.1:8000/api/"
axios.defaults.headers.post["Content-Type"]="application/json"
const publicRequest=axios.create({
    baseURL:apiUrl
})
const privetRequest=axios.create({
    baseURL:apiUrl
});
//public req config
publicRequest.interceptors.request.use(
    async(config)=>{
        if(config.headers=== undefined){
            config.headers={}
        }
        return config;
    },
    (err) => {
       
        Promise.reject(err);
    }
);
/* Private request config */
privetRequest.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (config.headers === undefined) {
            config.headers = {};
        }
        if (token) {
            config.headers["content-type"] = 'multipart/form-data';
            config.headers["Authorization"] = "Bearer " + token || "";
        }
        return config;
    }, 
    (err) => {
       
        Promise.reject(err);
    }
);
export { publicRequest, privetRequest };
