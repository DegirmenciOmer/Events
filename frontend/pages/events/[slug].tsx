import React, { FC } from "react";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

interface TEvtProps {
  evt: TEvtData;
}

export type TEvtData = {
  id: number;
  attributes: Tevt;
};

export type Tevt = {
  id?: number;
  address: string;
  name: string;
  slug: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: any;
  performers: string;
};

export type TEvents = { events: TEvtData[] };

const EventPage: FC<TEvtProps> = ({ evt: { id, attributes: evt } }) => {
  const date = new Date(evt.date).toLocaleDateString("nl-NL");

  return (
    <Layout>
      <div className={styles.event}>
        <Link href="/">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
        <div className={styles.heading}>
          <h1>{evt?.name}</h1>
          <p>
            {date} at {evt?.time}
          </p>
        </div>
        <ToastContainer />
        {evt?.image && (
          <div className={styles.image}>
            <Image
              src={
                evt?.image?.data?.attributes?.formats?.medium ??
                evt?.image?.data?.attributes?.formats?.thumbnail.url
              }
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt?.performers}</p>
        <h3>Description:</h3>
        <p>{evt?.description}</p>
        <h3>Venue: </h3>
        <p>
          {evt?.address}, {evt?.venue}
        </p>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );
  const { data: evt } = await res.json();

  return {
    props: {
      evt: evt[0],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events/`);

  const { data: events } = await res.json();

  const paths = events.map((evt: TEvtData) => ({
    params: { slug: evt.attributes.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
