"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react"; // Impor useEffect
import { useRouter } from "next/navigation"; // Impor useRouter
import Link from "next/link"; // Impor Link

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter(); // Gunakan router untuk redirect
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Tambahkan isLoading

  // Redirect jika pengguna sudah login
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); 
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Set loading

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    
    setIsLoading(false); // Hentikan loading
    
    if (res?.error) {
      // Tampilkan pesan error yang lebih ramah
      setError("Invalid email or password. Please try again.");
    } else if (res?.ok) {
      // Redirect manual jika berhasil
      router.push("/");
    }
  };

  // Tampilkan loading saat status 'loading' atau jika sudah 'authenticated' (menunggu redirect)
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  // Hanya tampilkan jika "unauthenticated"
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white px-4">
      {/* Kartu Login Sesuai Tema */}
      <div className="w-full max-w-md space-y-6 rounded-xl bg-gray-800 p-8 sm:p-10 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white">
            Login to <span className="text-orange-600">Teknoz</span>
          </h1>
          <p className="mt-2 text-gray-400">
            Welcome back! Access your account.
          </p>
        </div>

        {/* Formulir Login */}
        <form className="space-y-5" onSubmit={handleSubmit}>
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
              // Kelas yang Sesuai Tema
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
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              // Kelas yang Sesuai Tema
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              required
            />
          </div>

          {/* Tampilkan Error */}
          {error && (
            <div className="text-sm text-red-500 text-center font-medium">{error}</div>
          )}

          {/* Tombol Submit Sesuai Tema */}
          <button 
            type="submit" 
            disabled={isLoading} // Nonaktifkan tombol saat loading
            className="flex w-full justify-center rounded-lg border border-transparent bg-orange-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/50 transition duration-300 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        
        {/* Tautan ke Register */}
        <p className="text-center text-sm text-gray-400 pt-4">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-orange-500 hover:text-orange-400">
            Sign up
          </Link>
        </p>
        
      </div>
    </div>
  );
}