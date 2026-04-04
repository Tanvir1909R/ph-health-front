"use client";
import {
  useGetSingleUserQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/userApi";
import { Box, Button, Container, Grid, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import DoctorInformation from "./components/DoctorInformation";
import AutoFileUploader from "@/components/forms/AutoFileUploader";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ProfileUpdateModal from "./components/ProfileUpdateModal";

const DoctorProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetSingleUserQuery({});
  const [updateMYProfile, { isLoading: updateLoading }] =
    useUpdateMYProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    updateMYProfile(formData);
  };

  if (isLoading) {
    return "loading...";
  }
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: 300,
              width: "100%",
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            {data?.profilePhoto ? (
              <Image
                height={300}
                width={400}
                src={data?.profilePhoto}
                alt="User Photo"
              />
            ) : (
              <Typography>Upload image to view</Typography>
            )}
          </Box>

          {updateLoading ? (
            "uploading...."
          ) : (
            <AutoFileUploader
              name="file"
              label="Choose Your Profile Photo"
              onFileUpload={fileUploadHandler}
              variant="text"
            />
          )}

          <Button
            fullWidth
            endIcon={<ModeEditIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <DoctorInformation data={data} />
        </Grid>
      </Grid>
      <ProfileUpdateModal open={isModalOpen} setOpen={setIsModalOpen} id={data?.id}/>
    </Container>
  );
};

export default DoctorProfile;
