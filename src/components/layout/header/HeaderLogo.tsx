import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

function HeaderLogo() {
  return (
    <NavLink to="/" className="flex gap-[5px] items-center cursor-pointer">
      <span className="logo-text">Lottery</span>
      <img src={logo} alt="Logo" className="h-[2.5rem]" />
      <span className="logo-text">Game</span>
    </NavLink>
  );
}

export default HeaderLogo;
