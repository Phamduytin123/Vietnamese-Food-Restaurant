import { useEffect, useState } from 'react';
import UserSidebar from '../../../components/sidebar/UserSidebar';
import { Spin } from 'antd';
import './index.scss';
import HistoryTable from '../../../components/history/HistoryTable';
import orderAPI from '../../../api/orderAPI';

const History = () => {
  const [account, setAccount] = useState(JSON.parse(localStorage.getItem('user_info')));
  const [history, setHistory] = useState();
  const [wishlist, setWishlist] = useState();
  const [loadingHistory, setLoadingHistory] = useState();

  const fetchHistory = async () => {
    try {
      const item = await orderAPI.listOrders();
      setHistory(item.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchData = async () => {
    setLoadingHistory(true);
    await Promise.all([fetchHistory()]);
    setLoadingHistory(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-history">
      <div className="d-flex justify-content-center">
        <UserSidebar activedLabel={2} />
        <div className="dashboard-container">
          {loadingHistory ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <div className="d-flex flex-column">{history && <HistoryTable dataSource={history} />}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
