import React, { useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import products from '../../data/data.json';
import { options } from './options';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './styles.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export const ProductChart = () => {
  const dispatch = useDispatch();
  const productDates = useSelector(state => state.productDates);

  useEffect(() => {
    dispatch({type: 'GET_UNIQUE_DATES'});
  }, [dispatch]);

  const getUnitSoldByCategory = (category) => {
    return products.filter((product) => product.category === category
      ).map(product => product.units_sold)
  };

  const getGeneralUnitsSoldByCategory = (category) => {
    return products.filter(
      (product) => product.category === category
      ).map(product => product.units_sold
      ).reduce((unitsSold, acc) => unitsSold + acc);
  };

  const lineData = {
    labels: productDates.map(date => dayjs(date * 1000).format('DD')),
    datasets: [
      {
        label: 'Product 1',
        data: getUnitSoldByCategory('Product 1'),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Product 2',
        data: getUnitSoldByCategory('Product 2'),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Product 3',
        data: getUnitSoldByCategory('Product 3'),
        borderColor: 'rgb(34, 139, 34)',
        backgroundColor: 'rgba(34, 139, 34, 0.5)',
      },
    ],
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Green'],
    datasets: [
      {
        label: 'Units sold',
        data: [
          getGeneralUnitsSoldByCategory('Product 1'),
          getGeneralUnitsSoldByCategory('Product 2'),
          getGeneralUnitsSoldByCategory('Product 3')
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(53, 162, 235, 0.5)',
          'rgba(34, 139, 34, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className='charts'>
      <div>
        <h4>Line Chart</h4>
        <Line
          options={options}
          data={lineData}
        />
      </div>

      <div>
        <h4>Pie Chart</h4>
        <Pie data={pieData} />
      </div>
    </div>
  );
};
