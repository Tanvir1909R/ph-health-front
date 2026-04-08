'use client';

import { Box, Chip, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VideocamIcon from '@mui/icons-material/Videocam';
import Link from 'next/link';
import { dateFormatter } from '@/utils/dateFormatter';
import { useGetMyAppointmentsQuery } from '@/redux/api/appointmentApi';
import dayjs from 'dayjs';

const PatientAppointmentsPage = () => {
   const { data, isLoading } = useGetMyAppointmentsQuery({});
   const appointments = data?.appointments;
   const meta = data?.meta;

   const columns: GridColDef[] = [
      {
         field: 'name',
         headerName: 'Doctor Name',
         flex: 1,
         renderCell: ({ row }) => {
            return row.doctor.name;
         },
      },
      {
         field: 'appointmentDate',
         headerName: 'Appointment Date',
         headerAlign: 'center',
         align: 'center',
         flex: 1,
         renderCell: ({ row }) => {
            return dateFormatter(row.schedule.startDateTime);
         },
      },
      {
         field: 'appointmentTime',
         headerName: 'Appointment Time',
         headerAlign: 'center',
         align: 'center',
         flex: 1,
         renderCell: ({ row }) => {
            return dayjs(row.schedule.startDateTime).format("hh:mm a");
         },
      },

      {
         field: 'paymentStatus',
         headerName: 'Payment Status',
         flex: 1,
         headerAlign: 'center',
         align: 'center',
        //  renderCell: ({ row }) => {
        //     return row.paymentStatus === 'PAID' ? (
        //        <PhChips label={row.paymentStatus} type='success' />
        //     ) : (
        //        <PhChips label={row.paymentStatus} type='error' />
        //     );
        //  },
      },
      {
         field: 'action',
         headerName: 'Join',
         flex: 1,
         headerAlign: 'center',
         align: 'center',
         renderCell: ({ row }) => {
            return (
               <IconButton
                  component={Link}
                  href={`/video?videoCallingId=${row?.videoCallingId}`}
                  disabled={row.paymentStatus === 'UNPAID'}
               >
                  <VideocamIcon
                     sx={{
                        color:
                           row.paymentStatus === 'PAID' ? 'primary.main' : '',
                     }}
                  />
               </IconButton>
            );
         },
      },
   ];

   return (
      <Box>
         {!isLoading ? (
            <Box my={2}>
               <DataGrid
                  rows={appointments ?? []}
                  columns={columns}
                  loading={isLoading}
               />
            </Box>
         ) : (
            <h1>Loading.....</h1>
         )}
      </Box>
   );
};

export default PatientAppointmentsPage;