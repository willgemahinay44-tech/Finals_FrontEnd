import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { dashboardService } from "../../services/api";
import { LoadingSpinner } from "../common/LoadingSpinner";

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#f97316","#84cc16","#ec4899","#6366f1","#14b8a6","#eab308"];

export default function CourseDistributionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboardService.getCourseDistribution();
        // Filter out courses with 0 students for cleaner pie
        setData(res.data.filter(d => d.value > 0));
      } catch (err) {
        setError("Failed to load course data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Student Distribution by Course</h2>
      <p className="text-gray-500 text-sm mb-4">How students are spread across all courses</p>
      {loading ? (
        <LoadingSpinner text="Loading course data..." />
      ) : error ? (
        <div className="text-red-500 text-sm text-center py-8">{error}</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [value, props.payload.fullName || name]}
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}