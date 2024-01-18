import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./AccountDetails.scss";

export const AccountDetails = () => {
  const { id } = useParams();
  const { data: account, loading, error } = useFetch(`http://localhost:5000/bank-accounts/${id}`);

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
      const response = await fetch(`http://localhost:5000/bank-accounts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, balance, userId: import.meta.env.VITE_CURRENT_USER }),
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
          înapoi
        </div>
        <div>Detalii cont</div>
      </div>
      <form onSubmit={handleUpdateAccount}>
        <div className="input-wrapper">
          <label htmlFor="name">Numele contului</label>
          <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="balance">Soldul contului - {account.currency}</label>
          <input type="number" value={balance} id="balance" onChange={(e) => setBalance(e.target.value)} />
        </div>

        <div className="input-wrapper">
          <label htmlFor="bank-name">Banca</label>
          <input type="text" value={account.bankName} id="bank-name" disabled />
        </div>
        <button type="submit">Salvează</button>
      </form>
    </div>
  );
};
