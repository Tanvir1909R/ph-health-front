"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  return (
    <Box bgcolor="rgb(17,26,34)" py={4}>
      <Container>
        <Stack direction="row" justifyContent="center" gap={4} py={1}>
          <Link href={"/"} className="text-white">
            Consultation
          </Link>
          <Link href={"/"} className="text-white">
            Health Plans{" "}
          </Link>
          <Link href={"/"} className="text-white">
            Medicine
          </Link>
          <Link href={"/"} className="text-white">
            Diagnostics
          </Link>
          <Link href={"/"} className="text-white">
            NGOs
          </Link>
        </Stack>
        <Stack direction="row" justifyContent="center" gap={4} py={2}>
          <FacebookRoundedIcon htmlColor="white" />
          <InstagramIcon htmlColor="white" />
          <XIcon htmlColor="white" />
          <LinkedInIcon htmlColor="white" />
        </Stack>
        <Box
          sx={{
            border: "1px dashed lightgray",
          }}
        ></Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <Typography component="p" color="white">
            &copy; 2025 health care. All right reserved
          </Typography>
          <Typography component="a" variant="h5" href="/" color="white">
            <Box color="primary.main" component="span" fontWeight={700}>
              H
            </Box>
            ealth Care
          </Typography>
          <Typography component="p" color="white">
            Privacy Policy Terms & Condition
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
