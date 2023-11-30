import './App.scss';
import { ProductTable } from './components/ProductTable';
import { ProductChart } from './components/ProductChart';
import { ComparisonChart } from './components/ComparisonChart';
import { Tabs } from 'antd';

function App() {
  const items = [
    {
      key: '1',
      label: 'Table',
      children: <ProductTable />,
    },
    {
      key: '2',
      label: 'Chart',
      children: <ProductChart />,
    },
    {
      key: '3',
      label: 'Comparison Feature',
      children: <ComparisonChart />
    },
  ];

  return (
    <div className="main">
      <h2>Dashboard</h2>

      <Tabs
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );
}

export default App;
