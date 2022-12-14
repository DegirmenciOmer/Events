import styles from "../styles/EventItem.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const EventItem = ({ evt }) => {
  return (
    <div className={styles.event}>
      <div className={styles.image}>
        <Image
          src={evt.image ?? "/images/event-default.png"}
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>{evt.time}</span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.attributes.slug}`}>
          <span className="btn">Details</span>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
