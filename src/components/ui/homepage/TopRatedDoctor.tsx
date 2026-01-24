import { apiLink } from "@/constant";
import { iDoctor } from "@/interface";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const TopRatedDoctor = async () => {
  const res = await fetch(`${apiLink}/doctors?limit=3&page=1`);
  const { data: doctors } = await res.json();
  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20,20,20,0.1)",
        clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Our Top Rated Doctor
        </Typography>
        <Typography component="p" fontWeight={400} fontSize={18} sx={{ mt: 2 }}>
          Access to expert physician and surgeons, advance technology
        </Typography>
        <Typography component="p" fontWeight={400} fontSize={18}>
          and top quality surgery facilities right here.
        </Typography>
      </Box>

      <Container sx={{ margin: "30px auto" }}>
        <Stack direction="row" spacing={2}>
          {doctors.map((doctor: iDoctor) => (
            <Box key={doctor.id}>
              <Card>
                <Box sx={{
                  "& img":{
                    objectFit:"cover",
                    width:"100%",
                    height:"300px"
                  }
                }}>
                  <Image
                    src={doctor.profilePhoto}
                    alt="doctor"
                    width={100}
                    height={100}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {doctor.qualification}, {doctor.designation}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }} my={1}>
                    <LocationOnIcon /> {doctor.address}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <LocalHospitalIcon /> {doctor.currentWorkingPlace}
                  </Typography>
                </CardContent>
                <CardActions sx={{
                  justifyContent:"space-between",
                  px:2,
                  paddingBottom:"20px"
                }}>
                  <Button >Book Now</Button>
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default TopRatedDoctor;
