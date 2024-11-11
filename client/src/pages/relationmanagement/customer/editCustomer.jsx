import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button, Form, Typography } from 'antd';
import request from '../../../api/apiRequest';
import './editCustomer.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { confirmAlert } from '../../../common/sweatAlertConfig';
import toastify from '../../../common/toastifyConfig';
import constants from '../../../common/constants';
import AddressFields from '../../../components/AddressFields';

export default function EditCustomer({ customerId, onSave, onCancel }) {
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
        const [customerResponse, countryResponse] = await Promise.all([
          request.get(`/customer/${customerId}`),
          request.get('/address/country')
        ]);

        const customerData = customerResponse.data;
        Object.keys(customerData).forEach((key) => setValue(key, customerData[key]));
        setShippingAddress(customerData.shippingAddress);
        setBillingAddress(customerData.billingAddress);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();
  }, [customerId, setValue]);

  const onSubmit = async (data) => {
    try {
      const isConfirmed = await confirmAlert('Edit Customer', 'Are you sure you want to update customer information?');
      if (isConfirmed) {
        const response = await request.put(`/customer/${customerId}`, data);
        toastify.successToast('Customer updated successfully');
        onSave(response.data);
      }
    } catch (error) {
      toastify.errorToast('Error updating customer');
      console.error('Update error:', error);
    }
  };

  return (
    <div className="customer-form-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={onCancel} style={{ marginRight: '16px' }} />
        <Typography>Mevcut Müşteriyi Düzenle</Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="customer-form">
        <div className="form-container">
          <div className="form-section">
            <Typography className="section-title">Temel Bilgiler</Typography>
            <div className="form-fields">
              {/* Company Name */}
              <Form.Item
                label="Firma Adı"
                validateStatus={errors.companyName && 'error'}
                help={errors.companyName && 'Firma adı zorunludur'}
              >
                <Controller name="companyName" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Short Name */}
              <Form.Item label="Kısa Ad" validateStatus={errors.name && 'error'} help={errors.name && 'Kısa ad zorunludur'}>
                <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
              </Form.Item>

              {/* Sector */}
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
                    />
                  )}
                />
              </Form.Item>
            </div>

            <Typography level={5} className="section-title mt-4">
              İletişim Bilgileri
            </Typography>
            <div className="form-fields">
              {/* Contact Numbers */}
              <Form.Item
                label="Telefon Numarası"
                validateStatus={errors.contact?.phone && 'error'}
                help={errors.contact?.phone && 'Telefon numarası zorunludur'}
              >
                <Controller
                  name="contact.phone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder="(553) 123-4356" {...field} />}
                />
              </Form.Item>

              <Form.Item label="İkinci Telefon Numarası">
                <Controller
                  name="contact.phone2"
                  control={control}
                  render={({ field }) => <Input placeholder="(553) 123-4356" {...field} />}
                />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="E-posta"
                validateStatus={errors.contact?.email && 'error'}
                help={errors.contact?.email && 'Geçerli bir e-posta adresi giriniz'}
              >
                <Controller
                  name="contact.email"
                  control={control}
                  rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>

              <Form.Item label="İkinci E-posta">
                <Controller
                  name="contact.email2"
                  control={control}
                  rules={{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>

              {/* Web Sitesi */}
              <Form.Item label="Web Sitesi" validateStatus={errors.website && 'error'} help={errors.website && 'Geçerli bir URL giriniz'}>
                <Controller
                  name="website"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/,
                      message: 'Geçerli bir URL giriniz'
                    }
                  }}
                  render={({ field }) => <Input {...field} placeholder="https://www.example.com" />}
                />
              </Form.Item>

              {/* LinkedIn */}
              <Form.Item
                label="LinkedIn"
                validateStatus={errors.linkedin && 'error'}
                help={errors.linkedin && 'Geçerli bir LinkedIn profili giriniz'}
              >
                <Controller
                  name="linkedin"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                      message: 'Geçerli bir LinkedIn profili giriniz'
                    }
                  }}
                  render={({ field }) => <Input {...field} placeholder="https://www.linkedin.com/..." />}
                />
              </Form.Item>
            </div>

            <Typography level={5} className="section-title mt-4">
              Ek Bilgiler
            </Typography>
            <div className="form-fields">
              {/* Notes */}
              <Form.Item label="Notlar">
                <Controller name="notes" control={control} render={({ field }) => <Input.TextArea {...field} rows={4} />} />
              </Form.Item>
            </div>
          </div>

          <div className="form-section">
            <Typography level={5} className="section-title">
              Gönderi Adresi Bilgileri
            </Typography>
            <AddressFields
              control={control}
              errors={errors}
              countryId={shippingAddress.countryId}
              cityId={shippingAddress.cityId}
              prefix="shippingAddress"
            />

            <Typography level={5} className="section-title mt-4">
              Finansal Bilgiler
            </Typography>
            <div className="form-fields">
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

              {/* Currency Type */}
              <Form.Item
                label="Para Birimi"
                validateStatus={errors.currencyType && 'error'}
                help={errors.currencyType && 'Para birimi zorunludur'}
              >
                <Controller
                  name="currencyType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select {...field} placeholder="Para Birimi Seçiniz" options={constants.currencyTypes} />}
                />
              </Form.Item>
            </div>

            <Typography level={5} className="section-title mt-4">
              Fatura Adresi Bilgileri
            </Typography>
            <AddressFields
              control={control}
              errors={errors}
              countryId={billingAddress.countryId}
              cityId={billingAddress.cityId}
              prefix="billingAddress"
            />
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
