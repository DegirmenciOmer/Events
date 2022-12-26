import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "helpers";
import styles from "@/styles/Dashboard.module.css";
import React from "react";
import DashboardEvent from "@/components/DashboardEvent";

const DashboardPage = ({ events }) => {
  console.log(events);

  const deleteEvent = (id) => {
    console.log("delete", id);
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt) => (
          <DashboardEvent handleDelete={deleteEvent} evt={evt} key={evt.id} />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await res.json();
  return {
    props: { events },
  };
};
export default DashboardPage;
