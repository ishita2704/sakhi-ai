
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AIAvatarProps {
  isSpeaking: boolean;
  message?: string;
}

const AIAvatar = ({ isSpeaking, message }: AIAvatarProps) => {
  const [mouthAnimation, setMouthAnimation] = useState<'closed' | 'open' | 'wide'>('closed');
  const [eyeAnimation, setEyeAnimation] = useState<'normal' | 'blink'>('normal');

  // Lip sync animation based on speaking state
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        const animations = ['closed', 'open', 'wide'] as const;
        setMouthAnimation(animations[Math.floor(Math.random() * animations.length)]);
      }, 200);

      return () => clearInterval(interval);
    } else {
      setMouthAnimation('closed');
    }
  }, [isSpeaking]);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeAnimation('blink');
      setTimeout(() => setEyeAnimation('normal'), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative">
        <Avatar className="w-24 h-24 border-4 border-pink-200 shadow-lg">
          <AvatarFallback className="bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600 text-2xl font-bold">
            दी
          </AvatarFallback>
        </Avatar>
        
        {/* Animated face overlay */}
        <div className="absolute inset-0 w-24 h-24 rounded-full overflow-hidden pointer-events-none">
          {/* Eyes */}
          <div className="absolute top-6 left-4 w-3 h-3 bg-pink-800 rounded-full transition-all duration-150">
            <div className={`w-full h-full bg-pink-800 rounded-full transition-all duration-150 ${
              eyeAnimation === 'blink' ? 'scale-y-0' : 'scale-y-100'
            }`} />
          </div>
          <div className="absolute top-6 right-4 w-3 h-3 bg-pink-800 rounded-full transition-all duration-150">
            <div className={`w-full h-full bg-pink-800 rounded-full transition-all duration-150 ${
              eyeAnimation === 'blink' ? 'scale-y-0' : 'scale-y-100'
            }`} />
          </div>
          
          {/* Mouth */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-200">
            {mouthAnimation === 'closed' && (
              <div className="w-4 h-1 bg-pink-800 rounded-full" />
            )}
            {mouthAnimation === 'open' && (
              <div className="w-3 h-2 bg-pink-800 rounded-full" />
            )}
            {mouthAnimation === 'wide' && (
              <div className="w-5 h-3 bg-pink-800 rounded-full" />
            )}
          </div>
        </div>

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
          </div>
        )}
      </div>
      
      <div className="text-center mt-2">
        <h3 className="text-lg font-semibold text-pink-600">मेंटर दीदी</h3>
        <p className="text-sm text-gray-500">Mentor Sister</p>
      </div>

      {/* Speech bubble when speaking */}
      {isSpeaking && message && (
        <div className="mt-4 max-w-xs relative">
          <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-3 shadow-md">
            <p className="text-sm text-gray-700 leading-relaxed">
              {message.slice(0, 100)}...
            </p>
            {/* Speech bubble arrow */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-pink-200" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAvatar;
