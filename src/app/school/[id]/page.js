"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  Trash2,
  Edit,
} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";

export default function SchoolDetails() {
  const params = useParams();
  const router = useRouter();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        const response = await fetch("/api/schools");
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const data = await response.json();
        const schoolData = data.schools.find(
          (s) => s.id === parseInt(params.id)
        );
        if (schoolData) {
          setSchool(schoolData);
        } else {
          setError("School not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchoolDetails();
  }, [params.id]);

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete ${school.name}? This action cannot be undone.`
      )
    ) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/schools/${school.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete school");
      }

      // Redirect to schools list after successful deletion
      router.push("/showSchools");
    } catch (err) {
      setError("Failed to delete school: " + err.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="flex items-center justify-center min-h-96">
            <LoadingSpinner size="lg" text="Loading school details..." />
          </div>
        </div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="text-center">
            <Building2 className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {error || "School not found"}
            </h2>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Schools
          </button>
        </div>

        {/* School Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <Building2 className="h-10 w-10 sm:h-12 sm:w-12 mr-3 sm:mr-4 mb-3 sm:mb-0" />
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  {school.name}
                </h1>
                <p className="text-blue-100 text-sm sm:text-base">
                  {school.city}, {school.state}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {/* School Image */}
            {school.image && (
              <div className="mb-6 relative w-full h-48 sm:h-64">
                <Image
                  src={school.image}
                  alt={school.name}
                  fill
                  className="object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.src = "/placeholder-school.jpg";
                  }}
                />
              </div>
            )}

            {/* School Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">
                      Address
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {school.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">
                      Contact
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {school.contact}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base break-all">
                      {school.email_id}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">
                      Location
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {school.city}, {school.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <Link
                href={`/school/${school.id}/edit`}
                className="flex-1 sm:flex-none sm:px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-medium flex items-center justify-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit School
              </Link>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 sm:flex-none sm:px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete School
                  </>
                )}
              </button>

              <button
                onClick={() => router.push("/showSchools")}
                className="flex-1 sm:flex-none sm:px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
