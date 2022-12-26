import { toast, ToastContainer } from "react-toastify";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "@/styles/Form.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import { formatDateForInput } from "util/formatDate";
import { FaImage } from "react-icons/fa";
import Image from "next/image";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

const EditEventPage = ({ evt: { id: evtId, attributes: evt } }) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt?.image?.data?.attributes?.formats?.thumbnail?.url : null
  );
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: formatDateForInput(evt.date),
    time: evt.time,
    description: evt.description,
    slug: evt.slug,
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }
    // Post data
    const data = { data: { ...values } };
    const res = await fetch(`${API_URL}/api/events/${evtId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const evt = await res.json();

      if (evt) router.push(`/events/${evt.data.attributes.slug}`);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setValues({
      ...values,
      [name]: value,
      slug: values.name.toLowerCase().split(" ").join("-"),
    });
  };

  const imageUploaded = async () => {
    const res = await fetch(
      `${API_URL}/api/events?filters[id][$eq]=${evtId}&populate=*`
    );

    const { data } = await res.json();

    setImagePreview(
      data[0]?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url
    );
    setShowModal(false);
  };
  return (
    <Layout>
      <Link href="/">
        <a className={styles.back}>{"<"} Go Back</a>
      </Link>
      <h1>Update Event</h1>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input className="btn" type="submit" value="Update Event" />
      </form>

      <h1>Event Image</h1>
      {imagePreview ? (
        <Image width={100} height={70} src={imagePreview} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage />
          Set Image
        </button>
      </div>
      <Modal
        title="Upload Image"
        onClose={() => setShowModal(false)}
        show={showModal}
      >
        <ImageUpload imageUploaded={imageUploaded} evtId={evtId} />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[id][$eq]=${id}&populate=*`
  );
  const { data } = await res.json();

  console.log(req.headers.cookie);

  return {
    props: {
      evt: data[0],
    },
  };
}
