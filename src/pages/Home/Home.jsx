import React from "react";
import useFetch from "../../hooks/useFetch";
import "./Home.scss";

export const Home = () => {
  const {
    data: accounts,
    loading,
    error,
  } = useFetch(`http://localhost:5000/bank-accounts/user/${import.meta.env.VITE_CURRENT_USER}`);

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
