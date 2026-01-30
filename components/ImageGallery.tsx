
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageGalleryProps {
  images: GeneratedImage[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="group relative bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-amber-500/30 hover:shadow-amber-500/10"
        >
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={image.url} 
              alt={`${image.verse.book} ${image.verse.chapter}:${image.verse.verse}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-500/70 uppercase tracking-tighter">
                {image.verse.book} {image.verse.chapter}:{image.verse.verse}
              </span>
              <span className="text-[10px] text-zinc-500">
                {new Date(image.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-xs text-zinc-400 line-clamp-2 italic leading-relaxed serif-font">
              "{image.verse.text}"
            </p>
          </div>

          {/* Hover Actions Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
             <button 
                onClick={() => {
                   const link = document.createElement('a');
                   link.href = image.url;
                   link.download = `lumina-bible-${image.verse.book}-${image.verse.chapter}-${image.verse.verse}.png`;
                   link.click();
                }}
                className="p-3 bg-white text-black rounded-full hover:bg-amber-100 transition-colors"
                title="Download Visualization"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
