/* eslint-disable react-hooks/exhaustive-deps */

import PhForm from "@/components/forms/PhForm";
import PhInput from "@/components/forms/PhInput";
import PhSelectField from "@/components/forms/PhSelectField";
import PhFullScreenModal from "@/components/shared/PhFullScreenModal";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { Gender } from "@/types";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import MultipleSelectChip from "./MultipleSelectChip";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetSingleUserQuery, useUpdateMYProfileMutation } from "@/redux/api/userApi";
import { useUpdateDoctorMutation } from "@/redux/api/doctorApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  experience: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional(),
  ),
  appointmentFee: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional(),
  ),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data: doctorData, refetch, isSuccess } = useGetSingleUserQuery({});
  const { data: allSpecialties } = useGetAllSpecialtiesQuery({});
  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation({});
  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);
  console.log(doctorData);
  
  useEffect(() => {
    if (!isSuccess) return;
    setSelectedSpecialtiesIds(
      doctorData?.doctorSpecialties.map((sp: any) => sp?.specialtiesId),
    );
  }, [isSuccess]);

  const submitHandler = async (values: FieldValues) => {
    const existedSpecialties = doctorData?.doctorSpecialties;
    const newSpecialties = selectedSpecialtiesIds.map((specialtyId: string) => ({
      specialtyId,
      isDeleted: false,
    }));

    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "needPasswordChange",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "averageRating",
      "review",
      "profilePhoto",
      "registrationNumber",
      "schedules",
      "doctorSpecialties",
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        return !excludedFields.includes(key);
      }),
    );

    const newSpecialtiesSet = new Set(newSpecialties?.map((specialty:{specialtyId:string, isDeleted:boolean}) => specialty.specialtyId))
    const deletedSpecialties = existedSpecialties.filter((specialty:{specialtiesId:string, doctorId:string}) => !newSpecialtiesSet.has(specialty.specialtiesId)).map((sp:{specialtiesId:string,doctorId:boolean})=> ({specialtyId:sp.specialtiesId, isDeleted:true}))
    
    updatedValues.specialties = [...newSpecialties,...deletedSpecialties];

    try {
      updateDoctor({ body: updatedValues, id });
      setOpen(false);
      refetch();
      // console.log(updatedValues);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PhFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <PhForm
        onSubmit={submitHandler}
        defaultValues={doctorData}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <PhInput name="name" label="Name" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PhInput
              name="email"
              type="email"
              label="Email"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PhInput
              name="contactNumber"
              label="Contract Number"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PhInput name="address" label="Address" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PhInput
              name="registrationNumber"
              label="Registration Number"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PhInput
              name="experience"
              type="number"
              label="Experience"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PhSelectField
              items={Gender}
              name="gender"
              label="Gender"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PhInput
              name="appointmentFee"
              type="number"
              label="AppointmentFee"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PhInput
              name="qualification"
              label="Qualification"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <PhInput
              name="currentWorkingPlace"
              label="Current Working Place"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PhInput
              name="designation"
              label="Designation"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <MultipleSelectChip
              allSpecialties={allSpecialties}
              selectedIds={selectedSpecialtiesIds}
              setSelectedIds={setSelectedSpecialtiesIds}
            />
          </Grid>
        </Grid>
        <Button type="submit" disabled={updating}>
          Save
        </Button>
      </PhForm>
    </PhFullScreenModal>
  );
};

export default ProfileUpdateModal;
