import { Link } from "react-router-dom";
import styles from "./styles/MainNav.module.css";

export default function MainNav() {
  const items = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Region",
      link: "/regiones",
    },
    {
      title: "Espacio",
      link: "/espacio",
    },
  ];
  const renderMenuItems = items.map((item) => (
    <li className={styles.menuItem} key={item.title}>
      <Link className={styles.menuLink} to={item.link}>
        {item.title}
      </Link>
    </li>
  ));
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.menu}>{renderMenuItems}</ul>
    </nav>
  );
}
