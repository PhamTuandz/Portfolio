import { Sidebar } from 'components/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <div className="main__container">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}

export default MainLayout;
