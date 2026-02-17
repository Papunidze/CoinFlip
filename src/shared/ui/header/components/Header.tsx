import UserInfo from './UserInfo';
import './_header-module.scss';

const Header = () => {
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
        <UserInfo username="User Name" />
      </div>
    </header>
  );
};

export default Header;
