"use client";
import { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import DoctorScheduleModal from "../components/DoctorScheduleModal";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { GridColDef } from "@mui/x-data-grid";
import { ISchedule } from "@/types/schedule";

const DoctorSchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const { data, isLoading } = useGetAllDoctorSchedulesQuery({});
  const schedules = data?.doctorSchedules;
  
  useEffect(() => {
    const updateData = schedules?.map((schedule: any, index: number) => {
      return {
        id: schedule?.scheduleId,
        startDate: dateFormatter(schedule?.schedule?.startDateTime),
        startTime: dayjs(schedule?.schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.schedule?.endDateTime).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  const handleDelete = async (id: string) => {
    try {
    //   const res = await deleteSchedule(id).unwrap();
    //   if (res?.id) {
    //     toast.success("Doctor delete successful!");
    //   }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "startDate", headerName: "Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete" onClick={() => handleDelete(row?.id)}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>
        Create Doctor Schedule
      </Button>
      <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />

      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={allSchedule?.sort((a:any,b:any)=> a.startDate.localeCompare(b.startDate)) ?? []} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default DoctorSchedulesPage;
