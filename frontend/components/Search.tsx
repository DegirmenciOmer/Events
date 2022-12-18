import { useRouter } from "next/router";
import styles from "../styles/Search.module.css";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          value={term}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTerm(e.target.value)
          }
          type="text"
          placeholder="Search Events"
        />
      </form>
    </div>
  );
};

export default Search;
