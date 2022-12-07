import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "../styles/404.module.css";
import Layout from "../components/Layout";
import Link from "next/link";

const NotFound = () => {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Page not found</h4>
        <Link href={"/"}>Go back to Home page</Link>
      </div>
    </Layout>
  );
};

export default NotFound;
