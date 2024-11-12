import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Form, Select, Input } from 'antd';
import request from '../api/apiRequest';

export default function AddressFields({ control, errors, countryId, cityId, prefix }) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [reqCityId, setCityId] = useState('');

  useEffect(() => {
    setCityId(cityId);
    handleCountry();
    handleCountryChange(countryId);
    handleCityChange(cityId);
  }, []);

  const handleCountry = async () => {
    try {
      const response = await request.get(`/address/country`);
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleCountryChange = async (countryId) => {
    try {
      const response = await request.get(`/address/city?countryId=${countryId}`);
      setCities(response.data);
      setDistricts([]);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCityChange = async (reqCityId) => {
    try {
      console.log('reqCityId', reqCityId);
      const response = await request.get(`/address/district/${reqCityId}`);
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  return (
    <>
      <Form.Item
        label="Country"
        validateStatus={errors[`${prefix}.countryId`] && 'error'}
        help={errors[`${prefix}.countryId`] && 'Ülke seçimi zorunludur'}
      >
        <Controller
          name={`${prefix}.countryId`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Select Country"
              options={countries.map((country) => ({ value: country._id, label: country.name }))}
              onChange={(value) => {
                field.onChange(value);
                handleCountryChange(value);
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="City"
        validateStatus={errors[`${prefix}.cityId`] && 'error'}
        help={errors[`${prefix}.cityId`] && 'İl seçimi zorunludur'}
      >
        <Controller
          name={`${prefix}.cityId`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Select City"
              options={cities.map((city) => ({ value: city._id, label: city.sehir_adi }))}
              onChange={(value) => {
                field.onChange(value);
                handleCityChange(value);
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="District"
        validateStatus={errors[`${prefix}.districtId`] && 'error'}
        help={errors[`${prefix}.districtId`] && 'İlçe seçimi zorunludur'}
      >
        <Controller
          name={`${prefix}.districtId`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Select District"
              options={districts.map((district) => ({ value: district._id, label: district.ilce_adi }))}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Postal Code">
        <Controller name={`${prefix}.postalCode`} control={control} render={({ field }) => <Input {...field} />} />
      </Form.Item>

      <Form.Item
        label="Address"
        validateStatus={errors[`${prefix}.address`] && 'error'}
        help={errors[`${prefix}.address`] && 'Adres alanı zorunludur'}
      >
        <Controller
          name={`${prefix}.address`}
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input.TextArea {...field} rows={4} />}
        />
      </Form.Item>
    </>
  );
}
