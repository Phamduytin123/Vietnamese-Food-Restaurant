import { Button, Modal, Table } from 'antd';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { formatDistanceToNow, format, isAfter, isBefore, subMonths } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ORDERPAYMENTMETHOD, ORDERSTATUS, ORDERSTATUSCOLOR } from '../../../../constants/enum';
import { formatCurrency, darkenColor } from '../../../../utils/string';

function formatTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const translations = {
    about: 'khoảng',
    'less than a minute ago': 'ít hơn một phút trước',
    minute: 'phút',
    minutes: 'phút',
    hour: 'giờ',
    hours: 'giờ',
    day: 'ngày',
    days: 'ngày',
    month: 'tháng',
    months: 'tháng',
    year: 'năm',
    years: 'năm',
    ago: 'trước',
    in: 'trong',
  };

  function translate(text) {
    return text
      .split(' ')
      .map((word) => translations[word] || word)
      .join(' ');
  }

  if (isAfter(now, date)) {
    // Nếu đã quá ngày
    const distance = formatDistanceToNow(date, { addSuffix: true, locale: vi });
    return translate(distance);
  } else if (isBefore(now, subMonths(date, 1))) {
    // Nếu chưa quá 1 tháng
    const distance = formatDistanceToNow(date, { addSuffix: true, locale: vi });
    return translate(distance);
  } else {
    // Nếu đã quá 1 tháng
    return format(date, 'dd/MM/yyyy HH:mm', { locale: vi });
  }
}

function FoodModalOrder({ status, handleStatusChange, orderId }) {
  const validTransitions = {
    wait: ['packaging', 'cancel'],
    packaging: ['on the road', 'cancel'],
    cancel: [],
    'on the road': ['received', 'cancel'],
    received: ['done', 'cancel'],
    done: [],
  };

  return (
    <div className="d-flex justify-content-end">
      {validTransitions[status ? status : 'done'].map((validStatus) => (
        <Button
          style={{ background: ORDERSTATUSCOLOR[validStatus], color: darkenColor(ORDERSTATUSCOLOR[validStatus]) }}
          className="admin-order-lists-modal-footer-item-button"
          onClick={() => handleStatusChange(orderId, status, validStatus)}
        >
          {ORDERSTATUS[validStatus]}
        </Button>
      ))}
    </div>
  );
}

function ModalOrder(props) {
  const { isModalVisible, closeModal, data, handleStatusChange } = props;
  console.log(data);

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'itemSize',
      key: 'itemInfo',
      render: (itemSize) => {
        const { item } = itemSize;
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={item.images[0]} alt={'product img'} className="admin-order-lists-modal-table-food-image" />
            <span>{item.name}</span>
          </div>
        );
      },
    },
    {
      title: 'Kích thước',
      dataIndex: 'itemSize',
      key: 'itemSize',
      render: (itemSize) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{itemSize.size}</span>
          </div>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{quantity}</span>
          </div>
        );
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{formatCurrency(price * record.quantity)}</span>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      title="Chi tiết đơn hàng"
      visible={isModalVisible}
      onCancel={closeModal}
      footer={<FoodModalOrder status={data.status} handleStatusChange={handleStatusChange} orderId={data.id} />}
    >
      <div className="admin-order-lists-modal-container">
        <div className="row align-items-center">
          <div className="admin-order-lists-modal-row-item-container col-lg-6 col-sm-12">
            <p className="admin-order-lists-modal-title">Người nhận : </p>
            <div className="d-flex align-items-center">
              <img alt="avatar user" src={data.account.avatar} className="admin-order-lists-modal-user-avatar" />
              <p className="admin-order-lists-modal-user-name">{data.account.displayName}</p>
            </div>
          </div>
          <div className="admin-order-lists-modal-row-item-container col-lg-6 col-sm-12">
            <div className="d-flex justify-content-center">
              <div
                style={{ background: ORDERSTATUSCOLOR[data.status], color: darkenColor(ORDERSTATUSCOLOR[data.status]) }}
                className="admin-order-lists-modal-row-item-status"
              >
                {ORDERSTATUS[data.status]}
              </div>
            </div>
            <div className="admin-order-lists-modal-row-item-createdAt">{formatTime(data.createdAt)}</div>
          </div>
        </div>
        <div className="admin-order-lists-modal-row-item-container">
          <p className="admin-order-lists-modal-title">Địa chỉ : </p>
          <p className="admin-order-lists-modal-row-item-data">{data.address}</p>
        </div>
        <div className="row align-items-center">
          <div className="admin-order-lists-modal-row-item-container col-lg-6 col-sm-12">
            <p className="admin-order-lists-modal-title">Số điện thoại : </p>
            <p className="admin-order-lists-modal-row-item-data">{data.phoneNumber}</p>
          </div>
          <div className="admin-order-lists-modal-row-item-container col-lg-6 col-sm-12">
            <p className="admin-order-lists-modal-title">Email : </p>
            <p className="admin-order-lists-modal-row-item-data">{data.email}</p>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="admin-order-lists-modal-row-item-container col-lg-6 col-sm-12">
            <p className="admin-order-lists-modal-title">Phương thức thanh toán : </p>
            <p className="admin-order-lists-modal-row-item-data">{ORDERPAYMENTMETHOD[data.paymentMethod]}</p>
          </div>
          <div className="admin-order-lists-modal-row-item-container col-lg-6 col-sm-12">
            <p className="admin-order-lists-modal-title">Trạng thái thanh toán : </p>
            <p className="admin-order-lists-modal-row-item-data">{data.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
          </div>
        </div>
        <div className="admin-order-lists-modal-row-item-container">
          <p className="admin-order-lists-modal-title">Lý do hủy : </p>
          <p className="admin-order-lists-modal-row-item-data">{data.reasonCancel ? data.reasonCancel : 'Không có'}</p>
        </div>
        <Table dataSource={data.orderDetails} columns={columns} style={{ width: '100%' }} pagination={false} />
        <div>
          <p className="admin-order-lists-modal-total-price">{formatCurrency(data.totalPrice)}</p>
        </div>
      </div>
    </Modal>
  );
}

export default ModalOrder;
