import { Link } from "react-router-dom";
import styles from "./styles/MainNav.module.css";
import { Typography } from "@mui/material";

export default function MainNav() {
  const items = [
    {
      title: "HOME",
      link: "/",
    },
    {
      title: "REGIONES",
      link: "/regiones",
    },
    {
      title: "ESPACIO",
      link: "/espacio",
    },
    {
      title: "GUARDIANES DE LA MEMORIA",
      link: "/landing2",
    },
  ];
  const renderMenuItems = items.map((item) => (
    <li className={styles.menuItem} key={item.title}>
      <Link className={styles.menuLink} to={item.link}>
        <Typography
          variant="h3"
          color="amazonia.first"
          sx={{ lineHeight: 3, textAlign: "center" }}
        >
          {item.title}
        </Typography>
      </Link>
    </li>
  ));
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.menu}>{renderMenuItems}</ul>
    </nav>
  );
}
