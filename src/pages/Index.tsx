
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Calendar, Users, DollarSign } from "lucide-react";
import { useState } from "react";
import AIMentor from "@/components/AIMentor";
import SavingsTracker from "@/components/SavingsTracker";
import BusinessOpportunities from "@/components/BusinessOpportunities";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const renderSection = () => {
    switch(activeSection) {
      case 'mentor':
        return <AIMentor onBack={() => setActiveSection('home')} />;
      case 'savings':
        return <SavingsTracker onBack={() => setActiveSection('home')} />;
      case 'business':
        return <BusinessOpportunities onBack={() => setActiveSection('home')} />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                आपका वित्तीय साथी
              </h1>
              <p className="text-xl text-gray-600 mb-2">Your Financial Companion</p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-6">
                महिलाओं के लिए AI-powered वित्तीय सलाहकार | बचत करें, सीखें, और कमाएं
              </p>
              <p className="text-base text-gray-500 max-w-2xl mx-auto">
                AI-powered financial advisor for women | Save, Learn, and Earn
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-pink-200"
                onClick={() => setActiveSection('mentor')}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-pink-600" />
                  </div>
                  <CardTitle className="text-xl">AI मेंटर दीदी</CardTitle>
                  <CardDescription>AI Mentor Sister</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    हिंदी और अंग्रेजी में बात करें। बचत के बारे में पूछें और सीखें।
                  </p>
                  <p className="text-sm text-gray-500">
                    Chat in Hindi & English. Ask about savings and learn.
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200"
                onClick={() => setActiveSection('savings')}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">बचत ट्रैकर</CardTitle>
                  <CardDescription>Savings Tracker</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    अपना लक्ष्य सेट करें और बचत ट्रैक करें। कैशबैक पाएं!
                  </p>
                  <p className="text-sm text-gray-500">
                    Set goals, track savings, earn cashbacks!
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200"
                onClick={() => setActiveSection('business')}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">व्यापार के अवसर</CardTitle>
                  <CardDescription>Business Opportunities</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">
                    स्थानीय व्यापार से जुड़ें और कमाई करें।
                  </p>
                  <p className="text-sm text-gray-500">
                    Connect with local businesses and earn money.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                आपकी सफलता | Your Success
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-pink-600">10,000+</div>
                  <div className="text-gray-600">महिलाएं जुड़ीं | Women Joined</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">₹50L+</div>
                  <div className="text-gray-600">कुल बचत | Total Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">व्यापारिक अवसर | Business Opportunities</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {renderSection()}
      </div>
    </div>
  );
};

export default Index;
