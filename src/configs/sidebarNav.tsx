interface INav {
  link: string;
  section: string;
  icon: JSX.Element;
  text: string;
  children?: INav[];
}

const SidebarNav: INav[] = [
  {
    link: '/',
    section: 'home',
    icon: <i className="fa-solid fa-house"></i>,
    text: 'Home'
  },
  {
    link: '/orders',
    section: 'orders',
    icon: <i className="fa-brands fa-first-order"></i>,
    text: 'Orders'
  },
  {
    link: '/products',
    section: 'products',
    icon: <i className="fa-brands fa-product-hunt"></i>,
    text: 'Products',
    children: [
      { link: '/shirt', section: 'shirt', icon: <></>, text: 'Shirt' },
      { link: '/trousers', section: 'trousers', icon: <></>, text: 'Trousers' }
    ]
  }
];

export default SidebarNav;
