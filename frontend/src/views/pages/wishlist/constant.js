import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { Select } from 'antd';
import { AVAILABILITY } from '../../../constants/enum';

export const tableColumns = (handleSizeChange, handleAddToCart, selectedSizes) => [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <div className="d-flex align-items-center">
        <img src={record.image} className="wishlist-item-image" alt={text} />
        <div className="d-flex flex-column align-items-start">
          <span className="wishlist-item-text">{text}</span>
          <Select
            defaultValue={record.itemSizes[0]?.size}
            style={{ width: 70, marginTop: 5, height: 20 }}
            onChange={(value) => handleSizeChange(value, record.itemId)}
          >
            {record.itemSizes.map((size) => (
              <Select.Option key={size.id} value={size.id}>
                {size.size}
              </Select.Option>
            ))}
          </Select>
        </div>
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
          {AVAILABILITY[text]}
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
        <button
          className={`d-flex justify-content-center align-items-center add-cart-btn ${
            record.availability === 'IN STOCK' ? '' : 'unactived'
          }`}
          onClick={() => handleAddToCart(record.itemId, selectedSizes[record.itemId] || record.itemSizes[0]?.id)}
        >
          <p>ADD TO CART</p>
          <IoCartOutline className="sidebar-icon" />
        </button>
        <IoIosRemoveCircleOutline className="remove-btn" />
      </div>
    ),
  },
];
