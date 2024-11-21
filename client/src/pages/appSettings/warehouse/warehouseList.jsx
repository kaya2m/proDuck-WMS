import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Avatar, Badge } from 'antd';
import request from '../../../api/apiRequest';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingFilled,
  HomeOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  GatewayOutlined,
  PlusOutlined
} from '@ant-design/icons';
import warehouseDefault from '../../../assets/images/warehouse-default.png';
import CreateWarehouse from './warehouseCreate';
const { Meta } = Card;
import { AuthContext } from '../../../utils/AuthUtils/AuthContext';

export default function WarehouseList() {
  const { currentUser } = useContext(AuthContext);
  const [warehouses, setWarehouses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  useEffect(() => {
    const fetchWarehouses = async () => {
      request
        .get(`/warehouse/${currentUser.company._id}`)
        .then((response) => {
          setWarehouses(response.data);
        })
        .catch((error) => console.error('Error fetching stock data:', error));
    };
    fetchWarehouses();
  }, []);
  const handleCreateWarehouse = () => {
    setShowCreateForm(true);
  };
  const handleCancelCreateWarehouse = () => {
    setShowCreateForm(false);
  };
  return (
    <div className="row">
      <div className="col-12 mb-3">
        <Button type="primary" hidden={showCreateForm} icon={<PlusOutlined />} onClick={handleCreateWarehouse}>
          Yeni Depo Ekle
        </Button>
      </div>
      {showCreateForm ? (
        <CreateWarehouse onSave={() => setShowCreateForm(false)} onCancel={handleCancelCreateWarehouse} />
      ) : (
        warehouses.map((warehouse) => (
          <div className="col-md-3 mb-3" key={warehouse._id}>
            <Card
              cover={<img alt="warehouse-img" src={warehouse.image || warehouseDefault} className="img-fluid rounded w-100 h-auto" />}
              actions={[
                <EyeOutlined key="setting" style={{ color: '#4096FF' }} />,
                <EditOutlined key="edit" style={{ color: 'orange' }} />,
                <DeleteOutlined key="ellipsis" style={{ color: 'red' }} />
              ]}
            >
              <Meta
                avatar={<Avatar icon={<SettingFilled />} />}
                title={
                  <div className="d-flex align-items-center justify-content-between">
                    <h5>{warehouse.name}</h5>
                    <h5 className="ms-2">{warehouse.code}</h5>
                  </div>
                }
                description={
                  <div>
                    <div className="mb-2 text-muted">
                      <h6>{warehouse.description}</h6>
                    </div>
                    <div>
                      <Badge count={<HomeOutlined className="text-primary me-2" />} />
                      <b>Adres:</b> {warehouse.address}
                    </div>
                    <div>
                      <Badge count={<PhoneOutlined className="text-primary me-2" />} />
                      <b>Telefon:</b> {warehouse.phone}
                    </div>
                    <div>
                      <Badge count={<AppstoreOutlined className="text-primary me-2" />} />
                      <b>Depo Türü:</b> {warehouse.warehouseType}
                    </div>
                    <div>
                      <Badge count={<AreaChartOutlined className="text-primary me-2" />} />
                      <b>Alan:</b> {warehouse.warehouseArea} m²
                    </div>
                    <div>
                      <Badge count={<GatewayOutlined className="text-primary me-2" />} />
                      <b>Kapı Sayısı:</b> {warehouse.warehouseGateCount}
                    </div>
                  </div>
                }
              />
            </Card>
          </div>
        ))
      )}
    </div>
  );
}
