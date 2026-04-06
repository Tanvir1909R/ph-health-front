import DashedLine from "@/components/ui/doctor/DashedLine";
import DoctorCard from "@/components/ui/doctor/DoctorCard";
import ScrollCategory from "@/components/ui/doctor/ScrollCategory";
import { Doctor } from "@/types/doctor";
import { Box, Container, styled } from "@mui/material";
import React from "react";

const Doctors = async ({
  searchParams,
}: {
  searchParams: { specialties: string };
}) => {
  console.log();
  let res;
  if (searchParams.specialties) {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctors?specialties=${searchParams.specialties}`);
  } else {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctors`);
  }
  const { data } = await res.json();

  return (
    <Container>
      <DashedLine />
      <ScrollCategory specialties={searchParams.specialties} />
      <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
        {data?.map((doctor: Doctor, index: number) => (
          <Box key={doctor?.id}>
            <DoctorCard doctor={doctor} />
            {index === data.length - 1 ? null : <DashedLine />}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Doctors;
