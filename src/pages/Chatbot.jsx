import React, { useState, useRef, useEffect } from 'react';
// Assuming 'ImageWithFallback' is defined elsewhere and its import path is correct
// import { ImageWithFallback } from './figma/ImageWithFallback';
// Since ImageWithFallback is not defined, I'll use a standard <img> tag with a fallback placeholder.

import {
  Sparkles,
  Send,
  ArrowLeft,
  Beaker,
  Heart,
  Download,
  Mail,
  Plus,
  Minus,
} from 'lucide-react';

import HeaderChatbot from '../components/HeaderChatbot';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error('VITE_GEMINI_API_KEY is not set!');
  console.log('Available env vars:', import.meta.env);
}

const ai = new GoogleGenAI({ apiKey: apiKey });

export default function ChatbotCoCreation() {
  const { selectedPerfume } = useAppContext();
  const navigate = useNavigate();

  const buildInitialBlend = (selectedPerfume) => ({
    name: `Custom ${selectedPerfume.name}`,
    baseFragrance: selectedPerfume.name,
    topNotes: selectedPerfume.notes_structured.top.map((n) => ({
      name: n,
      intensity: 60,
    })),
    heartNotes: selectedPerfume.notes_structured.middle.map((n) => ({
      name: n,
      intensity: 60,
    })),
    baseNotes: selectedPerfume.notes_structured.base.map((n) => ({
      name: n,
      intensity: 60,
    })),
    mood: [selectedPerfume.main_accord],
    occasions: [selectedPerfume.activity],
    intensity: 70,
  });

  const [customBlend, setCustomBlend] = useState(() =>
    buildInitialBlend(selectedPerfume)
  );

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `Halo, dengan saya Asisten AI untuk berdiskusi mengenai konten parfum Anda. Pilihan parfum ${selectedPerfume.name} oleh ${selectedPerfume.brand} adalah awal yang bagus! Bagaimana Anda ingin menyesuaikan campuran parfum Anda hari ini? Apakah Anda ingin menambahkan catatan tertentu, mengubah intensitas, atau menyesuaikan suasana hati dan kesempatan? Silakan beri tahu saya preferensi Anda!`,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [chat, setChat] = useState(null);

  /** @type {[CustomBlend, React.Dispatch<React.SetStateAction<CustomBlend>>]} */

  // Initialize chat on mount
  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: `You are a professional perfume creator assistant. Help users customize their perfume blend based on ${
              selectedPerfume.name
            } by ${selectedPerfume.brand}. 
            
Base notes: ${selectedPerfume.all_notes.join(', ')}

When users request changes:
1. Suggest specific note adjustments
2. Explain how changes affect the scent profile
3. Keep responses concise and friendly
4. Format suggestions as actionable items`,
          },
        });
        setChat(newChat);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      }
    };
    initChat();
  }, [selectedPerfume]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const parseJsonLoose = (text) => {
    if (!text) return null;
    // strip leading + on numbers (": +10" -> ": 10")
    const cleaned = text.replace(/:\s*\+(\d+)/g, ': $1');
    // try direct parse
    try {
      return JSON.parse(cleaned);
    } catch {}
    // try first JSON block
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch {}
    }
    return null;
  };

  const applyAdjustments = (payload) => {
    if (!payload?.notesAdjustments) return;
    const clamp = (v) => Math.max(0, Math.min(100, v));
    const applyLayer = (layer, list) => {
      setCustomBlend((prev) => ({
        ...prev,
        [layer]: prev[layer].map((note) => {
          const adj = list.find(
            (a) => a.name.toLowerCase() === note.name.toLowerCase()
          );
          return adj
            ? { ...note, intensity: clamp(note.intensity + (adj.delta || 0)) }
            : note;
        }),
      }));
    };

    const {
      topNotes = [],
      heartNotes = [],
      baseNotes = [],
    } = payload.notesAdjustments;
    applyLayer('topNotes', topNotes);
    applyLayer('heartNotes', heartNotes);
    applyLayer('baseNotes', baseNotes);

    if (typeof payload.overallIntensityDelta === 'number') {
      setCustomBlend((prev) => ({
        ...prev,
        intensity: clamp(prev.intensity + payload.overallIntensityDelta),
      }));
    }
    if (Array.isArray(payload.mood)) {
      setCustomBlend((prev) => ({ ...prev, mood: payload.mood }));
    }
    if (Array.isArray(payload.occasions)) {
      setCustomBlend((prev) => ({ ...prev, occasions: payload.occasions }));
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !chat) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const prompt = `
      User request: ${inputText}

      Base perfume:
      - Name: ${selectedPerfume.name} by ${selectedPerfume.brand}
      - Gender: ${selectedPerfume.gender}
      - Price tier: ${selectedPerfume.price_tier}
      - Season: ${selectedPerfume.season}
      - Activity: ${selectedPerfume.activity}
      - Longevity: ${selectedPerfume.longevity}
      - Projection: ${selectedPerfume.projection}
      - Main accord: ${selectedPerfume.main_accord}
      - Notes: ${selectedPerfume.all_notes.join(', ')}
      - Structured:
        • Top: ${selectedPerfume.notes_structured.top.join(', ')}
        • Middle: ${selectedPerfume.notes_structured.middle.join(', ')}
        • Base: ${selectedPerfume.notes_structured.base.join(', ')}

      Current blend JSON:
      ${JSON.stringify(customBlend, null, 2)}

      Return ONLY JSON:
      {
        "notesAdjustments": {
          "topNotes": [{ "name": "Bergamot", "delta": +10 }],
          "heartNotes": [{ "name": "Jasmine", "delta": -5 }],
          "baseNotes": [{ "name": "Coconut", "delta": +5 }]
        },
        "overallIntensityDelta": 0,
        "mood": ["..."],
        "occasions": ["..."],
        "comment": "short rationale"
      }
      `;
      const response = await chat.sendMessage({ message: prompt });
      // console.log(' GenAI response:', response.text);

      const parsed = parseJsonLoose(response.text);
      applyAdjustments(parsed);

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: parsed?.comment || response.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);

      // Optional: Parse AI response to update blend
      // updateBlendFromAI(response.text);
    } catch (error) {
      console.error('AI response error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const adjustNoteIntensity = (layer, noteName, delta) => {
    setCustomBlend((prev) => ({
      ...prev,
      [layer]: prev[layer].map((note) =>
        note.name.toLowerCase() === noteName.toLowerCase()
          ? {
              ...note,
              intensity: Math.max(0, Math.min(100, note.intensity + delta)),
            }
          : note
      ),
    }));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50'>
      {/* Header */}
      <HeaderChatbot
        onBack={() => navigate('/result')}
        customBlend={customBlend}
      />

      {/* Messages */}
      <div className='container mx-auto px-6 py-8'>
        <div className='grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
          {/* Chat Section */}
          <div className='lg:col-span-2 bg-white rounded-2xl shadow-lg flex flex-col h-[700px]'>
            <div className='p-6 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full flex items-center justify-center'>
                  <Sparkles className='w-5 h-5 text-white' />
                </div>
                <div>
                  <div className='text-rose-900'>AI Perfume Creator</div>
                  <div className='text-rose-700/70'>
                    Your personal fragrance consultant
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-6 space-y-4'>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-100 text-rose-900'
                    }`}
                  >
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className='flex justify-start'>
                  <div className='bg-gray-100 text-rose-900 p-4 rounded-2xl'>
                    <div className='flex gap-1'>
                      <span
                        className='w-2 h-2 bg-rose-400 rounded-full animate-bounce'
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className='w-2 h-2 bg-rose-400 rounded-full animate-bounce'
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className='w-2 h-2 bg-rose-400 rounded-full animate-bounce'
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className='p-6 border-t border-gray-100'>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe how you'd like to customize your perfume..."
                  className='flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-rose-600 text-rose-900'
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`p-3 rounded-full transition-colors ${
                    inputText.trim()
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>

          {/* Custom Blend Summary */}
          <div className='space-y-6'>
            {/* Formula */}
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <div className='flex items-center gap-2 mb-4'>
                <Beaker className='w-5 h-5 text-rose-600' />
                <div className='text-rose-900'>Custom Formula</div>
              </div>

              {/* Top Notes */}
              <div className='mb-4'>
                <div className='text-rose-700/70 mb-2'>Top Notes</div>
                <div className='space-y-2'>
                  {customBlend.topNotes.map((note) => (
                    <div key={note.name} className='space-y-1'>
                      <div className='flex items-center justify-between'>
                        <span className='text-rose-900'>{note.name}</span>
                        <div className='flex items-center gap-1'>
                          <button
                            onClick={() =>
                              adjustNoteIntensity('topNotes', note.name, -10)
                            }
                            className='p-1 hover:bg-rose-100 rounded'
                          >
                            <Minus className='w-3 h-3 text-rose-600' />
                          </button>
                          <span className='text-rose-700 min-w-[3rem] text-center'>
                            {note.intensity}%
                          </span>
                          <button
                            onClick={() =>
                              adjustNoteIntensity('topNotes', note.name, 10)
                            }
                            className='p-1 hover:bg-rose-100 rounded'
                          >
                            <Plus className='w-3 h-3 text-rose-600' />
                          </button>
                        </div>
                      </div>
                      <div className='h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-300'
                          style={{ width: `${note.intensity}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heart Notes */}
              <div className='mb-4'>
                <div className='text-rose-700/70 mb-2'>Heart Notes</div>
                <div className='space-y-2'>
                  {customBlend.heartNotes.map((note) => (
                    <div key={note.name} className='space-y-1'>
                      <div className='flex items-center justify-between'>
                        <span className='text-rose-900'>{note.name}</span>
                        <div className='flex items-center gap-1'>
                          <button
                            onClick={() =>
                              adjustNoteIntensity('heartNotes', note.name, -10)
                            }
                            className='p-1 hover:bg-rose-100 rounded'
                          >
                            <Minus className='w-3 h-3 text-rose-600' />
                          </button>
                          <span className='text-rose-700 min-w-[3rem] text-center'>
                            {note.intensity}%
                          </span>
                          <button
                            onClick={() =>
                              adjustNoteIntensity('heartNotes', note.name, 10)
                            }
                            className='p-1 hover:bg-rose-100 rounded'
                          >
                            <Plus className='w-3 h-3 text-rose-600' />
                          </button>
                        </div>
                      </div>
                      <div className='h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-300'
                          style={{ width: `${note.intensity}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Base Notes */}
              <div className='mb-4'>
                <div className='text-rose-700/70 mb-2'>Base Notes</div>
                <div className='space-y-2'>
                  {customBlend.baseNotes.map((note) => (
                    <div key={note.name} className='space-y-1'>
                      <div className='flex items-center justify-between'>
                        <span className='text-rose-900'>{note.name}</span>
                        <div className='flex items-center gap-1'>
                          <button
                            onClick={() =>
                              adjustNoteIntensity('baseNotes', note.name, -10)
                            }
                            className='p-1 hover:bg-rose-100 rounded'
                          >
                            <Minus className='w-3 h-3 text-rose-600' />
                          </button>
                          <span className='text-rose-700 min-w-[3rem] text-center'>
                            {note.intensity}%
                          </span>
                          <button
                            onClick={() =>
                              adjustNoteIntensity('baseNotes', note.name, 10)
                            }
                            className='p-1 hover:bg-rose-100 rounded'
                          >
                            <Plus className='w-3 h-3 text-rose-600' />
                          </button>
                        </div>
                      </div>
                      <div className='h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-gradient-to-r from-amber-600 to-rose-700 transition-all duration-300'
                          style={{ width: `${note.intensity}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall Intensity */}
              {/* <div className='pt-4 border-t border-gray-100'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-rose-900'>Overall Intensity</span>
                  <span className='text-rose-700'>
                    {customBlend.intensity}%
                  </span>
                </div>
                <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-300'
                    style={{ width: `${customBlend.intensity}%` }}
                  />
                </div>
              </div> */}
            </div>

            {/* Mood & Occasions */}
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <div className='mb-4'>
                <div className='text-rose-700/70 mb-2'>Mood</div>
                <div className='flex flex-wrap gap-2'>
                  {customBlend.mood.map((m) => (
                    <span
                      key={m}
                      className='px-3 py-1 bg-purple-50 text-purple-700 rounded-full'
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className='text-rose-700/70 mb-2'>Occasions</div>
                <div className='flex flex-wrap gap-2'>
                  {customBlend.occasions.map((o) => (
                    <span
                      key={o}
                      className='px-3 py-1 bg-amber-50 text-amber-700 rounded-full'
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
