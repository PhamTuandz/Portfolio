import SidebarNav from 'configs/sidebarNav';
import { images } from 'constants/images';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
function Sidebar() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    const currentPath = window.location.pathname.split('/')[1];
    const activeItem = SidebarNav.findIndex((item) => item.section === currentPath);
    setActiveIndex(currentPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const closeSidebar = () => {
    const tagMain = document.querySelector('.main__container') as HTMLElement | null;
    if (tagMain !== null) {
      tagMain.style.transform = 'scale(1) translateX(0)';
    }
    setTimeout(() => {
      document.body.classList.remove('sidebar-open');
      if (tagMain !== null) {
        tagMain.style.transform = '';
      }
    }, 500);
  };
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={images.logo} alt="logo" />
        <div className="sidebar-close" onClick={closeSidebar}>
          <i className="fa-sharp fa-regular fa-minimize"></i>
        </div>
      </div>
      <div className="sidebar__menu">
        {SidebarNav.map((item, index) => (
          <Link
            to={item.link}
            key={`nav-${item.section}`}
            className={`sidebar__menu__item ${activeIndex === index && 'active'}`}>
            <div className="sidebar__menu__item__icon">{item.icon}</div>
            <div className="sidebar__menu__item__txt">{item.text}</div>
          </Link>
        ))}
        <div className="sidebar__menu__item">
          <div className="sidebar__menu__item__icon">
            <i className="fa-solid fa-arrow-right-from-bracket icon-logout"></i>
          </div>
          <div className="sidebar__menu__item__txt">Logout</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
