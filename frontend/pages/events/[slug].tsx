import React, { FC, useEffect } from "react";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

interface TEvtProps {
  evt: TEvtData;
}

export type TEvtData = {
  id: number;
  attributes: Tevt;
};

export type Tevt = {
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

const EventPage: FC<TEvtProps> = ({ evt }) => {
  const router = useRouter();

  const date = new Date(evt?.attributes?.date).toLocaleDateString("nl-NL");
  useEffect(() => {
    if (!evt) {
      router.push("/404");
      return;
    }
  }, [evt]);

  return (
    <Layout>
      <div className={styles.event}>
        <Link href="/">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
        <div className={styles.heading}>
          <h1>{evt?.attributes?.name}</h1>
          <p>
            {date} at {evt?.attributes?.time}
          </p>
        </div>
        <ToastContainer />
        {evt?.attributes?.image && (
          <div className={styles.image}>
            <Image
              src={
                evt?.attributes?.image?.data?.attributes?.formats?.medium ??
                evt?.attributes?.image?.data?.attributes?.formats?.thumbnail
                  ?.url
              }
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt?.attributes?.performers}</p>
        <h3>Description:</h3>
        <p>{evt?.attributes?.description}</p>
        <h3>Venue: </h3>
        <p>
          {evt?.attributes?.address}, {evt?.attributes?.venue}
        </p>
      </div>
    </Layout>
  );
};

export default EventPage;

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(
//     `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
//   );
//   const { data: evt } = await res.json();

//   return {
//     props: {
//       evt: evt[0],
//     },
//     revalidate: 1,
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events/`);

//   const { data: events } = await res.json();

//   const paths = events.map((evt: TEvtData) => ({
//     params: { slug: evt.attributes.slug },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }
export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );
  console.log({ res });

  const { data: evt } = await res.json();
  console.log({ evt });

  return {
    props: {
      evt: evt.length > 0 ? evt[0] : null,
    },
  };
}
