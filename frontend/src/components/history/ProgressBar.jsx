import React from 'react';
import './ProgressBar.scss';
import { PiNotebookBold, PiPackageBold, PiHandshake } from 'react-icons/pi';
import { RiTruckLine } from 'react-icons/ri';
import { IoCloudDoneSharp } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

const OrderStatusProgress = ({ status }) => {
  console.log(status);
  const isCancelled = status === 'cancel';
  const statusList =
    status === 'cancel'
      ? ['wait', 'packaging', 'on the road', 'received', 'cancel'] // Thay 'done' bằng 'cancel'
      : ['wait', 'packaging', 'on the road', 'received', 'done'];

  const calculateProgress = () => {
    const index = statusList.indexOf(status);
    if (index === -1) return 0;
    return (index / (statusList.length - 1)) * 100;
  };

  const getStatusClass = (orderStatus, currentStatus) => {
    const orderStatusIndex = statusList.indexOf(orderStatus);
    const currentStatusIndex = statusList.indexOf(currentStatus);

    if (orderStatusIndex <= currentStatusIndex) {
      return 'active';
    }

    return '';
  };

  return (
    <div className="status-container">
      <div className="status-bar">
        <div
          className="status-progress"
          style={{ width: `${calculateProgress() + 1}%` }} // Cập nhật chiều dài thanh tiến trình
        />
        <div className="status-container">
          {!isCancelled ? (
            <div>
              <div className={`status-item ${getStatusClass('wait', status)}`}>
                <div className="status-item-title">
                  <PiNotebookBold size="24px" color="#2DB224" />
                  <p className="">Chờ</p>
                </div>
              </div>
              <div className={`status-item ${getStatusClass('packaging', status)}`}>
                <div className="status-item-title">
                  <PiPackageBold size="24px" color="#FA8232" />
                  <p className="">Đóng gói</p>
                </div>
              </div>
              <div className={`status-item ${getStatusClass('on the road', status)}`}>
                <div className="status-item-title ">
                  <RiTruckLine size="24px" color="#3258FF" />
                  <p className="">Vận chuyển</p>
                </div>
              </div>
              <div className={`status-item ${getStatusClass('received', status)}`}>
                <div className="status-item-title">
                  <PiHandshake size="24px" color="#FACB32" />
                  <p className="">Nhận</p>
                </div>
              </div>
              <div className={`status-item ${getStatusClass('done', status)}`}>
                <div className="status-item-title">
                  <IoCloudDoneSharp size="24px" color="#2DB224" />
                  <p>Hoàn thành</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={`status-item cancel`}>
                <div className="status-item-title">
                  <PiNotebookBold size="24px" color="#2DB224" />
                  <p className="">Chờ</p>
                </div>
              </div>
              <div className={`status-item cancel`}>
                <div className="status-item-title">
                  <PiPackageBold size="24px" color="#FA8232" />
                  <p className="">Đóng gói</p>
                </div>
              </div>
              <div className={`status-item cancel`}>
                <div className="status-item-title ">
                  <RiTruckLine size="24px" color="#3258FF" />
                  <p className="">Vận chuyển</p>
                </div>
              </div>
              <div className={`status-item cancel`}>
                <div className="status-item-title">
                  <PiHandshake size="24px" color="#FACB32" />
                  <p className="">Nhận</p>
                </div>
              </div>
              <div className={`status-item ${getStatusClass('cancel', status)}`}>
                <div className="status-item-title">
                  <MdCancel size="24px" color="#FF0000" />
                  <p>Đã hủy</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusProgress;
