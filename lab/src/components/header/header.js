import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
  return (
    <div className="container">
      <div className="header d-flex justify-content-center">
        <ul className="d-flex">
          <li>
            <Link to='/'>Теорія прийняття рішень</Link>
          </li>
          <li>
            <Link to='/bayes/'>Метод Байєса</Link>
          </li>
          <li>
            <Link to='/gurviz/'>Метод Гурвіца</Link>
          </li>
          <li>
            <Link to='/results/'>Результати тестування</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;