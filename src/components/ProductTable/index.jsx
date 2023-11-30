import React from 'react';
import { Table } from 'antd';
import products from '../../data/data.json';
import { columns } from './columns';
import clsx from 'clsx';
import './styles.scss';
import { CSVLink } from "react-csv";

export const ProductTable = () => {
  const csvBtn = (
    <div className="csvBlock">
      <CSVLink data={products}>CSV</CSVLink>
    </div>
  );

  return (
    <Table
      columns={columns}
      dataSource={products}
      className={clsx('customTable')}
      title={() => csvBtn}
      rowKey="id"
    />
  )
};
