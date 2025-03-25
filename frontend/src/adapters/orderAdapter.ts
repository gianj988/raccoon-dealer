import axios, { AxiosRequestConfig } from "axios";

const axiosClient = axios.create({ baseURL: process.env.REACT_APP_API_DOMAIN });

const OrderAdapter = {
  get: async (url: string, config?: AxiosRequestConfig) => {
    const response = await axiosClient.get(url, config);
    return response.data;
  },

  post: async (url: string, data: any) => {
    const response = await axiosClient.post(url, data);
    return response.data;
  },

  patch: async (url: string, data: any) => {
    const response = await axiosClient.patch(url, data);
    return response.data;
  },

  delete: async (url: string) => {
    const response = await axiosClient.delete(url);
    return response.data;
  },
};

export { OrderAdapter };
