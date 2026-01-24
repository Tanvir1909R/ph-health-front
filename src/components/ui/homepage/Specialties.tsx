import { apiLink } from "@/constant";
import { iSpecialty } from "@/interface";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Specialties = async () => {
  const res = await fetch(`${apiLink}/specialties`);
  const { data: specialties } = await res.json();
  return (
    <Container>
      <Box
        sx={{
          margin: "40px 0px",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "start",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Explore Treatments Across Specialties
          </Typography>
          <Typography fontWeight={300} component="p" fontSize={18}>
            Explore Treatments Across Specialties
          </Typography>
        </Box>
        <Stack direction="row" gap={4} mt={5}>
          {specialties.map((specialty: iSpecialty) => (
            <Box key={specialty.id} sx={{
              flex:"1",
              width:"150px",
              backgroundColor:"rgba(245,245,245,1)",
              border:"1px solid rgba(250,250,250,1)",
              borderRadius:"10px",
              textAlign:"center",
              padding:"40px 10px",
              cursor:"pointer",
              "& img":{
                width:"50px",
                height:"50px",
                margin:"0 auto"
              },
              "&:hover":{
                border:"1px solid blue"
              }
            }}>
              <Image
                src={specialty.icon}
                alt="specialty"
                width={100}
                height={100}
              />
              <Box>
                <Typography fontWeight={600} component="p" fontSize={18} mt={2}>
                  {specialty.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Specialties;
