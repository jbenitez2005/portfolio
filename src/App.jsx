import { useState, useEffect, useRef } from "react";
import hatchLogo from "./assets/logos/hatch.png";
import appleLogo from "./assets/logos/apple.png";
import awsLogo from "./assets/logos/aws.png";
import reliableLogo from "./assets/logos/reliable-robotics.png";
import heroPhoto from "./assets/photos/hero.jpg";
import fpgaPhoto from "./assets/photos/fpga.jpg";
import breadboardPhoto from "./assets/photos/breadboard.jpg";
import steakPhoto from "./assets/photos/steak.jpg";
import hikePhoto from "./assets/photos/hike.jpg";
import clubPhoto from "./assets/photos/club.jpg";
import gundamPhoto from "./assets/photos/gundam.jpg";
import eduroamScreenshot from "./assets/photos/eduroam-screenshot.jpg";

const NAV_LINKS = ["Currently", "About", "Experience", "Projects", "Skills", "Contact"];

const EXPERIENCES = [
  {
    company: "Hatch",
    badge: "HATCH",
    logo: hatchLogo,
    role: "Mobile iOS Intern — Pillar 0 Foundations (App Connectivity & Stability)",
    location: "Redwood City, CA (Hybrid)",
    period: "Summer 2026 — Present",
    color: "#5EC8B8",
    featured: true,
    logoHasText: true,
    screenshot: eduroamScreenshot,
    description:
      "Implemented the mobile side of the company's first enterprise WiFi support for college students (WPA2-Enterprise / eduroam). Proactively reached out to the Director of Mobile Engineering to get involved on the project. Worked closely with the embedded side to build out the BLE-based provisioning flow using EAP/PEAP authentication and RADIUS servers. Also spent time on the hardware side of things, reading UART output on development boards to figure out where a connection was breaking down between the app and the firmware. Made key security- and UX-driven design calls around failure handling and onboarding.",
    tags: ["Swift", "BLE", "IoT", "EAP/PEAP", "RADIUS"],
    ongoing: true,
  },
  {
    company: "Apple",
    badge: "APPLE",
    logo: appleLogo,
    role: "IS&T Extern",
    location: "Cupertino, CA",
    period: "Summer 2025",
    color: "#57534e",
    description:
      "Built indoor map UI enhancements for the Caffe Macs iOS app using Swift/SwiftUI and Apple's IMDF framework. Delivered a full-screen map view, improved map scaling and navigation interactions, and supported accessibility across the application.",
    tags: ["Swift", "SwiftUI", "IMDF", "iOS", "Accessibility"],
  },
  {
    company: "Amazon Web Services",
    badge: "AWS",
    logo: awsLogo,
    role: "Software Development Engineer Intern",
    location: "Seattle, WA",
    period: "Summer 2024",
    color: "#FF9900",
    logoHasText: true,
    description:
      "Built an internal tool for the AWS Service Quotas team using Python, AWS S3, Bash scripting, and AWS APIs to improve operational workflows and reduce manual error-mitigation effort.",
    tags: ["Python", "AWS S3", "Bash", "AWS APIs", "Internal Tooling"],
  },
  {
    company: "Reliable Robotics",
    badge: "RELIABLE",
    logo: reliableLogo,
    role: "High School Apprentice (Inaugural Cohort)",
    location: "Mountain View, CA",
    period: "June 2022 — August 2022",
    color: "#7B92B5",
    logoHasText: true,
    description:
      "One of the inaugural high school apprentices in Reliable Robotics' apprenticeship program, an aerospace company building autonomous flight systems. Worked independently on a self-directed, Python-based project: an SMS reminder application that sent automated text notifications through mobile carriers' email-to-SMS gateways.",
    tags: ["Python", "SMS Gateways", "Self-Directed"],
  },
];

const EARLY_EXPERIENCE = {
  company: "Amici's East Coast Pizzeria",
  role: "Cashier / Host",
  period: "June 2021 — December 2022",
  note: "High school role where I built early foundations in customer service, multitasking under pressure, and working as part of a team.",
};

const PROJECTS = [
  {
    title: "BlueGuppy Underwater Robot",
    category: "Senior Design / Capstone",
    icon: "wave",
    color: "#0EA5E9",
    status: "In Progress",
    description:
      "A small, untethered, fish-inspired underwater robot my team and I are building based on the open-access BlueGuppy platform, reproducing two-DoF swimming from a single actuator.",
    challenge:
      "The spec: under 10cm, fully untethered, and able to reproduce two-degree-of-freedom swimming motion using a single actuator. The mechanical design, electronics, and control loop all have to be worked out together, since each one constrains the others.",
    approach:
      "My team and I are working from the open-access BlueGuppy design, splitting the build across mechanical design (3D-printed body and fin geometry), electronics and actuation, and embedded control on a Raspberry Pi. Once assembled, the plan is to characterize it in a water tank against swimming speed, turning radius, stability, and energy consumption — real measurements, not just 'does it move.'",
    debugging:
      "Still early, so the real debugging is ahead of us. There's a lot still ahead of us — we'll definitely need to make sure anything electronics-related can survive being sealed up near water, and we'll need to be patient, since the robot is going to be very small and assembly may be tedious. Part of the work ahead is figuring out how to be efficient about that.",
    learned:
      "This early phase is already showing me how important the planning phase is — gathering requirements and nailing down the specification before building anything.",
    tags: ["Raspberry Pi", "3D Printing", "Embedded Control", "Actuation", "Fluid Dynamics"],
  },
  {
    title: "FPGA Vending Machine",
    category: "Hardware / Digital Design",
    icon: "chip",
    color: "#6C63FF",
    images: [fpgaPhoto],
    description:
      "A vending machine controller built entirely as a Verilog FSM on a Basys3 FPGA — no software, no microcontroller, just hardware logic accepting coins and dispensing soda.",
    challenge:
      "Model real vending-machine behavior — accepting nickels and dimes, tracking a running total, dispensing at 25 cents, returning change — purely as a finite state machine, with real physical buttons standing in for coin sensors.",
    approach:
      "Designed the FSM states for each valid running total, wired coin inputs through edge detection so each insertion registered as a single clean event, and drove a seven-segment display for feedback. Every state transition was verified in simulation before ever touching the actual board, then synthesized through Vivado into a real bitstream.",
    debugging:
      "The simulation-to-hardware gap showed up almost immediately: waveforms that looked perfect in the simulator turned into double- and triple-counted coins on the real board, because physical switches bounce — mechanically flickering on and off for a few milliseconds before settling. That meant adding real debounce logic, not just clean edge detection, before the FSM could trust its own inputs.",
    learned:
      "A design can be logically correct and still fail the moment it touches real hardware. Simulation proves your logic; the physical board is what proves your assumptions about the world were right.",
    tags: ["Verilog", "FPGA", "Basys3", "FSM", "Vivado"],
  },
  {
    title: "TM4C123GXL Keypad Safety System",
    category: "Embedded Systems",
    icon: "lock",
    color: "#00C9A7",
    images: [breadboardPhoto],
    description:
      "A keypad-and-sensor security prototype on a Tiva C microcontroller — motion sensing, a servo-driven lock, and watchdog-timer recovery, all wired up on a breadboard.",
    challenge:
      "Combine several independent hardware inputs — keypad entry, IR motion sensing — with a physical actuator (a servo acting as a lock) and register-level microcontroller code, in a system that has to fail safely if something goes wrong.",
    approach:
      "Built out the circuit on a breadboard: keypad matrix scanning, an IR motion sensor, LEDs for status feedback, and a servo for the physical lock, all driven from the TM4C123GXL with a watchdog timer to catch and recover from unexpected hangs.",
    debugging:
      "The servo worked fine in isolation, then started behaving erratically the moment everything else was wired in — classic shared-power-rail noise, where the servo's current draw was dipping the voltage enough to glitch the rest of the logic. The fix was pulling the servo onto its own external 5V supply instead of sharing the board's rail.",
    learned:
      "In embedded systems, the bug is just as often in the power delivery as it is in the code — and it's usually the last place you think to look.",
    tags: ["TM4C123GXL", "TivaWare", "GPIO", "Servos", "IR Sensors"],
  },
];

const SKILLS = [
  {
    category: "Languages",
    items: ["C", "C++", "Java", "Python", "Swift", "Verilog", "JavaScript", "SQL"],
  },
  {
    category: "Hardware & Embedded",
    items: ["TM4C123GXL", "TivaWare", "GPIO", "SysTick", "Interrupts", "Watchdog Timers", "Sensors", "Servos", "FPGA", "Basys3", "Vivado", "BLE"],
  },
  {
    category: "Software & Tools",
    items: ["Git", "GitHub", "PostgreSQL", "Supabase", "Javalin", "JUnit", "AWS S3", "Bash", "Google OAuth", "Bugsee", "Jira"],
  },
  {
    category: "Concepts",
    items: ["Embedded Systems", "Digital Logic", "Computer Architecture", "Data Structures", "Caching", "Hardware Debugging", "Technical Documentation", "IoT Connectivity"],
  },
];

const CURRENT_ITEMS = [
  {
    title: "Hatch — Ongoing",
    body: "Continuing part-time work with the Pillar 0 Foundations team through the school year.",
    color: "#5EC8B8",
  },
  {
    title: "Senior Design / Capstone",
    body: "Just started building a fish-inspired underwater robot based on the BlueGuppy platform.",
    color: "#0EA5E9",
  },
  {
    title: "Coursework",
    body: "Taking Power Electronics, Power Systems, and Operating Systems this term.",
    color: "#8B5CF6",
  },
];

function CompanyBadge({ text, color, logo }) {
  if (logo) {
    return <img src={logo} alt={`${text} logo`} style={{ height: 30, width: "auto", marginBottom: 14, display: "block" }} />;
  }
  return (
    <span className="sans" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", color, marginBottom: 14, display: "block" }}>
      {text}
    </span>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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
    <div style={{ fontFamily: "'Georgia', serif", background: "#faf8f5", color: "#232019", minHeight: "100vh", overflowX: "hidden" }}>
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
          color: #6f6858;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 4px 0;
          white-space: nowrap;
        }
        .nav-link:hover { color: #232019; }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: #232019;
          color: #faf8f5;
          border: none;
          border-radius: 100px;
          padding: 12px 28px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { background: #000; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(35,32,25,0.18); }

        .btn-outline {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: transparent;
          color: #6f6858;
          border: 1px solid #d6cfc0;
          border-radius: 100px;
          padding: 11px 28px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-outline:hover { border-color: #6f6858; color: #232019; transform: translateY(-1px); }

        .tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          background: #f1ede3;
          color: #6b6459;
          border: 1px solid #e5dfd1;
          border-radius: 100px;
          padding: 4px 12px;
          white-space: nowrap;
        }

        .card {
          background: #ffffff;
          border: 1px solid #e7e2d6;
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .card:hover {
          border-color: #d6cfc0;
          transform: translateY(-4px);
          box-shadow: 0 24px 48px rgba(35,32,25,0.10);
        }

        .project-card:hover h3 { text-decoration: underline; text-decoration-color: currentColor; }

        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(35,32,25,0.45);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease both;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-panel {
          background: #ffffff; border-radius: 20px;
          max-width: 720px; width: 100%; max-height: 85vh; overflow-y: auto;
          box-shadow: 0 32px 64px rgba(35,32,25,0.25);
        }

        .exp-card {
          background: #ffffff;
          border: 1px solid #e7e2d6;
          border-radius: 20px;
          padding: 36px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .exp-card:hover {
          border-color: #d6cfc0;
          box-shadow: 0 16px 40px rgba(35,32,25,0.08);
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9c9484;
        }

        .skill-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          background: #f6f3ec;
          color: #4a463d;
          border: 1px solid #e5dfd1;
          border-radius: 10px;
          padding: 8px 16px;
          transition: all 0.2s;
        }
        .skill-chip:hover { border-color: #c9c0ad; color: #232019; }

        .dot {
          width: 6px; height: 6px; border-radius: 50%;
          display: inline-block; margin-right: 10px;
        }

        .hamburger-line {
          display: block; width: 20px; height: 1.5px; background: #232019;
          margin: 4px 0; transition: all 0.2s;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #faf8f5; }
        ::-webkit-scrollbar-thumb { background: #d6cfc0; border-radius: 3px; }

        @media (max-width: 768px) {
          .hero-name { font-size: clamp(40px, 10vw, 80px) !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-btns { flex-wrap: wrap !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .hero-grid { flex-direction: column; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(250,248,245,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #e7e2d6" : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <button onClick={() => scrollTo("hero")} style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 20, color: "#232019", background: "none", border: "none",
          cursor: "pointer", letterSpacing: "-0.02em",
        }}>JB</button>

        <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))}>{l}</button>
          ))}
        </div>

        <button className="btn-primary" style={{ padding: "8px 20px", fontSize: 12 }} onClick={() => scrollTo("contact")}>
          Say Hi
        </button>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", alignItems: "flex-end", padding: 8 }}>
          <span className="hamburger-line" style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 5px)" : "none" }} />
          <span className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="hamburger-line" style={{ width: 14, transform: menuOpen ? "rotate(-45deg) translate(3px, -4px)" : "none", width: menuOpen ? 20 : 14 }} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-nav" style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "#ffffff", borderBottom: "1px solid #e7e2d6",
          padding: "24px 5%", display: "flex", flexDirection: "column", gap: 20,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))} style={{ textAlign: "left" }}>{l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 5% 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div className="hero-grid" style={{ display: "flex", gap: 56, alignItems: "center", justifyContent: "center", flexWrap: "wrap", maxWidth: 1100, width: "100%", margin: "0 auto" }}>
          <div style={{ maxWidth: 620, position: "relative" }}>
            <div className="hero-animate hero-animate-1">
              <span className="section-label">Computer Engineering · Lehigh University · Class of 2027</span>
            </div>

            <h1 className="hero-animate hero-animate-2 serif hero-name" style={{
              fontSize: "clamp(52px, 8vw, 84px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              marginTop: 24,
              color: "#232019",
            }}>
              Josue<br />
              <span style={{ fontStyle: "italic", color: "#8a8374" }}>Benitez</span>
            </h1>

            <p className="hero-animate hero-animate-3 sans" style={{
              fontSize: 17, lineHeight: 1.7, color: "#6b6459",
              maxWidth: 520, marginTop: 28, fontWeight: 300,
            }}>
              Interested in the space between hardware and software: embedded systems, iOS development, and real life systems.
            </p>

            <div className="hero-animate hero-animate-4 hero-btns" style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
              <a className="btn-primary" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer">Resume</a>
              <button className="btn-outline" onClick={() => scrollTo("currently")}>What I'm Up To</button>
              <a className="btn-outline" href="https://www.linkedin.com/in/josue-benitez/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn-outline" href="https://github.com/jbenitez2005" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>

          <div className="hero-animate hero-animate-3" style={{
            width: 300, aspectRatio: "4 / 5", borderRadius: 18, flexShrink: 0,
            border: "1px solid #e7e2d6", background: "#ffffff",
            overflow: "hidden",
          }}>
            <img src={heroPhoto} alt="Josue Benitez" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4,
        }}>
          <span className="sans" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a8374" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #8a8374, transparent)" }} />
        </div>
      </section>

      {/* CURRENTLY */}
      <section id="currently" style={{ padding: "40px 5% 80px", maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-label">Currently</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginTop: 20 }}>
          {CURRENT_ITEMS.map((item) => (
            <div key={item.title} style={{ display: "flex", gap: 12, alignItems: "flex-start", flex: "1 1 260px" }}>
              <span className="dot" style={{ background: item.color, marginTop: 7, flexShrink: 0 }} />
              <div>
                <p className="sans" style={{ fontSize: 14, color: "#232019", fontWeight: 500, marginBottom: 4 }}>{item.title}</p>
                <p className="sans" style={{ fontSize: 13, lineHeight: 1.6, color: "#6b6459", fontWeight: 300 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#e7e2d6" }} />

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-label">About</span>
            <h2 className="serif" style={{ fontSize: 36, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              A bit about me
            </h2>
          </div>
          <div>
            <p className="sans" style={{ fontSize: 16, lineHeight: 1.85, color: "#6f6858", fontWeight: 300, marginBottom: 24 }}>
              I'm a Computer Engineering student at <span style={{ color: "#232019" }}>Lehigh University</span> (Class of <span style={{ color: "#232019" }}>2027</span>). Most of my work sits somewhere between hardware and software — Verilog on an FPGA one week, Swift shipping to production the next.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
              {["Debugging", "Hands-on Hardware", "Technical Docs", "Fast Learner", "Cross-functional Collab"].map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#83786a", fontWeight: 300, marginBottom: 20 }}>
              Outside of engineering, I build model kits, cook (steak's my specialty), lift weights, and hike — most recently at Yosemite.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 160, height: 160, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                <img src={gundamPhoto} alt="Model kit I built" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ width: 160, height: 160, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                <img src={steakPhoto} alt="Steak I cooked" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ width: 160, height: 160, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                <img src={hikePhoto} alt="Hiking at Yosemite" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#e7e2d6" }} />

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-label">Experience</span>
        <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", marginBottom: 48 }}>
          Where I've worked
        </h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {EXPERIENCES.map((exp) => (
            <div key={exp.company} className="exp-card" style={exp.featured ? { gridColumn: "1 / -1", borderColor: `${exp.color}40` } : {}}>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 380px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
                    <div>
                      <CompanyBadge text={exp.badge} color={exp.color} logo={exp.logo} />
                      {!exp.logoHasText && (
                        <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, letterSpacing: "-0.02em", color: "#232019" }}>{exp.company}</h3>
                      )}
                      <p className="sans" style={{ fontSize: 14, color: "#6b6459", marginTop: exp.logoHasText ? 12 : 4 }}>{exp.role}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="tag" style={exp.ongoing ? { color: exp.color, borderColor: `${exp.color}40` } : {}}>{exp.period}</span>
                      <p className="sans" style={{ fontSize: 12, color: "#9c9484", marginTop: 8 }}>{exp.location}</p>
                    </div>
                  </div>
                  <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#6b6459", fontWeight: 300, marginBottom: 20 }}>
                    {exp.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                {exp.screenshot && (
                  <div style={{ flexShrink: 0, width: 160, margin: "0 auto" }}>
                    <div style={{
                      border: "6px solid #232019", borderRadius: 24, overflow: "hidden",
                      boxShadow: "0 16px 32px rgba(35,32,25,0.14)",
                    }}>
                      <img src={exp.screenshot} alt="eduroam onboarding screen in the Hatch app" style={{ width: "100%", display: "block" }} />
                    </div>
                    <p className="sans" style={{ fontSize: 11, color: "#9c9484", textAlign: "center", marginTop: 10 }}>
                      The eduroam onboarding screen, live in the app
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginTop: 28, paddingTop: 24, borderTop: "1px solid #e7e2d6" }}>
          <span className="sans" style={{ fontSize: 12, color: "#9c9484" }}>{EARLY_EXPERIENCE.company}</span>
          <span className="sans" style={{ fontSize: 12, color: "#9c9484" }}>·</span>
          <span className="sans" style={{ fontSize: 12, color: "#9c9484" }}>{EARLY_EXPERIENCE.role}</span>
          <span className="sans" style={{ fontSize: 12, color: "#9c9484" }}>·</span>
          <span className="sans" style={{ fontSize: 12, color: "#9c9484" }}>{EARLY_EXPERIENCE.period}</span>
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#e7e2d6" }} />

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-label">Projects</span>
        <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", marginBottom: 48 }}>
          Things I've built
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className="card project-card"
              onClick={() => setSelectedProject(proj)}
              style={{ display: "flex", flexDirection: "column", borderTop: `3px solid ${proj.color}`, padding: proj.images ? 0 : 32, overflow: "hidden", cursor: "pointer" }}
            >
              {proj.images && (
                <div style={{ height: 190, overflow: "hidden", background: `${proj.color}0d` }}>
                  <img src={proj.images[0]} alt={proj.title} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
              )}
              <div style={{ padding: proj.images ? "24px 28px 28px" : 0, display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                  <span className="sans" style={{ fontSize: 11, color: "#9c9484", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {proj.category}
                  </span>
                  {proj.status && (
                    <span className="tag" style={{ color: proj.color, borderColor: `${proj.color}40` }}>{proj.status}</span>
                  )}
                </div>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, letterSpacing: "-0.01em", color: "#232019", marginBottom: 12 }}>
                  {proj.title}
                </h3>
                <p className="sans" style={{ fontSize: 13, lineHeight: 1.75, color: "#8a8374", fontWeight: 300, flex: 1, marginBottom: 20 }}>
                  {proj.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <span className="sans" style={{ fontSize: 12, fontWeight: 600, color: proj.color }}>
                  View project →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#e7e2d6" }} />

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <span className="section-label">Skills</span>
        <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", marginBottom: 48 }}>
          Tools of the trade
        </h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {SKILLS.map((group) => (
            <div key={group.category} className="card">
              <span className="sans" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#83786a", marginBottom: 20, display: "block" }}>
                {group.category}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map(item => (
                  <span key={item} className="skill-chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#e7e2d6" }} />

      {/* LEADERSHIP */}
      <section id="leadership" style={{ padding: "100px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-label">Leadership</span>
            <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, marginTop: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Beyond the<br /><em style={{ color: "#8a8374" }}>lab</em>
            </h2>
          </div>
          <div className="exp-card">
            <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 20, height: 200 }}>
              <img src={clubPhoto} alt="Fuerza Mexicana Club" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", display: "block" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
              <div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, color: "#232019" }}>President</h3>
                <p className="sans" style={{ fontSize: 14, color: "#6b6459", marginTop: 4 }}>Fuerza Mexicana Club · Bethlehem, PA</p>
              </div>
              <span className="tag">Founding Board Member</span>
            </div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#6b6459", fontWeight: 300 }}>
              Founding executive board member helping plan cultural events, coordinate logistics, communicate with student organizations, and showcase Mexican culture and diversity on campus.
            </p>
          </div>
        </div>
      </section>

      <div style={{ width: "90%", margin: "0 auto", height: 1, background: "#e7e2d6" }} />

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px 5% 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
        }} />
        <span className="section-label">Contact</span>
        <h2 className="serif" style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 400, letterSpacing: "-0.03em", marginTop: 16, marginBottom: 16 }}>
          Let's build something<br /><em style={{ color: "#8a8374" }}>together</em>
        </h2>
        <p className="sans" style={{ fontSize: 16, color: "#6b6459", fontWeight: 300, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
          Open to full-time opportunities and internships in embedded systems, software engineering, hardware, and wearable tech.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
          <a className="btn-primary" href="mailto:jbenitez6191@gmail.com">Send an Email</a>
          <a className="btn-outline" href="https://www.linkedin.com/in/josue-benitez/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn-outline" href="https://github.com/jbenitez2005" target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn-outline" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer">Resume PDF</a>
        </div>
        <p className="sans" style={{ fontSize: 13, color: "#a89f8d" }}>
          jbenitez6191@gmail.com · Mountain View, CA
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e7e2d6", padding: "24px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span className="serif" style={{ fontSize: 16, color: "#a89f8d" }}>Josue Benitez</span>
        <span className="sans" style={{ fontSize: 12, color: "#a89f8d", letterSpacing: "0.05em" }}>
          Computer engineer, occasional chef, professional debugger
        </span>
      </footer>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            {selectedProject.images && (
              <div style={{ display: "flex", flexDirection: "column", gap: 2, background: `${selectedProject.color}0d` }}>
                {selectedProject.images.map((src, i) => (
                  <img key={i} src={src} alt={`${selectedProject.title} photo ${i + 1}`} style={{ width: "100%", height: "auto", display: "block" }} />
                ))}
              </div>
            )}
            <div style={{ padding: 36 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
                <span className="sans" style={{ fontSize: 11, color: "#9c9484", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {selectedProject.category}
                </span>
                <button onClick={() => setSelectedProject(null)} className="sans" style={{
                  background: "#f6f3ec", border: "1px solid #e5dfd1", borderRadius: "50%",
                  width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#6b6459", flexShrink: 0,
                }}>×</button>
              </div>
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, letterSpacing: "-0.01em", color: "#232019", marginBottom: 12 }}>
                {selectedProject.title}
              </h3>
              {selectedProject.status && (
                <span className="tag" style={{ color: selectedProject.color, borderColor: `${selectedProject.color}40`, marginBottom: 16, display: "inline-block" }}>
                  {selectedProject.status}
                </span>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {selectedProject.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

              {[
                ["The Challenge", selectedProject.challenge],
                ["How I Built It", selectedProject.approach],
                ["Debugging & Problem-Solving", selectedProject.debugging],
                ["What I Learned", selectedProject.learned],
              ].map(([label, text]) => text && (
                <div key={label} style={{ marginBottom: 24 }}>
                  <h4 className="sans" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: selectedProject.color, marginBottom: 8 }}>
                    {label}
                  </h4>
                  <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#6b6459", fontWeight: 300 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
