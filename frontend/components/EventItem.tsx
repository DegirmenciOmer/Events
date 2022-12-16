import styles from "../styles/EventItem.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const EventItem = ({ evt }) => {
  console.log(evt);
  const date = new Date(evt.date).toLocaleDateString("nl-NL");

  return (
    <div className={styles.event}>
      <div className={styles.image}>
        <Image
          src={
            evt.image.data.attributes.formats.medium.url ??
            "/images/event-default.png"
          }
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {date} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <span className="btn">Details</span>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;