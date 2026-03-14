import { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import { SkeletonCard } from "../common/LoadingSpinner";
import { ErrorBoundary } from "../common/LoadingSpinner";
import EnrollmentChart from "./EnrollmentChart";
import CourseDistributionChart from "./CourseDistributionChart";
import AttendanceChart from "./AttendanceChart";
import WeatherWidget from "../weather/WeatherWidget";
import { dashboardService } from "../../services/api";

// Stat card
function StatCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value?.toLocaleString() ?? "—"}</p>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Dashboard({ user, onLogout }) {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardService.getStats();
        setStats(res.data);
      } catch (e) {
        console.error("Stats error:", e);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#E8DAF2] flex">
      <Navbar user={user} onLogout={onLogout} />

      <main className="flex-1 px-6 py-6 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">School Dashboard</h1>
          
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loadingStats ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatCard
                title="Total Students"
                value={stats?.total_students}
                subtitle="Enrolled this academic year"
                icon="🎓"
                color="bg-blue-100"
              />
              <StatCard
                title="Total Courses"
                value={stats?.total_courses}
                subtitle="Across all programs"
                icon="📚"
                color="bg-green-100"
              />
              <StatCard
                title="School Days"
                value={stats?.total_school_days}
                subtitle="Regular class days in 2026  "
                icon="📅"
                color="bg-yellow-100"
              />
              <StatCard
                title="Avg Attendance"
                value={stats?.avg_attendance}
                subtitle="Students per class day"
                icon="✅"
                color="bg-purple-100"
              />
            </>
          )}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorBoundary>
            <EnrollmentChart />
          </ErrorBoundary>
          <ErrorBoundary>
            <CourseDistributionChart />
          </ErrorBoundary>
        </div>

        {/* Charts row 2 + Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ErrorBoundary>
              <AttendanceChart />
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <WeatherWidget />
          </ErrorBoundary>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs pb-4">
          IT15/L — Integrative Programming 
        </div>
      </main>
    </div>
  );
}