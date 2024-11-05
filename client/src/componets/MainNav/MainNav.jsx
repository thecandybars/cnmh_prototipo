import { Box, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ViewsBreadcrumbs from "../Mapa/components/ViewsBreadcrumbs";

export default function MainNav() {
  return (
    <div position="absolute">
      <Stack position="absolute" sx={{ top: 0, zIndex: 100 }} width="100%">
        <ViewsBreadcrumbs />
        <Box
          display="flex"
          justifyContent="space-between"
          bgcolor="rgba(0,0,0,0)"
        >
          <Box p={2} bgcolor="secondary.main" color="black">
            <MenuIcon fontSize="large" />
          </Box>
          <Box p={2} bgcolor="secondary.main" color="black">
            <PeopleAltIcon fontSize="large" />
          </Box>
        </Box>
      </Stack>
    </div>
  );
}

// import { Link } from "react-router-dom";
// import styles from "./styles/MainNav.module.css";
// import { Box, Typography } from "@mui/material";
// import { theme } from "../../utils/theme";

// export default function MainNav() {
//   const items = [
//     {
//       title: "MAPA",
//       link: "/",
//     },
//     {
//       title: "GUARDIANES DE LA MEMORIA",
//       link: "/guardianes",
//     },
//   ];
//   const renderMenuItems = items.map((item) => (
//     <li className={styles.menuItem} key={item.title}>
//       <Link className={styles.menuLink} to={item.link}>
//         <Typography
//           variant="h3"
//           color="primary"
//           sx={{ lineHeight: 3, textAlign: "center" }}
//         >
//           {item.title}
//         </Typography>
//       </Link>
//     </li>
//   ));
//   return (
//     <nav
//       className={styles.navContainer}
//       style={{
//         display: "flex",
//         justifyContent: "end",
//         margin: 0,
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: theme.palette.secondary.main,
//           display: "flex",
//           paddingLeft: "100px",
//           justifyContent: "start",
//           borderTopLeftRadius: "50px",
//           borderBottomLeftRadius: "50px",
//         }}
//       >
//         <ul className={styles.menu}>{renderMenuItems}</ul>
//       </Box>
//     </nav>
//   );
// }
