import Layout from "../components/Layout";
import EventItem from "../components/EventItem";
import { API_URL } from "@/config/index";

import React from "react";
import Link from "next/link";

const Home = ({ events }) => {
  return (
    <Layout title="About Events">
      <h1>Upcoming Events</h1>
      {!events || events.length === 0 ? (
        <h3>No events found</h3>
      ) : (
        events.map((evt) => <EventItem evt={evt.attributes} key={evt.id} />)
      )}
      {events?.length > 0 && (
        <Link href="api/events">
          <span className="btn-secondary"> View All Events</span>
        </Link>
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?[populate]=*&_sort[0]=date:desc`
  );

  const { data: events } = await res.json();

  return { props: { events } };
}

export default Home;
