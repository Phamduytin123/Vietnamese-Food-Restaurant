import UserSidebar from '../../../components/sidebar/UserSidebar';
import { Table } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import wishlistAPI from '../../../api/wishlistAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tableColumns } from './constant';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState();
  const [dataSource, setDataSource] = useState();
  const navigate = useNavigate();
  const fetchWishlist = async () => {
    try {
      const item = await wishlistAPI.getWishlist();
      let data = item.data;
      setWishlist(
        data.map((product) => ({
          itemId: product.item.id,
          name: product.item.name,
          image: product.item.images[0],
          availability: product.item.availability.toUpperCase(),
        })),
      );
    } catch (error) {
      console.error('Error fetching Wishlists:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [navigate]);
  const dataSource1 = console.log(wishlist);
  return (
    <div className="wishlist">
      {wishlist && (
        <div className="d-flex justify-content-center">
          <UserSidebar />
          <div className="wishlist-container">
            <Table scroll={{ x: 400 }} dataSource={wishlist} columns={tableColumns} pagination={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
