import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import styles from "@/styles/Home.module.css";
import { API_URL } from "@/config/index";

import React from "react";

const EventPage = ({ events }) => {
  return (
    <Layout title="About Events">
      <h1>Events</h1>
      {events.length === 0 ? (
        <h3>No event found</h3>
      ) : (
        events.map((evt) => <EventItem evt={evt.attributes} key={evt.id} />)
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return { props: { events: events.data.slice(0, 3) } };
}

export default EventPage;
