"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import DoctorModal from "./components/DoctorModal";
import { useState } from "react";

const DoctorsPage = () => {
  const [open,setOpen] = useState<boolean>(false)
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={()=>setOpen(true)}>Create New Doctor</Button>
        <DoctorModal open={open} setOpen={setOpen} />
        <TextField size="small" placeholder="search doctors" />
      </Stack>
    </Box>
  );
};

export default DoctorsPage;