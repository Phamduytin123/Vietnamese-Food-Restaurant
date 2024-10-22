import { useState } from 'react';
import sidebarItems from './constant';
import './UserSidebar.scss';

const UserSidebar = () => {
  const [activedButton, setActivedButton] = useState();

  return (
    <div className="sidebar-container">
      <ul className="list-unstyled mb-0">
        {sidebarItems.map((item) => (
          <li
            key={item.id}
            className={`sidebar-item ${activedButton === item.id ? 'actived' : ''}`}
            onClick={() => setActivedButton(item.id)}
          >
            {activedButton === item.id ? item.icon_actived : item.icon}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSidebar;
