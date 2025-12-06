import Hero from '../components/Hero';
import Header from '../components/Header';
import Features from '../components/Features';

export default function LandingPage({ onGetStarted }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50'>
      {/* Header */}
      <Header Title='ScentMatch' />
      <hr className='my-0' />

      {/* Hero Section */}
      <Hero onGetStarted={onGetStarted} />
      <hr className='my-0' />

      {/* Features Section */}
      <Features />
    </div>
  );
}
