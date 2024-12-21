import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { format } from 'date-fns';
import { FaArrowRight } from 'react-icons/fa';
import './HistoryTable.scss';
import { useNavigate } from 'react-router-dom';
import { ORDERSTATUS, ORDERSTATUSCOLOR } from '../../constants/enum';
import { darkenColor } from '../../utils/string';

const columns = (navigate) => [
  {
    title: 'Đơn hàng',
    key: 'product',
    render: (_, record) => (
      <div
        className="d-flex align-items-center"
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis', // Thêm dấu "..." nếu văn bản quá dài
        }}
      >
        <img
          src={record.orderDetails[0].itemSize.item.images[0]}
          style={{ height: '40px', marginRight: '8px', borderRadius: '3px' }}
          alt="product"
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
      return (
        <p className={`fw-bold`} style={{ margin: 0, color: darkenColor(ORDERSTATUSCOLOR[status], 0.5), backgroundColor : ORDERSTATUSCOLOR[status], padding : "5px", borderRadius : "10px" }}>
          {ORDERSTATUS[status]}
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
      <Button type="link" onClick={() => handleAction(record, navigate)}>
        Xem chi tiết <FaArrowRight />
      </Button>
    ),
  },
];

const handleAction = (record, navigate) => {
  navigate(`/history/${record.id}`);
};

const HistoryTable = ({ dataSource }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="history-container mb-0">
      <h5 className="history-title">CÁC ĐƠN HÀNG GẦN ĐÂY</h5>
      <Table
        className="history-table"
        dataSource={dataSource}
        columns={columns(navigate)}
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
