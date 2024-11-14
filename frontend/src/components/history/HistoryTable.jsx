import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { format } from 'date-fns';
import { FaArrowRight } from 'react-icons/fa';
import './HistoryTable.scss';

const columns = [
  {
    title: 'Đơn hàng',
    key: 'product',
    render: (_, record) => (
      <div className="d-flex align-items-center">
        <img
          src={record.orderDetails[0].itemSize.item.images[0]}
          style={{ height: '40px', marginRight: '8px', borderRadius: '3px' }}
        />
        {record.orderDetails[0].itemSize.item.name}
        <span style={{ marginLeft: '10px' }}>({record.orderDetails.length})</span>
      </div>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (status) => {
      let displayText = '';
      let textClass = '';
      switch (status) {
        case 'wait':
          displayText = 'Đang chờ';
          textClass = 'text-warning';
          break;
        case 'packaging':
          displayText = 'Đóng gói';
          textClass = 'text-primary';
          break;
        case 'cancel':
          displayText = 'Đã hủy';
          textClass = 'text-danger';
          break;
        case 'on the road':
          displayText = 'Đang vận chuyển';
          textClass = 'text-info';
          break;
        case 'received':
          displayText = 'Đã nhận';
          textClass = 'text-success';
          break;
        case 'done':
          displayText = 'Hoàn thành';
          textClass = 'text-muted';
          break;
        default:
          displayText = status;
          textClass = '';
          break;
      }

      return (
        <p className={`fw-bold ${textClass}`} style={{ margin: 0 }}>
          {displayText}
        </p>
      );
    },
  },
  {
    title: 'Ngày giờ',
    key: 'createdAt',
    align: 'center',
    render: (_, record) => (
      <p>
        <span style={{ color: '#475156' }}>{format(new Date(record.createdAt), 'dd/MM/yyyy')}</span>
        <span style={{ marginLeft: '10px', color: '#475156' }}>{format(new Date(record.createdAt), 'HH:mm')}</span>
      </p>
    ),
  },
  {
    title: 'Tổng tiền',
    key: 'totalPrice',
    align: 'center',
    render: (_, record) => (
      <p style={{ color: '#475156' }}>{Intl.NumberFormat('vi-VN').format(record.totalPrice) + ' VND'}</p>
    ),
  },
  {
    title: 'Hoạt động',
    key: 'action',
    align: 'center',
    render: (_, record) => (
      <Button type="link" onClick={() => handleAction(record)}>
        Xem chi tiết <FaArrowRight />
      </Button>
    ),
  },
];

const handleAction = (record) => {
  console.log('Chi tiết đơn hàng:', record);
};

const HistoryTable = ({ dataSource }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="history-container mb-0">
      <h5 className="history-title">CÁC ĐƠN HÀNG GẦN ĐÂY</h5>
      <Table
        className="history-table"
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: 6,
          total: dataSource.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default HistoryTable;
