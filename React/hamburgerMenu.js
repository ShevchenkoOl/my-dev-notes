import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = ({ isOpen, toggleOpen }) => {
  return (
    <div className={styles.navWrapper}>
      <button className={styles.burger} onClick={() => toggleOpen(!isOpen)}>
        ☰
      </button>

      <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
        <NavLink to="/about" className={styles.link}>Моя миссия</NavLink>
        <NavLink to="/courses" className={styles.link}>Курсы</NavLink>
        <NavLink to="/eshop" className={styles.link}>E-shop</NavLink>
        <NavLink to="/career" className={styles.link}>Партнерство</NavLink>
        <NavLink to="/contact" className={styles.link}>Контакты</NavLink>
      </nav>
    </div>
  );
};

export default Nav;


// css
// .navWrapper {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
//   }
  
//   .burger {
//     display: none;
//     font-size: 2rem;
//     background: none;
//     border: none;
//     cursor: pointer;
//   }
  
//   .nav {
//     display: flex;
//     gap: 20px;
//   }
  
//   .link {
//     text-decoration: none;
//     color: #333;
//   }
  
//   @media (max-width: 768px) {
//     .burger {
//       display: block;
//     }
  
//     .nav {
//       display: none;
//       flex-direction: column;
//       align-items: flex-start;
//       background: white;
//       padding: 1rem;
//       box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//       width: 100%;
//     }
  
//     .nav.open {
//       display: flex;
//     }
//   }
  