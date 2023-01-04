import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "helpers";
import styles from "@/styles/Dashboard.module.css";
import React, { useEffect } from "react";
import DashboardEvent from "@/components/DashboardEvent";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { TEvtData } from "pages/events/[slug]";

const DashboardPage = ({ events, token }) => {
  const router = useRouter();
  const { error, user } = useAuth();

  useEffect(() => {
    if (!user) router.push("/account/login");

    if (error) toast.error(error);
    return;
  }, [error, user]);

  const deleteEvent = async (id: number) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events?.data?.length > 0 &&
          events.data.map((evt: TEvtData) => {
            return (
              <DashboardEvent
                handleDelete={deleteEvent}
                evt={evt.attributes}
                evtId={evt.id}
                key={evt.id}
              />
            );
          })}
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
    props: { events, token },
  };
};
export default DashboardPage;
