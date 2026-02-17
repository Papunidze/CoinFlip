import CoinFlipLogo from './CoinFlipLogo';
import UserInfo from './UserInfo';
import './Header.scss';

const Header = () => {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <CoinFlipLogo />
        <UserInfo username="User Name" balance={1000} />
      </div>
    </header>
  );
};

export default Header;
