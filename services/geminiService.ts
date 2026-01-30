
import { GoogleGenAI, Type } from "@google/genai";
import { Verse } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const fetchVerseText = async (book: string, chapter: number, verseNum: number): Promise<Verse> => {
  const ai = getAI();
  const prompt = `Fetch the text of the Bible verse: ${book} ${chapter}:${verseNum}. 
  Provide the result in a JSON format with keys: "book", "chapter", "verse", "text". 
  Use a clear, accurate translation like the ESV or NIV.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          book: { type: Type.STRING },
          chapter: { type: Type.NUMBER },
          verse: { type: Type.NUMBER },
          text: { type: Type.STRING },
        },
        required: ["book", "chapter", "verse", "text"],
      },
    },
  });

  return JSON.parse(response.text.trim());
};

export const generateImageForVerse = async (verse: Verse): Promise<string> => {
  const ai = getAI();
  const prompt = `Create a visually stunning, artistic, and evocative representation of the Bible verse: 
  "${verse.book} ${verse.chapter}:${verse.verse} - ${verse.text}".
  
  Focus on the spiritual essence, symbolic elements, and mood. 
  Style: Epic cinematic photography or classical oil painting with high detail, dramatic lighting, and deep emotional resonance. 
  No text in the image.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Failed to generate image from Gemini.");
};
