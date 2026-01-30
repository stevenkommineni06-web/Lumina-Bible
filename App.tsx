
import React, { useState, useEffect, useCallback } from 'react';
import { BIBLE_BOOKS } from './constants';
import { Verse, GeneratedImage, AppStatus } from './types';
import { fetchVerseText, generateImageForVerse } from './services/geminiService';
import Sidebar from './components/Sidebar';
import VerseView from './components/VerseView';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState(BIBLE_BOOKS[0]);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVerseNum, setCurrentVerseNum] = useState(1);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFetchVerse = useCallback(async (book: string, chapter: number, verse: number) => {
    setStatus(AppStatus.FETCHING_VERSE);
    setErrorMessage(null);
    try {
      const data = await fetchVerseText(book, chapter, verse);
      setCurrentVerse(data);
      setStatus(AppStatus.IDLE);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to retrieve scripture text. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  }, []);

  const handleVisualize = async () => {
    if (!currentVerse) return;
    setStatus(AppStatus.GENERATING_IMAGE);
    setErrorMessage(null);
    try {
      const imageUrl = await generateImageForVerse(currentVerse);
      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        url: imageUrl,
        verse: { ...currentVerse },
        timestamp: Date.now(),
      };
      setGeneratedImages(prev => [newImage, ...prev]);
      setStatus(AppStatus.IDLE);
    } catch (error) {
      console.error(error);
      setErrorMessage("The visualization failed. Gemini might be busy.");
      setStatus(AppStatus.ERROR);
    }
  };

  useEffect(() => {
    handleFetchVerse(selectedBook.name, currentChapter, currentVerseNum);
  }, [selectedBook, currentChapter, currentVerseNum, handleFetchVerse]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-white">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-zinc-900/50 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-300 shadow-lg shadow-amber-500/20" />
          <h1 className="text-xl font-bold tracking-tight">LUMINA <span className="font-light text-amber-200/70">BIBLE</span></h1>
        </div>
        <div className="text-sm font-medium text-amber-100/50 hidden md:block uppercase tracking-widest">
          Scripture Visualization Engine
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          selectedBook={selectedBook} 
          setSelectedBook={setSelectedBook}
          currentChapter={currentChapter}
          setCurrentChapter={setCurrentChapter}
          currentVerseNum={currentVerseNum}
          setCurrentVerseNum={setCurrentVerseNum}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-900 to-black p-4 md:p-8 space-y-12">
          {/* Verse Reader & Interaction */}
          <section className="max-w-4xl mx-auto">
            <VerseView 
              verse={currentVerse} 
              onVisualize={handleVisualize} 
              isGenerating={status === AppStatus.GENERATING_IMAGE}
              isLoading={status === AppStatus.FETCHING_VERSE}
            />
            {errorMessage && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
                {errorMessage}
              </div>
            )}
          </section>

          {/* Visualization Gallery */}
          <section className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Gallery of Visions</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            {generatedImages.length === 0 && status !== AppStatus.GENERATING_IMAGE ? (
              <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-zinc-500 italic">No visions generated yet. Select a verse and click "Visualize This Scripture".</p>
              </div>
            ) : (
              <ImageGallery images={generatedImages} />
            )}
          </section>
        </main>
      </div>

      {status === AppStatus.GENERATING_IMAGE && <Loader message="Divine creativity in progress..." />}
    </div>
  );
};

export default App;
