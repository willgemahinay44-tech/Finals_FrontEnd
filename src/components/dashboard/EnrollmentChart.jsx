import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardService } from "../../services/api";
import { LoadingSpinner } from "../common/LoadingSpinner";

export default function EnrollmentChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboardService.getEnrollmentTrends();
        setData(res.data);
      } catch (err) {
        setError("Failed to load enrollment data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Monthly Enrollment Trends</h2>
      <p className="text-gray-500 text-sm mb-4">Number of students enrolled per month (2026)</p>
      {loading ? (
        <LoadingSpinner text="Loading enrollment data..." />
      ) : error ? (
        <div className="text-red-500 text-sm text-center py-8">{error}</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            />
            <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Students" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}