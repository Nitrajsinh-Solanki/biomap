// biomap\src\app\page.tsx



import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";
import Footer from "./components/Footer";

export default function Home() {
  const features = [
    {
      title: "Species Search & Discovery",
      description: "Search for species by name, habitat, or conservation status with our comprehensive database.",
      icon: "🔍"
    },
    {
      title: "Interactive Map",
      description: "Explore species distribution and biodiversity hotspots with our interactive global map.",
      icon: "🗺️"
    },
    {
      title: "Species Profiles",
      description: "Access detailed information about species including scientific data, images, and conservation status.",
      icon: "🦁"
    },
    {
      title: "Environmental Data",
      description: "View real-time environmental conditions and their impact on species habitats.",
      icon: "🌦️"
    },
    {
      title: "Community Contributions",
      description: "Contribute to our database by reporting species sightings in your area.",
      icon: "👥"
    },
    {
      title: "Biodiversity Analytics",
      description: "Analyze trends in species distribution and conservation status with our interactive dashboards.",
      icon: "📊"
    },
    {
      title: "Conservation Tracking",
      description: "Monitor conservation efforts and protected areas with real-time updates and historical data.",
      icon: "🌳"
    },
    {
      title: "Research Collaboration",
      description: "Connect with scientists and researchers worldwide to collaborate on biodiversity projects.",
      icon: "🔬"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Discover Our Features</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Explore the powerful tools and capabilities that make BioMap the leading platform for biodiversity research and conservation.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
