import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button, Form, Card, Typography, DatePicker } from 'antd';
import request from '../../../api/apiRequest';
import { ArrowLeftOutlined, UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { errorAlert, successAlert, confirmAlert } from '../../../common/sweatAlertConfig';
import toastify from '../../../common/toastifyConfig';
import constants from '../../../common/constants';
import './createStockCard.css';
import CategoryCreate from '../CategoryCreate';

export default function CreateStockCard({ onSave, onCancel }) {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const [suppliers, setSuppliers] = useState([]);
  const [isCategoryCreateVisible, setCategoryCreateVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getSuppliers();
    request
      .get('/category')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Kategoriler alınırken hata oluştu:', error);
      });
  }, []);

  const getSuppliers = async () => {
    try {
      const response = await request.get('/suppliers');
      if (response.status === 200) {
        setSuppliers(response.data);
      } else {
        console.error('Tedarikçiler alınamadı:', response.statusText);
      }
    } catch (error) {
      console.error('Tedarikçiler alınırken hata oluştu:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const isConfirmed = await confirmAlert('Yeni Stok Kartı Tanımlama', 'Stok kartı oluşturulacak, onaylıyor musunuz?');
      if (isConfirmed) {
        const response = await request.post('/stockCard', data);
        if (response.status === 201) {
          toastify.successToast('Stok kartı başarıyla oluşturuldu');
          onSave(response.data);
        } else {
          console.error('Stok kartı kaydedilemedi:', response.statusText);
        }
      }
    } catch (error) {
      toastify.errorToast(error.response.data.message);
      console.error('Stok kartı kaydedilirken hata oluştu:', error);
    }
  };

  const handleImageUpload = (imageNumber) => {
    console.log(`Görsel ${imageNumber} yükleniyor...`);
  };

  const handleCategoryCreate = (values) => {
    setCategories([...categories, values]);
    setCategoryCreateVisible(false);
  };

  return (
    <div className="stock-card-form-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={onCancel} style={{ marginRight: '16px' }} />
        <Typography>Yeni Stok Kartı Oluştur</Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="stock-card-form">
        <div className="form-container">
          <div className="form-section">
            <Typography className="section-title">Ürün Bilgileri</Typography>
            <div className="form-fields">
              {/* Product Code */}
              <Form.Item
                label="Ürün Kodu (ÖZEL)"
                validateStatus={errors.productCode && 'error'}
                help={errors.productCode && 'Ürün kodu zorunludur'}
              >
                <Controller name="productCode" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Product Name */}
              <Form.Item label="Ürün Adı" validateStatus={errors.productName && 'error'} help={errors.productName && 'Ürün adı zorunludur'}>
                <Controller name="productName" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Category */}
              <Form.Item label="Kategori">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <div className="d-flex align-items-center item-align-center ">
                      <Select
                        size="default"
                        {...field}
                        options={categories.map((category) => ({ value: category._id, label: category.name }))}
                        style={{ width: 'calc(100% - 40px)' }}
                        showSearch
                        optionFilterProp="label"
                        placeholder="Kategori Seçiniz"
                      />
                      <Button
                        type="primary"
                        className="ms-1 bg-success btn-hover"
                        onClick={() => setCategoryCreateVisible(true)}
                        style={{ width: '40px' }}
                      >
                        <PlusCircleOutlined />
                      </Button>
                    </div>
                  )}
                />
              </Form.Item>

              {/* Brand */}
              <Form.Item label="Marka">
                <Controller name="brand" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Model */}
              <Form.Item label="Model">
                <Controller name="model" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item label="Birim" validateStatus={errors.unit && 'error'} help={errors.unit && 'Unit is required'}>
                <Controller
                  name="unit"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      showSearch
                      optionFilterProp="label"
                      options={constants.unitOptions.map((unit) => ({ value: unit.label, label: unit.label }))}
                      placeholder="Birim Seçiniz"
                    />
                  )}
                />
              </Form.Item>

              {/* Dimensions */}
              <div className="row">
                <div className="col-md-4">
                  {' '}
                  <Form.Item label="Genişlik">
                    <Controller
                      name="dimensions.width"
                      control={control}
                      render={({ field }) => <Input type="number" min={0} suffix="cm" {...field} />}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item label="Yükseklik">
                    <Controller
                      name="dimensions.height"
                      control={control}
                      render={({ field }) => <Input type="number" min={0} suffix="cm" {...field} />}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item label="Derinlik">
                    <Controller
                      name="dimensions.depth"
                      control={control}
                      render={({ field }) => <Input type="number" min={0} suffix="cm" {...field} />}
                    />
                  </Form.Item>
                </div>
              </div>

              <Typography className="section-title">Fiyatlandırma Bilgileri</Typography>
              <div className="form-fields">
                {/* Purchase Price */}
                <Form.Item label="Alış Fiyatı">
                  <Controller
                    name="pricing.purchasePrice"
                    control={control}
                    render={({ field }) => <Input type="number" min={0} {...field} />}
                  />
                </Form.Item>

                {/* Sale Price */}
                <Form.Item label="Öngörülen Satış Fiyatı">
                  <Controller
                    name="pricing.salePrice"
                    control={control}
                    render={({ field }) => <Input type="number" min={0} {...field} />}
                  />
                </Form.Item>

                {/* Tax Rate */}
                <Form.Item label="Vergi Oranı">
                  <Controller
                    name="pricing.taxRate"
                    control={control}
                    render={({ field }) => <Input prefix="%" type="number" min={0} {...field} />}
                  />
                </Form.Item>

                {/* Discount Rates */}
                <div className="row">
                  <div className="col-md-6">
                    <Form.Item label="Min İndirim Oranı">
                      <Controller
                        name="pricing.minDiscountRates"
                        control={control}
                        render={({ field }) => <Input prefix="%" type="number" min={0} {...field} />}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item label="Max İndirim Oranı">
                      <Controller
                        name="pricing.maxDiscountRates"
                        control={control}
                        render={({ field }) => <Input prefix="%" type="number" min={0} {...field} />}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <Typography className="section-title">Stok Kontrol Bilgileri</Typography>
            <div className="form-fields">
              {/* Supplier */}
              <Form.Item label="Tedarikçi">
                <Controller
                  name="supplier"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      showSearch
                      optionFilterProp="label"
                      placeholder="Tedarikçi Seçiniz"
                      options={suppliers.map((supplier) => ({ value: supplier._id, label: supplier.name }))}
                    />
                  )}
                />
              </Form.Item>

              {/* Additional Info */}
              <Form.Item label="Notlar">
                <Controller name="additionalInfo.notes" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item label="Garanti Süresi">
                <Controller
                  name="additionalInfo.warrantyPeriod"
                  control={control}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>
              <Form.Item label="Renk">
                <Controller name="additionalInfo.color" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item label="Boyut">
                <Controller name="additionalInfo.size" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item label="Malzeme">
                <Controller name="additionalInfo.material" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <div className="row">
                <div className="col-md-8">
                  {' '}
                  {/* Costing Method */}
                  <Form.Item label="Maliyetlendirme Yöntemi">
                    <Controller
                      name="costingMethod"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { value: 'FIFO', label: 'FIFO' },
                            { value: 'LIFO', label: 'LIFO' },
                            { value: 'Average', label: 'Ortalama' }
                          ]}
                          placeholder="Maliyetlendirme Yöntemi Seçiniz"
                        />
                      )}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  {' '}
                  {/* Expiry Date */}
                  <Form.Item label="Son Kullanma Tarihi">
                    <Controller name="expiryDate" control={control} render={({ field }) => <DatePicker {...field} />} />
                  </Form.Item>
                </div>
              </div>

              {/* Levels */}
              <div className="row">
                <div className="col-md-4">
                  {' '}
                  <Form.Item label="Minimum Seviye">
                    <Controller name="minLevel" control={control} render={({ field }) => <Input type="number" min={0} {...field} />} />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  {' '}
                  <Form.Item label="Maksimum Seviye">
                    <Controller name="maxLevel" control={control} render={({ field }) => <Input type="number" min={0} {...field} />} />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  {' '}
                  <Form.Item label="Kritik Seviye">
                    <Controller name="criticalLevel" control={control} render={({ field }) => <Input type="number" min={0} {...field} />} />
                  </Form.Item>
                </div>
              </div>

              <Typography className="section-title">Ürün Görselleri</Typography>
              <div className="container row justify-content-between align-items-center ">
                <div className="col-md-5 card shadow-sm p-3 mb-5 rounded card-size card-hover" onClick={() => handleImageUpload(1)}>
                  <div className="card-body ">
                    <Typography style={{ fontSize: '16px', color: '#888' }}>
                      <br />
                      <UploadOutlined style={{ fontSize: '36px', color: '#00b96b' }} />
                      <br />
                      Görsel Yükle
                    </Typography>
                  </div>
                </div>
                <div className="col-md-5 card shadow-sm p-3 mb-5 rounded card-size card-hover" onClick={() => handleImageUpload(2)}>
                  <div className="card-body ">
                    <Typography style={{ fontSize: '16px', color: '#888' }}>
                      <br />
                      <UploadOutlined style={{ fontSize: '36px', color: '#00b96b' }} />
                      <br />
                      Görsel Yükle
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <Button type="default" onClick={onCancel}>
            İptal
          </Button>
          <Button type="primary" htmlType="submit">
            Kaydet
          </Button>
        </div>
      </Form>
      <CategoryCreate visible={isCategoryCreateVisible} onCreate={handleCategoryCreate} onCancel={() => setCategoryCreateVisible(false)} />
    </div>
  );
}
