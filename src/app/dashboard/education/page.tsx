// biomap\src\app\dashboard\education\page.tsx



"use client";
import { useState, useEffect } from "react";
import {
  getWikipediaSummary,
  getPageCategories,
  getPageLinks,
  getRandomArticles,
  searchWikipedia,
} from "@/app/services/wikipediaService";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import EducationSearch from "@/app/components/EducationSearch";
import EducationArticleDetails from "@/app/components/EducationArticleDetails";

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

interface WikiCategory {
  ns: number;
  title: string;
}

interface WikiLink {
  ns: number;
  title: string;
}

interface RandomArticle {
  id: number;
  ns: number;
  title: string;
}

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<WikiSearchResult[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [articleSummary, setArticleSummary] = useState<string>("");
  const [categories, setCategories] = useState<WikiCategory[]>([]);
  const [links, setLinks] = useState<WikiLink[]>([]);
  const [randomArticles, setRandomArticles] = useState<RandomArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("search");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const router = useRouter();

  // user is logged in or not checking
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token || !userData) {
      router.push("/login");
      return;
    }
    try {
      if (!document.cookie.includes("token=")) {
        document.cookie = `token=${token}; path=/; max-age=${
          60 * 60 * 24
        }; SameSite=Strict`;
      }
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }
    setLoading(false);
  }, [router]);

  //loading random article on page load
  useEffect(() => {
    fetchRandomArticles();
  }, []);

  const handleSelectArticle = async (title: string) => {
    setSelectedArticle(title);
    setIsLoading(true);
    try {
      const summary = await getWikipediaSummary(title);
      setArticleSummary(summary);
      const cats = await getPageCategories(title);
      setCategories(cats);
      const articleLinks = await getPageLinks(title);
      setLinks(articleLinks);
      setActiveTab("article");
    } catch (error) {
      console.error("Error fetching article details:", error);
    } finally {
      setIsLoading(false);
    }
  };



  // fetching random articles 
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
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-green-600 mb-8">
            Educational Resources
          </h1>
          
          {/* search and article details  */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <EducationSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              handleSelectArticle={handleSelectArticle}
              randomArticles={randomArticles}
              setRandomArticles={setRandomArticles}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            
            
            {activeTab === "article" && selectedArticle && (
              <EducationArticleDetails
                selectedArticle={selectedArticle}
                articleSummary={articleSummary}
                categories={categories}
                links={links}
                handleSelectArticle={handleSelectArticle}
                activeTab={activeTab}
              />
            )}
          </div>

          {/* Educational Resources Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Featured Educational Topics
              </h2>
              <ul className="space-y-3">
                {[
                  "Biology",
                  "Climate Change",
                  "Astronomy",
                  "Genetics",
                  "Ecology",
                ].map((topic) => (
                  <li key={topic} className="flex items-center">
                    <button
                      onClick={() => {
                        setSearchQuery(topic);
                        setIsLoading(true);
                        setSearchQuery(topic);
                        const handleTopicSearch = async () => {
                          try {
                            const results = await searchWikipedia(topic);
                            setSearchResults(results);
                            setActiveTab("search");
                          } catch (error) {
                            console.error("Error searching Wikipedia:", error);
                          } finally {
                            setIsLoading(false);
                          }
                        };
                        handleTopicSearch();
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {topic}
                    </button>
                  </li>
                ))}
              </ul>
            </div>


            {/* learning paths styling is here  */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Suggested Learning Paths
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium text-gray-900">
                    Environmental Science
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Explore topics from ecology to conservation
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Ecology",
                      "Conservation biology",
                      "Biodiversity",
                      "Ecosystem",
                    ].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setSearchQuery(topic);
                          setIsLoading(true);
                          const handleTopicSearch = async () => {
                            try {
                              const results = await searchWikipedia(topic);
                              setSearchResults(results);
                              setActiveTab("search");
                            } catch (error) {
                              console.error("Error searching Wikipedia:", error);
                            } finally {
                              setIsLoading(false);
                            }
                          };
                          handleTopicSearch();
                        }}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full hover:bg-green-200"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="font-medium text-gray-900">
                    Space Exploration
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Journey through the cosmos
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Solar System",
                      "Exoplanets",
                      "Black holes",
                      "Galaxies",
                      "NASA",
                    ].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setSearchQuery(topic);
                          setIsLoading(true);
                          const handleTopicSearch = async () => {
                            try {
                              const results = await searchWikipedia(topic);
                              setSearchResults(results);
                              setActiveTab("search");
                            } catch (error) {
                              console.error("Error searching Wikipedia:", error);
                            } finally {
                              setIsLoading(false);
                            }
                          };
                          handleTopicSearch();
                        }}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* featured article is here  */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-800 text-xl font-semibold">
                Today's Featured Article
              </h2>
              <button
                onClick={() => {
                  if (randomArticles.length > 0) {
                    handleSelectArticle(randomArticles[0].title);
                  } else {
                    fetchRandomArticles().then(() => {
                      if (randomArticles.length > 0) {
                        handleSelectArticle(randomArticles[0].title);
                      }
                    });
                  }
                }}
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Refresh
              </button>
            </div>
            {randomArticles.length > 0 && (
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {randomArticles[0]?.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  Click to explore this fascinating topic and expand your
                  knowledge.
                </p>
                <button
                  onClick={() => handleSelectArticle(randomArticles[0].title)}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Read more →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
