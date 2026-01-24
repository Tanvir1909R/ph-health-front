import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1586FD",
    },
    secondary: {
      main: "#666f73",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiContainer:{
        defaultProps:{
            maxWidth:"lg"
        }
    },

  },
  typography:{
    fontFamily:"Roboto Condensed, sans-serif",
    body1:{
        color:"#0B1134CC"
    }
  }
});


theme.shadows[1] = "0px 5px 22px lightgray"
export default theme;
