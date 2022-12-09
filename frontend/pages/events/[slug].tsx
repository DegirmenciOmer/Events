import React, { FC } from "react";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";

interface TEvtProps {
  evt: TEvt;
}

export type TEvt = {
  id: number;
  address: string;
  name: string;
  slug: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  performers: string;
};

const EventPage: FC<TEvtProps> = ({ evt }) => {
  const deleteEvent = (e: any) => {
    console.log("delete");
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id.toString()}`}>
            <span>
              <FaPencilAlt /> Edit Event
            </span>
          </Link>
          <div className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </div>
        </div>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?slug=${slug}`);
  const events = await res.json();

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

  const paths = events.map((evt: TEvt) => ({
    params: { slug: evt.slug.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
