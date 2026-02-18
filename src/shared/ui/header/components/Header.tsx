import UserInfo from './UserInfo';
import './_header-module.scss';

interface HeaderProps {
  username: string;
  onProfileClick: () => void;
}

const Header = ({ username, onProfileClick }: HeaderProps) => {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="topbar__logo">
          <img
            src="/icons/coin-logo.svg"
            alt="CoinFlip logo"
            className="topbar__logo-icon"
          />
          <span className="topbar__logo-text">CoinFlip</span>
        </div>
        <UserInfo username={username} onProfileClick={onProfileClick} />
      </div>
    </header>
  );
};

export default Header;
