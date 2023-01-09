import Layout from "../components/Layout";
import EventItem from "../components/EventItem";
import { API_URL } from "@/config/index";

import React from "react";
import Link from "next/link";
import { TEvtData } from "./events/[slug]";

const Home = ({ events }) => {
  return (
    <Layout title="Events App">
      <h1>Upcoming Events</h1>
      {!events || events.length === 0 ? (
        <h3>No events found</h3>
      ) : (
        events.map((evt: TEvtData) => (
          <EventItem evt={evt.attributes} key={evt.id} />
        ))
      )}
      {events?.length > 0 && (
        <Link href="/events">
          <span className="btn-secondary"> View All Events</span>
        </Link>
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const LIMIT = 5;
  const res = await fetch(
    `${API_URL}/api/events?[populate]=*&_sort[0]=date:desc?&pagination[start]=0&pagination[limit]=${LIMIT}`
  );

  const { data: events } = await res.json();

  return {
    props: { events: events && events.length > 0 ? events.slice(0, 5) : null },
  };
}

export default Home;
