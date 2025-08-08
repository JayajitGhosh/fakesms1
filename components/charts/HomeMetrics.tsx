'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444']

const data = [
  { name: 'Attendance', value: 92 },
  { name: 'Assignments Completed', value: 78 },
  { name: 'Avg. Grade', value: 86 },
  { name: 'Engagement', value: 64 },
]

export default function HomeMetrics() {
  return (
    <div className="card p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Today at a glance</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              isAnimationActive
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
