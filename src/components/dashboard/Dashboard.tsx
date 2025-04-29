"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/user");

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/");
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const { user } = await response.json();
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch user data"
        );
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      setError(error instanceof Error ? error.message : "Failed to sign out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">
                Second App Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Profile Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  User ID
                </label>
                <p className="mt-1 text-lg text-gray-900">{user?.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Last Sign In
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {user?.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Account Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Account Active</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Connected to Main App</span>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Sign Out from All Apps
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
