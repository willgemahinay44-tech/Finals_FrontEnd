import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../services/api";

export default function Navbar({ user, onLogout }) {
  const handleLogout = async () => {
    const isDemo = localStorage.getItem("auth_token") === "demo-token";
    try {
      if (!isDemo) await authService.logout();
    } catch (e) {
      // ignore when backend unavailable
    } finally {
      onLogout();
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#5D3178] text-white w-64 min-h-screen px-5 py-6 flex flex-col justify-between shadow-lg">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/knp-emblem.png"
            alt="Kolehiyo ng Pantukan"
            className="w-14 h-14 object-contain flex-shrink-0"
          />
          <div>
            <h1 className="font-bold text-lg leading-tight">Kolehiyo ng Pantukan - KNP</h1>
            <p className="text-[11px] text-white/80">Admin Dashboard</p>
          </div>
        </div>

        <div className="space-y-1 text-base text-white/90">
         
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-left rounded-lg ${
                isActive("/dashboard") ? "bg-white/15" : "hover:bg-white/10"
              }`}
            >
              
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate("/programs")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm text-left rounded-lg ${
                isActive("/programs") ? "bg-white/15" : "hover:bg-white/10"
              }`}
            >
              Program Offerings
            </button>
            <button
              type="button"
              onClick={() => navigate("/subjects")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm text-left rounded-lg ${
                isActive("/subjects") ? "bg-white/15" : "hover:bg-white/10"
              }`}
            >
              Subject Offerings
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-xs text-white/80 mt-8 items-center text-center">
        <div className="w-full">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Signed in as</p>
          <p className="font-semibold text-sm text-white">{user?.name ?? "Admin"}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-white/15 hover:bg-white/20 px-6 py-2 text-xs font-semibold text-white transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  );
}