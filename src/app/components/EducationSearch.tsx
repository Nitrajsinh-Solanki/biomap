// biomap\src\app\components\EducationSearch.tsx

"use client";
import {
  searchWikipedia,
  getRandomArticles,
} from "@/app/services/wikipediaService";

// wikipedia API result types
interface WikiSearchResult {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
}

interface RandomArticle {
  id: number;
  ns: number;
  title: string;
}

interface EducationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: WikiSearchResult[];
  setSearchResults: (results: WikiSearchResult[]) => void;
  handleSelectArticle: (title: string) => void;
  randomArticles: RandomArticle[];
  setRandomArticles: (articles: RandomArticle[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function EducationSearch({
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults,
  handleSelectArticle,
  randomArticles,
  setRandomArticles,
  isLoading,
  setIsLoading,
  activeTab,
  setActiveTab,
}: EducationSearchProps) {
  // handle search function for efficiently handling the search process
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const results = await searchWikipedia(searchQuery);
      setSearchResults(results);
      setActiveTab("search");
    } catch (error) {
      console.error("Error searching Wikipedia:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // random article fetching
  const fetchRandomArticles = async () => {
    setIsLoading(true);
    try {
      const articles = await getRandomArticles(5);
      setRandomArticles(articles);
    } catch (error) {
      console.error("Error fetching random articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* search bar styling  */}
      <div className="mb-8">
        <h2 className="text-xl mb-4 text-gray-900 font-bold">
          Wikipedia Knowledge Explorer
        </h2>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for any topic..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
          <button
            onClick={fetchRandomArticles}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
            disabled={isLoading}
          >
            Random Topics
          </button>
        </div>

        {/* tabs to display on page  */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("search")}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "search"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Search Results
            </button>
            <button
              onClick={() => setActiveTab("article")}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "article"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Article Details
            </button>
            <button
              onClick={() => setActiveTab("discover")}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "discover"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Discover
            </button>
          </nav>
        </div>

        {/* showing content based on the active tab  */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              {/* search results tab */}
              {activeTab === "search" && (
                <div>
                  {searchResults.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Search Results
                      </h3>
                      {searchResults.map((result) => (
                        <div
                          key={result.pageid}
                          className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleSelectArticle(result.title)}
                        >
                          <h4 className="text-lg font-medium text-blue-600">
                            {result.title}
                          </h4>
                          <div
                            className="text-sm text-gray-600 mt-1"
                            dangerouslySetInnerHTML={{
                              __html: result.snippet + "...",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      {searchQuery
                        ? "No results found. Try a different search term."
                        : "Enter a search term to find articles."}
                    </div>
                  )}
                </div>
              )}
              {/* discover tab  */}
              {activeTab === "discover" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Discover Random Topics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {randomArticles.map((article) => (
                      <div
                        key={article.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSelectArticle(article.title)}
                      >
                        <h4 className="text-lg font-medium text-blue-600">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Click to explore this topic
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      onClick={fetchRandomArticles}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
                    >
                      Load More Random Topics
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
