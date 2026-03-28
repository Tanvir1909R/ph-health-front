import PhDatepicker from "@/components/forms/PhDatepicker";
import PhForm from "@/components/forms/PhForm";
import PhTimepicker from "@/components/forms/PhTimePicker";
import PhModal from "@/components/shared/PhModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate)
    values.endDate = dateFormatter(values.endDate)
    values.startTime = timeFormatter(values.startTime)
    values.endTime = timeFormatter(values.endTime)
    try {
      const res = await createSchedule(values);
      if(res?.data.length){
        toast.success("Schedules created successfully!")
        setOpen(false)
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <PhModal open={open} setOpen={setOpen} title="Create Schedule">
      <PhForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} mb={2}>
          <Grid item md={12}>
            <PhDatepicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={12}>
            <PhDatepicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <PhTimepicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <PhTimepicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Button type="submit" sx={{mt:2}}>Create</Button>
      </PhForm>
    </PhModal>
  );
};

export default ScheduleModal;
