
import React from 'react';
import { BIBLE_BOOKS } from '../constants';
import { BibleBook } from '../types';

interface SidebarProps {
  selectedBook: BibleBook;
  setSelectedBook: (book: BibleBook) => void;
  currentChapter: number;
  setCurrentChapter: (ch: number) => void;
  currentVerseNum: number;
  setCurrentVerseNum: (v: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedBook, 
  setSelectedBook, 
  currentChapter, 
  setCurrentChapter,
  currentVerseNum,
  setCurrentVerseNum
}) => {
  return (
    <aside className="w-64 md:w-80 border-r border-white/5 flex flex-col bg-zinc-900/30 shrink-0">
      <div className="p-4 border-b border-white/5">
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Book of the Bible</label>
        <select 
          value={selectedBook.name}
          onChange={(e) => {
            const book = BIBLE_BOOKS.find(b => b.name === e.target.value);
            if (book) {
              setSelectedBook(book);
              setCurrentChapter(1);
              setCurrentVerseNum(1);
            }
          }}
          className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          {BIBLE_BOOKS.map(book => (
            <option key={book.name} value={book.name}>{book.name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Chapter</label>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
            {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => {
                  setCurrentChapter(num);
                  setCurrentVerseNum(1);
                }}
                className={`aspect-square flex items-center justify-center text-xs rounded-md transition-all ${
                  currentChapter === num 
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30' 
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Verse Number</label>
          <div className="flex items-center gap-3">
             <input 
              type="number"
              min={1}
              max={176} // Psalm 119 max
              value={currentVerseNum}
              onChange={(e) => setCurrentVerseNum(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
             />
             <div className="text-zinc-500 text-xs italic">Enter verse</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-zinc-800/30 text-[10px] text-zinc-500 italic text-center">
        Powered by Gemini AI Vision
      </div>
    </aside>
  );
};

export default Sidebar;
