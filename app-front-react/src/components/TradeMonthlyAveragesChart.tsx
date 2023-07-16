import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = (props) => {
  const { series } = props; 
  return (
    <ResponsiveContainer width={'80%'} height={400} >
      <LineChart
        height={250}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" type="category" allowDuplicatedCategory={false} />
          <YAxis dataKey="average" />
          <Tooltip />
          <Legend />
        {series && series.map((s) => (
          <Line
            dataKey="average"
            type="monotone"
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            data={s.monthlyAverages}
            name={s.company}
            key={s.company}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;