import React from "react";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

const EventPage = () => {
  return <Layout>EventPage</Layout>;
};

export default EventPage;

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events/`);
  const events = await res.json();
  // console.log(events[0]);

  const paths = events.map((evt) => ({ params: { slug: evt.slug } }));
  return { paths, fallback: true };
}

export async function getStaticProps({ query }) {
  console.log({ query });

  const res = await fetch(`${API_URL}/api/events/burgett`);
  const events = await res.json();
  return { props: { evt: events[0] }, revalidate: 1 };
}
