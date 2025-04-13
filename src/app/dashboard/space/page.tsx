// biomap\src\app\dashboard\space\page.tsx

"use client";

import { useState, useEffect, Suspense } from "react";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import SpaceSearch from "@/app/components/SpaceSearch";
import SpaceGallery from "@/app/components/SpaceGallery";
import SpaceMediaDetail from "@/app/components/SpaceMediaDetail";

interface NasaMediaLink {
  href: string;
  rel: string;
  render?: string;
}

interface NasaMediaData {
  center: string;
  title: string;
  nasa_id: string;
  media_type: string;
  description: string;
  date_created: string;
  keywords: string[];
}

interface NasaMediaItem {
  href: string;
  data: NasaMediaData[];
  links: NasaMediaLink[];
}

interface User {
  name: string;
  email: string;
}

export default function SpacePage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<NasaMediaItem | null>(
    null
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleMediaSelect = (media: NasaMediaItem) => {
    setSelectedMedia(media);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseDetail = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar user={user} />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Space & Technology
        </h1>

        {selectedMedia ? (
          <SpaceMediaDetail media={selectedMedia} onClose={handleCloseDetail} />
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Explore NASA's Image and Video Library
              </h2>
              <p className="text-gray-600 mb-4">
                Search through NASA's vast collection of images, videos, and
                audio files. Discover the wonders of space exploration,
                astronomical phenomena, and cutting-edge technology.
              </p>
              <Suspense fallback={<div>Loading search...</div>}>
                <SpaceSearch />
              </Suspense>
            </div>

           <Suspense fallback={<div>Loading Gallery.....</div>}>
            <SpaceGallery onSelectMedia={handleMediaSelect}/>
           </Suspense>
          </>
        )}
      </main>
    </div>
  );
}
