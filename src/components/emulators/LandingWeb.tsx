const css = `
.mesita-landing {
  --blush: #fdf3f3;
  --blush-soft: #fbe9e9;
  --cream: #fff8f5;
  --pink: #ee3c6a;
  --pink-bright: #f74d7c;
  --pink-deep: #d12a58;
  --red-deep: #8a1b3b;
  --ink: #2a0d18;
  --ink-soft: #6b3848;
  --line-light: rgba(138, 27, 59, 0.12);
  --line-soft: rgba(255, 255, 255, 0.18);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--cream);
  color: var(--ink);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.mesita-landing *, .mesita-landing *::before, .mesita-landing *::after { box-sizing: border-box; margin: 0; padding: 0; }
.mesita-landing .container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }

.mesita-landing nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255, 248, 245, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--line-light);
}
.mesita-landing nav .container {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 32px;
}
.mesita-landing .logo {
  font-family: 'Georgia', serif;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.mesita-landing .logo span { color: var(--pink); }
.mesita-landing .nav-links { display: flex; gap: 32px; align-items: center; }
.mesita-landing .nav-links a {
  color: var(--ink); text-decoration: none; font-size: 14px;
  opacity: 0.7; transition: opacity 0.2s;
}
.mesita-landing .nav-links a:hover { opacity: 1; }
.mesita-landing .btn {
  display: inline-block; padding: 12px 24px; border-radius: 100px;
  font-size: 14px; font-weight: 500; text-decoration: none;
  transition: all 0.2s; cursor: pointer; border: none;
}
.mesita-landing .btn-primary { background: var(--pink); color: white; }
.mesita-landing .btn-primary:hover { background: var(--pink-deep); transform: translateY(-1px); }
.mesita-landing .btn-secondary {
  background: transparent; color: var(--ink); border: 1px solid var(--line-light);
}
.mesita-landing .btn-secondary:hover { border-color: var(--pink); color: var(--pink); }
.mesita-landing .btn-on-pink { background: white; color: var(--pink-deep); }
.mesita-landing .btn-on-pink:hover { background: var(--cream); transform: translateY(-1px); }
.mesita-landing .btn-ghost-on-pink {
  background: transparent; color: white; border: 1px solid var(--line-soft);
}
.mesita-landing .btn-ghost-on-pink:hover { background: rgba(255,255,255,0.1); }

.mesita-landing .hero {
  padding: 140px 0 120px; position: relative; overflow: hidden; background: var(--blush);
}
.mesita-landing .hero::before {
  content: ''; position: absolute; top: 30%; left: 50%;
  width: 900px; height: 900px;
  background: radial-gradient(circle, rgba(238, 60, 106, 0.18) 0%, transparent 65%);
  transform: translateX(-50%); pointer-events: none;
}
.mesita-landing .hero-content { position: relative; text-align: center; max-width: 900px; margin: 0 auto; }
.mesita-landing .eyebrow {
  display: inline-block; font-size: 12px; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--pink-deep); margin-bottom: 24px;
  padding: 8px 16px; border: 1px solid var(--line-light);
  border-radius: 100px; background: white;
}
.mesita-landing .hero h1 {
  font-family: 'Georgia', serif; font-size: clamp(40px, 6.5vw, 78px);
  line-height: 1.05; letter-spacing: -0.03em; font-weight: 600;
  margin-bottom: 32px; color: var(--ink);
}
.mesita-landing .hero h1 em {
  font-style: italic;
  background: linear-gradient(135deg, var(--pink), var(--red-deep));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.mesita-landing .hero p.lead {
  font-size: 20px; color: var(--ink-soft); max-width: 640px; margin: 0 auto 48px;
}
.mesita-landing .hero-cta { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

.mesita-landing section { padding: 100px 0; }
.mesita-landing .section-title {
  font-family: 'Georgia', serif; font-size: clamp(32px, 4.2vw, 52px);
  letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 24px; font-weight: 600;
}
.mesita-landing .section-eyebrow {
  font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--pink-deep); margin-bottom: 16px; font-weight: 600;
}
.mesita-landing .section-intro {
  font-size: 18px; color: var(--ink-soft); max-width: 640px; margin-bottom: 64px;
}

.mesita-landing .guests {
  background: white; border-top: 1px solid var(--line-light); border-bottom: 1px solid var(--line-light);
}
.mesita-landing .feature-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;
}
.mesita-landing .feature-card {
  padding: 40px 32px; border: 1px solid var(--line-light);
  border-radius: 16px; background: var(--blush); transition: all 0.3s;
}
.mesita-landing .feature-card:hover {
  border-color: var(--pink); background: white; transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(238, 60, 106, 0.12);
}
.mesita-landing .feature-num {
  font-family: 'Georgia', serif; font-size: 14px; color: var(--pink);
  margin-bottom: 16px; letter-spacing: 0.1em; font-weight: 600;
}
.mesita-landing .feature-card h3 {
  font-family: 'Georgia', serif; font-size: 24px; font-weight: 600;
  margin-bottom: 16px; letter-spacing: -0.01em; color: var(--ink);
}
.mesita-landing .feature-card p { color: var(--ink-soft); font-size: 15px; }

.mesita-landing .venues {
  background: linear-gradient(135deg, var(--pink) 0%, var(--pink-deep) 60%, var(--red-deep) 100%);
  color: white;
}
.mesita-landing .venues .section-eyebrow { color: rgba(255, 255, 255, 0.9); }
.mesita-landing .venues .section-title { color: white; }
.mesita-landing .venues .section-intro { color: rgba(255, 255, 255, 0.85); }
.mesita-landing .venues .feature-card {
  background: rgba(255, 255, 255, 0.08); border-color: var(--line-soft); backdrop-filter: blur(10px);
}
.mesita-landing .venues .feature-card:hover {
  background: rgba(255, 255, 255, 0.16); border-color: white;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}
.mesita-landing .venues .feature-card h3 { color: white; }
.mesita-landing .venues .feature-card p { color: rgba(255, 255, 255, 0.85); }
.mesita-landing .venues .feature-num { color: rgba(255, 255, 255, 0.9); }
.mesita-landing .venues-cta {
  margin-top: 72px; padding: 56px; background: white; color: var(--ink);
  border-radius: 24px; text-align: center;
}
.mesita-landing .venues-cta h3 {
  font-family: 'Georgia', serif; font-size: 32px; margin-bottom: 16px;
  letter-spacing: -0.02em; color: var(--ink);
}
.mesita-landing .venues-cta p { color: var(--ink-soft); margin-bottom: 32px; font-size: 17px; }

.mesita-landing .tiers { background: var(--blush); }
.mesita-landing .tiers-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-top: 24px;
}
.mesita-landing .tier {
  padding: 40px 32px; border-radius: 16px; text-align: center;
  border: 1px solid var(--line-light); background: white; transition: all 0.3s;
}
.mesita-landing .tier:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(238, 60, 106, 0.12); }
.mesita-landing .tier-bronze { background: linear-gradient(180deg, #fde4d6 0%, #ffffff 100%); }
.mesita-landing .tier-silver { background: linear-gradient(180deg, #fae0e6 0%, #ffffff 100%); }
.mesita-landing .tier-gold { background: linear-gradient(180deg, #ffd4dc 0%, #ffffff 100%); border-color: var(--pink); }
.mesita-landing .tier-diamond { background: linear-gradient(180deg, #f8c5d4 0%, #ffffff 100%); }
.mesita-landing .tier-name {
  font-family: 'Georgia', serif; font-size: 24px; font-weight: 600;
  margin-bottom: 12px; letter-spacing: 0.02em;
}
.mesita-landing .tier-bronze .tier-name { color: #b85730; }
.mesita-landing .tier-silver .tier-name { color: #b14a64; }
.mesita-landing .tier-gold .tier-name { color: var(--pink-deep); }
.mesita-landing .tier-diamond .tier-name { color: var(--red-deep); }
.mesita-landing .tier-desc { font-size: 14px; color: var(--ink-soft); line-height: 1.5; }

.mesita-landing .payment {
  background: white; text-align: center;
  border-top: 1px solid var(--line-light); border-bottom: 1px solid var(--line-light);
}
.mesita-landing .payment .section-title { max-width: 800px; margin: 0 auto 32px; }
.mesita-landing .payment p.body {
  max-width: 700px; margin: 0 auto 24px; font-size: 17px; color: var(--ink-soft);
}
.mesita-landing .payment-tag {
  display: inline-block; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase;
  color: white; background: var(--pink); padding: 12px 24px; border-radius: 100px;
  margin-top: 32px; font-weight: 600;
}

.mesita-landing .engagement { background: var(--blush); }
.mesita-landing .engagement-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px;
}
.mesita-landing .engagement-card { padding: 40px 0; border-top: 2px solid var(--pink); }
.mesita-landing .engagement-card h4 {
  font-family: 'Georgia', serif; font-size: 22px; margin-bottom: 16px; color: var(--pink-deep);
}
.mesita-landing .engagement-card p { color: var(--ink-soft); font-size: 15px; }

.mesita-landing .comparison { background: var(--ink); color: var(--cream); text-align: center; }
.mesita-landing .comparison .section-eyebrow { color: var(--pink-bright); }
.mesita-landing .comparison .section-title { max-width: 800px; margin: 0 auto 48px; color: white; }
.mesita-landing .compare-row { max-width: 700px; margin: 0 auto; text-align: left; }
.mesita-landing .compare-row p {
  font-size: 18px; padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.7);
}
.mesita-landing .compare-row p strong { color: white; font-weight: 600; }
.mesita-landing .comparison .verdict {
  font-family: 'Georgia', serif; font-size: 26px; line-height: 1.4;
  margin: 48px auto 0; max-width: 800px; color: white; letter-spacing: -0.01em;
}
.mesita-landing .comparison .verdict em { color: var(--pink-bright); font-style: italic; }

.mesita-landing .footer-cta { padding: 100px 0; text-align: center; background: var(--blush); }
.mesita-landing .footer-cta h2 {
  font-family: 'Georgia', serif; font-size: clamp(36px, 5vw, 60px);
  letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 24px; color: var(--ink);
}
.mesita-landing .footer-cta h2 em {
  background: linear-gradient(135deg, var(--pink), var(--red-deep));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; font-style: italic;
}
.mesita-landing .cta-cards {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px; margin: 64px auto 0; max-width: 900px;
}
.mesita-landing .cta-card { padding: 48px 32px; border-radius: 20px; text-align: left; }
.mesita-landing .cta-card-guests { background: white; border: 1px solid var(--line-light); }
.mesita-landing .cta-card-venues {
  background: linear-gradient(135deg, var(--pink), var(--pink-deep)); color: white;
}
.mesita-landing .cta-card h3 { font-family: 'Georgia', serif; font-size: 28px; margin-bottom: 16px; }
.mesita-landing .cta-card-guests h3 { color: var(--ink); }
.mesita-landing .cta-card-venues h3 { color: white; }
.mesita-landing .cta-card p { margin-bottom: 24px; }
.mesita-landing .cta-card-guests p { color: var(--ink-soft); }
.mesita-landing .cta-card-venues p { color: rgba(255, 255, 255, 0.9); }
.mesita-landing .cta-card-buttons { display: flex; gap: 12px; flex-wrap: wrap; }

.mesita-landing footer {
  padding: 48px 0; border-top: 1px solid var(--line-light);
  text-align: center; color: var(--ink-soft); font-size: 14px; background: var(--cream);
}
.mesita-landing footer .logo { font-size: 20px; margin-bottom: 12px; display: inline-block; }

@media (max-width: 900px) {
  .mesita-landing section { padding: 70px 0; }
  .mesita-landing .hero { padding: 100px 0 70px; }
  .mesita-landing .nav-links a:not(.btn) { display: none; }
  .mesita-landing .venues-cta { padding: 40px 24px; }
  .mesita-landing .comparison .verdict { font-size: 20px; }
}
`;

export function LandingWeb() {
  return (
    <div className="mesita-landing">
      <style>{css}</style>

      <nav>
        <div className="container">
          <div className="logo">mesita<span>.</span></div>
          <div className="nav-links">
            <a href="#guests">For Guests</a>
            <a href="#venues">For Venues</a>
            <a href="#tiers">Tiers</a>
            <a href="#download" className="btn btn-primary">Get the app</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-content">
          <span className="eyebrow">Restaurants · Cafés · Nightlife</span>
          <h1>Some guests are <em>part of the product.</em></h1>
          <p className="lead">
            Mesita turns presence, influence, and social magnetism into spendable value — for the guests who fill the room, and the venues that want them in it.
          </p>
          <div className="hero-cta">
            <a href="#download" className="btn btn-primary">Get the app</a>
            <a href="#venues" className="btn btn-secondary">List your venue</a>
          </div>
        </div>
      </header>

      <section id="guests" className="guests">
        <div className="container">
          <p className="section-eyebrow">For Guests</p>
          <h2 className="section-title">The smartest way to decide<br />where to go out tonight.</h2>
          <p className="section-intro">
            Four ways to discover venues — a swipe feed with AI vibe tags, a map with cashback badges, a filterable catalog, and a conversational AI planner. All inside one app, or on WhatsApp with no download required.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <p className="feature-num">01 / Intelligence</p>
              <h3>Experience Intelligence</h3>
              <p>Mesita combines its own reviews, Google and Facebook ratings, real price signals, where Bronze, Silver, Gold, and Diamond guests are going right now, your friends' activity, and venue-tagged Instagram stories — into one discovery layer that's far smarter than a review app.</p>
            </div>
            <div className="feature-card">
              <p className="feature-num">02 / Reservations</p>
              <h3>Table Reservations</h3>
              <p>One tap, at any venue, affiliated or not. Our AI voice agent calls the restaurant and books your table in a natural conversation, exactly as a person would. You get the confirmation on your phone seconds later.</p>
            </div>
            <div className="feature-card">
              <p className="feature-num">03 / Rewards</p>
              <h3>Cashback Coupons</h3>
              <p>Carry a prepaid balance with bonus credits, auto-applied as a discount on your next visit. Earn cashback at any Mesita venue just by showing your QR — and an extra bonus for posting an Instagram story tagging the venue.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="venues" className="venues">
        <div className="container">
          <p className="section-eyebrow">For Venues</p>
          <h2 className="section-title">Stop paying for foot traffic.<br />Start choosing your guests.</h2>
          <p className="section-intro">
            Mesita is a targeted guest-acquisition channel, not a passive listing. Compete directly for high-intent guests who are deciding where to go out tonight — and reward the ones who actually move the needle.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <p className="feature-num">01</p>
              <h3>Get Discovered &amp; Win Customers</h3>
              <p>A one-time "Welcome" cashback offer, shown against the live pool of nearby guests who've never visited. Engineered to convert first-timers into regulars.</p>
            </div>
            <div className="feature-card">
              <p className="feature-num">02</p>
              <h3>Win the Magnetic &amp; Rich Guests</h3>
              <p>Set separate cashback rates for each tier — Bronze, Silver, Gold, Diamond. Each rate comes with an estimated lift in weekly visits, so you know exactly what you're buying.</p>
            </div>
            <div className="feature-card">
              <p className="feature-num">03</p>
              <h3>Automated Instagram Stories</h3>
              <p>Pay a small bonus for verified guest stories tagging your venue. An AI bot detects mentions and tags and approves automatically. Real visits become real exposure.</p>
            </div>
            <div className="feature-card">
              <p className="feature-num">04</p>
              <h3>Easier Reservations</h3>
              <p>Every booking includes advance visibility into group size and guest tier. Use reservations strategically to fill slow days and off-peak hours.</p>
            </div>
            <div className="feature-card">
              <p className="feature-num">05</p>
              <h3>Marketing Intelligence</h3>
              <p>One dashboard for profile views, influenced spend, cashback paid, full conversion funnel, ROAS, average ticket, repeat rate. An AI copilot writes your next campaign in one click.</p>
            </div>
            <div className="feature-card">
              <p className="feature-num">✦</p>
              <h3>Ten minutes to set up.</h3>
              <p>No hardware. No POS integration. No staff training. Costs nothing until it pays off. Just open a browser.</p>
            </div>
          </div>

          <div className="venues-cta">
            <h3>Ready to fill your room with the right people?</h3>
            <p>Open your venue dashboard. Setup takes about ten minutes.</p>
            <a href="#" className="btn btn-primary">Open manager.mesita.app</a>
          </div>
        </div>
      </section>

      <section id="tiers" className="tiers">
        <div className="container">
          <p className="section-eyebrow">Guest Tiers</p>
          <h2 className="section-title">Your social capital,<br />made spendable.</h2>
          <p className="section-intro">
            Mesita segments guests into four tiers — automatically, based on real behavior and digital footprint. Higher tiers unlock richer cashback and priority access. The guests who shape the room get treated like it.
          </p>
          <div className="tiers-grid">
            <div className="tier tier-bronze">
              <p className="tier-name">Bronze</p>
              <p className="tier-desc">Where everyone starts.<br />0–2 visits.</p>
            </div>
            <div className="tier tier-silver">
              <p className="tier-name">Silver</p>
              <p className="tier-desc">~1k+ followers.<br />3–6 visits.</p>
            </div>
            <div className="tier tier-gold">
              <p className="tier-name">Gold</p>
              <p className="tier-desc">~5k+ followers.<br />7–19 visits.</p>
            </div>
            <div className="tier tier-diamond">
              <p className="tier-name">Diamond</p>
              <p className="tier-desc">Invite-only. 20k+ followers and meaningful local influence. Manual review for models, chefs, press, and founders.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="payment">
        <div className="container">
          <p className="section-eyebrow">How Payment Works</p>
          <h2 className="section-title">Nothing changes during your meal.</h2>
          <p className="body">
            At checkout, you ask for the bill and show your QR. The waiter scans it with their own phone — no new hardware, no POS integration. You pay through a secure Stripe link, and cashback lands in your Mesita balance automatically.
          </p>
          <span className="payment-tag">Card payments only · Built for full-service</span>
        </div>
      </section>

      <section className="engagement">
        <div className="container">
          <p className="section-eyebrow">Beyond Cashback</p>
          <h2 className="section-title">The layers that<br />make it habit-forming.</h2>
          <p className="section-intro">
            Communities, gamification, and sharing — built into the core product, not bolted on.
          </p>
          <div className="engagement-grid">
            <div className="engagement-card">
              <h4>Communities</h4>
              <p>Verify your school or organization email to unlock venue-specific perks. Tec students fill San Pedro rooftops on Thursdays. Stanford alumni gather at Polanco wine bars.</p>
            </div>
            <div className="engagement-card">
              <h4>Gamification</h4>
              <p>Levels and XP. Named progression — Tastemaker, Connoisseur. Weekly streaks, city leaderboards, and regional explorer badges that turn going out into a collectible practice.</p>
            </div>
            <div className="engagement-card">
              <h4>Sharing</h4>
              <p>Send a friend $100 MXN in credit. Partner with us as a creator — custom codes, revenue share, and an equity path. Refer a venue and set them up in ten minutes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison">
        <div className="container">
          <p className="section-eyebrow">Why Mesita</p>
          <h2 className="section-title">Other platforms do parts of this.<br />None of them do what we do.</h2>
          <div className="compare-row">
            <p><strong>OpenTable</strong> books the table.</p>
            <p><strong>Yelp</strong> shows the reviews.</p>
            <p><strong>Toast</strong> runs the loyalty program.</p>
          </div>
          <p className="verdict">
            Mesita does something none of them do: it treats guests as a <em>curated asset class</em> — and turns who walks through your door into a lever you can actually pull.
          </p>
        </div>
      </section>

      <section id="download" className="footer-cta">
        <div className="container">
          <h2>Two sides.<br /><em>One table.</em></h2>
          <div className="cta-cards">
            <div className="cta-card cta-card-guests">
              <h3>For guests</h3>
              <p>Find the right place tonight. Book the table in one tap. Earn cashback every time you walk in.</p>
              <div className="cta-card-buttons">
                <a href="#" className="btn btn-primary">Download the app</a>
                <a href="#" className="btn btn-secondary">Try on WhatsApp</a>
              </div>
            </div>
            <div className="cta-card cta-card-venues">
              <h3>For venues</h3>
              <p>Ten minutes to set up. No hardware. No commitment. Pay only when it works.</p>
              <div className="cta-card-buttons">
                <a href="#" className="btn btn-on-pink">Open dashboard</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="logo">mesita<span>.</span></div>
          <p>Built in Monterrey · © 2026 Mesita</p>
        </div>
      </footer>
    </div>
  );
}
