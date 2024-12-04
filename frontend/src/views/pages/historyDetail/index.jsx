import { useEffect, useState } from 'react';
import UserSidebar from '../../../components/sidebar/UserSidebar';
import { Spin } from 'antd';
import './index.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';

import orderAPI from '../../../api/orderAPI';
import { useNavigate, useParams } from 'react-router-dom';
import OrderStatusProgress from '../../../components/history/ProgressBar';
import OrderTable from '../../../components/history/OrderTable';
import ButtonPrimary from '../../../components/button/ButtonPrimary';
import RatingModal from '../../../components/history/RatingModal';

const HistoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [historyDetail, setHistoryDetail] = useState();
  const [loadingHistory, setLoadingHistory] = useState();
  const [dataSource, setDataSource] = useState([]);

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const item = await orderAPI.orderDetail(id);
      setHistoryDetail(item.data);
      setDataSource(
        item.data.orderDetails.map((detail) => ({
          price: detail.price,
          name: detail.itemSize.item.name,
          quantity: detail.quantity,
          total: detail.price * detail.quantity,
          image: detail.itemSize.item.images[0],
          size: detail.itemSize.size,
          status: item.data.status,
          orderId: detail.orderId,
          itemSizeId: detail.itemSize.id,
          review: detail.itemSize.review,
        })),
      );
      setLoadingHistory(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const onUpdateReviewItemSize = ({ itemSizeId, feedback }) => {
    setDataSource(
      dataSource.map((data) => {
        if (data.itemSizeId === itemSizeId) return { ...data, review: feedback };
        return data;
      }),
    );
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <div className="history-detail">
      <div className="d-flex justify-content-center">
        <UserSidebar activedLabel={2} />
        <div></div>
        <div className="history-detail-container">
          {loadingHistory ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <div>
              <div className="history-title-box mb-0">
                <FaArrowLeft className="ms-3" />
                <h5 className="history-title">CHI TIẾT ĐƠN HÀNG</h5>
              </div>
              {historyDetail && (
                <div>
                  <div className="history-info">
                    <div className="history-preview">
                      <div className="history-preview-container">
                        <div>
                          <span>{historyDetail.orderDetails.length} Sản phẩm・</span>
                          <span>Đặt hàng vào lúc {format(new Date(historyDetail.createdAt), 'dd/MM/yyyy HH:mm')}</span>
                          {historyDetail.status === 'cancel' && <p>Lí do hủy đơn: {historyDetail.reasonCancel}</p>}
                        </div>
                        <div className="history-price">
                          {historyDetail.voucher ? (
                            <>
                              <span className="history-price origin">
                                {Intl.NumberFormat('vi-VN').format(
                                  (historyDetail.totalPrice / (100 - historyDetail.voucher.discount)) * 100,
                                ) + ' VND'}
                              </span>
                              <span className="history-price final">
                                {Intl.NumberFormat('vi-VN').format(historyDetail.totalPrice) + ' VND'}
                              </span>
                            </>
                          ) : (
                            <span className="history-price final">
                              {Intl.NumberFormat('vi-VN').format(historyDetail.totalPrice) + ' VND'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="history-progress">
                      <OrderStatusProgress status={historyDetail.status} />
                    </div>
                    <div className="history-products">
                      <OrderTable
                        dataSource={dataSource}
                        status={historyDetail.status}
                        onUpdateReviewItemSize={onUpdateReviewItemSize}
                      />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="history-item d-flex flex-column">
                      <h5 className="history-item--title">ĐỊA CHỈ GIAO HÀNG</h5>
                      <div className="d-flex flex-column">
                        <p className="fw-bold">{historyDetail.receiver}</p>
                        <span className="text-gray">{historyDetail.address}</span>
                        <div>
                          <span className="me-2 text-black">Email:</span>
                          <span className="text-gray">{historyDetail.email}</span>
                        </div>
                        <div>
                          <span className="me-2 text-black">Phone:</span>
                          <span className="text-gray">{historyDetail.phoneNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="history-item d-flex flex-column">
                      <h5 className="history-item--title">GHI CHÚ HÓA ĐƠN</h5>
                      <span>{historyDetail.note ? historyDetail.note : 'Không có ghi chú'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;
