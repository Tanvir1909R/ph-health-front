"use client";

import React from "react";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { Button, Stack } from "@mui/material";
import Link from "next/link";

const ScrollCategory = ({specialties}:{specialties:string}) => {
  const { data } = useGetAllSpecialtiesQuery(undefined);
  const router = useRouter();
  const [value, setValue] = React.useState(specialties || "");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/doctors?specialties=${newValue}`);
  };

  return (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      {data ? (
        <>
          <Box sx={{ maxWidth: "100%", bgcolor: "background.paper" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {data?.map((specialty: any) => (
                <Tab
                  key={specialty.id}
                  label={specialty.title}
                  value={specialty.title}
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Tabs>
          </Box>
          <Box>
            <Button LinkComponent={"a"} href={"/doctors"} variant="outlined">
              View all
            </Button>
          </Box>
        </>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default ScrollCategory;
