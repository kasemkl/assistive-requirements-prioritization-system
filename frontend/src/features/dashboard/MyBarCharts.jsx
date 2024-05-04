import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Req-10',
    Reviews: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Req-5',
    Reviews: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Req-3',
    Reviews: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Req-13',
    Reviews: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Req-7',
    Reviews: 1890,
    pv: 4800,
    amt: 2181,
  }
];

const MyBarCharts= () => {
  return (

    <div className='chart'>
       <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={30}
     
      
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="Reviews" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
    </div>
  )
}

export default MyBarCharts;
