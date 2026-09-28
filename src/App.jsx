import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Rotating cultural greetings
  const greetings = [
    "As-salamu alaykum",
    "Sat Sri Akaal",
    "Namaste",
    "Kem Cho"
  ];
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [greetingFade, setGreetingFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingFade(false);
      setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
        setGreetingFade(true);
      }, 350);
    }, 2800);

    return () => clearInterval(timer);
  }, [greetings.length]);

  // Persona toggle state ('need-help' or 'offer-help')
  const [persona, setPersona] = useState('need-help');

  // Language selector state
  const [currentLang, setCurrentLang] = useState('EN');

  // Interactive Community Needs Poll state
  const [votes, setVotes] = useState({
    'Halal & Desi Meal Prep / Tiffin': 384,
    'Post-Shaadi & Dawat Deep Cleanup': 295,
    'Elder Companion & Doctor Escort': 248,
    'Bilingual Tutoring & Quran Lessons': 182,
    'Trusted Home Handyman & Repairs': 310,
    'Home Henna & Parlour Services': 214
  });

  const [userVoted, setUserVoted] = useState(null);
  const [customNeed, setCustomNeed] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const handleVote = (category) => {
    if (userVoted === category) return;

    setVotes(prev => {
      const updated = { ...prev };
      if (userVoted && updated[userVoted]) {
        updated[userVoted] -= 1;
      }
      updated[category] += 1;
      return updated;
    });
    setUserVoted(category);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customNeed.trim()) return;

    setVotes(prev => ({
      ...prev,
      [customNeed.trim()]: 1
    }));
    setUserVoted(customNeed.trim());
    setCustomNeed('');
    setSuggestionSubmitted(true);
    setTimeout(() => setSuggestionSubmitted(false), 5000);
  };

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0) + 1250;

  return (
    <div className="site-wrapper">
      {/* Background ambient glow */}
      <img src="/images/bg-glow-top-20.svg" className="bg-ambient-top" alt="" aria-hidden="true" />

      {/* Modern Sticky Header */}
      <header className="site-header">
        <div className="container nav-container">
          <a href="#" className="brand-link">
            <img src="/images/node-39.png" alt="KaamDown Logo" className="brand-logo-img" />
            <div className="brand-text-group">
              <span className="brand-title">KaamDown</span>
              <span className="brand-subtitle">The Desi Community Exchange</span>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#mission" className="nav-link">Our Roots</a>
            <a href="#economic-engine" className="nav-link">Economic Engine</a>
            <a href="#scenarios" className="nav-link">Relief Scenarios</a>
            <a href="#community-pulse" className="nav-link">Community Pulse</a>
          </nav>

          <div className="nav-actions">
            <div className="lang-pill" title="Culturally Fluent Platform">
              <span>🌐</span>
              <span>{currentLang}</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <button 
                onClick={() => setCurrentLang(currentLang === 'EN' ? 'বাংলা' : currentLang === 'বাংলা' ? 'हिंदी' : currentLang === 'हिंदी' ? 'اردو' : 'EN')}
                style={{ fontSize: '0.78rem', color: 'var(--color-olive)', fontWeight: 700 }}
              >
                Switch
              </button>
            </div>
            <a href="#community-pulse" className="btn-primary">
              Join Community
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <div className="eyebrow-badge">
                  <span>🌿</span>
                  <span>The Digital Chowk for Our Diaspora</span>
                </div>

                {/* Rotating Cultural Greeting */}
                <div className="hero-greeting-container">
                  <span className="hero-greeting-badge">
                    <span className="greeting-wave" role="img" aria-label="wave">👋</span>
                    <span className={`hero-greeting-text ${greetingFade ? 'fade-in' : 'fade-out'}`}>
                      {greetings[greetingIndex]},
                    </span>
                    <span className="greeting-subtext">welcome to KaamDown</span>
                  </span>
                </div>

                <h1 className="hero-title">
                  Take a breath. <br />
                  <span className="brand-accent">KaamDown</span> — We've Got You Covered.
                </h1>

                <p className="hero-description">
                  Remember when finding trusted help was as easy as chatting after prayer or bumping into friends at the bazaar? 
                  We're bringing that trusted bond back to our people. Whether you're exhausted after a 300-person family function, 
                  need someone who speaks your mother tongue, or looking for honest work — KaamDown connects our community.
                </p>

                {/* Persona Switcher Card */}
                <div className="persona-toggle-card">
                  <div className="toggle-header">
                    <span className="toggle-label">What brings you here today?</span>
                    <div className="toggle-pills">
                      <button 
                        className={`toggle-btn ${persona === 'need-help' ? 'active' : ''}`}
                        onClick={() => setPersona('need-help')}
                      >
                        🤝 I Need Help
                      </button>
                      <button 
                        className={`toggle-btn ${persona === 'offer-help' ? 'active' : ''}`}
                        onClick={() => setPersona('offer-help')}
                      >
                        💼 I Offer Services
                      </button>
                    </div>
                  </div>

                  <div className="persona-message">
                    {persona === 'need-help' ? (
                      <p>✨ <strong>Calm Down.</strong> Post what you need anonymously. Get vetted community helpers who understand your culture and respect your home.</p>
                    ) : (
                      <p>💼 <strong>Kaam Down.</strong> Find dignified local gigs in your neighborhood. Keep 100% of what you earn with 0% platform tax.</p>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <div className="hero-cta-group">
                  <a href="#community-pulse" className="btn-primary">
                    {persona === 'need-help' ? 'Find Trusted Help' : 'Start Earning Locally'}
                  </a>
                  <a href="#mission" className="btn-outline">
                    See How It Works
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="hero-trust-row">
                  <div className="trust-item">
                    <span className="trust-icon">✓</span>
                    <span>100% Diaspora Owned</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-icon">✓</span>
                    <span>0% Middleman Commission</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-icon">✓</span>
                    <span>Language & Cultural Match</span>
                  </div>
                </div>
              </div>

              {/* Visual Column */}
              <div className="hero-visual-wrapper">
                <div className="hero-main-card">
                  <img 
                    src="/images/hero-image-60.png" 
                    alt="Desi community members connecting and helping each other" 
                    className="hero-img"
                  />
                  <div className="hero-badge-top">
                    <span>⭐</span>
                    <span>4.9 Community Trust Rating</span>
                  </div>
                  <div className="hero-badge-bottom">
                    <strong>The Trusted Handshake</strong>
                    <p>Contact details stay private until both sides agree to connect.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: From the Bazaar to the Screen (Story) */}
        <section id="mission" className="story-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Roots & Heritage</span>
              <h2 className="section-title">We used to lean on each other. Let's do it again.</h2>
              <p className="section-subtitle">
                In our homelands, community care was woven into daily life. KaamDown revives that tradition for our lives in the West.
              </p>
            </div>

            <div className="story-grid">
              <div className="story-card">
                <span className="story-era-pill era-past">The Past</span>
                <h3 className="story-card-title">The Market & Place of Worship</h3>
                <p className="story-card-body">
                  You met at the bazaar, the masjid, the gurdwara, or the mandir. You shared life updates over chai, and word of mouth 
                  was gold. If someone needed a cook for a dawat or an honest carpenter, you knew exactly who to call.
                </p>
              </div>

              <div className="story-card">
                <span className="story-era-pill era-present">The Present</span>
                <h3 className="story-card-title">Social Media Chaos & Strangers</h3>
                <p className="story-card-body">
                  Today, we are scattered across chaotic Facebook groups, awkward WhatsApp DMs, and faceless corporate apps that take 
                  huge cuts and have zero understanding of our family values and cultural boundaries.
                </p>
              </div>

              <div className="story-card featured">
                <span className="story-era-pill era-future">The Reconnection</span>
                <h3 className="story-card-title">KaamDown: The Digital Bazaar</h3>
                <p className="story-card-body">
                  A private, dignified exchange built exclusively for our diaspora. Fair pricing, culturally fluent neighbors, zero 
                  commission, and absolute respect for your household's privacy and dignity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Economic Engine */}
        <section id="economic-engine" className="economic-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Community Wealth</span>
              <h2 className="section-title">Powering Our Diaspora's Economic Engine</h2>
              <p className="section-subtitle">
                When money circulates within our people, we turn everyday needs into generational strength and social influence.
              </p>
            </div>

            <div className="economic-grid">
              <div className="economic-card">
                <div className="economic-img-wrapper">
                  <img src="/images/image-75.png" alt="Desi small business and helper" />
                </div>
                <div className="economic-card-content">
                  <span className="economic-tag">Circulate Wealth</span>
                  <h3 className="economic-card-title">Keep Dollars in the Family</h3>
                  <p className="economic-card-text">
                    When you hire a Desi caterer, tutor, tailor, or handyman, that money goes directly toward a neighborhood family's rent, 
                    groceries, and children's education.
                  </p>
                </div>
              </div>

              <div className="economic-card">
                <div className="economic-img-wrapper">
                  <img src="/images/image-82.png" alt="Transparent trusted handshake" />
                </div>
                <div className="economic-card-content">
                  <span className="economic-tag">0% Commission</span>
                  <h3 className="economic-card-title">Zero Corporate Extortion</h3>
                  <p className="economic-card-text">
                    Corporate gig apps take 20% to 30% of a worker's sweat. KaamDown takes 0% commission. The hardworking person providing 
                    the service keeps 100% of what they earn.
                  </p>
                </div>
              </div>

              <div className="economic-card">
                <div className="economic-img-wrapper">
                  <img src="/images/image-89.png" alt="Community growth and leadership" />
                </div>
                <div className="economic-card-content">
                  <span className="economic-tag">Elevate Our Voice</span>
                  <h3 className="economic-card-title">Grow Our Collective Footprint</h3>
                  <p className="economic-card-text">
                    Economic self-reliance transforms immigrant communities from quiet survival to influential societal leadership. 
                    Together, we build our community's future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Relatable Scenarios */}
        <section id="scenarios" className="scenarios-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Everyday Life in the Diaspora</span>
              <h2 className="section-title">Real Moments. Real Relief.</h2>
              <p className="section-subtitle">
                Whether you had a stressful function or need reliable support for your elders, KaamDown has your back.
              </p>
            </div>

            <div className="scenarios-grid">
              <div className="scenario-card">
                <div className="scenario-icon-bubble">🎉</div>
                <span className="scenario-tag">Post-Event Relief</span>
                <h3 className="scenario-title">The Post-Shaadi SOS</h3>
                <p className="scenario-text">
                  300 guests just left the hall, uncle's basement is packed with utensils, and the venue needs deep cleaning before 9 AM. 
                  Get trusted hands to help clean up with zero drama.
                </p>
              </div>

              <div className="scenario-card">
                <div className="scenario-icon-bubble">🍲</div>
                <span className="scenario-tag">Comfort Food</span>
                <h3 className="scenario-title">Ammi's Authentic Meal Prep</h3>
                <p className="scenario-text">
                  Work is demanding, but you crave real home-cooked dal, roti, and sabzi. Connect with vetted neighborhood aunties and cooks 
                  for authentic weekly meal prep.
                </p>
              </div>

              <div className="scenario-card">
                <div className="scenario-icon-bubble">📱</div>
                <span className="scenario-tag">Intergenerational</span>
                <h3 className="scenario-title">Tech & Paperwork Help</h3>
                <p className="scenario-text">
                  Pairing patient bilingual youth with community elders to help renew licenses, navigate smartphone settings, fill out paperwork, 
                  or setup home Wi-Fi.
                </p>
              </div>

              <div className="scenario-card">
                <div className="scenario-icon-bubble">🛠️</div>
                <span className="scenario-tag">Home Care</span>
                <h3 className="scenario-title">Trades Who Respect Your Home</h3>
                <p className="scenario-text">
                  Painters, plumbers, and handymen who take off their shoes at the front door, speak your parents' native language, and treat 
                  your household with dignity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Dignity, Pardah & Privacy */}
        <section className="values-section">
          <div className="container">
            <div className="values-grid">
              <div className="values-content">
                <div>
                  <span className="section-tag">Cultural Respect</span>
                  <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '16px' }}>
                    Designed for Our Values: Privacy, Respect & Dignity
                  </h2>
                  <p className="section-subtitle" style={{ textAlign: 'left' }}>
                    We understand cultural boundaries because we live them every day.
                  </p>
                </div>

                <div className="value-items">
                  <div className="value-row">
                    <div className="value-icon-box">🛡️</div>
                    <div className="value-text-group">
                      <h4>Pardah & Zero Unsolicited DMs</h4>
                      <p>Your phone number, exact address, and social profiles are never made public. You connect only after you approve a handshake.</p>
                    </div>
                  </div>

                  <div className="value-row">
                    <div className="value-icon-box">🤝</div>
                    <div className="value-text-group">
                      <h4>Gender-Comfortable Matching</h4>
                      <p>Need a female helper to assist your mother or aunt at home? Set preferred matching filters with total peace of mind.</p>
                    </div>
                  </div>

                  <div className="value-row">
                    <div className="value-icon-box">⭐</div>
                    <div className="value-text-group">
                      <h4>True Community Reputation</h4>
                      <p>No fake bots or paid reviews. Every rating comes from double-verified community members who stand behind their word.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="values-visual">
                <div className="values-image-card">
                  <img src="/images/preview-image-122.png" alt="Privacy-focused matching preview" />
                  <div className="values-caption-card">
                    <p>🔒 <strong>Safe & Discreet:</strong> General neighborhood location is shown. Exact street address is only unlocked when you confirm your booking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Interactive Community Needs Listening Board */}
        <section id="community-pulse" className="poll-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Co-Building KaamDown</span>
              <h2 className="section-title">What does your neighborhood need most right now?</h2>
              <p className="section-subtitle">
                KaamDown is built by the community, for the community. Cast your vote below to help prioritize which services we build out next!
              </p>
            </div>

            <div className="poll-board">
              <div className="poll-chips-container">
                {Object.entries(votes).map(([category, count]) => {
                  const isSelected = userVoted === category;
                  return (
                    <button
                      key={category}
                      className={`poll-chip-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleVote(category)}
                    >
                      <span>{isSelected ? '✓ ' : ''}{category}</span>
                      <span className="chip-vote-count">{count} votes</span>
                    </button>
                  );
                })}
              </div>

              <div className="poll-writein-box">
                <p style={{ fontWeight: 600, color: 'var(--color-text-title)' }}>
                  Don't see what you need? Tell us directly:
                </p>

                <form onSubmit={handleCustomSubmit} className="writein-form">
                  <input
                    type="text"
                    className="writein-input"
                    placeholder="e.g. Halal mover, Math tutor, Urdu speaker..."
                    value={customNeed}
                    onChange={(e) => setCustomNeed(e.target.value)}
                  />
                  <button type="submit" className="btn-terracotta">
                    Submit Need
                  </button>
                </form>

                {suggestionSubmitted && (
                  <div className="submitted-alert">
                    🎉 Shukriya! Your need has been added to our community roadmap.
                  </div>
                )}
              </div>

              <div className="poll-stats-row">
                <p>
                  Over <strong>{totalVotes.toLocaleString()}</strong> diaspora members have shared their voice across Greater NYC.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Mobile App Section */}
        <section className="app-section">
          <div className="container">
            <div className="app-grid">
              <div className="app-content">
                <div className="app-eyebrow">
                  <span>📱</span>
                  <span>Coming Soon to Mobile</span>
                </div>

                <h2 className="app-title">Take KaamDown With You Everywhere.</h2>

                <p className="app-desc">
                  Browse verified helpers, message securely without revealing your personal number, manage bookings, 
                  and keep our community thriving right from your phone.
                </p>

                <div className="app-store-buttons">
                  <div className="store-btn">
                    <img src="/images/icon-158.svg" alt="Apple" className="store-btn-icon" />
                    <div className="store-btn-text">
                      <span className="store-btn-small">Coming soon on</span>
                      <span className="store-btn-big">App Store</span>
                    </div>
                  </div>

                  <div className="store-btn">
                    <img src="/images/icon-166.svg" alt="Google Play" className="store-btn-icon" />
                    <div className="store-btn-text">
                      <span className="store-btn-small">Coming soon on</span>
                      <span className="store-btn-big">Google Play</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="app-visual-wrapper">
                <img src="/images/app-visual-172.png" alt="KaamDown Mobile App preview" className="app-visual-img" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top-grid">
            <div className="footer-brand-col">
              <h3 className="footer-brand-title">KaamDown</h3>
              <p className="footer-brand-desc">
                The economic engine and trusted exchange for the Desi diaspora. Reconnecting our community, preserving our culture, and keeping our wealth working for our families.
              </p>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Community</h4>
              <ul className="footer-links-list">
                <li><a href="#mission">Our Roots</a></li>
                <li><a href="#economic-engine">Economic Engine</a></li>
                <li><a href="#community-pulse">Community Pulse</a></li>
                <li><a href="#">Neighborhood Guidelines</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Services</h4>
              <ul className="footer-links-list">
                <li><a href="#scenarios">Post-Event Cleanup</a></li>
                <li><a href="#scenarios">Desi Meal Prep</a></li>
                <li><a href="#scenarios">Elder Companion</a></li>
                <li><a href="#scenarios">Home Handyman</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Trust & Privacy</h4>
              <ul className="footer-links-list">
                <li><a href="#">Pardah & Privacy Policy</a></li>
                <li><a href="#">Zero-Commission Guarantee</a></li>
                <li><a href="#">Terms of Handshake</a></li>
                <li><a href="#">Contact Community Team</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} KaamDown LLC. Crafted with care for the diaspora. All rights reserved.</p>
            <p>Built for NYC & Beyond • বাংলা • हिंदी • اردو • English</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
