import styles from "../styles/DashboardEvent.module.css";
import React, { FC } from "react";
import Link from "next/link";
import { Tevt } from "pages/events/[slug]";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

interface TDashboardEventProps {
  evt: Tevt;
  token: string;
  handleDelete: (id: any, token: any) => void;
}

const DashboardEvent: FC<TDashboardEventProps> = ({
  evt,
  handleDelete,
  token,
}) => {
  return (
    <div className={styles.event}>
      <Link href={`/events/${evt.slug}`}>
        <h4>{evt.name}</h4>
      </Link>
      <Link href={`/events/edit/${evt.id}`}>
        <span className={styles.edit}>
          <FaPencilAlt />
          Edit
        </span>
      </Link>
      <div
        onClick={() => handleDelete(evt.id, token)}
        className={styles.delete}
      >
        <FaTrashAlt />
        Delete
      </div>
    </div>
  );
};
export default DashboardEvent;
