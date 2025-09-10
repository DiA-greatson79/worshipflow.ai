
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { pcmToWav, base64ToArrayBuffer } from '../utils';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const textModel = 'gemini-2.5-flash';
const ttsModelName = 'gemini-2.5-flash-preview-tts';
const ttsApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${ttsModelName}:generateContent?key=${process.env.API_KEY}`;

export async function generateText(prompt: string): Promise<string> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate text from API.');
  }
}

export async function generateAudio(text: string): Promise<string> {
    try {
        const payload = {
            contents: [{ parts: [{ text: `Say with a calm and clear voice: ${text}` }] }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } }
                }
            },
            model: ttsModelName
        };

        const apiResponse = await fetch(ttsApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.text();
            throw new Error(`HTTP error! status: ${apiResponse.status}, body: ${errorBody}`);
        }
        
        const result = await apiResponse.json();
        const part = result?.candidates?.[0]?.content?.parts?.[0];
        const audioData = part?.inlineData?.data;
        const mimeType = part?.inlineData?.mimeType;

        if (audioData && mimeType && mimeType.startsWith("audio/")) {
            const sampleRateMatch = mimeType.match(/rate=(\d+)/);
            const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000;
            const pcmData = base64ToArrayBuffer(audioData);
            const pcm16 = new Int16Array(pcmData);
            const wavBlob = pcmToWav(pcm16, sampleRate);
            return URL.createObjectURL(wavBlob);
        } else {
            throw new Error("Audio data not found in API response.");
        }
    } catch (error) {
        console.error('Error calling TTS API:', error);
        throw new Error('Failed to generate audio from API.');
    }
}
