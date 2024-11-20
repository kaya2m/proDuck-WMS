import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button, Form, Card, Typography, DatePicker, Space } from 'antd';
import request from '../../../api/apiRequest';
import { ArrowLeftOutlined, UploadOutlined, PlusCircleOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { errorAlert, successAlert, confirmAlert } from '../../../common/sweatAlertConfig';
import toastify from '../../../common/toastifyConfig';
import constants from '../../../common/constants';
import TextArea from 'antd/es/input/TextArea';
import { AuthContext } from '../../../utils/AuthUtils/AuthContext';

export default function CreateWarehouse({ onSave, onCancel }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues
  } = useForm({});
  const { currentUser } = useContext(AuthContext);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {}, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const isConfirmed = await confirmAlert('Yeni Depo Tanımlama', 'Depo oluşturulacak, onaylıyor musunuz?');
      if (isConfirmed) {
        const response = await request.post('/warehouse', data);
        if (response.status === 201) {
          toastify.successToast('Depo başarıyla oluşturuldu');
          onSave(response.data);
        } else {
          console.error('Depo kaydedilemedi:', response.statusText);
        }
      }
    } catch (error) {
      toastify.errorToast(error.response.data.message);
      console.error('Depo kaydedilirken hata oluştu:', error);
    }
  };

  const handleImageUpload = (imageNumber) => {
    console.log(`Görsel ${imageNumber} yükleniyor...`);
  };

  return (
    <div className="warehouse-form-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={onCancel} style={{ marginRight: '16px' }} />
        <Typography>Yeni Depo Oluştur</Typography>
      </div>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="warehouse-form">
        <div className="form-container">
          <div className="form-section">
            <Typography className="section-title ">Depo Bilgileri</Typography>
            <div className="form-fields     ">
              {/* Company ID */}
              <Form.Item label="Şirket" validateStatus={errors.companyId && 'error'} help={errors.companyId && 'Şirket kimliği zorunludur'}>
                <Controller
                  name="companyName"
                  defaultValue={currentUser.companyName}
                  disabled
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>

              <Form.Item
                hidden
                label="Şirket"
                validateStatus={errors.companyId && 'error'}
                help={errors.companyId && 'Şirket kimliği zorunludur'}
              >
                <Controller
                  name="companyId"
                  defaultValue={currentUser.company._id}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              {/* Name */}
              <Form.Item label="Depo Adı" validateStatus={errors.name && 'error'} help={errors.name && 'Depo adı zorunludur'}>
                <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Description */}
              <Form.Item label="Açıklama">
                <Controller name="description" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Dimensions */}
              <Typography className="section-title mt-2">Boyutlar</Typography>
              <Form.Item
                label="Alan (m²)"
                validateStatus={errors.dimensions?.area && 'error'}
                help={errors.dimensions?.area && 'Alan zorunludur'}
              >
                <Controller
                  name="dimensions.area"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>
              <Form.Item
                label="Kapasite (ton)"
                validateStatus={errors.dimensions?.capacity && 'error'}
                help={errors.dimensions?.capacity && 'Kapasite zorunludur'}
              >
                <Controller
                  name="dimensions.capacity"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>
              <Form.Item
                label="Hacim (m³)"
                validateStatus={errors.dimensions?.volume && 'error'}
                help={errors.dimensions?.volume && 'Hacim zorunludur'}
              >
                <Controller
                  name="dimensions.volume"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>

              {/* Infrastructure */}
              <Typography className="section-title mt-2">Altyapı</Typography>
              <Form.Item
                label="Raf Sayısı"
                validateStatus={errors.infrastructure?.rackCount && 'error'}
                help={errors.infrastructure?.rackCount && 'Raf sayısı zorunludur'}
              >
                <Controller
                  name="infrastructure.rackCount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>
              <Form.Item
                label="Kapı Sayısı"
                validateStatus={errors.infrastructure?.gateCount && 'error'}
                help={errors.infrastructure?.gateCount && 'Kapı sayısı zorunludur'}
              >
                <Controller
                  name="infrastructure.gateCount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>
              <Form.Item
                label="Rıhtım Sayısı"
                validateStatus={errors.infrastructure?.dockCount && 'error'}
                help={errors.infrastructure?.dockCount && 'Rıhtım sayısı zorunludur'}
              >
                <Controller
                  name="infrastructure.dockCount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>
              <Form.Item label="Park Yeri Sayısı">
                <Controller
                  name="infrastructure.parkingSpots"
                  control={control}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>

              {/* Costs */}
              <Typography className="section-title mt-2">Maliyetler</Typography>
              <Form.Item label="Operasyonel Maliyet">
                <Controller
                  name="costs.operationalCost"
                  control={control}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>
              <Form.Item label="Bakım Maliyeti">
                <Controller
                  name="costs.maintenanceCost"
                  control={control}
                  render={({ field }) => <Input type="number" min={0} {...field} />}
                />
              </Form.Item>

              {/* Notes */}
              <Form.Item label="Ek Notlar">
                <Controller name="notes" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              <Typography className="section-title mt-2">Raflar</Typography>
              <Form.List name="racks">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'rackCode']}
                          fieldKey={[fieldKey, 'rackCode']}
                          rules={[{ required: true, message: 'Raf kodu zorunludur' }]}
                        >
                          <Input placeholder="Raf Kodu" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'zoneCode']}
                          fieldKey={[fieldKey, 'zoneCode']}
                          rules={[{ required: true, message: 'Bölge kodu zorunludur' }]}
                        >
                          <Input placeholder="Bölge Kodu" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'shelfCount']}
                          fieldKey={[fieldKey, 'shelfCount']}
                          rules={[{ required: true, message: 'Raf sayısı zorunludur' }]}
                        >
                          <Input type="number" placeholder="Raf Sayısı" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'capacity']}
                          fieldKey={[fieldKey, 'capacity']}
                          rules={[{ required: true, message: 'Kapasite zorunludur' }]}
                        >
                          <Input type="number" placeholder="Kapasite" />
                        </Form.Item>
                        <Form.Item {...restField} name={[name, 'usedCapacity']} fieldKey={[fieldKey, 'usedCapacity']}>
                          <Input type="number" placeholder="Kullanılan Kapasite" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Raf Ekle
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>
          <div className="form-section">
            <div className="form-fields">
              {/* Operations */}
              <Typography className="section-title">Operasyonlar</Typography>
              <Form.Item label="Çalışma Saatleri">
                <Controller name="operations.workingHours" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item label="Güvenlik Seviyesi">
                <Controller name="operations.securityLevel" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item label="Güvenlik Özellikleri">
                <Controller
                  name="operations.securityFeatures"
                  control={control}
                  render={({ field }) => <Select mode="tags" {...field} />}
                />
              </Form.Item>
              <Form.Item label="İklim Kontrolü">
                <Controller
                  name="operations.isClimateControlled"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: true, label: 'Evet' },
                        { value: false, label: 'Hayır' }
                      ]}
                    />
                  )}
                />
              </Form.Item>
              <Form.Item label="Sıcaklık Aralığı">
                <Controller name="operations.temperatureRange" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              {/* Management */}
              <Typography className="section-title">Yönetim</Typography>
              <Form.Item label="Yönetici Adı">
                <Controller name="management.managerName" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item label="Yönetici İletişim">
                <Controller name="management.managerContact" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              {/* Address */}
              <Typography className="section-title ">Adres Bilgileri</Typography>
              <Form.Item
                label="Sokak"
                validateStatus={errors.address?.street && 'error'}
                help={errors.address?.street && 'Sokak zorunludur'}
              >
                <Controller
                  name="address.street"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Şehir" validateStatus={errors.address?.city && 'error'} help={errors.address?.city && 'Şehir zorunludur'}>
                <Controller name="address.city" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item
                label="Posta Kodu"
                validateStatus={errors.address?.postalCode && 'error'}
                help={errors.address?.postalCode && 'Posta kodu zorunludur'}
              >
                <Controller
                  name="address.postalCode"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item
                label="Ülke"
                validateStatus={errors.address?.country && 'error'}
                help={errors.address?.country && 'Ülke zorunludur'}
              >
                <Controller
                  name="address.country"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Adres Detayı">
                <Controller name="address.addressDetail" control={control} render={({ field }) => <Input.TextArea {...field} />} />
              </Form.Item>
              {/* Location */}
              <Typography className="section-title mt-2">Konum</Typography>
              <Form.Item
                label="Google Maps Adres Linki"
                validateStatus={errors.location?.googleMapsLink && 'error'}
                help={errors.location?.googleMapsLink && 'Google Maps adres linki zorunludur'}
              >
                <Controller
                  name="location.googleMapsLink"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              {/* Contact */}
              <Typography className="section-title mt-2">İletişim Bilgileri</Typography>
              <Form.Item
                label="Telefon"
                validateStatus={errors.contact?.phone && 'error'}
                help={errors.contact?.phone && 'Telefon zorunludur'}
              >
                <Controller
                  name="contact.phone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
              <Form.Item label="Telefon 2">
                <Controller name="contact.phone2" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item label="Email">
                <Controller name="contact.email" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Warehouse Type */}
              <Form.Item
                label="Depo Türü"
                validateStatus={errors.warehouseType && 'error'}
                help={errors.warehouseType && 'Depo türü zorunludur'}
              >
                <Controller
                  name="warehouseType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
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
    </div>
  );
}
