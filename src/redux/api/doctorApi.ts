import { IDoctor } from "@/types/doctor";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
import { iMeta } from "@/types";

const doctorApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        createDoctor: build.mutation({
            query:(data)=>({
                url:"/user/create-doctor",
                method:"POST",
                contentType:"multipart/form-data",
                data
            }),
            invalidatesTags:[tagTypes.doctor]
        }),
        getAllDoctors: build.query({
            query:(arg:Record<string,any>)=>({
                url:"/doctors",
                method:"GET",
                params:arg
            }),
            transformResponse:(response:IDoctor[],meta:iMeta)=>{
                return{
                    doctors:response,
                    meta
                }
            }
        })
    })
})


export const {useCreateDoctorMutation,useGetAllDoctorsQuery} = doctorApi