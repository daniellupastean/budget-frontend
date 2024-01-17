import { Link } from "react-router-dom";
import "./AccountCard.scss";

export const AccountCard = ({ account }) => {
  return (
    <Link to={`/accounts/${account.id}`} className="card" key={account.id}>
      {account.name}
    </Link>
  );
};
