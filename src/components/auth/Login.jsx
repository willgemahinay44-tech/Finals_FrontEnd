import { useState } from "react";
import { authService } from "../../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email) return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email.");
    if (!password) return setError("Password is required.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await authService.login(email, password);
      onLogin(res.data);
    } catch (err) {
      // Demo fallback when backend is not running
      const isDemo = email === "admin@school.edu" && password === "password123";
      if (isDemo) {
        onLogin({
          token: "demo-token",
          user: { id: 1, name: "Admin", email: "admin@school.edu" },
        });
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a0f16] via-[#7f1d1d] to-[#450a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl border border-[#7f1d1d]/30 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#7f1d1d] mx-auto mb-3 flex items-center justify-center text-white text-lg font-bold">
            SD
          </div>
          <h1 className="text-2xl font-semibold text-[#7f1d1d]">SchoolDash</h1>
          <p className="text-xs text-gray-500 mt-1">Admin Login</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@school.edu"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-[#7f1d1d] px-3 py-2 text-sm font-semibold text-white hover:bg-[#991b1b] transition disabled:bg-[#fecaca] disabled:text-[#7f1d1d]"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Demo: <span className="font-medium text-[#7f1d1d]">admin@school.edu</span> /{" "}
          <span className="font-medium text-[#7f1d1d]">password123</span>
        </p>
      </div>
    </div>
  );
}