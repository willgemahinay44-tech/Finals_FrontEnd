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
      // Always allow main demo admin user (frontend-only account)
      const isDemoAdmin = email === "admin@school.edu" && password === "password123";

      if (isDemoAdmin) {
        onLogin({
          token: "demo-token",
          user: { id: 1, name: "Admin User", email: "admin@school.edu" },
        });
      } else {
        // Otherwise show backend error (if any)
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2C1B7D] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl border border-white/30 p-8">
        <div className="text-center mb-8">
          <img
            src="/knp-emblem.png"
            alt="Kolehiyo ng Pantukan"
            className="w-48 h-48 mx-auto mb-3 object-contain"
          />
          <h1 className="text-2xl font-semibold text-[#2C1B7D]">LOGIN TO YOUR ACCOUNT</h1>
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
              placeholder="@school.edu"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C1B7D] focus:border-[#2C1B7D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="passworrd"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C1B7D] focus:border-[#2C1B7D]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-[#2C1B7D] px-3 py-2 text-sm font-semibold text-white hover:bg-[#241564] transition disabled:bg-[#d8d3f0] disabled:text-[#2C1B7D]"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">
          Demo: <span className="font-medium text-[#2C1B7D]">admin@school.edu</span> /{" "}
          <span className="font-medium text-[#2C1B7D]">password123</span>
        </div>
      </div>
    </div>
  );
}