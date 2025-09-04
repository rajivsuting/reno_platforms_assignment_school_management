"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Search,
  Filter,
  ArrowLeft,
  Eye,
} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ShowSchools() {
  const router = useRouter();
  const [schools, setSchools] = useState([]);
  const [allSchools, setAllSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    fetchAllSchools();
  }, []);

  // Separate useEffect for filtering to avoid infinite loops
  useEffect(() => {
    const filterSchools = () => {
      let filtered = allSchools;

      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (school) =>
            school.name.toLowerCase().includes(searchLower) ||
            school.address.toLowerCase().includes(searchLower) ||
            school.city.toLowerCase().includes(searchLower)
        );
      }

      // Apply city filter
      if (filterCity) {
        filtered = filtered.filter(
          (school) => school.city.toLowerCase() === filterCity.toLowerCase()
        );
      }

      setSchools(filtered);
    };

    if (searchTerm || filterCity) {
      filterSchools();
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

  // Function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    console.log("Processing image path:", imagePath);

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http")) {
      console.log("Full URL detected:", imagePath);
      return imagePath;
    }

    // If it's a relative path, construct the full URL
    if (imagePath.startsWith("/")) {
      console.log("Relative path detected:", imagePath);
      return imagePath;
    }

    // If it's just a filename, construct the path to schoolImages folder
    const finalUrl = `/schoolImages/${imagePath}`;
    console.log("Constructed URL:", finalUrl);
    return finalUrl;
  };

  const uniqueCities = [...new Set(allSchools.map((school) => school.city))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="flex items-center justify-center min-h-96">
            <LoadingSpinner size="lg" text="Loading schools..." />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="text-center">
            <Building2 className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error Loading Schools
            </h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Browse Schools
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Discover and explore schools in our comprehensive database
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search schools by name, address, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            <div className="relative w-full">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {schools.length} of {allSchools.length} schools
            {(searchTerm || filterCity) && (
              <span className="text-blue-600 ml-2 font-medium">
                (filtered results)
              </span>
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
            <p className="text-gray-600 text-sm sm:text-base">
              {searchTerm || filterCity
                ? "Try adjusting your search or filter criteria."
                : "No schools in database yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 w-full">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 group w-full cursor-pointer transform hover:-translate-y-1"
                onClick={() => router.push(`/school/${school.id}`)}
              >
                {/* School Image */}
                <div className="w-full h-52 bg-gray-100 overflow-hidden relative">
                  {school.image ? (
                    <Image
                      src={getImageUrl(school.image)}
                      alt={school.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.log("Image failed to load:", school.image);
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                      }}
                    />
                  ) : null}

                  {/* Fallback placeholder - shown when no image or image fails to load */}
                  <div
                    className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${
                      school.image ? "hidden" : ""
                    }`}
                  >
                    <div className="text-center">
                      <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">No Image</p>
                    </div>
                  </div>
                </div>

                {/* School Information - Enhanced Design */}
                <div className="p-5 w-full">
                  {/* School Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors leading-tight">
                    {school.name}
                  </h3>

                  {/* Location Information */}
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-50 rounded-lg mr-3 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <MapPin className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-800 text-sm leading-relaxed">
                          {school.address}
                        </p>
                        <p className="text-blue-600 font-semibold text-sm mt-1">
                          {school.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Click indicator */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        Click to view details
                      </span>
                      <Eye className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
