import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, ChangeEvent, FormEvent, FC } from "react";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const RegisterPage: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();

  const { register, error, user } = useAuth();

  useEffect(() => {
    if (user) router.push("/");

    if (error) {
      toast.error(error);
    }
  }, [error, user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    } else {
      register({ username, email, password });
    }
  };
  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">User name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordConfirm(e.target.value)
              }
            />
          </div>
          <input type="submit" value="Register" className="btn" />
          <p>
            Already have an account? <Link href="/account/login">Login</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
