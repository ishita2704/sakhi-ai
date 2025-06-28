import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MessageCircle, Youtube, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Avatar3D from "./Avatar3D";

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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const [currentAIMessage, setCurrentAIMessage] = useState('');
  const { toast } = useToast();
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const quickQuestions = [
    "मैं हर महीने कितना पैसा बचाऊं? | How much should I save monthly?",
    "बैंक में खाता कैसे खोलें? | How to open a bank account?",
    "छोटे बिजनेस कैसे शुरू करें? | How to start small business?",
    "पैसा कहां निवेश करें? | Where to invest money?"
  ];

  // Initialize speech recognition
  const initSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'hi-IN'; // Hindi by default, can be changed

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice recognition error",
          description: "Could not capture voice. Please try again.",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  // Speech synthesis
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      // Stop any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Try to find Hindi voice, fallback to default
      const voices = synthRef.current.getVoices();
      const hindiVoice = voices.find(voice => voice.lang.includes('hi') || voice.lang.includes('en-IN'));
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentAIMessage(text);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentAIMessage('');
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentAIMessage('');
      };

      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setCurrentAIMessage('');
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      initSpeechRecognition();
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.start();
    } else {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition.",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const callAI = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return "कृपया पहले अपनी Google Gemini API key डालें। Please enter your Google Gemini API key first.";
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful AI financial mentor for women in India. Respond in both Hindi and English. Focus on savings, investments, business ideas, and financial empowerment for women. Keep responses practical and encouraging. Always include both Hindi and English in your responses. User question: ${userMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 64,
            topP: 0.95,
            maxOutputTokens: 500,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Gemini API call failed');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "माफ करें, मुझे कुछ तकनीकी समस्या हो रही है। कृपया दोबारा कोशिश करें। Sorry, I'm having technical difficulties. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Call real AI
    const aiResponse = await callAI(input);
    const aiMessage: Message = { 
      type: 'ai', 
      content: aiResponse,
      videos: generateVideoSuggestions(input)
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
    
    // Speak the AI response
    speakText(aiResponse);
    
    setInput('');
  };

  const generateVideoSuggestions = (question: string): { title: string; url: string }[] => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('save') || lowerQuestion.includes('बचत')) {
      return [
        { title: 'महिलाओं के लिए बचत टिप्स | Savings Tips for Women', url: 'https://youtube.com/results?search_query=savings+tips+for+women+hindi' },
        { title: 'घरेलू बचत के तरीके | Home Savings Methods', url: 'https://youtube.com/results?search_query=home+savings+methods+hindi' }
      ];
    } else if (lowerQuestion.includes('business') || lowerQuestion.includes('बिजनेस')) {
      return [
        { title: 'महिलाओं के लिए बिजनेस आइडिया | Business Ideas for Women', url: 'https://youtube.com/results?search_query=business+ideas+for+women+hindi' }
      ];
    }
    return [];
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  if (showApiInput) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            वापस | Back
          </Button>
          <h1 className="text-2xl font-bold">AI मेंटर सेटअप | AI Mentor Setup</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Google Gemini API Key Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              AI मेंटर का उपयोग करने के लिए Google Gemini API key की आवश्यकता है। | To use the AI Mentor, a Google Gemini API key is required.
            </p>
            <p className="text-sm text-blue-600">
              Gemini API is FREE! Get your key at: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>
            </p>
            <Input
              type="password"
              placeholder="AIza... (Google Gemini API Key)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button 
                onClick={() => {
                  if (apiKey.trim()) {
                    setShowApiInput(false);
                    initSpeechRecognition();
                  } else {
                    toast({
                      title: "API Key Required",
                      description: "Please enter your Google Gemini API key to continue.",
                    });
                  }
                }}
                disabled={!apiKey.trim()}
              >
                शुरू करें | Start
              </Button>
              <Button variant="outline" onClick={onBack}>
                रद्द करें | Cancel
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              आपकी API key सुरक्षित है और केवल आपके ब्राउज़र में स्टोर होती है। | Your API key is secure and only stored in your browser.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          वापस | Back
        </Button>
        <h1 className="text-2xl font-bold">AI मेंटर दीदी | AI Mentor Sister</h1>
        <div className="ml-auto flex space-x-2">
          {isSpeaking ? (
            <Button variant="outline" size="sm" onClick={stopSpeaking}>
              <VolumeX className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <Volume2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 3D AI Avatar */}
      <div className="mb-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4">
        <Avatar3D isSpeaking={isSpeaking} message={currentAIMessage} />
      </div>

      <Card className="h-80 mb-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-pink-600" />
            बातचीत | Conversation
          </CardTitle>
        </CardHeader>
        <CardContent className="h-56 overflow-y-auto space-y-4">
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
            placeholder="अपना सवाल यहां लिखें या बोलें... | Type or speak your question..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="text-base"
          />
          <Button
            variant="outline"
            onClick={isListening ? stopListening : startListening}
            disabled={isLoading}
            className={isListening ? 'bg-red-100 border-red-300' : ''}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
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
