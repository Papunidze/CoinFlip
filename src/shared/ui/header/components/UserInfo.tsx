import type { UserData } from '@shared/types';

interface UserInfoProps {
  user: UserData;
  onProfileClick: () => void;
}

const UserInfo = ({ user, onProfileClick }: UserInfoProps) => {
  return (
    <div className="topbar__user">
      <div className="topbar__balances">
        {Object.entries(user.balances).map(([currency, amount]) => (
          <div key={currency} className="topbar__balance">
            <img
              src={`/icons/${currency.toLowerCase()}.svg`}
              alt={currency}
              className="topbar__balance-icon"
            />
            <span className="topbar__balance-value">{amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <button className="topbar__profile" onClick={onProfileClick}>
        <img src="/icons/user.svg" alt="User" className="topbar__user-icon" />
        <span className="topbar__username">{user.name}</span>
      </button>
    </div>
  );
};

export default UserInfo;
