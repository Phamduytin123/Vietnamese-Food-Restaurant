import { Button, DatePicker, Pagination, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, format, isAfter, isBefore, subMonths } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ORDERSTATUS, ORDERSTATUSCOLOR } from '../../../constants/enum';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { formatCurrency, TruncateText } from '../../../utils/string';
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import orderAPI from '../../../api/orderAPI';
import ModalOrder from './modalOrder';
import { toast } from 'react-toastify';
import {} from 'date-fns';

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

function darkenColor(color, amount = 0.5) {
  let [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));

  r = Math.max(0, r - Math.round(255 * amount));
  g = Math.max(0, g - Math.round(255 * amount));
  b = Math.max(0, b - Math.round(255 * amount));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: ${(props) => props.bgcolor} !important;
    color: ${(props) => props.color} !important;
  }
`;

function AdminOrderLists() {
  const [orders, setOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState();
  const [statusFilter, setStatusFilter] = useState();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const callAPI = async () => {
    try {
      const formattedDateFilter = dateFilter ? format(dateFilter, 'yyyy-MM-dd') : null;
      const response = await orderAPI.adminListOrders(statusFilter, formattedDateFilter, page, limit);
      console.log(response.data);
      setOrders(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAPI();
  }, [statusFilter, dateFilter, page, limit]);

  const onChangeDateFilter = (date, dateString) => {
    console.log(date, dateString);
    setDateFilter(date);
  };

  const onChangeStatusFilter = (value) => {
    setStatusFilter(value);
  };

  const handleStatusChange = async (orderId, currentStatus, newStatus) => {
    const validTransitions = {
      wait: ['packaging', 'cancel'],
      packaging: ['on the road', 'cancel'],
      cancel: [],
      'on the road': ['received', 'cancel'],
      received: ['done', 'cancel'],
      done: [],
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      toast.error('Không thể chuyển đổi trạng thái này');
      return;
    }

    try {
      const res = await orderAPI.adminUpdateStatusOrder(orderId, newStatus);
      console.log(res);
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        }),
      );
      toast.success('Cập nhập trạng thái đơn hàng thành công');
    } catch (error) {
      console.log(error);
      toast.error('Đã có lỗi xảy ra');
      console.log(error);
    }
  };

  const onRowClick = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const onClickResetFilter = () => {
    setDateFilter(null);
    setStatusFilter(null);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'account',
      key: 'account',
      render: (account) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={account.avatar}
            alt={account.name}
            style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
          />
          <span>{account.name}</span>
        </div>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (address) => {
        return <p>{TruncateText(address, 30)}</p>;
      },
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => {
        return <p>{formatTime(createdAt)}</p>;
      },
      sorter: {
        compare: (a, b) => a.createdAt - b.createdAt,
        multiple: 1,
      },
    },
    {
      title: 'Món ăn',
      dataIndex: 'orderDetails',
      key: 'orderDetails',
      render: (orderDetails) => {
        const result = orderDetails.reduce((acc, orderDetail, index) => {
          const detail = `${orderDetail.itemSize.item.name}(${orderDetail.itemSize.size})`;
          return acc + (index > 0 ? ', ' : '') + detail; // Thêm dấu phẩy giữa các phần tử
        }, '');

        return <p>{TruncateText(result, 40)}</p>;
      },
    },
    {
      title: 'Số tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => {
        return <p>{formatCurrency(totalPrice)}</p>;
      },
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
        multiple: 2,
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        return (
          <StyledSelect
            key={record.id}
            value={status}
            bgcolor={ORDERSTATUSCOLOR[status]}
            color={darkenColor(ORDERSTATUSCOLOR[status], 0.5)}
            style={{ width: 180 }}
            onChange={(value) => handleStatusChange(record.id, record.status, value)}
            className="admin-order-table-item-status-select-container"
          >
            {Object.keys(ORDERSTATUS).map((key) => (
              <Select.Option
                key={key}
                value={key}
                style={{
                  background: ORDERSTATUSCOLOR[key],
                  color: darkenColor(ORDERSTATUSCOLOR[key], 0.5),
                }}
                className="admin-order-table-item-status-select"
              >
                {ORDERSTATUS[key]}
              </Select.Option>
            ))}
          </StyledSelect>
        );
      },
    },
  ];

  return (
    <div className="admin-order-container">
      <h3 className="admin-order-title">Danh sách đơn hàng</h3>
      {closeModal && selectedOrder && (
        <ModalOrder
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          data={selectedOrder}
          handleStatusChange={handleStatusChange}
        />
      )}
      <div className="d-flex align-items-center admin-order-filter-container">
        <div className="admin-order-filter-item">
          <FilterOutlined />
        </div>
        <div className="admin-order-filter-item">Sắp xếp theo</div>
        <div>
          <DatePicker value={dateFilter} onChange={onChangeDateFilter} placeholder="Chọn ngày" />
        </div>
        <div className="admin-order-filter-item">
          <StyledSelect
            value={statusFilter}
            bgcolor={statusFilter ? ORDERSTATUSCOLOR[statusFilter] : null}
            color={statusFilter ? darkenColor(ORDERSTATUSCOLOR[statusFilter], 0.5) : null}
            style={{ width: 180 }}
            onChange={onChangeStatusFilter}
            placeholder="Chọn trạng thái của bạn"
          >
            {Object.keys(ORDERSTATUS).map((key) => (
              <Select.Option
                key={key}
                value={key}
                style={{
                  background: ORDERSTATUSCOLOR[key],
                  color: darkenColor(ORDERSTATUSCOLOR[key], 0.5),
                }}
              >
                {ORDERSTATUS[key]}
              </Select.Option>
            ))}
          </StyledSelect>
        </div>
        <div className="admin-order-filter-item">
          <Button className=" admin-order-filter-button-reset" onClick={onClickResetFilter}>
            <ReloadOutlined />
            Khôi phục lọc
          </Button>
        </div>
      </div>
      <div className="admin-order-table-container">
        <Table
          dataSource={orders}
          columns={columns}
          style={{ width: '100%' }}
          pagination={false}
          onRow={(record) => ({
            onClick: (event) => {
              const clickedElement = event.target;
              if (clickedElement.closest('.ant-select') || clickedElement.closest('.ant-select-dropdown')) {
                event.stopPropagation();
              } else {
                onRowClick(record);
              }
            },
          })}
        />
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          onChange={(page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          }}
          style={{ marginTop: 16, textAlign: 'right' }}
        />
      </div>
    </div>
  );
}

export default AdminOrderLists;
