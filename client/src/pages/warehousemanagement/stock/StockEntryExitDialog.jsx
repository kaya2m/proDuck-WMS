import React, { useState } from 'react';
import { Modal, Button, Input, Form, AutoComplete } from 'antd';
import request from '../../../api/apiRequest';

export default function StockEntryExitDialog({ visible, onClose }) {
  const [form] = Form.useForm();
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [stockCardOptions, setStockCardOptions] = useState([]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Values:', values);
        onClose();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  const onSearchForStockCard = (value) => {
    if (value) {
      request
        .get(`/stockCard/search?query=${value}`)
        .then((response) => {
          const options = response.data.map((item) => ({ value: item._id, label: item.productCode }));
          setStockCardOptions(options);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    } else {
      setStockCardOptions([]);
    }
  };

  const onSearchForWarehouse = (value) => {
    if (value) {
      request
        .get(`/warehouse/search?query=${value}`)
        .then((response) => {
          const options = response.data.map((item) => ({ value: item.name }));
          setWarehouseOptions(options);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    } else {
      setWarehouseOptions([]);
    }
  };

  return (
    <Modal
      title="Stok Giriş - Çıkış"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Kapat
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Kaydet
        </Button>
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="stockCard" label="Stok Kartı" rules={[{ required: true, message: 'Lütfen stok kartını girin!' }]}>
          <AutoComplete
            onSearch={onSearchForStockCard}
            options={stockCardOptions}
            onSelect={(value, option) => form.setFieldsValue({ stockCard: option.label })}
            placeholder="Stok Kartı Seçin"
          />
        </Form.Item>
        <Form.Item name="warehouse" label="Depo" rules={[{ required: true, message: 'Lütfen depo bilgisini girin!' }]}>
          <AutoComplete onSearch={onSearchForWarehouse} options={warehouseOptions} placeholder="Depo Seçin" />
        </Form.Item>
        <Form.Item name="currentQuantity" label="Mevcut Miktar" rules={[{ type: 'number', message: 'Lütfen geçerli bir sayı girin!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="unit" label="Birim" rules={[{ required: true, message: 'Lütfen birim bilgisini girin!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Konum">
          <Input />
        </Form.Item>
        <Form.Item name="lotNumber" label="Lot Numarası">
          <Input />
        </Form.Item>
        <Form.Item name="batchNumber" label="Parti Numarası">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
