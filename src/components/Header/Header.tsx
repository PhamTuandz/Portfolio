import React from 'react';
import './header.scss';
function Header() {
  const openSidebar = () => {
    document.body.classList.add('sidebar-open');
  };
  return (
    <div className="header">
      <div className="header__content">
        <h1>Phạm Tuân</h1>
      </div>
      <div className="sidebar-toggle" onClick={openSidebar}>
        <i className="fa-solid fa-minimize"></i>
      </div>
    </div>
  );
}

export default Header;
