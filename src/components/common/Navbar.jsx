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

  return (
    <nav className="bg-[#7f1d1d] text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#b91c1c] rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          </svg>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">Willgo School Dashboard</h1>
          
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-red-100 text-sm hidden sm:block">
          Welcome, <span className="text-white font-medium">{user?.name}</span>
        </span>
        <button
          onClick={handleLogout}
          className="bg-[#b91c1c] hover:bg-[#991b1b] px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
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