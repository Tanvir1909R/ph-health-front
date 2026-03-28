'use client';
import { Box, Button, IconButton } from '@mui/material';
import ScheduleModal from './components/ScheduleModal';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDeleteScheduleMutation, useGetAllSchedulesQuery } from '@/redux/api/scheduleApi';
import dayjs from 'dayjs';
import { dateFormatter } from '@/utils/dateFormatter';
import { ISchedule } from '@/types/schedule';
import { toast } from 'sonner';

const SchedulesPage = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [allSchedule, setAllSchedule] = useState<any>([]);
   const { data, isLoading } = useGetAllSchedulesQuery({});
   const [deleteSchedule] = useDeleteScheduleMutation();

   const schedules = data?.schedules;
   console.log(schedules);
   
   const meta = data?.meta;

   const handleDelete = async(id:string)=>{
       try {
         const res = await deleteSchedule(id).unwrap()
         if(res?.id){
           toast.success("Doctor delete successful!")
         }
         
       } catch (error:any) {
         console.log(error.message);
         
       }
     }
   
   useEffect(() => {
      const updateData = schedules?.map(
         (schedule: ISchedule, index: number) => {
            return {
               id: schedule?.id,
               startDate: dateFormatter(schedule.startDateTime),
               endDate: dateFormatter(schedule.endDateTime),
               startTime: dayjs(schedule?.startDateTime).format('hh:mm a'),
               endTime: dayjs(schedule?.endDateTime).format('hh:mm a'),
            };
         }
      );
      setAllSchedule(updateData);
   }, [schedules]);

   const columns: GridColDef[] = [
      { field: 'startDate', headerName: 'Start Date', flex: 1 },
      { field: 'endDate', headerName: 'End Date', flex: 1 },
      { field: 'startTime', headerName: 'Start Time', flex: 1 },
      { field: 'endTime', headerName: 'End Time', flex: 1 },
      {
         field: 'action',
         headerName: 'Action',
         flex: 1,
         headerAlign: 'center',
         align: 'center',
         renderCell: ({ row }) => {
            return (
               <IconButton aria-label='delete' onClick={()=> handleDelete(row?.id)}>
                  <DeleteIcon sx={{ color: 'red' }} />
               </IconButton>
            );
         },
      },
   ];
   return (
      <Box>
         <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
         <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
         {!isLoading ? (
            <Box my={2}>
               <DataGrid rows={allSchedule ?? []} columns={columns} />
            </Box>
         ) : (
            <h1>Loading.....</h1>
         )}
      </Box>
   );
};

export default SchedulesPage;