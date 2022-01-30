import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

const handleSuccess = <T>(response: AxiosResponse<T>) => response.data;

export const makePostRequest = async <T>(url: string, data: any) =>
  axios.post<T>(`${BASE_URL}/${url}`, data).then(handleSuccess);

export const makePatchRequest = async <T>(url: string, data: any) =>
  axios.patch<T>(`${BASE_URL}/${url}`, data).then(handleSuccess);

export const makeGetRequest = async <T>(url: string, data?: any) =>
  axios
    .get<T>(`${BASE_URL}/${url}`, {
      data,
    })
    .then(handleSuccess);
