
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">
      <div className="text-center p-8">
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Animated rings */}
          <div className="absolute inset-0 border-2 border-amber-500/20 rounded-full animate-[ping_3s_infinite]" />
          <div className="absolute inset-2 border-2 border-amber-500/40 rounded-full animate-[ping_2s_infinite]" />
          <div className="absolute inset-4 border-t-2 border-amber-500 rounded-full animate-spin" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">{message}</h3>
        <p className="text-zinc-500 text-sm italic max-w-xs mx-auto">
          Gemini is analyzing the spiritual depth of the verse to craft a visual masterpiece...
        </p>
      </div>
    </div>
  );
};

export default Loader;
