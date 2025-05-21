import axios from "axios";

const api = axios.create({
    baseURL: 'https://pizzaria-backend-phi.vercel.app/'
})

export { api }