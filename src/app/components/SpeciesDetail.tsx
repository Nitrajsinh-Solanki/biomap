// biomap\src\app\components\SpeciesDetail.tsx

"use client";
import { Species } from "./SpeciesTypes";


// props interface to define types for the component

interface SpeciesDetailProps {
  selectedSpecies: Species | null;
  relatedSpecies: Species[];
  handleCloseDetails: () => void;
  handleSpeciesSelect: (species: Species) => void;
}

export default function SpeciesDetail({
  selectedSpecies,
  relatedSpecies,
  handleCloseDetails,
  handleSpeciesSelect,
}: SpeciesDetailProps) {
  if (!selectedSpecies) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedSpecies.commonName}
              </h2>
              <p className="text-gray-600 italic">
                {selectedSpecies.scientificName}
              </p>
            </div>
            <button
              onClick={handleCloseDetails}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-64 overflow-hidden rounded-lg mb-4">
                <img
                  src={selectedSpecies.imageUrl}
                  alt={selectedSpecies.commonName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/species-placeholder.jpg";
                  }}
                />
              </div>

              {/* main content grid code is here  */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-gray-500">
                    Conservation Status
                  </h3>
                  <p
                    className={`font-semibold ${
                      selectedSpecies.conservationStatus.includes(
                        "Endangered"
                      ) ||
                      selectedSpecies.conservationStatus.includes(
                        "Critically"
                      )
                        ? "text-red-600"
                        : selectedSpecies.conservationStatus.includes(
                            "Vulnerable"
                          )
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {selectedSpecies.conservationStatus}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-gray-500">
                    Population Trend
                  </h3>
                  <p
                    className={`font-semibold ${
                      selectedSpecies.populationTrend === "Decreasing"
                        ? "text-red-600"
                        : selectedSpecies.populationTrend === "Increasing"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {selectedSpecies.populationTrend}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-gray-900">
                    Habitat
                  </h3>
                  <p className="font-semibold text-gray-900">
                    {selectedSpecies.habitat}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-gray-500">
                    Region
                  </h3>
                  <p className="font-semibold text-gray-800">
                    {selectedSpecies.region}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Taxonomy</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-2 gap-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Kingdom:</span>
                    <p className="font-medium text-gray-800">{selectedSpecies.kingdom}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phylum:</span>
                    <p className="font-medium text-gray-800">{selectedSpecies.phylum}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Class:</span>
                    <p className="font-medium text-gray-800">{selectedSpecies.class}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Order:</span>
                    <p className="font-medium text-gray-800">{selectedSpecies.order}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Family:</span>
                    <p className="font-medium text-gray-800">{selectedSpecies.family}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Genus:</span>
                    <p className="font-medium text-gray-800">{selectedSpecies.genus}</p>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Description</h3>
              <p className="text-gray-700 mb-4">
                {selectedSpecies.description}
              </p>
              {selectedSpecies.description.includes("See more at:") && (
                <a
                  href={selectedSpecies.description.split("See more at: ")[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View on Wikipedia
                </a>
              )}
            </div>

            {/* related species code is here  */}
          </div>
          {relatedSpecies.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Related Species
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedSpecies.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleSpeciesSelect(item)}
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.commonName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/species-placeholder.jpg";
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.commonName}
                      </h4>
                      <p className="text-xs text-gray-600 italic">
                        {item.scientificName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
