import { Table } from 'antd';
import './OrderTable.scss';
import RatingModal from './RatingModal';
import { useState } from 'react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN').format(value) + ' VND';
};

const OrderTable = ({ dataSource, onUpdateReviewItemSize }) => {
  const orderColumns = [
    {
      title: <span style={{ marginRight: '20px', fontSize: '16px' }}>Tên sản phẩm</span>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <img src={record.image} className="wishlist-item-image" alt={text} />
          <div className="d-flex flex-column align-items-start">
            <span className="wishlist-item-text">
              {text} ({record.size})
            </span>
          </div>
        </div>
      ),
    },
    {
      title: <span style={{ fontSize: '16px' }}>Giá</span>,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => formatCurrency(text),
    },
    {
      title: <span style={{ fontSize: '16px' }}>Số lượng</span>,
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (text) => `x ${text}`,
    },
    {
      title: <span style={{ fontSize: '16px' }}>Tổng tiền</span>,
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: (text) => formatCurrency(text),
    },
    {
      title: <span style={{ fontSize: '16px' }}>Tổng tiền</span>,
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: (text) => formatCurrency(text),
    },
    {
      align: 'center',
      render: (_, record) =>
        record.status === 'done' && <RatingModal record={record} action={onUpdateReviewItemSize} />,
    },
  ];
  return (
    <div>
      <div className="d-flex align-items-center orderDetail-title">
        <h5 className="orderDetail-text">Thông tin đơn hàng</h5>
        <span className="orderDetail-length">({dataSource && dataSource.length})</span>
      </div>
      <Table scroll={{ x: 400 }} dataSource={dataSource} columns={orderColumns} />
    </div>
  );
};

export default OrderTable;
