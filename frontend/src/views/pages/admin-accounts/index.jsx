import React, { useEffect, useState } from 'react';
import { darkenColor, TruncateText } from '../../../utils/string';
import { Button, Input, Pagination, Switch, Table } from 'antd';
import { useAuth } from '../../../contexts/AccountContext';
import { FormOutlined, PlusOutlined } from '@ant-design/icons';
import { ICONS } from '../../../constants/icons';
import accountAPI from '../../../api/accountAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import AccountDetailModal from './components/account-detail';
import AccountUpdateModal from './components/account-update';
import AccountCreateModal from './components/account-create';
import { toast } from 'react-toastify';

const AdminAccount = (props) => {
  const { pageRole } = props;

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeModel, setTypeModel] = useState(null);

  const { account } = useAuth();

  const callAPI = async () => {
    try {
      const res = await accountAPI.adminListAccount(page, limit, pageRole);
      // console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  useEffect(() => {
    if (search.length !== 0) {
      setFilterData(
        data.filter(
          (account) =>
            account.name.toLowerCase().includes(search.toLowerCase()) ||
            account.email.toLowerCase().includes(search.toLowerCase()) ||
            account.displayName.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setFilterData(data);
    }
  }, [search, data]);

  const onRowClick = (record) => {
    setTypeModel('detail');
    setSelectedAccount(record);
    setIsModalVisible(true);
  };

  const handleChangeData = (accountId, newAccount) => {
    setData(
      data.map((account) => {
        if (account.id === accountId) {
          return newAccount;
        }
        return account;
      }),
    );
  };

  const onChangeSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const onActiveAccount = async (status, account) => {
    // console.log('status : ', status, 'accountId : ', account.id);
    try {
      const newAccount = {
        ...account,
        isActive: status,
      };
      const res = await accountAPI.adminUpdateAccount(account.id, { isActive: status });

      console.log(res.data);

      handleChangeData(account.id, newAccount);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeAccountInfo = (record) => {
    setTypeModel('update');
    setSelectedAccount(record);
    setIsModalVisible(true);
  };

  const onCreateStaffAccount = () => {
    setTypeModel('create');
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAccount(null);
    setTypeModel(null);
  };

  const onUpdateAccount = async (account) => {
    setData(
      data.map((accountMap) => {
        if (accountMap.id === account.id) return account;
        return accountMap;
      }),
    );
    toast.success('Thay đổi tài khoản thành công');
  };

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'displayName',
      key: 'displayName',
      render: (displayName, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.avatar}
            alt={record.id}
            style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
          />
          <span>{displayName}</span>
        </div>
      ),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => (
        <div className="admin-account-table-center-item">
          <img alt="gender icon" style={{ width: 30, height: 30 }} src={ICONS[gender]} />
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => <p>{TruncateText(email, 30)}</p>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'tel',
      key: 'tel',
      render: (tel) => <div className="admin-account-table-center-item">{tel}</div>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (address) => <p>{TruncateText(address, 50)}</p>,
    },
    {
      title: 'Kích hoạt',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <div className="admin-account-table-center-item">
          <Switch
            size="big"
            value={isActive}
            onClick={(status) => onActiveAccount(status, record)}
            style={{ background: isActive ? 'green' : 'gray' }}
          />
        </div>
      ),
    },
    {
      title: 'Chỉnh sửa',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, record) => (
        <div className="admin-account-table-center-item">
          <Button icon={<FormOutlined />} onClick={() => onChangeAccountInfo(record)} />
        </div>
      ),
    },
  ];

  return (
    <div className="admin-account-container">
      {typeModel === 'detail' && selectedAccount && isModalVisible && (
        <AccountDetailModal
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          data={selectedAccount}
          onChangeAccountInfo={onChangeAccountInfo}
          onActiveAccount={onActiveAccount}
        />
      )}
      {typeModel === 'update' && selectedAccount && isModalVisible && (
        <AccountUpdateModal
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          data={selectedAccount}
          onUpdateAccount={onUpdateAccount}
        />
      )}
      {typeModel === 'create' && isModalVisible && (
        <AccountCreateModal isModalVisible={isModalVisible} closeModal={closeModal} />
      )}
      <div className="d-flex justify-content-between align-items-center admin-account-header-container">
        <h3 className="admin-account-title" style={{ color: darkenColor('#8280ff') }}>
          {`Danh sách ${pageRole === 'customer' ? 'khách hàng' : 'nhân viên'}`}
        </h3>
        <div className="d-flex align-items-center">
          <Input
            placeholder="Nhập vào tên, email"
            value={search}
            onChange={onChangeSearch}
            className="admin-account-search-input"
          />
          {account.role === 'admin' && pageRole === 'staff' && (
            <Button className="admin-account-button-create-account" onClick={onCreateStaffAccount}>
              <PlusOutlined />
              Tạo tài khoản
            </Button>
          )}
        </div>
      </div>
      <Table
        dataSource={filterData}
        columns={columns}
        style={{ width: '100%' }}
        pagination={false}
        onRow={(record) => ({
          onClick: (event) => {
            const clickedElement = event.target;
            if (clickedElement.closest('.ant-btn') || clickedElement.closest('.ant-switch')) {
              event.stopPropagation();
            } else {
              onRowClick(record);
            }
          },
        })}
      />
      <div className="d-flex justify-content-end">
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
};

export default AdminAccount;
