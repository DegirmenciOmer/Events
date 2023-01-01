import { toast, ToastContainer } from "react-toastify";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "@/styles/Form.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import { parseCookies } from "helpers";

const AddEventPage = ({ token }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
    slug: "",
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

    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Not authorized");
        return;
      }
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
  return (
    <Layout>
      <Link href="/">
        <a className={styles.back}>{"<"} Go Back</a>
      </Link>
      <h1>Add Event</h1>
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
        <input className="btn" type="submit" value="Add Event" />
      </form>
    </Layout>
  );
};

export default AddEventPage;

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  console.log({ token });

  return {
    props: { token },
  };
};
