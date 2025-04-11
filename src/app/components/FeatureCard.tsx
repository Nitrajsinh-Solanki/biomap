// biomap\src\app\components\FeatureCard.tsx



interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
  }
  
  export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="p-6">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
       
      </div>
    );
  }
  
  