import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { API_URL } from "@/config/index";

import React from "react";

const Home = ({ events }) => {
  console.log(events);

  return (
    <Layout title="About Events">
      <h1>Upcoming Events</h1>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  return { props: { events } };
}

export default Home;
