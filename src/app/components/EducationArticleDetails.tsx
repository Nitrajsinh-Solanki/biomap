// biomap\src\app\components\EducationArticleDetails.tsx

"use client";

// // Types to help us handle Wikipedia’s category and link data cleanly
interface WikiCategory {
  ns: number;
  title: string;
}

interface WikiLink {
  ns: number;
  title: string;
}

interface EducationArticleDetailsProps {
  selectedArticle: string | null;
  articleSummary: string;
  categories: WikiCategory[];
  links: WikiLink[];
  handleSelectArticle: (title: string) => void;
  activeTab: string;
}

export default function EducationArticleDetails({
  selectedArticle,
  articleSummary,
  categories,
  links,
  handleSelectArticle,
}: EducationArticleDetailsProps) {
  if (!selectedArticle) {
    return null;
  }

  return (
    <div className="mt-0">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {selectedArticle}
      </h3>

      
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-2">Summary</h4>
        <p className="text-gray-700 leading-relaxed">{articleSummary}</p>
      </div>

      {/* read more on wekipedia link  */}
      <div className="mb-6">
        <a
          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
            selectedArticle
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          Read full article on Wikipedia
          <svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>

      {/* categories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
              >
                {category.title.replace("Category:", "")}
              </span>
            ))}
          </div>
        </div>
      )}


      {/* related links on page  */}
      {links.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Related Topics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {links.slice(0, 15).map((link, index) => (
              <div
                key={index}
                onClick={() => handleSelectArticle(link.title)}
                className="px-3 py-2 bg-blue-50 text-blue-700 rounded cursor-pointer hover:bg-blue-100"
              >
                {link.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
