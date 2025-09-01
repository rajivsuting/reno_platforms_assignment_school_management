"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, MapPin, Phone, Mail, Search, Filter } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [allSchools, setAllSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    fetchAllSchools();
  }, []);

  useEffect(() => {
    if (searchTerm || filterCity) {
      fetchFilteredSchools();
    } else {
      setSchools(allSchools);
    }
  }, [searchTerm, filterCity, allSchools]);

  const fetchAllSchools = async () => {
    try {
      const response = await fetch("/api/schools");
      if (!response.ok) {
        throw new Error("Failed to fetch schools");
      }
      const data = await response.json();
      setAllSchools(data.schools);
      setSchools(data.schools);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredSchools = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filterCity) params.append("city", filterCity);

      const response = await fetch(`/api/schools?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered schools");
      }
      const data = await response.json();
      setSchools(data.schools);
    } catch (err) {
      console.error("Error fetching filtered schools:", err);
      // Fallback to client-side filtering
      const filtered = allSchools.filter((school) => {
        const matchesSearch =
          school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity =
          !filterCity || school.city.toLowerCase() === filterCity.toLowerCase();
        return matchesSearch && matchesCity;
      });
      setSchools(filtered);
    }
  };

  const uniqueCities = [...new Set(allSchools.map((school) => school.city))];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" text="Loading schools..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Schools
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Browse Schools
        </h1>
        <p className="text-gray-600">
          Discover and explore schools in our comprehensive database
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search schools by name, address, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {schools.length} of {allSchools.length} schools
          {(searchTerm || filterCity) && (
            <span className="text-blue-600 ml-2">(filtered results)</span>
          )}
        </p>
      </div>

      {/* Schools Grid */}
      {schools.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No schools found
          </h3>
          <p className="text-gray-600">
            {searchTerm || filterCity
              ? "Try adjusting your search or filter criteria."
              : "No schools in database yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* School Image */}
              <div className="w-full h-48 bg-gray-200 overflow-hidden">
                {school.image ? (
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-school.jpg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* School Information */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {school.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{school.address}</p>
                      <p>
                        {school.city}, {school.state}
                      </p>
                    </div>
                  </div>

                  {school.contact && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span>{school.contact}</span>
                    </div>
                  )}

                  {school.email_id && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="truncate">{school.email_id}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <Link
                      href={`/school/${school.id}`}
                      className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1"
                      title="View Details"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>

                    <Link
                      href={`/school/${school.id}/edit`}
                      className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      title="Edit School"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>

                    <button
                      onClick={async () => {
                        if (
                          confirm(
                            `Are you sure you want to delete ${school.name}? This action cannot be undone.`
                          )
                        ) {
                          try {
                            const response = await fetch(
                              `/api/schools/${school.id}`,
                              {
                                method: "DELETE",
                              }
                            );
                            if (response.ok) {
                              // Refresh the schools list
                              fetchAllSchools();
                            } else {
                              alert("Failed to delete school");
                            }
                          } catch (err) {
                            alert("Error deleting school");
                          }
                        }
                      }}
                      className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Delete School"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button (if needed) */}
      {schools.length > 0 && (
        <div className="text-center mt-8">
          <button className="bg-gray-100 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-200 transition-colors">
            Load More Schools
          </button>
        </div>
      )}
    </div>
  );
}
