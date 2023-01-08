import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

import React from "react";
import { useRouter } from "next/router";
import { queryHelper } from "util/query";
import { TEvtData } from "./[slug]";

const SearchPage = ({ data }) => {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <h1>Search Results for {router.query.term}</h1>
      {data.length === 0 ? (
        <h3>No event found</h3>
      ) : (
        data.map((evt: TEvtData) => (
          <EventItem evt={evt.attributes} key={evt.id} />
        ))
      )}
    </Layout>
  );
};

export async function getServerSideProps({ query: { term } }) {
  const query = queryHelper(term);
  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const data = await res.json();

  return { props: data };
}

export default SearchPage;
