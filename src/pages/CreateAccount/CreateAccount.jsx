import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./CreateAccount.scss";

export const CreateAccount = () => {
  const { data: banks, loading, error } = useFetch(`http://localhost:5000/banks`);

  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("LEI");
  const [selectedBank, setSelectedBank] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (banks && banks.length > 0) {
      setSelectedBank(banks[0].id); // Set the default bank as the first one in the list
    }
  }, [banks]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/bank-accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          balance,
          currency,
          userId: import.meta.env.VITE_CURRENT_USER,
          bankId: selectedBank,
        }),
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
        <div>Creare cont</div>
      </div>
      <form onSubmit={handleCreateAccount}>
        <div className="input-wrapper">
          <label htmlFor="name">Numele contului</label>
          <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="currency">Moneda</label>
          <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="LEI">LEI</option>
            <option value="€">EURO</option>
            <option value="$">DOLLAR</option>
          </select>
        </div>
        <div className="input-wrapper">
          <label htmlFor="balance">Soldul contului</label>
          <input type="number" value={balance} id="balance" onChange={(e) => setBalance(e.target.value)} />
        </div>

        <div className="input-wrapper">
          <label htmlFor="bank-name">Banca</label>
          <select id="cars" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
            {banks.map((bank) => (
              <option value={bank.id} key={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Salvează</button>
      </form>
    </div>
  );
};
