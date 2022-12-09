import React from "react";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

const EventPage = () => {
  return <Layout>EventPage</Layout>;
};

export default EventPage;

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events${slug}`);
  const events = await res.text();
  console.log({ url: `${API_URL}/events${slug}` });

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);

  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
