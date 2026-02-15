import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const defaultColors = ['#f97316', '#3b82f6', '#22c55e', '#06b6d4', '#eab308'];

export default function TrendChart({ data, lines, xAxisKey = 'label', height = 280, title }) {
  if (!data || data.length < 2) return null;

  return (
    <div className="bg-surface-secondary rounded-2xl p-4 mb-4">
      {title && <h3 className="text-sm font-semibold text-text-primary mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey={xAxisKey}
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#f1f5f9',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
          />
          {lines.map((line, i) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color || defaultColors[i % defaultColors.length]}
              strokeWidth={2}
              dot={{ r: 3, fill: line.color || defaultColors[i % defaultColors.length] }}
              name={line.label}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
