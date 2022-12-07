import Link from "next/link";
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.logo}>Copyright &copy; Events 2022 </p>
      <p>
        <Link href={"/about"}>About this app</Link>
      </p>
    </footer>
  );
};

export default Footer;
