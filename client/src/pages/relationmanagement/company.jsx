import React from 'react';
import MainCard from 'components/MainCard';
import { Table } from 'antd';

export default function Company() {
  const data = [
    {
      key: '1',
      name: 'Joe',
      age: 32,
      address: 'New York'
    }
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe'
        },
        {
          text: 'Category 1',
          value: 'Category 1'
        },
        {
          text: 'Category 2',
          value: 'Category 2'
        }
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London'
        },
        {
          text: 'New York',
          value: 'New York'
        }
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: '40%'
    }
  ];

  return (
    <MainCard title="SampleCard">
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </MainCard>
  );
}
