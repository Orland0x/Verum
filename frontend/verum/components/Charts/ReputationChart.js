import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function ReputationChart({ data }) {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (data.length == 0) return;
    data.map((el, index) => {
      data[index]['formattedTime'] = moment.unix(data[index].timestamp).format('D/M/Y')
      setChartData(data);
    })
  }, [data])
  return (
    <ResponsiveContainer width="80%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="formattedTime" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#1E40AF" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
  )
}
