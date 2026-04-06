import { authKey } from "@/constant";
import setAccessToken from "@/server/actions/setAccessToken";
import { getNewAccessToken } from "@/server/auth.service";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
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
  }, async function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const config = error.config;
    if(error?.response?.data?.error?.message === "jwt expired" && !config.sent){
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage('accessToken', accessToken)
      setAccessToken(accessToken)
      return instance(config)
    }else{
          const responseObject:IGenericErrorResponse = {
            statusCode: error?.response?.data?.statusCode || 500,
            message: error?.response?.data?.message || "something went wrong!",
            errorMessages: error?.response?.data?.message
        }
        return responseObject;
    }
    
        
  });


export {instance};