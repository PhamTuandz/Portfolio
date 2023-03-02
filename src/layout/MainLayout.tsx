import { Sidebar } from 'components/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './main-layout.scss';
import { Header } from 'components/Header';

function MainLayout() {
  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <div className="main__container">
          <Header />
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}

export default MainLayout;
