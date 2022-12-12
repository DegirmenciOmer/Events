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
  attributes: {
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
};

const EventPage: FC<TEvtProps> = ({ evt }) => {
  console.log({ evt });
  const deleteEvent = (e: any) => {
    console.log({ evt });
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <span>
              <FaPencilAlt /> Edit Event
            </span>
          </Link>
          <div className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </div>
        </div>
        <span>
          {evt?.attributes?.date} at {evt?.attributes?.time}
        </span>
        <h1>{evt?.attributes?.name}</h1>
        {evt?.attributes?.image && (
          <div className={styles.image}>
            <Image
              src={evt?.attributes?.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt?.attributes?.performers}</p>
        <h3>Description:</h3>
        <p>{evt?.attributes?.description}</p>
        <h3>Venue: {evt?.attributes?.venue}</h3>
        <p>{evt?.attributes?.address}</p>
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
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
  console.log(`${API_URL}/api/events?slug=${slug}`);
  console.log(evt);

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

  const paths = events.map((evt: TEvt) => ({
    params: { slug: evt.attributes.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
