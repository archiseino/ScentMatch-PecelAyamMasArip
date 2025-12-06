// App.js (Standalone React JSX App)
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import './App.css'; // Add some basic CSS for clarity

// const API_BASE_URL = 'http://localhost:3000/api';

// // --- Dummy Perfume List (Simulating an initial Supabase fetch) ---
// const PERFUME_LIST = [
//   { id: 1, name: 'Coastal Breeze' },
//   { id: 2, name: 'Velvet Night' },
// ];

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [sessionId, setSessionId] = useState(null);
//   const [selectedPerfumeId, setSelectedPerfumeId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // --- Start Chat Session ---
//   const startChat = async (perfumeId) => {
//     setLoading(true);
//     setSelectedPerfumeId(perfumeId);
//     setMessages([]);

//     try {
//       // Call the backend to initialize the Gemini chat session
//       const response = await axios.post(`${API_BASE_URL}/start-chat`, {
//         perfumeId,
//       });

//       const initialMsg = response.data.initialMessage;
//       setSessionId(response.data.sessionId);
//       setMessages([{ text: initialMsg, sender: 'AI' }]);
//     } catch (error) {
//       console.error('Failed to start chat:', error);
//       setMessages([
//         { text: 'Error starting the perfumer session.', sender: 'System' },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Send Message ---
//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || !sessionId || loading) return;

//     const userMessage = input.trim();
//     const newMessage = { text: userMessage, sender: 'User' };

//     setMessages((prev) => [...prev, newMessage]);
//     setInput('');
//     setLoading(true);

//     console.log(sessionId);
//     console.log(userMessage);

//     try {
//       // Call the backend to send the message using the stored sessionId
//       const response = await axios.post(`${API_BASE_URL}/send-message`, {
//         sessionId: sessionId,
//         message: userMessage,
//       });

//       // The AI's response is appended
//       setMessages((prev) => [
//         ...prev,
//         { text: response.data.text, sender: 'AI' },
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           text: 'Connection error with the Master Perfumer.',
//           sender: 'System',
//         },
//       ]);
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Rendering ---
//   if (!selectedPerfumeId) {
//     return (
//       <div className='container selection-screen'>
//         <h2>Welcome to the Co-Creation Lab</h2>
//         <p>First, select a base perfume to modify:</p>
//         <div className='perfume-list'>
//           {PERFUME_LIST.map((p) => (
//             <button
//               key={p.id}
//               onClick={() => startChat(p.id)}
//               disabled={loading}
//             >
//               {p.name}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='container chat-screen'>
//       <h2>
//         Master Perfumer Assistant:{' '}
//         {PERFUME_LIST.find((p) => p.id === selectedPerfumeId)?.name}
//       </h2>

//       <div className='chat-window'>
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
//             <p>
//               <strong>{msg.sender}:</strong>{' '}
//               <ReactMarkdown>{msg.text}</ReactMarkdown>
//             </p>
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSend} className='input-area'>
//         <input
//           type='text'
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder={
//             loading
//               ? 'Waiting for the Perfumer...'
//               : "Suggest a modification (e.g., 'Make it warmer')..."
//           }
//           disabled={loading || !sessionId}
//         />
//         <button type='submit' disabled={loading || !sessionId}>
//           {loading ? 'Sending...' : 'Send'}
//         </button>
//       </form>
//       <button
//         className='restart-btn'
//         onClick={() => setSelectedPerfumeId(null)}
//       >
//         <small>Restart Session</small>
//       </button>
//     </div>
//   );
// }

// App.js (Standalone React MWE for Layer 1 Onboarding)

const API_BASE_URL = 'http://localhost:3000/api';

// --- QUESTIONNAIRE DATA STRUCTURE ---
const QUESTION_DATA = [
  {
    key: 'gender',
    title: '1. Who is the scent primarily for?',
    options: ['For Men', 'For Women', 'Unisex'],
  },
  {
    key: 'season',
    title: '2. What season do you prefer?',
    options: ['Spring', 'Summer', 'Autumn', 'Winter'],
  },
  {
    key: 'activity',
    title: '3. What is the primary occasion?',
    options: [
      'Casual Daytime/Office',
      'Evening/Date Night',
      'Active/Sport',
      'Formal Events',
    ],
  },
  {
    key: 'price_tier',
    title: '4. What is your general price preference?',
    options: ['Budget-Friendly', 'Mid-Range', 'Designer/Luxury'],
  },
  {
    key: 'notes',
    title: '5. Select your top 3 scent families.',
    type: 'multi-select',
    options: [
      'Citrus',
      'Floral',
      'Woody',
      'Spicy',
      'Fresh/Aquatic',
      'Sweet/Gourmand',
    ],
  },
];

function App() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- State Management ---
  const currentQuestion = QUESTION_DATA[step];
  const currentAnswer =
    profile[currentQuestion?.key] ||
    (currentQuestion?.type === 'multi-select' ? [] : '');

  const handleAnswer = (answer) => {
    const key = currentQuestion.key;

    if (currentQuestion.type === 'multi-select') {
      let newNotes = [...currentAnswer];
      if (newNotes.includes(answer)) {
        newNotes = newNotes.filter((n) => n !== answer); // Deselect
      } else if (newNotes.length < 3) {
        newNotes.push(answer); // Select (max 3)
      }
      setProfile((prev) => ({ ...prev, [key]: newNotes }));
    } else {
      setProfile((prev) => ({ ...prev, [key]: answer }));
      // Automatically advance to the next step on single select
      setTimeout(() => nextStep(), 150);
    }
  };

  const nextStep = () => {
    if (step < QUESTION_DATA.length - 1) {
      setStep(step + 1);
    } else {
      fetchRecommendations(); // Submit on the last step
    }
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get-recommendations`,
        profile
      );
      setRecommendations(response.data);
      setStep(QUESTION_DATA.length); // Move to Results page
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      alert('Failed to get recommendations. Check console/backend.');
    } finally {
      setLoading(false);
    }
  };

  // --- Renderers ---

  const renderQuestionnaire = () => (
    <div className='card'>
      <h3>{currentQuestion.title}</h3>
      <div className='options-grid'>
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className={currentAnswer.includes(option) ? 'selected' : ''}
            disabled={loading}
          >
            {option}
            {currentQuestion.type === 'multi-select' &&
              currentAnswer.includes(option) &&
              ' (Selected)'}
          </button>
        ))}
      </div>

      {currentQuestion.type === 'multi-select' && (
        <div className='navigation-footer'>
          <p>Selected: {currentAnswer.length} / 3</p>
          <button
            onClick={nextStep}
            disabled={loading || currentAnswer.length === 0}
          >
            {step === QUESTION_DATA.length - 1 ? 'Find My Scents' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );

  const renderResults = () => (
    <div className='results-container'>
      <h2>🎉 Your Top 3 Recommendations</h2>
      <div className='ai-explanation'>
        <h4>Insight from Our AI Fragrance Expert:</h4>
        <p>{recommendations.aiExplanation}</p>
        <p className='profile-summary'>
          Based on: **
          {/* FIX: Use optional chaining (?.) and provide a default empty array ([]) 
                    to safely call .join() */}
          {recommendations.userProfile.notes?.join(', ') || 'N/A Notes'}**, **
          {recommendations.userProfile.season}**.
        </p>
      </div>

      <div className='recommendation-list'>
        {recommendations.recommendations.map((p) => (
          <div key={p.id} className='perfume-card'>
            <h5>
              {p.name} by {p.brand}
            </h5>
            <p className='notes'>Notes: {p.all_notes.join(', ')}</p>
            <p className='accord'>{p.mainAccord}</p>
            {/* Here you could add a button to start Layer 2 Co-Creation: */}
            {/* <button onClick={() => startCoCreation(p)}>Co-Create This Scent</button> */}
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setStep(0);
          setProfile({});
          setRecommendations(null);
        }}
        className='restart-btn'
      >
        Start Over
      </button>
    </div>
  );

  // --- Main App Render ---
  return (
    <div className='app-container'>
      <h1>Fragrance Recommendation Engine</h1>
      {loading && <div className='loader'>Loading...</div>}

      {step < QUESTION_DATA.length &&
        !recommendations &&
        !loading &&
        renderQuestionnaire()}

      {step === QUESTION_DATA.length && recommendations && renderResults()}
    </div>
  );
}

export default App;
