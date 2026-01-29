import { authKey } from "@/constant";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;


instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if(accessToken){
        config.headers.Authorization = accessToken;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
//@ts-ignore
instance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const responseObject:ResponseSuccessType = {
        data: response?.data?.data,
        meta:response?.data?.meta
    }
    return responseObject;
  }, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
        const responseObject:IGenericErrorResponse = {
            statusCode: error?.response?.data?.statusCode || 500,
            message: error?.response?.data?.message || "something went wrong!",
            errorMessages: error?.response?.data?.message
        }
    return responseObject;
  });


export {instance};