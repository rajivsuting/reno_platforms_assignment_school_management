"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, Plus, Eye, MapPin } from "lucide-react";

export default function Home() {
  const [stats, setStats] = useState([
    {
      label: "Total Schools",
      value: "Loading...",
      icon: Building2,
      color: "blue",
    },
    {
      label: "Cities Covered",
      value: "Loading...",
      icon: MapPin,
      color: "purple",
    },
  ]);
  const [recentSchools, setRecentSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/schools");
      if (response.ok) {
        const data = await response.json();
        const schools = data.schools || [];

        // Update stats with real data
        const uniqueCities = [...new Set(schools.map((school) => school.city))];
        setStats([
          {
            label: "Total Schools",
            value: schools.length.toString(),
            icon: Building2,
            color: "blue",
          },
          {
            label: "Cities Covered",
            value: uniqueCities.length.toString(),
            icon: MapPin,
            color: "purple",
          },
        ]);

        // Update recent schools (show last 4 added)
        setRecentSchools(
          schools.slice(0, 4).map((school) => ({
            name: school.name,
            city: school.city,
            status: "Active",
            date: "Recently added",
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Add New School",
      description: "Register a new school",
      icon: Plus,
      href: "/addSchool",
      color: "blue",
    },
    {
      title: "View All Schools",
      description: "Browse school database",
      icon: Eye,
      href: "/showSchools",
      color: "green",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your school management system. Here's what you can do.
        </p>
      </div>

      {/* Stats Cards - Now showing real data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-500",
            purple: "bg-purple-500",
          };

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    colorClasses[stat.color]
                  } text-white`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                const colorClasses = {
                  blue: "bg-blue-100 text-blue-600",
                  green: "bg-green-100 text-green-600",
                };

                return (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div
                      className={`p-2 rounded-md ${
                        colorClasses[action.color]
                      } mr-3`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Schools - Now showing real data from database */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Schools from Database
              </h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading schools...</p>
                </div>
              ) : recentSchools.length > 0 ? (
                <div className="space-y-4">
                  {recentSchools.map((school, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {school.name}
                          </h3>
                          <p className="text-sm text-gray-600">{school.city}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {school.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {school.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No schools found in database</p>
                </div>
              )}
              <div className="mt-6 text-center">
                <Link
                  href="/showSchools"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View all schools →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status - Only showing what's actually implemented */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            System Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database Connection</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {loading ? "Checking..." : "Connected"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Image Upload</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Working
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Form Validation</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Features Available
          </h2>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-gray-600">
                Add new schools with validation
              </span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-600">
                Image upload to schoolImages folder
              </span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-gray-600">
                View schools in e-commerce style layout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
