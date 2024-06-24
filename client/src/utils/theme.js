import { createTheme } from "@mui/material";

// GENERAL USE THEME
const theme = {
  palette: {
    primary: {
      main: "#1b3832",
      light: "#eee",
      dark: "#999",
    },
    secondary: {
      main: "#ffb810",
      light: "#e6c87f",
      dark: "#734D1F",
    },
    atlantica: {
      second: "rgb(73,61,134)",
      first: "rgb(0,147,212)",
      third: "rgb(108,228,229)",
    },
    pacifica: {
      second: "rgb(59,128,77)",
      first: "rgb(57,177,74)",
      third: "rgb(255,194,66)",
    },
    andina: {
      first: "rgb(136,48,171)",
      second: "rgb(167,64,136)",
      third: "rgb(221,132,174)",
    },
    amazonia: {
      first: "rgb(191,4,19)",
      second: "rgb(242,182,96)",
      third: "rgb(3,10,140)",
    },
    orinoquia: {
      first: "rgb(242,159,5)",
      second: "rgb(49,113,51)",
      third: "rgb(245,69,46)",
    },
    background: { main: "#0e0f13", light: "#444444", dark: "#1e1e1e" },
    gray: "#777",
    black: "#000000",
    white: "#ffffff",
    translucidBlack: "#000000dd",
    transparent: "rgba(0,0,0,0)",
    disabled: "#777",
  },
  gradient: {
    golden: `linear-gradient(100deg, rgba(203,111,44) 0%, rgba(253,238,142) 40%, rgba(203,111,44) 100%)`,
  },
  breakpoints: {
    values: {
      xs: 0,
      ss: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};
// MUI THEME
const muiTheme = createTheme({
  ...theme,
  typography: {
    fontFamily: "Nunito Sans",
    fontWeightRegular: 300,
    button: {
      textTransform: "none",
    },
    h1: {
      fontFamily: "Monday Vacation",
      fontWeight: 500,
      fontSize: "3rem",
    },
    h2: {
      fontFamily: "Monday Vacation",
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h3: {
      fontFamily: "Montserrat",
      fontWeight: 700,
      fontSize: "1.1rem",
    },
    h4: {
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: "1rem",
    },
    h5: {
      fontFamily: "Nunito Sans",
      fontWeight: 500,
      fontSize: "1.3rem",
    },
    h6: {
      fontFamily: "Nunito Sans",
      fontWeight: 300,
      fontSize: "1.1rem",
    },
    //////////////
    body: {
      fontFamily: "Nunito Sans",
      fontWeight: 300,
      fontSize: "0.9rem",
    },
    bodyStrong: {
      fontFamily: "Nunito Sans",
      fontWeight: 500,
      fontSize: "0.9rem",
    },
    caption: {
      fontFamily: "Nunito Sans",
      fontWeight: 300,
      fontSize: "0.75rem",
      marginY: 0,
    },
    captionStrong: {
      fontFamily: "Nunito Sans",
      fontWeight: 500,
      fontSize: "0.75rem",
      marginY: 0,
    },
    label: {
      fontFamily: "Nunito Sans",
      fontWeight: 300,
      fontSize: "0.9rem",
    },
    helperText: {
      fontFamily: "Nunito Sans",
      fontWeight: 200,
      fontSize: "0.9rem",
      color: theme.palette.gray.light,
    },
    error: {
      fontFamily: "Nunito Sans",
      fontWeight: 200,
      fontSize: "0.9rem",
      color: "#d32f2f",
    },
    smaller: {
      fontFamily: "Nunito Sans",
      fontWeight: 200,
      fontSize: "0.6rem",
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 8,
          "&:last-child": {
            paddingBottom: 8,
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        // displayEmpty: true,
      },
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.gray.light}`,
        },
        icon: {
          // color: "red",
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          color: theme.palette.secondary.main,
          fontSize: "0.9rem",
          "&.Mui-focused": {
            // paddingTop: 40,
            color: theme.palette.secondary.main,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: theme.palette.gray.light,
          fontSize: "4px",
        },
      },
    },
  },
  // overrides: {
  //   MuiInput: {
  //     input: {
  //       "&::placeholder": {
  //         color: "red",
  //       },
  //       color: "white", // if you also want to change the color of the input, this is the prop you'd use
  //     },
  //   },
  // },
});

// INLINE COMPONENT STYLES

const styles = {
  profileImageSquare: {
    width: "80px",
    height: "80px",
    // minWidth: "40px",
    // minHeight: "40px",
    borderRadius: "20px",
    border: `1px solid ${theme.palette.primary.main}`,
    objectFit: "cover",
    objectPosition: "center",
    aspectRatio: 1,
  },
  link: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  iconLg: { fontSize: "large" },
  // bottomContent: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   width: "60%",
  //   display: "flex",
  //   justifyContent: "center",
  //   margin: "0 auto",
  // },
  // Size & center button @ page bottom (usually placed with style.topAndBottomContentDiv )
  bottomButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    marginTop: "24px",
    paddingX: "8px",
  },
  // Place content @ top & bottom. Use <div></div> to select wich content goes where. See CreateOrEditCar.jsx
  topAndBottomContentDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  feedInput: {
    bgcolor: theme.palette.gray.main,
    color: theme.palette.primary.main,
    borderRadius: "20px",
    padding: "8px",
    margin: "0px",
    width: "100%",
    border: 0,
  },
};

// COLOR FILTERS TO CONTROL COLOR OF IMAGES (MOSTLY USED AS ICONS)
// Convert any monochrome image w/ alpha channel to a theme color
const filter = {
  toPrimary:
    "brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(1332%) hue-rotate(340deg) brightness(115%) contrast(60%)",
  toSecondary:
    "brightness(0) saturate(100%) invert(86%) sepia(24%) saturate(5123%) hue-rotate(324deg) brightness(99%) contrast(85%)",
};

export { muiTheme, styles, theme, filter };
