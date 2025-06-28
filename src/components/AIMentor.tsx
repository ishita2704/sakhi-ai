
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MessageCircle, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIMentorProps {
  onBack: () => void;
}

interface Message {
  type: 'user' | 'ai';
  content: string;
  videos?: { title: string; url: string }[];
}

const AIMentor = ({ onBack }: AIMentorProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: 'नमस्ते! मैं आपकी AI मेंटर दीदी हूं। आप मुझसे बचत, निवेश, और पैसों के बारे में कुछ भी पूछ सकती हैं। Hello! I am your AI Mentor Sister. You can ask me anything about savings, investment, and money.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const quickQuestions = [
    "मैं हर महीने कितना पैसा बचाऊं? | How much should I save monthly?",
    "बैंक में खाता कैसे खोलें? | How to open a bank account?",
    "छोटे बिजनेस कैसे शुरू करें? | How to start small business?",
    "पैसा कहां निवेश करें? | Where to invest money?"
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response with relevant advice
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);

    setInput('');
  };

  const generateAIResponse = (question: string): Message => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('save') || lowerQuestion.includes('बचत')) {
      return {
        type: 'ai',
        content: 'बचत के लिए यह सुझाव हैं: 1) अपनी आय का 20% हर महीने बचाएं 2) एक अलग बचत खाता खोलें 3) छोटी मात्रा से शुरुआत करें | For savings: 1) Save 20% of your income monthly 2) Open a separate savings account 3) Start with small amounts',
        videos: [
          { title: 'महिलाओं के लिए बचत टिप्स | Savings Tips for Women', url: 'https://youtube.com/watch?v=example1' },
          { title: 'घरेलू बचत के तरीके | Home Savings Methods', url: 'https://youtube.com/watch?v=example2' }
        ]
      };
    } else if (lowerQuestion.includes('business') || lowerQuestion.includes('बिजनेस')) {
      return {
        type: 'ai',
        content: 'छोटा बिजनेस शुरू करने के लिए: 1) अपने हुनर की पहचान करें 2) कम पैसे में शुरुआत करें 3) स्थानीय बाजार को समझें | To start small business: 1) Identify your skills 2) Start with low investment 3) Understand local market',
        videos: [
          { title: 'महिलाओं के लिए बिजनेस आइडिया | Business Ideas for Women', url: 'https://youtube.com/watch?v=example3' }
        ]
      };
    } else {
      return {
        type: 'ai',
        content: 'यह बहुत अच्छा सवाल है! मैं आपकी मदद करना चाहती हूं। क्या आप और विस्तार से बता सकती हैं? | That\'s a great question! I want to help you. Can you tell me more details?'
      };
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    handleSendMessage();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          वापस | Back
        </Button>
        <h1 className="text-2xl font-bold">AI मेंटर दीदी | AI Mentor Sister</h1>
      </div>

      <Card className="h-96 mb-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-pink-600" />
            बातचीत | Conversation
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.videos && (
                  <div className="mt-2 space-y-1">
                    {message.videos.map((video, vidIndex) => (
                      <a 
                        key={vidIndex}
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                      >
                        <Youtube className="w-3 h-3 mr-1" />
                        {video.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="अपना सवाल यहां लिखें... | Type your question here..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="text-base"
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            भेजें | Send
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          <p className="text-sm text-gray-600 md:col-span-2 mb-2">
            त्वरित सवाल | Quick Questions:
          </p>
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleQuickQuestion(question.split(' | ')[0])}
              className="text-left h-auto p-3 text-sm"
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIMentor;
