import styles from "../styles/DashboardEvent.module.css";
import React, { FC, MouseEventHandler } from "react";
import Link from "next/link";
import { TEvt } from "pages/events/[slug]";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

interface TDashboardEventProps {
  evt: TEvt["attributes"];

  handleDelete: (id: number) => void;
}

const DashboardEvent: FC<TDashboardEventProps> = ({ evt, handleDelete }) => {
  console.log(evt);

  return (
    <div className={styles.event}>
      <Link href={`/events/${evt.slug}`}>
        <h4>{evt.name}</h4>
      </Link>
      <Link href={`/events/edit/${evt.slug}`}>
        <span className={styles.edit}>
          <FaPencilAlt />
          Edit
        </span>
      </Link>
      <div onClick={() => handleDelete(evt.id)} className={styles.delete}>
        <FaTrashAlt />
        Delete
      </div>
    </div>
  );
};
export default DashboardEvent;
