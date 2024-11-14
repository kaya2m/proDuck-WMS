import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { Table, Input, Space, Button, Modal, Dropdown } from 'antd';
import { SearchOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import request from 'api/apiRequest';
import CreateCustomer from './createCustomer';
import EditCustomer from './editCustomer';

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
        request.delete(`/customer/${record._id}`).then((response) => {
          setData(data.filter((customer) => customer._id !== record._id));
          setFilteredData(filteredData.filter((customer) => customer._id !== record._id));
        });
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
    { title: 'Müşteri Numarası', dataIndex: 'customerCode', width: '9%', sorter: (a, b) => a.customerCode.localeCompare(b.customerCode) },
    { title: 'Adı', dataIndex: 'name', filterSearch: true },
    { title: 'Telefon', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Fatura Adresi', dataIndex: 'billingAddress' },
    { title: 'Gönderi Adresi', dataIndex: 'shippingAddress' },
    {
      title: 'Durum',

      dataIndex: 'status',
      filters: [
        { text: 'Aktif', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' }
      ],
      onFilter: (value, record) => record.status === value
    },
    { title: 'Şirket Adı', dataIndex: 'companyName', sorter: (a, b) => a.companyName.localeCompare(b.companyName) },
    { title: 'Vergi Numarası', dataIndex: 'taxNumber' },
    { title: 'Vergi Dairesi', dataIndex: 'taxOffice' },
    { title: 'TC Kimlik Numarası', dataIndex: 'idNumber' },
    { title: 'Posta Kodu', dataIndex: 'postCode' },
    { title: 'Notlar', dataIndex: 'notes' },
    { title: 'Sektör', dataIndex: 'sector' },
    { title: 'Ödeme Yöntemi', dataIndex: 'paymentMethod' }
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
    <MainCard title="Müşteri Listesi">
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
              Yeni Müşteri
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
