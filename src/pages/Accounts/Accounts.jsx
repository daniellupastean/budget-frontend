import React from "react";
import useFetch from "../../hooks/useFetch";
import "./Accounts.scss";
import { Link } from "react-router-dom";

export const Accounts = () => {
  const {
    data: accounts,
    loading,
    error,
  } = useFetch(
    "http://localhost:5000/bank-accounts/user/17905c36-3997-4528-b893-20134512cafb"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="accounts-page">
      <div className="header-section">Conturile tale</div>
      <div className="wrapper">
        {accounts &&
          accounts.map((account, index) => (
            <Link to={`/accounts/${account.id}`} className="card" key={index}>
              {account.name}
            </Link>
          ))}
      </div>
    </div>
  );
};
