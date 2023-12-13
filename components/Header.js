import styl from "@/styles/css/Header.module.css";
import Logo from "./Logo";

const Header = ({ title }) => {
  return (
    <header className={styl.styledHeader}>
      <Logo />
      <h2>{title}</h2>
    </header>
  );
};

export default Header;
