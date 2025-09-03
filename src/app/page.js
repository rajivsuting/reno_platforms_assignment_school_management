"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, Plus, Eye, MapPin, TrendingUp, Users } from "lucide-react";

export default function Home() {
  const [stats, setStats] = useState([
    {
      label: "Total Schools",
      value: "Loading...",
      icon: Building2,
      color: "blue",
      description: "Registered in system",
    },
    {
      label: "Cities Covered",
      value: "Loading...",
      icon: MapPin,
      color: "purple",
      description: "Geographic reach",
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
            description: "Registered in system",
          },
          {
            label: "Cities Covered",
            value: uniqueCities.length.toString(),
            icon: MapPin,
            color: "purple",
            description: "Geographic reach",
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
      description: "Register a new school in the system",
      icon: Plus,
      href: "/addSchool",
      color: "blue",
    },
    {
      title: "View All Schools",
      description: "Browse and manage school database",
      icon: Eye,
      href: "/showSchools",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Welcome to School Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            Manage your educational institutions efficiently with our
            comprehensive platform. Add new schools, view existing ones, and
            keep track of important information.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-gradient-to-br from-blue-500 to-blue-600",
              purple: "bg-gradient-to-br from-purple-500 to-purple-600",
            };

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow w-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${
                      colorClasses[stat.color]
                    } text-white shadow-lg flex-shrink-0`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  const colorClasses = {
                    blue: "bg-blue-50 text-blue-700 border-blue-200",
                    green: "bg-green-50 text-green-700 border-green-200",
                  };

                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className="flex items-center p-4 rounded-lg border-2 hover:shadow-md transition-all duration-200 group w-full"
                      style={{
                        borderColor: colorClasses[action.color].split(" ")[2],
                      }}
                    >
                      <div
                        className={`p-2.5 rounded-lg ${
                          colorClasses[action.color]
                        } mr-3 group-hover:scale-110 transition-transform flex-shrink-0`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Schools */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  Recent Schools
                </h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm">Loading schools...</p>
                  </div>
                ) : recentSchools.length > 0 ? (
                  <div className="space-y-3">
                    {recentSchools.map((school, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full"
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="p-2 bg-blue-100 rounded-full mr-3 flex-shrink-0">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                              {school.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {school.city}
                            </p>
                          </div>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {school.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {school.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      No schools found in database
                    </p>
                  </div>
                )}
                <div className="mt-6 text-center">
                  <Link
                    href="/showSchools"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    View all schools
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status & Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              System Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Database Connection
                </span>
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

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Available Features
            </h2>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-gray-600">
                  Add new schools with validation
                </span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-gray-600">
                  Image upload to schoolImages folder
                </span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-gray-600">
                  View schools in responsive layout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
