import axios from "axios";

const api = axios.create({
    //baseURL: "https://teste-api.eletrofrio.com.br:5600/Comercial/"
    baseURL: "https://localhost:5001/"

});

export default api;
