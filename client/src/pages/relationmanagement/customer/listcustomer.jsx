import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { Table, Input, Space, Button, Modal, Dropdown } from 'antd';
import { SearchOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import request from 'api/apiRequest';
import CreateCustomer from './createcustomer';
import EditCustomer from './editCustomer';
import './listcustomer.css';

export default function Customer() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    request
      .get('/customer/')
      .then((response) => {
        const customerData = response.data.map((customer, index) => ({
          key: index + 1,
          _id: customer._id,
          customerCode: customer.customerCode,
          companyName: customer.companyName,
          taxNumber: customer.taxNumber,
          taxOffice: customer.taxOffice,
          idNumber: customer.idNumber,
          postCode: customer.postCode,
          notes: customer.notes,
          name: customer.name,
          sector: customer.sector,
          phone: customer.contact.phone,
          email: customer.contact.email,
          billingAddress: customer.billingAddress?.address,
          shippingAddress: customer.shippingAddress?.address,
          paymentMethod: customer.paymentMethod,
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

  const handleEdit = (record) => {
    setEditRecord(record);
    setEditFormVisible(true);
  };

  const handleEditFormClose = () => {
    setEditFormVisible(false);
    setEditRecord(null);
  };

  const handleUpdateCustomer = (updatedData) => {
    const updatedList = data.map((customer) => (customer.key === updatedData.key ? updatedData : customer));
    setData(updatedList);
    setFilteredData(updatedList);
    setEditFormVisible(false);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Silme Onayı',
      content: 'Bu müşteriyi silmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: () => {
        console.log('Sil:', record);
      }
    });
  };

  const menuItems = [
    {
      key: '1',
      icon: <EditOutlined />,
      label: 'Düzenle',
      onClick: () => handleEdit(currentRecord)
    },
    {
      key: '2',
      icon: <DeleteOutlined />,
      label: 'Sil',
      danger: true,
      onClick: () => handleDelete(currentRecord)
    }
  ];

  const columns = [
    { title: 'Customer Code', dataIndex: 'customerCode', width: '9%', sorter: (a, b) => a.customerCode.localeCompare(b.customerCode) },
    { title: 'Name', dataIndex: 'name', filterSearch: true },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Billing Address', dataIndex: 'billingAddress' },
    { title: 'Shipping Address', dataIndex: 'shippingAddress' },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' }
      ],
      onFilter: (value, record) => record.status === value
    },
    { title: 'Company Name', dataIndex: 'companyName', sorter: (a, b) => a.companyName.localeCompare(b.companyName) },
    { title: 'Tax Number', dataIndex: 'taxNumber' },
    { title: 'Tax Office', dataIndex: 'taxOffice' },
    { title: 'ID Number', dataIndex: 'idNumber' },
    { title: 'Post Code', dataIndex: 'postCode' },
    { title: 'Notes', dataIndex: 'notes' },
    { title: 'Sector', dataIndex: 'sector' },
    { title: 'Payment Method', dataIndex: 'paymentMethod' }
  ];

  const handleContextMenu = (record, event) => {
    event.preventDefault();
    setCurrentRecord(record);
    setContextMenuVisible(true);
    setMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMenuClose = () => {
    setContextMenuVisible(false);
  };

  return (
    <MainCard title="Customer List">
      {!showCreateForm && !editFormVisible ? (
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
          <Table
            columns={columns}
            scroll={{ x: 2500 }}
            dataSource={filteredData}
            onRow={(record) => ({
              onContextMenu: (event) => {
                event.preventDefault();
                handleContextMenu(record, event);
              }
            })}
          />
          <Dropdown
            menu={{ items: menuItems }}
            open={contextMenuVisible}
            onOpenChange={handleMenuClose}
            trigger={['contextMenu']}
            overlayStyle={{
              position: 'fixed',
              left: menuPosition.x,
              top: menuPosition.y
            }}
          >
            <div></div>
          </Dropdown>
        </Space>
      ) : showCreateForm ? (
        <CreateCustomer
          onSave={(data) => {
            handleSaveCustomer(data);
            setShowCreateForm(false);
          }}
          onCancel={handleCreateFormClose}
        />
      ) : (
        <EditCustomer customerId={editRecord._id} onSave={handleUpdateCustomer} onCancel={handleEditFormClose} />
      )}
    </MainCard>
  );
}
