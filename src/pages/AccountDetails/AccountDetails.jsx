import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./AccountDetails.scss";
import { API_URL } from "../../utils/constants";

export const AccountDetails = () => {
  const { id } = useParams();
  const { data: account, loading, error } = useFetch(`${API_URL}/bank-accounts/${id}`);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      setName(account.name);
      setBalance(account.balance);
    }
  }, [account]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/bank-accounts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, balance, userId: user.id }),
      });
      if (response.ok) {
        navigate("/accounts");
      }
    } catch (error) {}
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/bank-accounts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (response.ok) {
        navigate("/accounts");
      }
    } catch (error) {}
  };

  return (
    <div className="account-details">
      <div className="header-section">
        <div
          className="back-button"
          onClick={() => {
            navigate("/accounts");
          }}
        >
          BACK
        </div>
        <div>Account Details</div>
      </div>
      <form onSubmit={handleUpdateAccount}>
        <div className="input-wrapper">
          <label htmlFor="name">Account Name</label>
          <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="balance">Account Balance - {account.currency}</label>
          <input type="number" value={balance} id="balance" onChange={(e) => setBalance(e.target.value)} />
        </div>

        <div className="input-wrapper">
          <label htmlFor="bank-name">Bank</label>
          <input type="text" value={account.bankName} id="bank-name" disabled />
        </div>
        <button className="save-btn" type="submit">
          Save
        </button>
        <button className="delete-btn" onClick={handleDeleteAccount}>
          Delete
        </button>
      </form>
    </div>
  );
};
