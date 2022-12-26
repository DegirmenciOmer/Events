import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "helpers";
import React from "react";

const DashboardPage = () => {
  return <Layout title="User Dashboard">DashboardPage</Layout>;
};
export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/events/me`, {
    method: "GET",
  });
  return {
    props: {},
  };
};
export default DashboardPage;
