
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Calendar, Users, Mic, Globe, Smartphone, Youtube, Target, Award, Bot } from "lucide-react";
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
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 opacity-70"></div>
              <div className="relative text-center py-16 px-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full shadow-lg">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  Sakhi AI
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                  Your AI-Powered Financial Companion
                </p>
                <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                  Multilingual AI mentor helping women achieve financial independence through voice-based guidance, 
                  personalized learning, and 24/7 support in Hindi and regional languages.
                </p>
                
                {/* Key Features Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-pink-500" />
                    <span className="text-sm font-medium">Multilingual Support</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 flex items-center gap-2">
                    <Mic className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Voice-Based Learning</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Mobile & WhatsApp</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setActiveSection('mentor')}
                >
                  Start Your Journey with Sakhi AI
                </Button>
              </div>
            </div>

            {/* Main Features */}
            <div className="grid md:grid-cols-3 gap-8 px-4">
              <Card 
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200"
                onClick={() => setActiveSection('mentor')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">AI Mentor Chat</CardTitle>
                  <CardDescription className="text-gray-600">Sakhi AI - Your Personal Guide</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-gray-700 font-medium">
                    Chat with Sakhi AI in Hindi or English. Get personalized financial advice with voice support.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full">3D Avatar</span>
                    <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full">Voice Chat</span>
                    <span className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full">Multilingual</span>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200"
                onClick={() => setActiveSection('savings')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Smart Savings Tracker</CardTitle>
                  <CardDescription className="text-gray-600">AI-Powered Goal Setting</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-gray-700 font-medium">
                    Set savings goals, track progress, and earn cashback rewards on successful achievements.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">Goal Setting</span>
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">Cashback</span>
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">Progress Tracking</span>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
                onClick={() => setActiveSection('business')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Business Opportunities</CardTitle>
                  <CardDescription className="text-gray-600">AI-Suggested Local Earning</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-gray-700 font-medium">
                    Discover local earning opportunities and connect with Self Help Groups (SHG) for support.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Local Opportunities</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">SHG Support</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">AI Suggestions</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Features Section */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 p-8 rounded-3xl mx-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Why Choose <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Sakhi AI</span>?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Powered by advanced AI technology to provide personalized, accessible financial guidance
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-pink-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Voice-First Learning</h3>
                  <p className="text-sm text-gray-600">Ask questions naturally in your preferred language</p>
                </div>

                <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Youtube className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Visual Learning</h3>
                  <p className="text-sm text-gray-600">Curated YouTube videos for easy understanding</p>
                </div>

                <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Multilingual Support</h3>
                  <p className="text-sm text-gray-600">Available in Hindi and regional languages</p>
                </div>

                <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">24/7 Mentorship</h3>
                  <p className="text-sm text-gray-600">AI-powered guidance available anytime</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-3xl mx-4">
              <h3 className="text-3xl font-bold text-center mb-8">
                Empowering Women Across India
              </h3>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-pink-400 mb-2">10,000+</div>
                  <div className="text-gray-300">Women Empowered</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-400 mb-2">₹50L+</div>
                  <div className="text-gray-300">Total Savings Tracked</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
                  <div className="text-gray-300">Languages Supported</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-gray-300">AI Support Available</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center py-12 px-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Ready to Transform Your Financial Future?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of women who are already building their financial independence with Sakhi AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setActiveSection('mentor')}
                >
                  Chat with Sakhi AI Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-semibold px-8 py-3"
                  onClick={() => setActiveSection('savings')}
                >
                  Start Saving Today
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-25 to-purple-25">
      <div className="container mx-auto px-4 py-8">
        {renderSection()}
      </div>
    </div>
  );
};

export default Index;
