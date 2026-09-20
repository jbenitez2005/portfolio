import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Currently", "About", "Experience", "Projects", "Skills", "Contact"];

const EXPERIENCES = [
  {
    company: "Hatch",
    badge: "HATCH",
    role: "Mobile iOS Intern — IoT Connectivity (Pillar 0, Stability)",
    location: "Redwood City, CA (Hybrid)",
    period: "Summer 2026 — Present",
    color: "#5EC8B8",
    featured: true,
    description:
      "Own end-to-end delivery of Hatch's flagship enterprise WiFi (WPA2-Enterprise / eduroam) provisioning initiative for IoT devices, self-advocated onto the project and now the primary driver behind my team's full-time conversion recommendation. Originally a summer internship, extended part-time through the school year.",
    tags: ["Swift", "BLE", "IoT", "EAP/PEAP", "RADIUS"],
    ongoing: true,
  },
  {
    company: "Apple",
    badge: "APPLE",
    role: "IS&T Extern",
    location: "Cupertino, CA",
    period: "Summer 2025",
    color: "#555",
    description:
      "Built indoor map UI enhancements for the Caffe Macs iOS app using Swift/SwiftUI and Apple's IMDF framework. Delivered a full-screen map view, improved map scaling/navigation interactions, and supported accessibility across the application.",
    tags: ["Swift", "SwiftUI", "IMDF", "iOS", "Accessibility"],
  },
  {
    company: "Amazon Web Services",
    badge: "AWS",
    role: "Software Development Engineer Intern",
    location: "Seattle, WA",
    period: "Summer 2024",
    color: "#FF9900",
    description:
      "Built an internal tool for the AWS Service Quotas team using Python, AWS S3, Bash scripting, and AWS APIs to improve operational workflows and reduce manual error-mitigation effort.",
    tags: ["Python", "AWS S3", "Bash", "AWS APIs", "Internal Tooling"],
  },
];

const PROJECTS = [
  {
    title: "BlueGuppy Underwater Robot",
    category: "Senior Design / Capstone",
    icon: "🐟",
    color: "#0EA5E9",
    status: "In Progress",
    description:
      "Designing and building a small (under 10cm), untethered, fish-inspired underwater robot based on the open-access BlueGuppy platform. Integrates mechanical design, actuation, electronics, embedded control, and experimental characterization to reproduce two-DoF tunable locomotion from a minimalist single-actuator design, with performance evaluated in a water tank on swimming speed, turning radius, stability, and energy consumption.",
    tags: ["Raspberry Pi", "3D Printing", "Embedded Control", "Actuation", "Fluid Dynamics"],
  },
  {
    title: "FPGA Vending Machine",
    category: "Hardware / Digital Design",
    icon: "🎰",
    color: "#6C63FF",
    description:
      "Verilog FSM vending machine on Basys3 FPGA. Accepted nickels/dimes, dispensed soda at 25 cents, handled change, debouncing, edge detection, seven-segment display output, and Vivado simulation/synthesis/bitstream flow.",
    tags: ["Verilog", "FPGA", "Basys3", "FSM", "Vivado"],
  },
  {
    title: "TM4C123GXL Keypad Safety System",
    category: "Embedded Systems",
    icon: "🔐",
    color: "#00C9A7",
    description:
      "Embedded safety/security prototype using keypad input, IR motion sensing, servo motor locking, LEDs, watchdog timer behavior, breadboard wiring, external 5V supply for servo, and Tiva C microcontroller programming.",
    tags: ["TM4C123GXL", "TivaWare", "GPIO", "Servos", "IR Sensors"],
  },
  {
    title: "The Buzz",
    category: "Full-Stack Web",
    icon: "🐝",
    color: "#F59E0B",
    description:
      "Full-stack social web app using Java, Javalin, PostgreSQL/Supabase, Google OAuth, comments, voting, admin CLI, caching with Memcachier, HTTP caching headers, and JUnit testing.",
    tags: ["Java", "Javalin", "PostgreSQL", "Google OAuth", "Supabase"],
  },
  {
    title: "FPGA Full Adder / Carry Look-Ahead Adder Lab",
    category: "Digital Logic",
    icon: "⚡",
    color: "#EF4444",
    description:
      "Designed 1-bit full adder, 4-bit ripple carry adder, and carry look-ahead adder in Verilog. Compared area utilization, timing concepts, Vivado synthesis results, and FPGA implementation.",
    tags: ["Verilog", "FPGA", "Digital Logic", "Vivado", "CLA"],
  },
  {
    title: "TM4C123GXL SysTick / Interrupt Labs",
    category: "Embedded Systems",
    icon: "⏱️",
    color: "#8B5CF6",
    description:
      "Built microcontroller labs using GPIO, SysTick timer, interrupts, switch-controlled LED behavior, register-level setup, TivaWare, and oscilloscope validation.",
    tags: ["SysTick", "Interrupts", "GPIO", "TivaWare", "Oscilloscope"],
  },
  {
    title: "Route Cipher / Java Data Structures Projects",
    category: "Software / Algorithms",
    icon: "🧩",
    color: "#10B981",
    description:
      "Software and coursework projects demonstrating Java, OOP, recursion, stacks, iterators, collections, sorting, and algorithmic problem solving.",
    tags: ["Java", "OOP", "Data Structures", "Algorithms", "Recursion"],
  },
];

const SKILLS = [
  {
    category: "Languages",
    icon: "{ }",
    items: ["C", "C++", "Java", "Python", "Swift", "Verilog", "JavaScript", "SQL"],
  },
  {
    category: "Hardware/Embedded",
    icon: "⚙️",
    items: ["TM4C123GXL", "TivaWare", "GPIO", "SysTick", "Interrupts", "Watchdog Timers", "Sensors", "Servos", "FPGA", "Basys3", "Vivado"],
  },
  {
    category: "Software/Tools",
    icon: "🛠",
    items: ["Git", "GitHub", "PostgreSQL", "Supabase", "Javalin", "JUnit", "AWS S3", "Bash", "Google OAuth"],
  },
  {
    category: "Concepts",
    icon: "💡",
    items: ["Embedded Systems", "Digital Logic", "Computer Architecture", "Data Structures", "Caching", "Hardware Debugging", "Technical Documentation"],
  },
];

const CURRENT_ITEMS = [
  {
    title: "Hatch — Ongoing",
    body: "Continuing part-time work with the IoT connectivity team through the school year.",
    color: "#5EC8B8",
  },
  {
    title: "Senior Design / Capstone",
    body: "Just started building a fish-inspired underwater robot based on the BlueGuppy platform.",
    color: "#0EA5E9",
  },
  {
    title: "Coursework",
    body: "Taking Power Electronics and Power Systems this term.",
    color: "#8B5CF6",
  },
];

function CompanyBadge({ text, color }) {
  return (
    <div style={{
      width: 64, height: 44, borderRadius: 10,
      background: `${color}14`, border: `1px solid ${color}35`,
      display: "flex", alignItems: "center", justifyContent: "center",
      marginBottom: 16,
    }}>
      <span className="sans" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: color }}>
        {text}
      </span>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0a0a0f", color: "#e8e6e1", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }

        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sans { font-family: 'DM Sans', system-ui, sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-animate { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-animate-1 { animation-delay: 0.1s; }
        .hero-animate-2 { animation-delay: 0.25s; }
        .hero-animate-3 { animation-delay: 0.4s; }
        .hero-animate-4 { animation-delay: 0.55s; }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9a9690;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 4px 0;
        }
        .nav-link:hover { color: #e8e6e1; }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: #e8e6e1;
          color: #0a0a0f;
          border: none;
          border-radius: 100px;
          padding: 12px 28px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { background: #fff; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(232,230,225,0.15); }

        .btn-outline {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: transparent;
          color: #9a9690;
          border: 1px solid #2a2a35;
          border-radius: 100px;
          padding: 11px 28px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-outline:hover { border-color: #9a9690; color: #e8e6e1; transform: translateY(-1px); }

        .tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          background: #16161f;
          color: #7a7870;
          border: 1px solid #22222e;
          border-radius: 100px;
          padding: 4px 12px;
          white-space: nowrap;
        }

        .card {
          background: #0f0f18;
          border: 1px solid #1a1a24;
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .card:hover {
          border-color: #2a2a38;
          transform: translateY(-4px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.4);
        }

        .exp-card {
          background: #0f0f18;
          border: 1px solid #1a1a24;
          border-radius: 20px;
          padding: 36px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .exp-card:hover {
          border-color: #2a2a38;
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #4a4a5a;
        }

        .skill-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          background: #13131c;
          color: #c8c6c1;
          border: 1px solid #1e1e2a;
          border-radius: 10px;
          padding: 8px 16px;
          transition: all 0.2s;
        }
        .skill-chip:hover { border-color: #3a3a50; color: #e8e6e1; }

        .divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #2a2a38, transparent);
          align-self: stretch;
          margin: 0 4px;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #2a2a38; border-radius: 3px; }

        @media (max-width: 768px) {
          .hero-name { font-size: clamp(40px, 10vw, 80px) !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-btns { flex-wrap: wrap !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>

      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity: 0.6,
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #1a1a24" : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <button onClick={() => scrollTo("hero")} style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 20, color: "#e8e6e1", background: "none", border: "none",
          cursor: "pointer", letterSpacing: "-0.02em",
        }}>JB</button>

        <div className="desktop-nav" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
          ))}
        </div>

        <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 12 }} onClick={() => scrollTo("contact")}>
          Get in Touch
        </button>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "#e8e6e1", fontSize: 22, cursor: "pointer", display: "none", alignItems: "center" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-nav" style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "#0f0f18", borderBottom: "1px solid #1a1a24",
          padding: "24px 5%", display: "flex", flexDirection: "column", gap: 20,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())} style={{ textAlign: "left" }}>{l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 5% 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)",
          top: "10%", right: "-10%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,201,167,0.06) 0%, transparent 70%)",
          bottom: "20%", left: "-5%", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 900, position: "relative" }}>
          <div className="hero-animate hero-animate-1">
            <span className="section-label">Computer Engineering · Lehigh University · Class of 2027</span>
          </div>

          <h1 className="hero-animate hero-animate-2 serif hero-name" style={{
            fontSize: "clamp(56px, 9vw, 96px)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            marginTop: 24,
            color: "#e8e6e1",
          }}>
            Josue<br />
            <span style={{ fontStyle: "italic", color: "#6a6860" }}>Benitez</span>
          </h1>

          <p className="hero-animate hero-animate-3 sans" style={{
            fontSize: 17, lineHeight: 1.7, color: "#7a7870",
            maxWidth: 560, marginTop: 28, fontWeight: 300,
          }}>
            Interested in embedded systems, software engineering, hardware-software integration, wearable technology, and systems that interact with the real world.
          </p>

          <div className="hero-animate hero-animate-4 hero-btns" style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
            <a className="btn-primary" href="#">Resume ↗</a>
            <button className="btn-outline" onClick={() => scrollTo("projects")}>Projects</button>
            <a className="btn-outline" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="btn-outline" href="https://github.com/josuebenitez-netizen" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4,
        }}>
          <span className="sans" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6a6860" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #6a6860, transparent)" }} />
        </div>
      </section>

      {/* CURRENTLY */}
      <section id="currently" style={{ padding: "40px 5% 80px", maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-label">Currently</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginTop: 20 }}>
          {CURRENT_ITEMS.map((item) => (
            <div key={item.title} style={{ display: "flex", gap: 12, alignItems: "flex-start", flex: "1 1 260px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, marginTop: 7, flexShrink: 0, display: "inline-block" }} />
              <div>
                <p className="sans" style={{ fontSize: 14, color: "#e8e6e1", fontWeight: 500, marginBottom: 4 }}>{item.title}</p>
                <p className="sans" style={{ fontSize: 13, lineHeight: 1.6, color: "#7a7870", fontWeight: 300 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#1a1a24" }} />

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-label">About</span>
            <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Building at the<br /><em style={{ color: "#6a6860" }}>intersection</em><br />of bits & atoms
            </h2>
          </div>
          <div>
            <p className="sans" style={{ fontSize: 16, lineHeight: 1.85, color: "#9a9690", fontWeight: 300, marginBottom: 24 }}>
              I'm a Computer Engineering student at <span style={{ color: "#e8e6e1" }}>Lehigh University</span>, expected to graduate in <span style={{ color: "#e8e6e1" }}>May 2027</span>. My work spans from writing Verilog for FPGAs to building full-stack web apps — I'm drawn to the full stack of computing, from silicon to software.
            </p>
            <p className="sans" style={{ fontSize: 16, lineHeight: 1.85, color: "#9a9690", fontWeight: 300, marginBottom: 32 }}>
              I'm especially interested in <span style={{ color: "#e8e6e1" }}>embedded systems</span>, microcontrollers, FPGA/digital design, wearable technology, health tech, robotics, and hardware-product roles. I thrive in hands-on environments where debugging is part of the craft.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
              {["Debugging", "Hands-on Hardware", "Technical Docs", "Fast Learner", "Cross-functional Collab"].map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#5a5a6a", fontWeight: 300 }}>
              Outside of engineering, I build model kits, cook (steak's my specialty), lift weights, and hike — most recently at Yosemite.
            </p>
          </div>
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#1a1a24" }} />

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-label">Experience</span>
        <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", marginBottom: 48 }}>
          Where I've worked
        </h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {EXPERIENCES.map((exp) => (
            <div key={exp.company} className="exp-card" style={exp.featured ? { gridColumn: "1 / -1", borderColor: `${exp.color}40` } : {}}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <CompanyBadge text={exp.badge} color={exp.color} />
                  <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, letterSpacing: "-0.02em", color: "#e8e6e1" }}>{exp.company}</h3>
                  <p className="sans" style={{ fontSize: 14, color: "#7a7870", marginTop: 4 }}>{exp.role}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className="tag" style={exp.ongoing ? { color: exp.color, borderColor: `${exp.color}40` } : {}}>{exp.period}</span>
                  <p className="sans" style={{ fontSize: 12, color: "#4a4a5a", marginTop: 8 }}>{exp.location}</p>
                </div>
              </div>
              <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#7a7870", fontWeight: 300, marginBottom: 20, maxWidth: exp.featured ? 760 : "none" }}>
                {exp.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginTop: 28, paddingTop: 24, borderTop: "1px solid #1a1a24" }}>
          <span className="sans" style={{ fontSize: 12, color: "#4a4a5a" }}>Amici's East Coast Pizzeria</span>
          <span className="sans" style={{ fontSize: 12, color: "#4a4a5a" }}>·</span>
          <span className="sans" style={{ fontSize: 12, color: "#4a4a5a" }}>Cashier / Host</span>
          <span className="sans" style={{ fontSize: 12, color: "#4a4a5a" }}>·</span>
          <span className="sans" style={{ fontSize: 12, color: "#4a4a5a" }}>June 2021 — December 2022</span>
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#1a1a24" }} />

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-label">Projects</span>
        <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", marginBottom: 48 }}>
          Things I've built
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {PROJECTS.map((proj) => (
            <div key={proj.title} className="card" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{
                height: 140, borderRadius: 12, marginBottom: 24,
                background: `linear-gradient(135deg, ${proj.color}15, ${proj.color}05)`,
                border: `1px solid ${proj.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40, position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: `radial-gradient(circle at 30% 50%, ${proj.color}20, transparent 60%)`,
                }} />
                <span style={{ position: "relative", zIndex: 1 }}>{proj.icon}</span>
                {proj.status && (
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
                    color: proj.color, background: `${proj.color}18`, border: `1px solid ${proj.color}40`,
                    borderRadius: 100, padding: "4px 10px", letterSpacing: "0.05em", textTransform: "uppercase",
                  }}>{proj.status}</div>
                )}
              </div>

              <span className="sans" style={{ fontSize: 11, color: "#4a4a5a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                {proj.category}
              </span>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, letterSpacing: "-0.01em", color: "#e8e6e1", marginBottom: 12 }}>
                {proj.title}
              </h3>
              <p className="sans" style={{ fontSize: 13, lineHeight: 1.75, color: "#6a6860", fontWeight: 300, flex: 1, marginBottom: 20 }}>
                {proj.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#1a1a24" }} />

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-label">Skills</span>
        <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", marginBottom: 48 }}>
          Tools of the trade
        </h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {SKILLS.map((group) => (
            <div key={group.category} className="card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>{group.icon}</span>
                <span className="sans" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a5a6a" }}>
                  {group.category}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map(item => (
                  <span key={item} className="skill-chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#1a1a24" }} />

      {/* LEADERSHIP */}
      <section id="leadership" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-label">Leadership</span>
            <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Beyond the<br /><em style={{ color: "#6a6860" }}>lab</em>
            </h2>
          </div>
          <div className="exp-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
              <div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, color: "#e8e6e1" }}>President</h3>
                <p className="sans" style={{ fontSize: 14, color: "#7a7870", marginTop: 4 }}>Fuerza Mexicana Club · Bethlehem, PA</p>
              </div>
              <span className="tag">Founding Board Member</span>
            </div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#7a7870", fontWeight: 300 }}>
              Founding executive board member helping plan cultural events, coordinate logistics, communicate with student organizations, and showcase Mexican culture and diversity on campus.
            </p>
          </div>
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#1a1a24" }} />

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px 5% 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
        }} />
        <span className="section-label">Contact</span>
        <h2 className="serif" style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 400, letterSpacing: "-0.03em", marginTop: 16, marginBottom: 16 }}>
          Let's build something<br /><em style={{ color: "#6a6860" }}>together</em>
        </h2>
        <p className="sans" style={{ fontSize: 16, color: "#7a7870", fontWeight: 300, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
          Open to full-time opportunities and internships in embedded systems, software engineering, hardware, and wearable tech.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
          <a className="btn-primary" href="mailto:jbenitez6191@gmail.com">Send an Email ↗</a>
          <a className="btn-outline" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a className="btn-outline" href="https://github.com/josuebenitez-netizen" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="btn-outline" href="https://github.com/jbenitez2005" target="_blank" rel="noreferrer">School GitHub ↗</a>
          <a className="btn-outline" href="#">Resume PDF ↗</a>
        </div>
        <p className="sans" style={{ fontSize: 13, color: "#3a3a48" }}>
          jbenitez6191@gmail.com · Mountain View, CA
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1a1a24", padding: "24px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span className="serif" style={{ fontSize: 16, color: "#3a3a48" }}>Josue Benitez</span>
        <span className="sans" style={{ fontSize: 12, color: "#3a3a48", letterSpacing: "0.05em" }}>
          Computer Engineering · Lehigh University · 2027
        </span>
      </footer>
    </div>
  );
}
