
export interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  verse: Verse;
  timestamp: number;
}

export interface BibleBook {
  name: string;
  chapters: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  FETCHING_VERSE = 'FETCHING_VERSE',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  ERROR = 'ERROR'
}
