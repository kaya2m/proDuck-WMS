import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { Table, Input, Space, Button, Dropdown } from 'antd';
import { SearchOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, ImportOutlined, WarningOutlined } from '@ant-design/icons';
import request from 'api/apiRequest';
import './listStock.css';
import CreateStockCard from './createStockCard';
import StockEntryExitDialog from './StockEntryExitDialog';

export default function StockList() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showEntryExitDialog, setShowEntryExitDialog] = useState(false);

  useEffect(() => {
    request
      .get('/stock')
      .then((response) => {
        const stockData = response.data.map((stock, index) => ({
          key: index + 1,
          ...stock
        }));
        console.log(stockData);
        setData(stockData);
        setFilteredData(stockData);
        //const lowStock = stockData.filter((item) => item.currentQuantity <= item.criticalLevel);
        //setLowStockItems(lowStock);
      })
      .catch((error) => console.error('Error fetching stock data:', error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter((item) => item.stockCode.toLowerCase().includes(value) || item.productName.toLowerCase().includes(value));
    setFilteredData(filtered);
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
    { title: 'Stok Kodu', dataIndex: 'stockCode', width: '10%', sorter: (a, b) => a.stockCode.localeCompare(b.stockCode) },
    { title: 'Ürün Adı', dataIndex: 'productName', filterSearch: true },
    { title: 'Kategori', dataIndex: 'category' },
    { title: 'Marka', dataIndex: 'brand' },
    { title: 'Model', dataIndex: 'model' },
    { title: 'Barkod Numarası', dataIndex: 'barcodeNumber' },
    { title: 'GTIP Kodu', dataIndex: 'gtipCode' },
    { title: 'Birim', dataIndex: 'unit' },
    { title: 'Genişlik', dataIndex: ['dimensions', 'width'] },
    { title: 'Yükseklik', dataIndex: ['dimensions', 'height'] },
    { title: 'Derinlik', dataIndex: ['dimensions', 'depth'] },
    { title: 'Ağırlık', dataIndex: 'weight' },
    { title: 'Mevcut Miktar', dataIndex: 'currentQuantity' },
    { title: 'Min Seviye', dataIndex: 'minLevel' },
    { title: 'Max Seviye', dataIndex: 'maxLevel' },
    { title: 'Kritik Seviye', dataIndex: 'criticalLevel' },
    { title: 'Alış Fiyatı', dataIndex: 'purchasePrice' },
    { title: 'Satış Fiyatı', dataIndex: 'salePrice' },
    { title: 'KDV Oranı', dataIndex: 'vatRate' },
    { title: 'Tedarikçi Adı', dataIndex: ['supplier', 'name'] },
    { title: 'Depo Adı', dataIndex: 'warehouseName' },
    { title: 'Raf Numarası', dataIndex: 'shelfNumber' }
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

  const handleLowStockFilter = () => {
    setFilteredData(lowStockItems);
  };

  const handleReorderRequest = (item) => {
    console.log(`Reorder request for: ${item.productName}`);
  };

  const handleCreateStockCard = () => {
    setShowCreateForm(true);
  };

  const handleSaveStockCard = (newStock) => {
    setData((prevData) => [...prevData, newStock]);
    setFilteredData((prevData) => [...prevData, newStock]);
    setShowCreateForm(false);
  };

  const handleCancelCreateStockCard = () => {
    setShowCreateForm(false);
  };

  const handleStockEntryExit = () => {
    setShowEntryExitDialog(true);
  };

  return (
    <MainCard title="Stok Listesi">
      {showCreateForm ? (
        <CreateStockCard onSave={handleSaveStockCard} onCancel={handleCancelCreateStockCard} />
      ) : (
        <>
          {lowStockItems.length > 0 && (
            <div style={{ backgroundColor: 'red', padding: '10px', color: 'white' }}>
              <h4>Kritik Stok Seviyesinde Ürünler:</h4>
              {lowStockItems.map((item) => (
                <div key={item.key}>
                  {item.productName} - Düşük Stok
                  <Button onClick={() => handleReorderRequest(item)}>Yeniden Sipariş Talebi</Button>
                </div>
              ))}
            </div>
          )}
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Input
                placeholder="Arama yapın"
                value={searchText}
                onChange={handleSearch}
                prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                style={{ marginBottom: 16, width: '200px', height: '40px' }}
              />
              <Button className="ms-3 mb-3 special-button" size="large" icon={<PlusCircleOutlined />} onClick={handleCreateStockCard}>
                Stok Kartı Oluştur
              </Button>
              <Button type="primary" className="ms-3 mb-3" size="large" icon={<ImportOutlined />} onClick={handleStockEntryExit}>
                Stok Giriş - Çıkış
              </Button>
              <Button type="primary" danger className="ms-3 mb-3" size="large" icon={<WarningOutlined />} onClick={handleLowStockFilter}>
                Düşük Stokları Göster
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
          <StockEntryExitDialog visible={showEntryExitDialog} onClose={() => setShowEntryExitDialog(false)} />
        </>
      )}
    </MainCard>
  );
}
