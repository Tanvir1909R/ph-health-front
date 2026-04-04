import PhModal from "@/components/shared/PhModal";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import MultipleSelectFieldChip from "./MultipleSelectFieldChip";
import { Button, Stack } from "@mui/material";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorScheduleApi";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorScheduleModal = ({ open, setOpen }: TProps) => {
  const [selectDate, setSelectDate] = useState(new Date().toISOString());
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const query: Record<string, any> = {};
  if (!!selectDate) {
    query["startDate"] = dayjs(selectDate)
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString();

    query["endDate"] = dayjs(selectDate)
      .hour(23)
      .minute(59)
      .millisecond(999)
      .toISOString();
  }

  const { data } = useGetAllSchedulesQuery({ ...query });
  const [createDoctorSchedule, { isLoading:scheduleLoading }] = useCreateDoctorScheduleMutation();
  const onSubmit = async () => {
    try {
      const res = await createDoctorSchedule({
        schedulesIds: selectedIds,
      });
      setOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PhModal open={open} setOpen={setOpen} title="Create Doctor Schedule">
      <Stack direction={"column"} gap={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Controlled picker"
            value={dayjs(selectDate)}
            onChange={(newValue) =>
              setSelectDate(dayjs(newValue).toISOString())
            }
          />
        </LocalizationProvider>

        <MultipleSelectFieldChip
          schedules={data?.schedules}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />

        <Button
          size="small"
          onClick={onSubmit}
          loading={scheduleLoading}
          loadingIndicator="Loading…"
          variant="contained"
        >
          Submit
        </Button>
      </Stack>
    </PhModal>
  );
};

export default DoctorScheduleModal;
