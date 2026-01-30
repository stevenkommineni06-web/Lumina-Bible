
import React from 'react';
import { Verse } from '../types';

interface VerseViewProps {
  verse: Verse | null;
  onVisualize: () => void;
  isGenerating: boolean;
  isLoading: boolean;
}

const VerseView: React.FC<VerseViewProps> = ({ verse, onVisualize, isGenerating, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-10 text-center animate-pulse">
        <div className="h-4 bg-white/5 rounded w-1/4 mx-auto mb-6" />
        <div className="h-8 bg-white/5 rounded w-3/4 mx-auto mb-4" />
        <div className="h-8 bg-white/5 rounded w-2/3 mx-auto" />
      </div>
    );
  }

  if (!verse) return null;

  return (
    <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden group">
      {/* Decorative background circle */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          Scripture Reference
        </span>
        
        <h2 className="serif-font text-3xl md:text-5xl font-bold text-amber-50/90 mb-8 leading-tight">
          {verse.book} {verse.chapter}:{verse.verse}
        </h2>

        <div className="relative mb-10 max-w-2xl">
          <svg className="absolute -top-6 -left-8 w-12 h-12 text-white/5 fill-current" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L22.017 3V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.01697 21L3.01697 18C3.01697 16.8954 3.9124 16 5.01697 16H8.01697C8.56925 16 9.01697 15.5523 9.01697 15V9C9.01697 8.44772 8.56925 8 8.01697 8H5.01697C3.9124 8 3.01697 7.10457 3.01697 6V3L11.017 3V15C11.017 18.3137 8.33068 21 5.01697 21H3.01697Z" />
          </svg>
          <p className="serif-font text-xl md:text-2xl text-zinc-300 italic leading-relaxed">
            {verse.text}
          </p>
        </div>

        <button
          onClick={onVisualize}
          disabled={isGenerating}
          className={`
            relative group px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all
            ${isGenerating 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-amber-100 hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-amber-500/20'
            }
          `}
        >
          {isGenerating ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Envisioning...
            </span>
          ) : (
            "Visualize This Scripture"
          )}
        </button>
      </div>
    </div>
  );
};

export default VerseView;
