import { useState } from 'react';
import sidebarItems from './constant';
import './UserSidebar.scss';
import { useNavigate } from 'react-router-dom';

const UserSidebar = ({ activedLabel }) => {
  const [activedButton, setActivedButton] = useState(activedLabel);
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <div className="sidebar-container">
      <ul className="list-unstyled mb-0">
        {sidebarItems.map((item) => (
          <li
            key={item.id}
            className={`sidebar-item ${activedButton === item.id ? 'actived' : ''}`}
            onClick={() => handleClick(item)}
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
