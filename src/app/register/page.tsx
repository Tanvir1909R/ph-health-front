"use client";
import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/server/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/server/actions/loginPatient";
import { storeUserInfo } from "@/server/auth.service";
import PhForm from "@/components/forms/PhForm";
import PhInput from "@/components/forms/PhInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const patientValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number!"),
  address: z.string().min(1, "Please enter your address!"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  patient: patientValidationSchema,
});

export const defaultValues = {
  password: "",
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
};

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const onFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      if (res?.data?.id) {
        const userRes = await userLogin({
          email: values.patient.email,
          password: values.password,
        });
        if (userRes?.data?.accessToken) {
          storeUserInfo(userRes?.data?.accessToken);
          router.push("/dashboard");
        } else {
          setError(res.message);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Box>
              <Image src={assets.svgs.logo} alt="logo" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>
          {error && (
            <Box>
              <Typography
                sx={{
                  padding: "1px",
                  borderRadius: "2px",
                  color: "red",
                  marginTop: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box>
            <PhForm
              onSubmit={onFormSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid2 container spacing={2} my={2}>
                <Grid2 size={{ md: 12 }}>
                  <PhInput
                    label="Name"
                    type="text"
                    fullWidth={true}
                    name="patient.name"
                  />
                </Grid2>
                <Grid2 size={{ md: 6 }}>
                  <PhInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid2>
                <Grid2 size={{ md: 6 }}>
                  <PhInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid2>
                <Grid2 size={{ md: 6 }}>
                  <PhInput
                    label="Contact Number"
                    type="tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                </Grid2>
                <Grid2 size={{ md: 6 }}>
                  <PhInput
                    label="Address"
                    type="text"
                    fullWidth={true}
                    name="patient.address"
                  />
                </Grid2>
              </Grid2>
              <Button fullWidth={true} sx={{ margin: "10px 0" }} type="submit">
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you have an account? <Link href={"/login"}>Login</Link>
              </Typography>
            </PhForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
