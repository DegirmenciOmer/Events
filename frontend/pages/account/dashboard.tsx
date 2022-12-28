import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "helpers";
import styles from "@/styles/Dashboard.module.css";
import React, { useEffect } from "react";
import DashboardEvent from "@/components/DashboardEvent";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Tevt } from "pages/events/[slug]";

const DashboardPage = ({ events }) => {
  const router = useRouter();
  const { error, user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/account/login");

    if (error) toast.error(error);
    return;
  }, [error, user]);

  const deleteEvent = (id) => {
    console.log("delete", id);
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.length > 0 &&
          events.map((evt: Tevt) => (
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
  console.log(token);
  console.log(events);

  return {
    props: { events },
  };
};
export default DashboardPage;
