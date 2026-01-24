import {
  Box,
  List,
  Stack,
  Typography,
} from "@mui/material";
import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SideBarItem from "./SideBarItem";
import { getUserInfo } from "@/server/auth.service";
import { useEffect, useState } from "react";


const Sidebar = () => {
  const [userRole,setUserRole] = useState("")
  useEffect(()=>{
    const userInfo = getUserInfo();
    setUserRole(userInfo.role)
  },[])
  return (
    <Box>
      <Link href={"/"}>
        <Stack
          sx={{
            py: 1,
            mt: 1,
          }}
          direction={"row"}
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <Image src={assets.svgs.logo} width={40} height={40} alt="logo" />
          <Typography variant="h6" component="h1" sx={{ cursor: "pointer" }}>
            PH Health Care
          </Typography>
        </Stack>
      </Link>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SideBarItem item={item} key={index} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
