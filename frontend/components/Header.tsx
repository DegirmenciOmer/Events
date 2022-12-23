import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={"/"}>Events </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href={"/events"}>New Events</Link>
          </li>
          {user && (
            <>
              <li>
                <Link href={"/events/add"}>Add Event</Link>
              </li>
              <li>
                <Link href={"/account/dashboard"}>Dashboard</Link>
              </li>
            </>
          )}
          <li>
            {user ? (
              <Link href={`/account/logout`}>
                <span className="btn-secondary btn-icon">
                  <FaSignOutAlt />
                  Logout
                </span>
              </Link>
            ) : (
              <Link href={`/account/login`}>
                <span className="btn-secondary btn-icon">
                  <FaSignInAlt />
                  Login
                </span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
