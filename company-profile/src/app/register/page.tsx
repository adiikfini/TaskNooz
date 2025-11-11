"use client";
import { useState } from "react";
import Link from "next/link"; // Impor Link
import { useRouter } from "next/navigation"; // Impor router

export default function RegisterPage() {
  const [name, setName] = useState(""); // Tambahkan state 'name'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Tambahkan state 'confirm'
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state loading
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // --- Validasi Frontend Sederhana ---
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }
    // ------------------------------------

    try {
      // Panggil API route kustom Anda
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // Kirim 'name'
      });

      const data = await res.json();
      
      if (!res.ok) {
        // Tangkap error dari API (misal: "User already exists")
        setError(data.message || 'Registration failed.');
      } else {
        // Berhasil
        setSuccess('Registration successful! Redirecting to login...');
        // Tunggu 2 detik lalu redirect ke login
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // --- Desain Latar Belakang Sesuai Tema ---
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white px-4">
      <div className="pt-20 pb-10 w-full max-w-md">
        {/* --- Kartu Registrasi --- */}
        <div className="space-y-6 rounded-xl bg-gray-800 p-8 sm:p-10 shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white">
              Create your <span className="text-orange-600">Teknoz</span> Account
            </h1>
            <p className="mt-2 text-gray-400">
              Get started with our automation solutions.
            </p>
          </div>

          {/* --- Formulir Registrasi --- */}
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password (min. 6 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
                required
              />
            </div>

            {/* Tampilkan Error atau Sukses */}
            {error && <div className="text-sm text-red-500 text-center font-medium">{error}</div>}
            {success && <div className="text-sm text-green-500 text-center font-medium">{success}</div>}

            {/* Tombol Submit Sesuai Tema */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex w-full justify-center rounded-lg border border-transparent bg-orange-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/50 transition duration-300 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Tautan ke Login */}
          <p className="text-center text-sm text-gray-400 pt-4">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-orange-500 hover:text-orange-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}