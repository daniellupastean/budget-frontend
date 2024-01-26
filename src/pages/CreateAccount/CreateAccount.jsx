import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./CreateAccount.scss";
import { API_URL } from "../../utils/constants";

export const CreateAccount = () => {
  const { data: banks, loading, error } = useFetch(`${API_URL}/banks`);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

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
      const response = await fetch(`${API_URL}/bank-accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          balance,
          currency,
          userId: user.id,
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
          BACK
        </div>
        <div>Create Bank Account</div>
      </div>
      <form onSubmit={handleCreateAccount}>
        <div className="input-wrapper">
          <label htmlFor="name">Account Name</label>
          <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="currency">Currency</label>
          <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="LEI">LEI</option>
            <option value="€">EURO</option>
            <option value="$">DOLLAR</option>
          </select>
        </div>
        <div className="input-wrapper">
          <label htmlFor="balance">Balance</label>
          <input type="number" value={balance} id="balance" onChange={(e) => setBalance(e.target.value)} />
        </div>

        <div className="input-wrapper">
          <label htmlFor="bank-name">Bank</label>
          <select id="cars" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
            {banks.map((bank) => (
              <option value={bank.id} key={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <button className="save-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
