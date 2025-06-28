
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BusinessOpportunitiesProps {
  onBack: () => void;
}

interface Opportunity {
  id: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  location: string;
  earning: string;
  category: string;
  requirements: string[];
  requirementsHindi: string[];
  contact: string;
}

const BusinessOpportunities = ({ onBack }: BusinessOpportunitiesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const opportunities: Opportunity[] = [
    {
      id: 1,
      title: "Home-based Tailoring",
      titleHindi: "घर से सिलाई का काम",
      description: "Stitch clothes for local customers from your home",
      descriptionHindi: "घर से स्थानीय ग्राहकों के लिए कपड़ें सिलें",
      location: "Your Area",
      earning: "₹8,000-15,000/month",
      category: "crafts",
      requirements: ["Sewing machine", "Basic tailoring skills"],
      requirementsHindi: ["सिलाई मशीन", "बुनियादी सिलाई का ज्ञान"],
      contact: "Contact: Local Tailoring Group"
    },
    {
      id: 2,
      title: "Tiffin Service",
      titleHindi: "टिफिन सेवा",
      description: "Provide home-cooked meals to working professionals",
      descriptionHindi: "काम करने वाले लोगों को घर का खाना पहुंचाएं",
      location: "Nearby Offices",
      earning: "₹10,000-20,000/month",
      category: "food",
      requirements: ["Cooking skills", "Basic packaging"],
      requirementsHindi: ["खाना बनाने का हुनर", "पैकिंग का सामान"],
      contact: "Contact: FoodConnect Network"
    },
    {
      id: 3,
      title: "Beauty Services at Home",
      titleHindi: "घर पर ब्यूटी सेवा",
      description: "Provide beauty and grooming services to women at their homes",
      descriptionHindi: "महिलाओं को उनके घर पर ब्यूटी सेवा दें",
      location: "Door-to-door",
      earning: "₹12,000-25,000/month",
      category: "services",
      requirements: ["Beauty training", "Basic tools"],
      requirementsHindi: ["ब्यूटी का प्रशिक्षण", "बुनियादी औजार"],
      contact: "Contact: BeautyAtHome Network"
    },
    {
      id: 4,
      title: "Handicraft Making",
      titleHindi: "हस्तशिल्प बनाना",
      description: "Create and sell traditional handicrafts online and locally",
      descriptionHindi: "पारंपरिक हस्तशिल्प बनाकर ऑनलाइन और स्थानीय बेचें",
      location: "Online + Local",
      earning: "₹5,000-12,000/month",
      category: "crafts",
      requirements: ["Craft making skills", "Raw materials"],
      requirementsHindi: ["शिल्प बनाने का हुनर", "कच्चा माल"],
      contact: "Contact: CraftWomen Cooperative"
    },
    {
      id: 5,
      title: "Tuition Classes",
      titleHindi: "ट्यूशन क्लासेस",
      description: "Teach school children in your neighborhood",
      descriptionHindi: "अपने आस-पास के बच्चों को पढ़ाएं",
      location: "Your Home/Area",
      earning: "₹6,000-18,000/month",
      category: "education",
      requirements: ["Good in studies", "Patience with children"],
      requirementsHindi: ["पढ़ाई में अच्छे", "बच्चों के साथ धैर्य"],
      contact: "Contact: LocalTutor Network"
    }
  ];

  const categories = [
    { key: 'all', label: 'सभी | All' },
    { key: 'food', label: 'खाना | Food' },
    { key: 'crafts', label: 'शिल्प | Crafts' },
    { key: 'services', label: 'सेवाएं | Services' },
    { key: 'education', label: 'शिक्षा | Education' }
  ];

  const filteredOpportunities = selectedCategory === 'all' 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedCategory);

  const handleInterest = (opportunity: Opportunity) => {
    toast({
      title: "रुचि दर्ज की गई! | Interest Registered!",
      description: `${opportunity.titleHindi} के लिए आपकी रुचि दर्ज हो गई। जल्द ही संपर्क होगा। | Your interest for ${opportunity.title} has been registered. You'll be contacted soon.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          वापस | Back
        </Button>
        <h1 className="text-2xl font-bold">व्यापार के अवसर | Business Opportunities</h1>
      </div>

      {/* Category Filter */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>श्रेणी चुनें | Choose Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.key)}
                className="text-sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{opportunity.titleHindi}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {opportunity.title}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{opportunity.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                {opportunity.descriptionHindi}
              </p>
              <p className="text-xs text-gray-500">
                {opportunity.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-semibold text-green-600">{opportunity.earning}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">आवश्यकताएं | Requirements:</p>
                <ul className="text-xs space-y-1">
                  {opportunity.requirementsHindi.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 space-y-2">
                <Button 
                  onClick={() => handleInterest(opportunity)}
                  className="w-full"
                >
                  रुचि दिखाएं | Show Interest
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  {opportunity.contact}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-gray-500">
              इस श्रेणी में कोई अवसर नहीं मिला | No opportunities found in this category
            </p>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50">
        <CardContent className="text-center py-6">
          <h3 className="text-xl font-bold mb-2">
            और भी अवसर चाहिए? | Need More Opportunities?
          </h3>
          <p className="text-gray-600 mb-4">
            हमारे AI मेंटर से बात करें और अपने हुनर के अनुसार काम खोजें
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Talk to our AI Mentor and find work according to your skills
          </p>
          <Button onClick={() => window.location.reload()}>
            AI मेंटर से बात करें | Talk to AI Mentor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessOpportunities;
