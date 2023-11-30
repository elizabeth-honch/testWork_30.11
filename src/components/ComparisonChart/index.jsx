import React, { useState, useEffect } from 'react';
import { Select, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { options } from './options';
import { selectOptions, bgColors } from './const';
import './styles.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ComparisonChart = () => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataForChart, setDataForChart] = useState({});

  const products = useSelector(state => state.products);
  const productDates = useSelector(state => state.productDates);

  const filteredOptions = selectOptions.filter((option) => !selectedItems.includes(option));

  useEffect(() => {
    dispatch({type: 'GET_UNIQUE_DATES'});
  }, [dispatch]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      const dataChart = [];
      selectedItems.forEach((item, index) => {
        const dataObj = {
          label: item,
          data: products.filter(product => product.category === item).map(pr => pr.revenue),
          backgroundColor: bgColors[index],
        };
        dataChart.push(dataObj);
      });
      setDataForChart({
        labels: productDates.map(date => dayjs(date * 1000).format('DD')),
        datasets: dataChart
      });
    } else {
      setDataForChart({});
    }
  }, [selectedItems]);

  return (
    <div>
      <Select
        mode="multiple"
        placeholder="Choose product for comparison"
        value={selectedItems}
        onChange={setSelectedItems}
        style={{width: '50%'}}
        options={filteredOptions.map((item) => ({
          value: item,
          label: item,
        }))}
      />

      <div className="comparisonBlock">
        {selectedItems && selectedItems.map(item => (
          <div key={item}>
            <h5>{item}</h5>
            <List
              bordered
              className="list"
              dataSource={products.filter(product => product.category === item)}
              renderItem={(item) => (
                <List.Item className="list__item">
                  <p>Revenue: {item.revenue}</p>
                  <p>Units sold: {item.units_sold}</p>
                  <p>Profit margins: {item.profit_margins}</p>
                  <p>Date: {dayjs(item.date * 1000).format('YYYY-MM-DD')}</p>
                </List.Item>
              )}
            />
          </div>
        ))}
      </div>

      {Object.keys(dataForChart).length > 0 && (
        <div className="chartBlock">
          <Bar options={options} data={dataForChart} />
        </div>
      )}
    </div>
  );
};
