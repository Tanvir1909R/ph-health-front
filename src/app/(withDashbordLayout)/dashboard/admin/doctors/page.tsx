"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import DoctorModal from "./components/DoctorModal";
import { useState } from "react";
import { useDeleteDoctorMutation, useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounce } from "@/redux/hooks";
import { toast } from "sonner";

const DoctorsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const query:Record<string,any> = {}
  const [search,setSearch] = useState<string>('')
  const debounceTerm = useDebounce({searchQuery:search,delay:800})
  if(!!debounceTerm){
    query["search"] = search
  }
  const { data, isLoading } = useGetAllDoctorsQuery({...query});
  const [deleteDoctor] = useDeleteDoctorMutation();
  const doctors = data?.doctors;
  const meta = data?.meta

  const handleDelete = async(id:string)=>{
    try {
      const res = await deleteDoctor(id).unwrap()
      if(res?.id){
        toast.success("Doctor delete successful!")
      }
      
    } catch (error:any) {
      console.log(error.message);
      
    }
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex:1 },
    { field: "email", headerName: "Email", flex:1 },
    { field: "contactNumber", headerName: "Contact", flex:1 },
    { field: "gender", headerName: "Gender", flex:1 },
    { field: "appointmentFee", headerName: "Appointment Fee", flex:1 },
    {
      field: "action",
      headerName: "Action",
      flex:1,
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete" onClick={()=> handleDelete(row?.id)} >
            <DeleteIcon/>
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setOpen(true)}>Create New Doctor</Button>
        <DoctorModal open={open} setOpen={setOpen} />
        <TextField onChange={(e)=> setSearch(e.target.value)} size="small" placeholder="search doctors" />
      </Stack>
      {!isLoading ? (
        <Box sx={{mt:2}}>
          <DataGrid rows={doctors} columns={columns} />
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </Box>
  );
};

export default DoctorsPage;
