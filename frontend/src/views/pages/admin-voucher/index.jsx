import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import voucherAPI from '../../../api/voucherAPI';
import './index.scss';
import LoadingOverlay from '../../../components/loading_overlay';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const VoucherPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // Số lượng voucher trên mỗi trang
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    // Giả lập API call để lấy danh sách voucher
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      // Gọi API lấy dữ liệu voucher
      const response = await voucherAPI.getVoucherByAdmin();

      // Chuyển đổi dữ liệu từ API nếu cần (phụ thuộc vào cấu trúc dữ liệu trả về)
      const formattedVouchers = response.data.map((voucher) => ({
        id: voucher.id,
        code: voucher.code, // Mã voucher
        discount: voucher.discount, // Giảm giá
        minValue: voucher.minPrice, // Giá áp dụng tối thiểu
        quantity: voucher.count, // Số lượng voucher
        startDate: new Date(voucher.startAt).toISOString().split('T')[0], // Chuyển đổi thời gian start
        endDate: new Date(voucher.endAt).toISOString().split('T')[0], // Chuyển đổi thời gian end
        name: voucher.name, // Tên voucher
      }));

      // Cập nhật state với dữ liệu đã được chuyển đổi
      setVouchers(formattedVouchers);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu voucher:', error);
      // Xử lý lỗi (có thể hiển thị thông báo lỗi cho người dùng)
    }
  };

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredVouchers = vouchers.filter((voucher) => voucher.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Tính toán các voucher trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVouchers = filteredVouchers.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);

  const openEditModal = (voucher) => {
    setSelectedVoucher(voucher);
    setModalIsOpen(true);
  };
  const convertDateFormat = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };
  const validateForm = () => {
    console.log('validateForm');
    if (!selectedVoucher.name.trim()) {
      toast.warning('Tên voucher không được để trống');
      return false;
    }
    if (!selectedVoucher.code.trim()) {
      toast.warning('Mã voucher không được để trống');
      return false;
    }
    if (!selectedVoucher.discount) {
      toast.warning('Giảm giá không được để trống');
      return false;
    }
    if (!selectedVoucher.minValue) {
      toast.warning('Giá áp dụng không được để trống');
      return false;
    }
    if (!selectedVoucher.startDate.trim()) {
      toast.warning('Ngày bắt đầu không được để trống');
      return false;
    }
    if (!selectedVoucher.endDate.trim()) {
      toast.warning('Ngày kết thúc không được để trống');
      return false;
    }
    if (!selectedVoucher.quantity) {
      toast.warning('Số lượng không được để trống');
      return false;
    }

    return true; // Tất cả đều hợp lệ
  };
  const handleUpdateVoucher = async (e) => {
    e.preventDefault();
    console.log('vào update');
    if (!validateForm()) return;
    setLoading(true);
    console.log(selectedVoucher);
    try {
      await voucherAPI.updateVoucher({
        voucherId: selectedVoucher.id,
        name_vi: selectedVoucher.name,
        code: selectedVoucher.code,
        discount: selectedVoucher.discount,
        minPrice: selectedVoucher.minValue,
        startAt: convertDateFormat(selectedVoucher.startDate),
        endAt: convertDateFormat(selectedVoucher.endDate),
        count: selectedVoucher.quantity,
      });

      fetchVouchers();

      setModalIsOpen(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật voucher:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVoucher = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    console.log(selectedVoucher);
    try {
      await voucherAPI.createVoucher({
        name_vi: selectedVoucher.name,
        code: selectedVoucher.code,
        discount: selectedVoucher.discount,
        minPrice: selectedVoucher.minValue,
        startAt: convertDateFormat(selectedVoucher.startDate),
        endAt: convertDateFormat(selectedVoucher.endDate),
        count: selectedVoucher.quantity,
      });

      fetchVouchers();

      setModalIsOpen(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật voucher:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <LoadingOverlay loading={loading} />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', marginTop: '32px' }}>
        {/* Thanh tìm kiếm và nút thêm voucher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Danh sách voucher</h3>
          <div>
            <input
              type="text"
              placeholder="Tìm kiếm voucher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '10px',
                width: '300px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginRight: '24px',
              }}
            />
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#f58220',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => setModalIsOpen(true)}
            >
              Thêm Voucher
            </button>
          </div>
        </div>

        {/* Bảng danh sách voucher */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9' }}>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Mã Voucher</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Tên Voucher</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Giảm giá</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                Giá áp dụng (Tối thiểu)
              </th>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Số lượng</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Ngày bắt đầu</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Ngày kết thúc</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentVouchers.length > 0 ? (
              currentVouchers.map((voucher) => (
                <tr key={voucher.id}>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{voucher.code}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{voucher.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{voucher.discount}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{voucher.minValue}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{voucher.quantity}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                    {voucher.startDate}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{voucher.endDate}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                    <button
                      style={{
                        marginRight: '10px',
                        cursor: 'pointer',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '6px 12px',
                      }}
                      onClick={() => openEditModal(voucher)}
                    >
                      ✏️
                    </button>
                    <button
                      style={{ cursor: 'pointer', border: '1px solid #ccc', borderRadius: '8px', padding: '6px 12px' }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '10px' }}>
                  Không tìm thấy voucher nào
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Phân trang */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '10px',
              margin: '0 3px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '6px',
            }}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: '10px',
                margin: '0 3px',
                backgroundColor: currentPage === i + 1 ? '#f58220' : '#f0f0f0',
                color: currentPage === i + 1 ? 'white' : 'black',
                border: '1px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '10px',
              margin: '0 3px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '6px',
            }}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Thông Tin Voucher</h2>
        <form
          className="voucher-form"
          onSubmit={(e) => {
            if (!selectedVoucher.id) {
              handleCreateVoucher(e);
            } else {
              handleUpdateVoucher(e);
            }
          }}
        >
          <div className="form-group">
            <label>Mã Voucher</label>
            <input
              type="text"
              placeholder="XALMAXP"
              value={selectedVoucher ? selectedVoucher.code : ''}
              onChange={(e) => setSelectedVoucher({ ...selectedVoucher, code: e.target.value })}
            />
          </div>
          <div className="form-grid">
            <div className="form-group-voucher">
              <label>Tên Voucher</label>
              <input
                type="text"
                placeholder="SALE MONTHS"
                value={selectedVoucher ? selectedVoucher.name : ''}
                onChange={(e) => setSelectedVoucher({ ...selectedVoucher, name: e.target.value })}
              />
            </div>
            <div className="form-group-discount">
              <label>Giảm giá (%)</label>
              <input
                type="number"
                placeholder="50%"
                value={selectedVoucher ? selectedVoucher.discount : ''}
                onChange={(e) => setSelectedVoucher({ ...selectedVoucher, discount: e.target.value })}
              />
            </div>
            <div className="form-group-cost">
              <label>Giá áp dụng (.000đ)</label>
              <input
                type="number"
                placeholder=""
                value={selectedVoucher ? selectedVoucher.minValue : ''}
                onChange={(e) => setSelectedVoucher({ ...selectedVoucher, minValue: e.target.value })}
              />
            </div>
            <div className="form-group-count">
              <label>Số lượng</label>
              <input
                type="number"
                placeholder="50"
                value={selectedVoucher ? selectedVoucher.quantity : ''}
                onChange={(e) => setSelectedVoucher({ ...selectedVoucher, quantity: e.target.value })}
              />
            </div>
            <div className="form-group-startDate">
              <label>Ngày bắt đầu</label>
              <input
                type="date"
                placeholder=""
                value={selectedVoucher ? selectedVoucher.startDate : ''}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedVoucher({ ...selectedVoucher, startDate: e.target.value })}
              />
            </div>
            <div className="form-group-endDate">
              <label>Ngày kết thúc</label>
              <input
                type="date"
                placeholder=""
                value={selectedVoucher ? selectedVoucher.endDate : ''}
                min={selectedVoucher ? selectedVoucher.startDate : new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedVoucher({ ...selectedVoucher, endDate: e.target.value })}
              />
            </div>
          </div>
          <div className="button">
            <button className="save-button" type="submit">
              Lưu Thay Đổi
            </button>
            <button className="close-button" onClick={() => setModalIsOpen(false)}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VoucherPage;
