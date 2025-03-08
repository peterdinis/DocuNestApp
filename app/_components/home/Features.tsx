import { FileText, Share2, Lock, Cloud } from "lucide-react";

const features = [
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Document Organization",
    description: "Easily categorize, tag, and find your documents in one place.",
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    title: "Seamless Collaboration",
    description: "Work on documents together in real-time with your team.",
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: "Secure Access Control",
    description: "Manage user permissions and keep your documents safe.",
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary" />,
    title: "Cloud Storage",
    description: "Access your documents anytime, anywhere with cloud backup.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/20 p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
