import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button, Form, Card, Typography } from 'antd';
import request from '../../../api/apiRequest';
import { ArrowLeftOutlined, LinkedinOutlined, GlobalOutlined } from '@ant-design/icons';
import { errorAlert, successAlert, confirmAlert } from '../../../common/sweatAlertConfig';
import toastify from '../../../common/toastifyConfig';
import constants from '../../../common/constants';

export default function Create({ onSave, onCancel }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await request.get('/address/country');
        setCountries(response.data);
        const defaultCountry = response.data.find((country) => country.name === 'Türkiye');
        if (defaultCountry) {
          setValue('countryId', defaultCountry._id);
        }
      } catch (error) {
        console.error('Ülkeleri getirme hatası:', error);
      }
    };
    fetchCountries();
  }, [setValue]);

  const handleCountryChange = async (countryId) => {
    try {
      const response = await request.get(`/address/city?countryId=${countryId}`);
      setCities(response.data);
      setDistricts([]);
    } catch (error) {
      console.error('Şehirleri getirme hatası:', error);
    }
  };

  const handleCityChange = async (cityId) => {
    try {
      const response = await request.get(`/address/district/${cityId}`);
      setDistricts(response.data);
    } catch (error) {
      console.error('İlçeleri getirme hatası:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const isConfirmed = await confirmAlert('Yeni Müşteri Tanımalama', 'Müşteri oluşturulacak, onaylıyor musunuz?');
      if (isConfirmed) {
        const response = await request.post('/customer', data);
        if (response.status === 201) {
          toastify.successToast('Müşteri başarıyla oluşturuldu');
          onSave(response.data);
        } else {
          console.error('Müşteri kaydedilemedi:', response.statusText);
        }
      }
    } catch (error) {
      toastify.errorToast(error.response.data.message);
      console.error('Müşteri kaydedilirken hata oluştu:', error);
    }
  };

  return (
    <div className="customer-form-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={onCancel} style={{ marginRight: '16px' }} />
        <Typography>Yeni Müşteri Oluştur</Typography>
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

              <Form.Item
                label="İkinci E-posta"
                validateStatus={errors.email && 'error'}
                help={errors.email && 'Geçerli bir e-posta adresi giriniz'}
              >
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
                  render={({ field }) => <Input {...field} placeholder="https://www.example.com" prefix={<GlobalOutlined />} />}
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
                  render={({ field }) => <Input {...field} placeholder="https://www.linkedin.com/..." prefix={<LinkedinOutlined />} />}
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
            <div className="form-fields">
              {/* Address Fields */}
              <Form.Item
                label="Ülke"
                validateStatus={errors.shippingAddress?.countryId && 'error'}
                help={errors.shippingAddress?.countryId && 'Ülke seçimi zorunludur'}
              >
                <Controller
                  name="shippingAddress.countryId"
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
              <Form.Item
                label="İl"
                validateStatus={errors.shippingAddress?.cityId && 'error'}
                help={errors.shippingAddress?.cityId && 'İl seçimi zorunludur'}
              >
                <Controller
                  name="shippingAddress.cityId"
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
                validateStatus={errors.shippingAddress?.districtId && 'error'}
                help={errors.shippingAddress?.districtId && 'İlçe seçimi zorunludur'}
              >
                <Controller
                  name="shippingAddress.districtId"
                  control={control}
                  rules={{ required: true }}
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
                <Controller name="shippingAddress.postalCode" control={control} render={({ field }) => <Input {...field} />} />
              </Form.Item>
              <Form.Item
                label="Address"
                validateStatus={errors.shippingAddress?.address && 'error'}
                help={errors.shippingAddress?.address && 'Adres zorunludur'}
              >
                <Controller
                  name="shippingAddress.address"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input.TextArea {...field} rows={4} />}
                />
              </Form.Item>
            </div>

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

                {/* Address Fields */}
                <Form.Item
                  label="Ülke"
                  className="mt-2"
                  validateStatus={errors.billingAddress?.countryId && 'error'}
                  help={errors.billingAddress?.countryId && 'Ülke seçimi zorunludur'}
                >
                  <Controller
                    name="billingAddress.countryId"
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
                <Form.Item
                  label="İl"
                  className="mt-2"
                  validateStatus={errors.billingAddress?.cityId && 'error'}
                  help={errors.billingAddress?.cityId && 'İl seçimi zorunludur'}
                >
                  <Controller
                    name="billingAddress.cityId"
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
                  className="mt-2"
                  validateStatus={errors.billingAddress?.districtId && 'error'}
                  help={errors.billingAddress?.districtId && 'İlçe seçimi zorunludur'}
                >
                  <Controller
                    name="billingAddress.districtId"
                    control={control}
                    rules={{ required: true }}
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

                <Form.Item label="Posta Kodu" className="mt-2">
                  <Controller name="billingAddress.postalCode" control={control} render={({ field }) => <Input {...field} />} />
                </Form.Item>

                <Form.Item
                  label="Address"
                  className="mt-2"
                  validateStatus={errors.billingAddress?.address && 'error'}
                  help={errors.billingAddress?.address && 'Adres zorunludur'}
                >
                  <Controller
                    name="billingAddress.address"
                    control={control}
                    render={({ field }) => <Input.TextArea {...field} rows={4} />}
                  />
                </Form.Item>
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
