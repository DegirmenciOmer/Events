import styles from "../styles/DashboardEvent.module.css";
import React, { FC } from "react";
import Link from "next/link";
import { Tevt } from "pages/events/[slug]";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

interface TDashboardEventProps {
  evt: Tevt;
  handleDelete: (id: number) => void;
  evtId: number;
}

const DashboardEvent: FC<TDashboardEventProps> = ({
  evt,
  evtId,
  handleDelete,
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
      <div onClick={() => handleDelete(evtId)} className={styles.delete}>
        <FaTrashAlt />
        Delete
      </div>
    </div>
  );
};
export default DashboardEvent;
