import Head from "next/head";
import React, { FC, PropsWithChildren, ReactNode } from "react";
import styles from "../styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";

type TLayoutProps = {
  title?: string;
  keywords?: string;
  description?: string;
  children: ReactNode;
};

const Layout: FC<TLayoutProps> = ({
  title,
  keywords,
  description,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header /> {children}
        <Footer />
      </div>
    </>
  );
};
Layout.defaultProps = {
  title: "Lorem ipsum dolor sit.",
  keywords: "Lorem ipsum dolor sit.",
  description: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
};
export default Layout;
