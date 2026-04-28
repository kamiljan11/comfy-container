import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  Hammer, FlaskConical, Waves, Map,
  Mail, Linkedin, Handshake,
} from "lucide-react";
import { JourneyPath, InkPine } from "@/components/Ornaments";

export const Route = createFileRoute("/")({
  component: Index,
});

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; }
      const t = e.target as HTMLElement;
      const hover = !!t.closest("a, button, input, textarea, .project-row, .value-card, .service-item, .contact-link, .timeline-item");
      document.body.classList.toggle("cursor-hover", hover);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (<>
    <div ref={ring} className="cursor-ring" />
    <div ref={dot} className="cursor-dot" />
  </>);
}

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const projects = [
  {
    href: "https://masgroup.is",
    logo: "/logos/masgroup.png",
    title: "MAS Group Iceland",
    desc: "Parent company for B2B automotive, print, rental, and logistics operations across Iceland.",
    domain: "masgroup.is",
    subs: [
      { name: "MAS Parts", href: "https://masparts.is" },
      { name: "MAS Prints", href: "https://masprints.is" },
      { name: "Mountain Car Rental", href: "https://mountaincarrental.is" },
      { name: "MAS Logistics", href: "https://maslogistics.is" },
    ],
  },
  {
    href: "https://flyt.is",
    logo: "/logos/flyt.png",
    title: "Flyt",
    desc: "Iceland's freight marketplace. Compare quotes from verified transport providers.",
    domain: "flyt.is",
  },
  {
    href: "https://quickfix.is",
    logo: "/logos/quickfix.png",
    title: "QuickFix",
    desc: "Polish handyman services in Reykjavík. Fast, reliable home repairs.",
    domain: "quickfix.is",
  },
  {
    href: "https://reykjawwwik.is",
    wordmark: "Rwww",
    title: "Reykjawwwik.is",
    desc: "Productized agency for Icelandic SMBs. Starts with a managed website, expands into ads, content, and AI automation as the business grows.",
    domain: "reykjawwwik.is",
  },
  {
    href: "https://myspiritway.org",
    logo: "/logos/myspiritway.png",
    title: "MySpiritWay",
    desc: "Educational platform — \"Simplified Practical Spirituality.\" 100+ page guidebook, 7-Ways framework, Activation Sessions. Mentorship for spiritual entrepreneurs.",
    domain: "myspiritway.org",
  },
  {
    href: "#",
    logo: "/logos/ekomoc.png",
    title: "Ekomoc CRM",
    desc: "CRM for solar audit and sales teams. Job pipeline, roles (admin / sales rep / auditor), team notes, audit photos, and push notifications — runs like a native mobile app.",
    domain: "ekomoc.pl",
  },
  {
    href: "https://www.sleipnirtours.is/",
    logo: "/logos/sleipnir.png",
    title: "Sleipnir Glacier Tours",
    desc: "Client work — built and ran their full commercial stack: Bokun setup, Google & Meta Ads, influencer partnerships, custom tour products, event representation, and pricing strategy.",
    domain: "sleipnirtours.is",
  },
];

const timeline = [
  { year: "2013", event: "Started leading at 17. First team, fifty people." },
  { year: "2015", event: "Opened my first business — an outdoor advertising agency. Founded a non-profit on the side: public breathwork, mindfulness, and meditation programs that ran for three years." },
  { year: "2016", event: "Top-performing sales rep for mBank — loans and insurance products." },
  { year: "2019", event: "Running 8 parallel income streams — crypto, trading, and festival operations." },
  { year: "2022", event: "Two years in Icelandic tourism — marketing and operations for Sleipnir Glacier Tours (Bokun, Meta/Google Ads, partner network, sales channels)." },
  { year: "2024", event: "Started Heartless Marketing — full-stack agency for Polish-Icelandic operators. Market data eventually reshaped it into Reykjawwwik.is, productized." },
  { year: "2025", event: "Five active ventures across four industries. MAS Group launches Parts, Prints, Rental, Logistics. Flyt.is, QuickFix.is, Reykjawwwik.is, MySpiritWay running in parallel." },
  { year: "Along the way", event: "Travelling the world and facilitating Dynamic Meditation sessions on festival stages across Europe — Czech Republic, Poland, and beyond." },
];

const _values = [
  { Icon: Hammer, title: "Build, then step back", desc: "Systems that run without me. Maximum leverage, minimum friction." },
  { Icon: FlaskConical, title: "Test, don't assume", desc: "Every idea is a hypothesis. Real data over intuition." },
  { Icon: Waves, title: "Fluid, not rigid", desc: "Auto parts, AI, coaching — the model is what matters." },
  { Icon: Map, title: "Freedom-first", desc: "Location independent, laptop-based, global ambition from Iceland." },
];

const services = [
  { num: "01", title: "Business Architecture", desc: "Designing how a company actually operates end-to-end — team protocols, handoff systems, and custom internal tooling so the business runs without depending on any one person." },
  { num: "02", title: "Marketing & Sales Funnels", desc: "Fully managed sales funnels — Meta Ads ecosystems, landing pages, email flows, conversion tracking. Building funnels that turn traffic into B2B and B2C contracts." },
  { num: "03", title: "Co-founding, Advisory & Hire", desc: "Open to the right projects as co-founder, builder, or advisor — and available for hire on focused engagements. Especially AI tooling, B2B, and ventures with a clear distribution path." },
];

function Index() {
  return (
    <>
      <Cursor />
      <nav>
        <a href="#" className="nav-logo"><img src="/signature.png" alt="Kamil Jan" /></a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#services">Work with me</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-glow"></div>
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow fade-up d1">
              <div className="hero-eyebrow-line"></div>
              <span>Iceland-based entrepreneur</span>
            </div>
            <h1 className="fade-up d2">
              Building systems<br />that <em>run themselves.</em>
            </h1>
            <p className="hero-desc fade-up d3">
              I'm Kamil Jan. I build businesses and design the systems behind them.
            </p>
            <div className="hero-actions fade-up d4">
              <a href="#projects" className="btn btn-primary">See my projects <Arrow /></a>
              <a href="#contact" className="btn btn-ghost">Let's talk</a>
            </div>
            <div className="hero-meta fade-up d5">
              <div className="hero-meta-item">
                <span className="hero-meta-num">5+</span>
                <span className="hero-meta-label">Active ventures</span>
              </div>
              <div className="hero-meta-divider"></div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">4</span>
                <span className="hero-meta-label">Industries</span>
              </div>
              <div className="hero-meta-divider"></div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">'13</span>
                <span className="hero-meta-label">Building since</span>
              </div>
            </div>
          </div>

          <div className="hero-photo-wrap fade-up d3">
            <div className="photo-frame">
              <img src="/kamil.png" alt="Kamil Jan" />
            </div>
          </div>
        </div>
        <JourneyPath className="hero-journey" />
      </section>

      <section id="about">
        <div className="container">
          <div className="about-narrow">
            <div className="section-eyebrow"><span>About</span></div>
            <h2>Hands-on,<br /><em>then hands-off.</em></h2>
            <div className="about-text">
              <p>
                <span className="dropcap">F</span>irst team I led was 50 people. I was 17. That set the pattern — find a system, take responsibility, make it run.
              </p>
              <p>
                Today I run five active ventures across four industries — auto parts, freight, handyman services, websites, and coaching — alongside trusted teams in Iceland and Poland.
              </p>
              <p>
                My role is to design how a business operates and then step out of its way. Team protocols, handoff systems, custom ERPs in Google Apps Script + Twilio, Meta Ads at scale, AI-assisted everything. If a process repeats more than three times, I'm already drafting the script that removes it.
              </p>
              <p>
                Three pillars run through everything I do: <strong>entrepreneurship</strong>, <strong>AI automation</strong>, and <strong>spiritual practice</strong>.
                I'm a 200h yoga teacher and author of <em>Simplified Practical Spirituality</em> — a 100+ page guidebook condensing 12 years of practice into a daily framework. The systems mind and the contemplative mind aren't opposites for me; they sharpen each other.
              </p>
            </div>
            <div className="about-quote">
              <p>"I don't guess which project will win. I let the market decide."</p>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="section-tight timeline-section">
        <InkPine className="timeline-tree" />
        <div className="container">
          <div className="section-eyebrow"><span>Timeline</span></div>
          <h2>How I got <em>here.</em></h2>
          <ol className="timeline">
            {timeline.map((t, i) => (
              <li key={t.year} className="timeline-item" style={{ ['--i' as string]: i }}>
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-dot"></div>
                <div className="timeline-body">
                  <div className="timeline-event">{t.event}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <div className="section-eyebrow"><span>Projects</span></div>
          <h2>What I've <em>built</em></h2>

          <div className="projects-list">
            {projects.map((p) => (
              <div key={p.title} className="project-row">
                <a href={p.href} target="_blank" rel="noreferrer" className={`project-emoji${p.wordmark ? " project-emoji-text" : ""}`} aria-label={p.title}>
                  {p.logo ? <img src={p.logo} alt={p.title} /> : p.wordmark ? <span className="wordmark">{p.wordmark}</span> : null}
                </a>
                <div className="project-body">
                  <a href={p.href} target="_blank" rel="noreferrer" className="project-title-link">
                    <div className="project-title">{p.title}</div>
                  </a>
                  <div className="project-desc">{p.desc}</div>
                  {p.subs && (
                    <div className="project-subs">
                      {p.subs.map((s) => (
                        <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="sub-pill">{s.name}</a>
                      ))}
                    </div>
                  )}
                </div>
                <a href={p.href} target="_blank" rel="noreferrer" className="project-right">
                  {p.domain && <span className="project-domain">{p.domain}</span>}
                  <span className="project-arrow"><Arrow /></span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services">
        <div className="container">
          <div className="section-eyebrow"><span>Work with me</span></div>
          <h2>How I can<br /><em>actually help</em></h2>
          

          <div className="services-grid">
            {services.map((s) => (
              <div key={s.num} className="service-item">
                <span className="service-num">{s.num}</span>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container contact-clean">
          <Handshake size={48} strokeWidth={1.2} className="contact-hands" />
          <div className="section-eyebrow"><span>Contact</span></div>
          <h2>Let's <em>talk.</em></h2>
          <p className="contact-intro">If you're building something real and want to move faster, reach out.</p>
          <div className="contact-actions">
            <a href="mailto:hello@kamiljan.com" className="btn btn-primary"><Mail size={16} strokeWidth={1.5} /><span>hello@kamiljan.com</span></a>
            <a href="https://www.linkedin.com/in/myspiritway/" target="_blank" rel="noreferrer" className="btn btn-ghost"><Linkedin size={16} strokeWidth={1.5} /><span>LinkedIn</span></a>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Kamil Jan — kamiljan.com</p>
      </footer>
    </>
  );
}
