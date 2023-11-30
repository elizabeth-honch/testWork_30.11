import dayjs from 'dayjs';

export const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    filters: [
      {
        text: 'Product 1',
        value: 'Product 1',
      },
      {
        text: 'Product 2',
        value: 'Product 2',
      },
      {
        text: 'Product 3',
        value: 'Product 3',
      },
    ],
    onFilter: (value, record) => record.category.indexOf(value) === 0,
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    sorter: (a, b) => a.revenue - b.revenue,
  },
  {
    title: 'Units sold',
    dataIndex: 'units_sold',
    sorter: (a, b) => a.units_sold - b.units_sold,
  },
  {
    title: 'Profit margins',
    dataIndex: 'profit_margins',
    sorter: (a, b) => a.profit_margins - b.profit_margins,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date,
    render: (value) => dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss'),
  },
];
