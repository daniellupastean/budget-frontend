import React from "react";
import useFetch from "../../hooks/useFetch";
import "./Home.scss";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: accounts, loading, error } = useFetch(`http://localhost:5000/bank-accounts/user/${user.id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-container">
      <div className="stats-card">
        {accounts.length} <div>Bank Accounts</div>
      </div>
    </div>
  );
};
