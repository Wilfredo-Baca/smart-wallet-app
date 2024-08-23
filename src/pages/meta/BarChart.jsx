import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MyBarChart = ({ data = [] }) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data} margin={{ top: 15, right: 0, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="ahorro" fill="#d4ed91" />
    </BarChart>
  </ResponsiveContainer>
);

export default MyBarChart;

