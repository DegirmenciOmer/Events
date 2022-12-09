import React from "react";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

const EventPage = (props) => {
  console.log(props);

  return <Layout>EventPage</Layout>;
};

export default EventPage;

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?slug=${slug}`);
  const events = await res.json();
  console.log({ url: events });

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events/`);

  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug.toString() },
  }));
  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}
