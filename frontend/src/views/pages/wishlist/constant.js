import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';

export const tableColumns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <div className="d-flex align-items-center">
        <img src={record.image} className="wishlist-item-image" alt={text} />
        <span className="wishlist-item-text">{text}</span>
      </div>
    ),
  },
  {
    title: 'Tình trạng',
    dataIndex: 'availability',
    key: 'availability',
    align: 'center',
    render: (text) => (
      <div className="d-flex align-items-center justify-content-center">
        <span
          className={`wishlist-item-status ${
            text === 'OUT OF STOCK'
              ? 'out-of-stock'
              : text === 'COMMING SOON'
              ? 'comming-soon'
              : text === 'NOT TODAY'
              ? 'not-today'
              : ''
          }`}
        >
          {text}
        </span>
      </div>
    ),
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: 'Hành động',
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    render: (text, record) => (
      <div className="d-flex justify-content-center align-items-center">
        <btn
          className={`d-flex justify-content-center align-items-center add-cart-btn ${
            record.availability === 'IN STOCK' ? '' : 'unactived'
          }`}
        >
          <p>ADD TO CART</p>
          <IoCartOutline className="sidebar-icon" />
        </btn>
        <IoIosRemoveCircleOutline className="remove-btn" />
      </div>
    ),
  },
];
