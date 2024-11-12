import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button, Form, Typography } from 'antd';
import request from '../../../api/apiRequest';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { confirmAlert } from '../../../common/sweatAlertConfig';
import toastify from '../../../common/toastifyConfig';
import constants from '../../../common/constants';
import AddressFields from '../../../components/AddressFields';

export default function EditSupplier({ supplierId, onSave, onCancel }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supplierResponse, countryResponse] = await Promise.all([request.get(`/suppliers/${supplierId}`)]);

        const supplierData = supplierResponse.data;
        Object.keys(supplierData).forEach((key) => setValue(key, supplierData[key]));
        setShippingAddress(supplierData.shippingAddress);
        setBillingAddress(supplierData.billingAddress);
        setCountries(countryResponse.data);
      } catch (error) {
        console.error('Error fetching supplier data:', error);
      }
    };

    fetchData();
  }, [supplierId, setValue]);

  const onSubmit = async (data) => {
    try {
      const isConfirmed = await confirmAlert('Edit Supplier', 'Are you sure you want to update supplier information?');
      if (isConfirmed) {
        const response = await request.put(`/supplier/${supplierId}`, data);
        toastify.successToast('Supplier updated successfully');
        onSave(response.data);
      }
    } catch (error) {
      toastify.errorToast('Error updating supplier');
      console.error('Update error:', error);
    }
  };

  return (
    <div className="supplier-form-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={onCancel} style={{ marginRight: '16px' }} />
        <Typography>Yeni Tedarikçi Oluştur</Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="supplier-form">
        <div className="form-container">
          <div className="form-section">
            <Typography className="section-title">Temel Bilgiler</Typography>
            <div className="form-fields">
              {/* Supplier Name */}
              <Form.Item label="Tedarikçi Adı" validateStatus={errors.name && 'error'} help={errors.name && 'Tedarikçi adı zorunludur'}>
                <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              <Form.Item label="Sektör" validateStatus={errors.sector && 'error'} help={errors.sector && 'Sektör zorunludur'}>
                <Controller
                  name="sector"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Sektör Seçiniz"
                      options={constants.sectors.map((sector) => ({
                        value: sector.name,
                        label: sector.name
                      }))}
                      showSearch
                      optionFilterProp="label"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </Form.Item>

              {/* Tax Number */}
              <Form.Item label="Vergi Numarası" help={errors.taxNumber && 'Vergi numarası zorunludur'}>
                <Controller name="taxNumber" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              <Form.Item label="Vergi Dairesi">
                <Controller name="taxOffice" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* ID Number */}
              <Form.Item label="Kimlik Numarası">
                <Controller name="idNumber" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Notes */}
              <Form.Item label="Notlar">
                <Controller name="notes" control={control} render={({ field }) => <Input.TextArea {...field} rows={4} />} />
              </Form.Item>

              <Typography level={5} className="section-title mt-4">
                Banka Bilgileri
              </Typography>
              <div className="form-fields">
                {/* Bank Name */}
                <Form.Item label="Banka Adı">
                  <Controller name="bankDetails.bankName" control={control} render={({ field }) => <Input {...field} />} />
                </Form.Item>

                {/* Account Number */}
                <Form.Item label="Hesap Numarası">
                  <Controller name="bankDetails.accountNumber" control={control} render={({ field }) => <Input {...field} />} />
                </Form.Item>

                {/* IBAN */}
                <Form.Item label="IBAN">
                  <Controller name="bankDetails.iban" control={control} render={({ field }) => <Input {...field} />} />
                </Form.Item>

                {/* SWIFT Code */}
                <Form.Item label="SWIFT Kodu">
                  <Controller name="bankDetails.swiftCode" control={control} render={({ field }) => <Input {...field} />} />
                </Form.Item>
                {/* Payment Method */}
                <Form.Item
                  label="Ödeme Yöntemi"
                  validateStatus={errors.paymentMethod && 'error'}
                  help={errors.paymentMethod && 'Ödeme yöntemi zorunludur'}
                >
                  <Controller
                    name="paymentMethod"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Select {...field} placeholder="Ödeme Yöntemi Seçiniz" options={constants.paymentMethods} />}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="form-section">
            <Typography level={5} className="section-title">
              İletişim ve Adres Bilgileri
            </Typography>
            <div className="form-fields">
              {/* Phone */}
              <Form.Item
                label="Telefon Numarası"
                validateStatus={errors.phone && 'error'}
                help={errors.phone && 'Telefon numarası zorunludur'}
              >
                <Controller name="phone" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="E-posta"
                validateStatus={errors.email && 'error'}
                help={errors.email && 'Geçerli bir e-posta adresi giriniz'}
              >
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>

              {/* Address Fields */}
              <Form.Item
                label="Ülke"
                validateStatus={errors.address?.country && 'error'}
                help={errors.address?.country && 'Ülke seçimi zorunludur'}
              >
                <Controller
                  name="address.country"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Ülke Seçiniz"
                      options={countries.map((country) => ({
                        value: country._id,
                        label: country.name
                      }))}
                      showSearch
                      optionFilterProp="label"
                      onChange={(value) => {
                        field.onChange(value);
                        handleCountryChange(value);
                      }}
                    />
                  )}
                />
              </Form.Item>

              {/* City */}
              <Form.Item label="İl" validateStatus={errors.address?.city && 'error'} help={errors.address?.city && 'İl seçimi zorunludur'}>
                <Controller
                  name="address.city"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="İl Seçiniz"
                      options={cities.map((city) => ({
                        value: city._id,
                        label: city.sehir_adi,
                        cityId: city.sehir_id
                      }))}
                      showSearch
                      optionFilterProp="label"
                      onChange={(e, { cityId }) => {
                        field.onChange(e);
                        handleCityChange(cityId);
                      }}
                    />
                  )}
                />
              </Form.Item>

              {/* District */}
              <Form.Item
                label="İlçe"
                validateStatus={errors.address?.district && 'error'}
                help={errors.address?.district && 'İlçe seçimi zorunludur'}
              >
                <Controller
                  name="address.district"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="İlçe Seçiniz"
                      options={districts.map((district) => ({
                        value: district._id,
                        label: district.ilce_adi
                      }))}
                      showSearch
                      optionFilterProp="label"
                    />
                  )}
                />
              </Form.Item>

              <Form.Item label="Posta Kodu">
                <Controller name="address.postalCode" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              <Form.Item
                label="Adres"
                validateStatus={errors.address?.street && 'error'}
                help={errors.address?.street && 'Adres zorunludur'}
              >
                <Controller
                  name="address.street"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input.TextArea {...field} rows={4} />}
                />
              </Form.Item>

              <Typography level={5} className="section-title mt-4">
                İlgili Kişi Bilgileri
              </Typography>
              <div className="form-fields">
                {/* Contact Person Name */}
                <Form.Item
                  label="İlgili Kişi Adı"
                  validateStatus={errors.contactPerson?.name && 'error'}
                  help={errors.contactPerson?.name && 'İlgili kişi adı zorunludur'}
                >
                  <Controller
                    name="contactPerson.name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>

                {/* Contact Person Title */}
                <Form.Item
                  label="İlgili Kişi Ünvanı"
                  validateStatus={errors.contactPerson?.title && 'error'}
                  help={errors.contactPerson?.title && 'İlgili kişi ünvanı zorunludur'}
                >
                  <Controller
                    name="contactPerson.title"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>

                {/* Contact Person Phone */}
                <Form.Item
                  label="İlgili Kişi Telefonu"
                  validateStatus={errors.contactPerson?.phone && 'error'}
                  help={errors.contactPerson?.phone && 'İlgili kişi telefonu zorunludur'}
                >
                  <Controller
                    name="contactPerson.phone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>

                {/* Contact Person Email */}
                <Form.Item
                  label="İlgili Kişi E-posta"
                  validateStatus={errors.contactPerson?.email && 'error'}
                  help={errors.contactPerson?.email && 'E-posta zorunludur'}
                >
                  <Controller
                    name="contactPerson.email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
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
            Güncelle
          </Button>
        </div>
      </Form>
    </div>
  );
}
