import type { Currency } from '@shared/types';

const BALANCES: { currency: Currency; amount: number }[] = [
  { currency: 'BTC', amount: 1000 },
  { currency: 'ETH', amount: 1000 },
  { currency: 'SOL', amount: 1000 },
];

interface UserInfoProps {
  username: string;
  onProfileClick: () => void;
}

const UserInfo = ({ username, onProfileClick }: UserInfoProps) => {
  return (
    <div className="topbar__user">
      <div className="topbar__balances">
        {BALANCES.map(({ currency, amount }) => (
          <div key={currency} className="topbar__balance">
            <img
              src={`/icons/${currency.toLowerCase()}.svg`}
              alt={currency}
              className="topbar__balance-icon"
            />
            <span className="topbar__balance-value">
              {amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div className="topbar__profile" onClick={onProfileClick}>
        <img src="/icons/user.svg" alt="User" className="topbar__user-icon" />
        <span className="topbar__username">{username}</span>
      </div>
    </div>
  );
};

export default UserInfo;
