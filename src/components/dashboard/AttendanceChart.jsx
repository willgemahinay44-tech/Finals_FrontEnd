import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardService } from "../../services/api";
import { LoadingSpinner } from "../common/LoadingSpinner";

export default function AttendanceChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboardService.getAttendancePatterns();
        setData(res.data);
      } catch (err) {
        setError("Failed to load attendance data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Attendance Patterns</h2>
      <p className="text-gray-500 text-sm mb-4">Average daily attendance over school months</p>
      {loading ? (
        <LoadingSpinner text="Loading attendance data..." />
      ) : error ? (
        <div className="text-red-500 text-sm text-center py-8">{error}</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            />
            <Line
              type="monotone"
              dataKey="avgAttendance"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 5 }}
              activeDot={{ r: 7 }}
              name="Avg Attendance"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}