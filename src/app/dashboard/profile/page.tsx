// biomap\src\app\dashboard\profile\page.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "../../components/DashboardNavbar";
import Footer from "../../components/Footer";
import ProfileInfo from "../../components/ProfileInfo";
import ProfileForm from "../../components/ProfileForm";
import { UserProfile } from "../../components/ProfileTypes";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const router = useRouter();

  // fetching the  user profile from server
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      // updating the  local storage with latest user data
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setName(data.user.name);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setName(parsedUser.name);
        } catch (e) {
          localStorage.removeItem("user");
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar user={user} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Your Profile</h1>
          </div>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 text-red-700">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6 text-green-700">
              <p>{success}</p>
            </div>
          )}
          <div className="p-6">
            {!isEditing ? (
              <ProfileInfo 
                user={user} 
                setIsEditing={setIsEditing} 
              />
            ) : (
              <ProfileForm
                user={user}
                name={name}
                setName={setName}
                setIsEditing={setIsEditing}
                setError={setError}
                setSuccess={setSuccess}
                setUser={setUser}
                updateLoading={updateLoading}
                setUpdateLoading={setUpdateLoading}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
