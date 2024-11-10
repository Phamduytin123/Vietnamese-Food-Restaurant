import { useEffect, useState } from 'react';
import UserSidebar from '../../../components/sidebar/UserSidebar';
import { IoRocketOutline } from 'react-icons/io5';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { IoIosCheckboxOutline } from 'react-icons/io';
import wishlistAPI from '../../../api/wishlistAPI';

import './index.scss';
import { Table } from 'antd';
import HistoryTable from '../../../components/history/HistoryTable';
import orderAPI from '../../../api/orderAPI';
import WishlistCard from '../../../components/wishlist/WishlistCard';

const Dashboard = () => {
  const [account, setAccount] = useState(JSON.parse(localStorage.getItem('user_info')));
  const [history, setHistory] = useState();
  const [wishlist, setWishlist] = useState();
  const [loadingHistory, setLoadingHistory] = useState();

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const item = await orderAPI.listOrders();
      setHistory(item.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingHistory(false);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchWishlist = async () => {
    try {
      const item = await wishlistAPI.getWishlist();
      let data = item.data;
      console.log(data);
      setWishlist(
        data.map((product) => ({
          itemId: product.item.id,
          name: product.item.name,
          image: product.item.images[0],
        })),
      );
    } catch (error) {
      console.error('Error fetching Wishlists:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);
  return (
    <div className="dashboard">
      <div className="d-flex justify-content-center">
        <UserSidebar activedLabel={1} />
        <div className="dashboard-container">
          <h3 className="fw-bold">Xin chào, {account.name}</h3>
          <p className="dashboard-desc">
            Từ bảng điều khiển tài khoản của bạn, bạn có thể dễ dàng kiểm tra và xem các <span>Đơn hàng gần đây</span>,
            quản lý <span>Địa chỉ giao hàng</span> và chỉnh sửa <span>Mật khẩu và Chi tiết tài khoản</span>.
          </p>
          <div className="d-flex">
            <div className="dashboard-item d-flex flex-column position-relative">
              <h5 className="dashboard-item--title p-3">THÔNG TIN TÀI KHOẢN</h5>
              <div className="d-flex flex-column p-3">
                <div className="d-flex mb-3 align-items-center">
                  <img className="userInfo-img" src={account.avatar} alt="" />
                  <p className="ms-2 fw-bold">{account.name}</p>
                </div>
                <div>
                  <span className="me-2 text-black">Email:</span>
                  <span className="text-gray">{account.email}</span>
                </div>
                <div>
                  <span className="me-2 text-black">Phone:</span>
                  <span className="text-gray">{account.tel}</span>
                </div>
                <button className="dashboard-item--btn">CHỈNH SỬA TÀI KHOẢN</button>
              </div>
            </div>

            <div className="dashboard-item d-flex flex-column ms-4 position-relative">
              <h5 className="dashboard-item--title p-3">ĐỊA CHỈ MUA HÀNG</h5>
              <div className="d-flex flex-column p-3">
                <p className="fw-bold">{account.name}</p>
                <p className="text-gray">{account.address}</p>
                <div>
                  <span className="me-2 text-black">Email:</span>
                  <span className="text-gray">{account.email}</span>
                </div>
                <div>
                  <span className="me-2 text-black">Phone:</span>
                  <span className="text-gray">{account.tel}</span>
                </div>
                <button className="dashboard-item--btn">CHỈNH SỬA ĐỊA CHỈ</button>
              </div>
            </div>
            {history && (
              <div className="dashboard-order d-flex flex-column ms-4">
                <div className="d-flex flex-column flex-grow-1">
                  <div className="order-status total1 flex-grow-1">
                    <div className="p-40">
                      <IoRocketOutline className="order-status--icon total1" />
                    </div>
                    <div>
                      <p>{history.length}</p>
                      <p>Tổng đơn hàng</p>
                    </div>
                  </div>
                  <div className="order-status delivering flex-grow-1">
                    <div className="p-10">
                      <MdOutlineDeliveryDining className="order-status--icon delivering" />
                    </div>
                    <div>
                      <p>0</p>
                      <p>Đơn hàng đang giao</p>
                    </div>
                  </div>
                  <div className="order-status finished flex-grow-1">
                    <IoIosCheckboxOutline className="order-status--icon finished" />
                    <div>
                      <p>0</p>
                      <p>Đơn đã hoàn thành</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="d-flex flex-column mt-4">{history && <HistoryTable dataSource={history} />}</div>
          <div className="d-flex flex-column mt-3">{wishlist && <WishlistCard dataSource={wishlist} />}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
