import React from "react";
import useFetch from "../hooks/useFetch"; // Import the hook

export const AccountsPage = () => {
  const {
    data: accounts,
    loading,
    error,
  } = useFetch(
    "http://localhost:5000/bank-accounts/user/5d51b560-c675-46ea-8f24-8add202e024a"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>Conturile tale</div>
      <div>
        {accounts &&
          accounts.map((account, index) => (
            <div key={index}>{account.name}</div>
          ))}
      </div>
    </div>
  );
};
