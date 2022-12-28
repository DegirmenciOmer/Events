import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import React, { FC } from "react";
import { TEvents, TEvtData } from "./[slug]";
import Pagination from "@/components/Pagination";
import { PER_PAGE } from "util/utils";

interface TEventPageProps {
  events: TEvents["events"];
  total: number;
  page: number;
}

const EventPage: FC<TEventPageProps> = ({ events, total, page }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 ? (
        <h3>No event found</h3>
      ) : (
        events.map((evt: TEvtData) => (
          <EventItem evt={evt.attributes} key={evt.id} />
        ))
      )}
      <Pagination total={total} page={page} />
    </Layout>
  );
};

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const res = await fetch(
    `${API_URL}/api/events?sort=date%3Aasc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`
  );

  const events = await res.json();
  return {
    props: {
      events: events.data,
      page: +page,
      total: events.meta.pagination.total,
    },
  };
}

export default EventPage;
