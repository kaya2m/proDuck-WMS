import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import request from '../../api/apiRequest';
import { successToast, errorToast } from 'common/toastifyConfig';

export default function CategoryCreate({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Kategori Oluştur"
      okText="Oluştur"
      cancelText="İptal"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          request
            .post('/category', values)
            .then((response) => {
              if (response.status === 201) {
                successToast('Kategori oluşturuldu');
                form.resetFields();
                onCreate(values);
              }
            })
            .catch((error) => {
              errorToast(error.response.data.message);
            });
        });
      }}
    >
      <Form form={form} layout="vertical" name="category_create_form" initialValues={{ modifier: 'public' }}>
        <Form.Item name="name" label="Kategori Adı" rules={[{ required: true, message: 'Lütfen kategori adını girin!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Açıklama">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
