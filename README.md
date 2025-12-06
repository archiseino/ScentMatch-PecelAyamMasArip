# ScentMatch - Perfume Recommendation & Co-Creation

A modern web application for personalized perfume recommendations and AI-powered fragrance co-creation. Built with React, Vite, and Gemini AI.

## Features

- **Personalized Recommendations**: Answer preference questions (gender, intensity, notes, occasions, price) to get AI-matched perfume recommendations from our database.
- **AI-Powered Co-Creation**: Refine your selected perfume with an interactive chatbot. Adjust fragrance notes, intensity, mood, and occasions with real-time AI suggestions.
- **Supabase Integration**: Fetch perfume data with advanced filtering (gender, longevity, activity, price tier, notes matching).

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini 2.5 Flash
- **Routing**: React Router v6
- **State Management**: React Context API + localStorage
- **Markdown**: React Markdown for AI responses

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route pages (Landing, Onboarding, Results, Chatbot)
├── routes/             # AppRouter with protected routes
├── context/            # AppContext for global state
├── utils/              # Supabase client, helpers
├── styles/             # Global CSS
└── App.jsx             # Root component
```

## Setup & Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/archiseino/ScentMatch-PecelAyamMasArip.git
   cd MasArip-Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** in project root

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_API_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start dev server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## User Flow

1. **Landing Page** → User clicks "Get Started"
2. **Onboarding** → Answer preference questions (gender, intensity, notes, occasions, price)
3. **Recommendation Results** → View AI-matched perfumes from Supabase
4. **Fragrance Co-Creation** → Chat with AI to refine selected perfume's notes and intensity
5. **Export Brief** → Download customized fragrance brief (optional)

## Best Practices Applied

- ✅ Component composition with clear separation of concerns
- ✅ Protected routes that redirect to home on refresh without data
- ✅ Persistent state with localStorage
- ✅ Context API for global state (no prop drilling)
- ✅ useNavigate() for programmatic routing
- ✅ Structured JSON for AI-UI integration
- ✅ Error handling with fallbacks
- ✅ Environment variables for sensitive data

## Future Enhancements

- [ ] User authentication with Supabase Auth
- [ ] Save custom blends to user profile
- [ ] Share fragrance recommendations
- [ ] Undo/redo for customization history
- [ ] Advanced filtering with multiple notes
- [ ] Mobile app with React Native

## License

MIT

## Contact

**Archiseino** - [@archiseino](https://github.com/archiseino)
