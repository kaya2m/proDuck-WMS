import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { Table, Input, Space, Button, Tooltip, Modal } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import request from 'api/apiRequest';
import CreateCustomer from './createcustomer';
import toastifyConfig from '../../../common/toastifyConfig';

export default function Customer() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    request
      .get('/customer/')
      .then((response) => {
        const customerData = response.data.map((customer, index) => ({
          key: index + 1,
          customerCode: customer.customerCode,
          name: customer.name,
          phone: customer.contact.phone,
          email: customer.contact.email,
          billingAddress: `${customer.billingAddress.street}, ${customer.billingAddress.city}, ${customer.billingAddress.country}`,
          shippingAddress: `${customer.shippingAddress.street}, ${customer.shippingAddress.city}, ${customer.shippingAddress.country}`,
          status: customer.status ? 'Active' : 'Inactive'
        }));
        setData(customerData);
        setFilteredData(customerData);
      })
      .catch((error) => console.error('Error fetching customers:', error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = data.filter(
      (customer) =>
        customer.customerCode.toLowerCase().includes(value) ||
        customer.name.toLowerCase().includes(value) ||
        customer.phone.toLowerCase().includes(value) ||
        customer.email.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  const toggleCreateForm = () => {
    setShowCreateForm(true);
  };

  const handleCreateFormClose = () => {
    setShowCreateForm(false);
  };

  const handleSaveCustomer = (customerData) => {
    setData([...data, customerData]);
    setShowCreateForm(false);
  };

  const columns = [
    {
      title: 'Customer Code',
      dataIndex: 'customerCode',
      width: '20%',
      sorter: (a, b) => a.customerCode.localeCompare(b.customerCode)
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      filterSearch: true
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '15%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%'
    },
    {
      title: 'Billing Address',
      dataIndex: 'billingAddress',
      width: '20%'
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shippingAddress',
      width: '40%'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' }
      ],
      onFilter: (value, record) => record.status === value,
      width: '10%'
    }
  ];

  return (
    <MainCard title="Customer List">
      {!showCreateForm ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space>
            <Input
              placeholder="Arama yapın"
              value={searchText}
              onChange={handleSearch}
              prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
              style={{ marginBottom: 16, width: '200px', height: '40px' }}
            />
            <Button type="primary" className="ms-3 mb-3" size="large" onClick={toggleCreateForm} icon={<PlusCircleOutlined />}>
              New Customer
            </Button>
          </Space>
          <Table columns={columns} dataSource={filteredData} onChange={(pagination, filters, sorter, extra) => {}} />
        </Space>
      ) : (
        <CreateCustomer
          onSave={(data) => {
            handleSaveCustomer(data);
            setShowCreateForm(false);
          }}
          onCancel={handleCreateFormClose}
        />
      )}
    </MainCard>
  );
}
