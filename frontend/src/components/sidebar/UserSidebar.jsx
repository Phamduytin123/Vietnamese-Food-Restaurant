import { useState } from 'react';
import sidebarItems from './constant';
import './UserSidebar.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AccountContext';

const UserSidebar = ({ activedLabel }) => {
  const [activedButton, setActivedButton] = useState(activedLabel);
  const { setAccount, account } = useAuth();
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.route) {
      navigate(item.route);
    } else if (item.label === 'Log-out') {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    setAccount(null);
    navigate('/');
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
