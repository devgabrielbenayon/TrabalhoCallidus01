import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Header.css"

const Header = () => {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShow(false); 
      } else {
        setShow(true); 
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`app-header${show ? '' : ' header-hide'}`}>
      <div className='header-content'>
        <div className='logo-area'>
          <img src='../logo.png' alt='Logo' className='header-logo'/>
        </div>
        <nav className='nav-links'>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Menu</Link>
          <Link to="/cadastrar" className={location.pathname === "/cadastrar" ? "active" : ""}>Cozinha</Link> 
          <Link to="/tabela-livros" className={location.pathname === "/tabela-livros" ? "active" : ""}>Entregas</Link>
          <Link to="/carrinho" className={location.pathname === "/carrinho" ? "active" : ""}>🛒</Link>
          <Link to="/admin" className={location.pathname === "/Admin" ? "active" : ""}>Admin</Link>

        </nav>
      </div>      
    </header>
  );
};

export default Header;
