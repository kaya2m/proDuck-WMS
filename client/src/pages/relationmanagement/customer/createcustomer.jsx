import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button, Form } from 'antd';
import request from '../../../api/apiRequest';

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

  const currencyTypes = [
    { value: 'TRY', label: 'TRY' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'JPY', label: 'JPY' }
  ];

  const paymentMethods = [
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'Cash', label: 'Cash' },
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'Check', label: 'Check' }
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await request.get('/address/country');
        setCountries(response.data);
        // Türkiye'yi varsayılan olarak ayarlama
        const defaultCountry = response.data.find((country) => country.name === 'Türkiye');
        if (defaultCountry) {
          setValue('countryId', defaultCountry.country_id);
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

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <div className="form-grid">
        {/* Company Name */}
        <Form.Item
          label="Company Name"
          validateStatus={errors.companyName && 'error'}
          help={errors.companyName && 'Company Name is required'}
        >
          <Controller name="companyName" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
        </Form.Item>

        {/* Contact Number */}
        <Form.Item
          label="Contact Number"
          validateStatus={errors.contactNumber && 'error'}
          help={errors.contactNumber && 'Contact Number is required'}
        >
          <Controller
            name="contactNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input placeholder="(553) 123-4356" {...field} />}
          />
        </Form.Item>

        {/* Email */}
        <Form.Item label="Email" validateStatus={errors.email && 'error'} help={errors.email && 'Valid Email is required'}>
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        {/* Country */}
        <Form.Item label="Country" validateStatus={errors.countryId && 'error'} help={errors.countryId && 'Country is required'}>
          <Controller
            name="countryId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select Country"
                options={countries.map((country) => ({
                  value: country.country_id,
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
        <Form.Item label="City" validateStatus={errors.cityId && 'error'} help={errors.cityId && 'City is required'}>
          <Controller
            name="cityId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select City"
                options={cities.map((city) => ({
                  value: city.sehir_id,
                  label: city.sehir_adi
                }))}
                showSearch
                optionFilterProp="label"
                onChange={(value) => {
                  field.onChange(value);
                  handleCityChange(value);
                }}
              />
            )}
          />
        </Form.Item>

        {/* District */}
        <Form.Item label="District" validateStatus={errors.districtId && 'error'} help={errors.districtId && 'District is required'}>
          <Controller
            name="districtId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select District"
                options={districts.map((district) => ({
                  value: district.ilce_id,
                  label: district.ilce_adi
                }))}
                showSearch
                optionFilterProp="label"
              />
            )}
          />
        </Form.Item>

        {/* Address */}
        <Form.Item label="Address" validateStatus={errors.address && 'error'} help={errors.address && 'Address is required'}>
          <Controller name="address" control={control} rules={{ required: true }} render={({ field }) => <Input.TextArea {...field} />} />
        </Form.Item>

        {/* Post Code */}
        <Form.Item label="Post Code" validateStatus={errors.postCode && 'error'} help={errors.postCode && 'Post Code is required'}>
          <Controller name="postCode" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
        </Form.Item>

        {/* Tax Number */}
        <Form.Item label="Tax Number" validateStatus={errors.taxNumber && 'error'} help={errors.taxNumber && 'Tax Number is required'}>
          <Controller name="taxNumber" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
        </Form.Item>

        {/* Payment Method */}
        <Form.Item
          label="Payment Method"
          validateStatus={errors.paymentMethod && 'error'}
          help={errors.paymentMethod && 'Payment Method is required'}
        >
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select {...field} placeholder="Select Payment Method" options={paymentMethods} />}
          />
        </Form.Item>

        {/* Short Name */}
        <Form.Item label="Short Name" validateStatus={errors.name && 'error'} help={errors.name && 'Short Name is required'}>
          <Controller name="name" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
        </Form.Item>

        {/* Contact Number 2 */}
        <Form.Item label="Contact Number 2">
          <Controller name="contactNumber2" control={control} render={({ field }) => <Input placeholder="(553) 123-4356" {...field} />} />
        </Form.Item>

        {/* Currency Type */}
        <Form.Item
          label="Currency Type"
          validateStatus={errors.currencyType && 'error'}
          help={errors.currencyType && 'Currency Type is required'}
        >
          <Controller
            name="currencyType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select {...field} placeholder="Select Currency Type" options={currencyTypes} />}
          />
        </Form.Item>

        {/* Notes */}
        <Form.Item label="Notes">
          <Controller name="notes" control={control} render={({ field }) => <Input.TextArea {...field} />} />
        </Form.Item>

        {/* Action Buttons */}
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Save
          </Button>
          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
}
