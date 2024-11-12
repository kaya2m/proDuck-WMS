import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { Table, Input, Space, Button, Modal, Dropdown } from 'antd';
import { SearchOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import request from 'api/apiRequest';
import CreateSupplier from './createSupplier';
import EditSupplier from './editSupplier';
import './listSupplier.css';

export default function Supplier() {
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
      .get('/suppliers')
      .then((response) => {
        const supplierData = response.data.map((supplier, index) => ({
          key: index + 1,
          _id: supplier._id,
          name: supplier.name,
          contactPersonName: supplier.contactPerson?.name,
          contactPersonTitle: supplier.contactPerson?.title,
          contactPhone: supplier.phone,
          contactEmail: supplier.email,
          bankName: supplier.bankDetails?.bankName,
          iban: supplier.bankDetails?.iban,
          swiftCode: supplier.bankDetails?.swiftCode,
          status: supplier.status ? 'Active' : 'Inactive',
          rating: supplier.rating,
          paymentMethod: supplier.paymentMethod,
          deliveryLeadTime: supplier.deliveryLeadTime,
          sector: supplier.sector,
          notes: supplier.notes
        }));
        setData(supplierData);
        setFilteredData(supplierData);
      })
      .catch((error) => console.error('Error fetching suppliers:', error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(value) ||
        supplier.contactPhone?.toLowerCase().includes(value) ||
        supplier.contactEmail?.toLowerCase().includes(value) ||
        supplier.contactPersonName?.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const toggleCreateForm = () => {
    setShowCreateForm(true);
  };

  const handleCreateFormClose = () => {
    setShowCreateForm(false);
  };

  const handleSaveSupplier = (supplierData) => {
    setData([...data, supplierData]);
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

  const handleUpdateSupplier = (updatedData) => {
    const updatedList = data.map((supplier) => (supplier.key === updatedData.key ? updatedData : supplier));
    setData(updatedList);
    setFilteredData(updatedList);
    setEditFormVisible(false);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Silme Onayı',
      content: 'Bu tedarikçiyi silmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: () => {
        request.delete(`/supplier/${record._id}`).then((response) => {
          setData(data.filter((supplier) => supplier._id !== record._id));
          setFilteredData(filteredData.filter((supplier) => supplier._id !== record._id));
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
    { title: 'Tedarikçi Adı', dataIndex: 'name', width: '15%', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Yetkili Kişi', dataIndex: 'contactPersonName' },
    { title: 'Yetkili Ünvanı', dataIndex: 'contactPersonTitle' },
    { title: 'Telefon', dataIndex: 'contactPhone' },
    { title: 'Email', dataIndex: 'contactEmail' },
    { title: 'Banka Adı', dataIndex: 'bankName' },
    { title: 'IBAN', dataIndex: 'iban' },
    { title: 'SWIFT Kodu', dataIndex: 'swiftCode' },
    {
      title: 'Durum',
      dataIndex: 'status',
      filters: [
        { text: 'Aktif', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' }
      ],
      onFilter: (value, record) => record.status === value
    },
    { title: 'Değerlendirme', dataIndex: 'rating', sorter: (a, b) => a.rating - b.rating },
    { title: 'Ödeme Koşulları', dataIndex: 'paymentMethod' },
    { title: 'Teslimat Süresi (gün)', dataIndex: 'deliveryLeadTime' },
    { title: 'Etiketler', dataIndex: 'tags' },
    { title: 'Notlar', dataIndex: 'notes' }
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
    <MainCard title="Tedarikçi Listesi">
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
              Yeni Tedarikçi
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
        <CreateSupplier
          onSave={(data) => {
            handleSaveSupplier(data);
            setShowCreateForm(false);
          }}
          onCancel={handleCreateFormClose}
        />
      ) : (
        <EditSupplier supplierId={editRecord._id} onSave={handleUpdateSupplier} onCancel={handleEditFormClose} />
      )}
    </MainCard>
  );
}
