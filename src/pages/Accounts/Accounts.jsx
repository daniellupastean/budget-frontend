import React from "react";
import useFetch from "../../hooks/useFetch";
import "./Accounts.scss";
import { AccountCard } from "../../components/AccountCard/AccountCard";
import { Link } from "react-router-dom";

export const Accounts = () => {
  const {
    data: accounts,
    loading,
    error,
  } = useFetch(`http://localhost:5000/bank-accounts/user/${import.meta.env.VITE_CURRENT_USER}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="accounts-page">
      <div className="header-section">
        <div>Bank Accounts</div>
      </div>
      <div className="wrapper">
        {accounts && accounts.map((account) => <AccountCard account={account} key={account.id} />)}
        <Link className="add-account-btn" to="/accounts/create">
          +
        </Link>
      </div>
    </div>
  );
};
