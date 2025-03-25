import axios, { AxiosRequestConfig } from "axios";

const axiosClient = axios.create({ baseURL: process.env.REACT_APP_API_DOMAIN });

const ProductsAdapter = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    const response = await axiosClient.get(url, config);
    return response.data;
  },

  post: async (url: string, data: any) => {
    const response = await axiosClient.post(url, data);
    return response.data;
  },

  put: async (url: string, data: any) => {
    const response = await axiosClient.put(url, data);
    return response.data;
  },

  delete: async (url: string) => {
    const response = await axiosClient.delete(url);
    return response.data;
  },
};

export { ProductsAdapter };
