import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";
import Search from "./Search";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={"/"}>Events </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href={"/events"}>New Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
