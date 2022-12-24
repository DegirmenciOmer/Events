import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { login, error, user } = useAuth();

  useEffect(() => {
    if (user) router.push("/");

    if (error) toast.error(error);
  }, [error, user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <label htmlFor="password">Email</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <input type="submit" value="Login" className="btn" />
          <p>
            Don't have an account yet?{" "}
            <Link href="/account/register">Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
