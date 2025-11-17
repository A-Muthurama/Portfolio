import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaHackerrank, FaBars, FaTimes } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import "../App.css";

const roles = [
  "Developer",
  "Data Analyst",
  "Machine Learning Engineer"
];

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [fade, setFade] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [status, setStatus] = useState(""); // to show success/error messages
  const particleRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth * dpr;
    const height = canvas.offsetHeight * dpr;
    canvas.width = width;
    canvas.height = height;
    ctx.scale(dpr, dpr);
    const PARTICLE_COUNT = 32;
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: 1.5 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: 0.3 + Math.random() * 0.5,
      color: [
        "rgba(99,102,241,",
        "rgba(129,140,248,",
        "rgba(236,72,153,",
        "rgba(16,185,129,",
        "rgba(251,191,36,"
      ][Math.floor(Math.random() * 5)]
    }));
    function animate() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowColor = `${p.color}1)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.dy *= -1;
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/myzpazzj", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("Thank you for reaching out. Your message has been successfully sent✅");
        form.reset(); // clear form
      } else {
        setStatus("❌ Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("❌ Error! Please check your connection.");
    }
  };

  return (
    <div>
      <nav className="navbar">
  <h1 href="#about"className="logo">MUTHURAMA A</h1>

  <div className="mobile-actions">
    
    <div className="menu-icon" onClick={toggleMenu}>
      {navOpen ? <FaTimes /> : <FaBars />}
    </div>
  </div>

  <ul className={`nav-links ${navOpen ? "open" : ""}`}>
    <li><a href="#about">About</a></li>
    <li><a href="#education">Education</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#profiles">Profiles</a></li>
    <li><a href="#contactt">Contact</a></li>
  </ul>

  {/* For desktop mode only */}
  
</nav>


      <div className="container">
        <section id="about" className="section about-section" style={{ position: 'relative' }}>
          <canvas ref={particleRef} className="about-particles-bg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
          <div className="about-card" style={{ position: 'relative', zIndex: 1 }}>
            <div className="about-img-wrapper">
              <img src="/Muthurama.jpg" alt="Profile" className="profile-img-large" />
            </div>
            <div className="about-info">
              <h2 className="about-title">I'm <span className={`about-role-rotate${fade ? ' fade-in' : ' fade-out'}`}>a {roles[currentRole]}</span></h2>
              <p>
                I have a strong passion for data analysis, software development, and AI-driven solutions. Constantly learning and experimenting, I aim to contribute to innovative tech teams and make a meaningful impact through technology.
              </p>
              <a href="/resume.pdf" download className="download-btn-modern">
                📄 Download Resume
              </a>
            </div>
          </div>
        </section>

        <section id="education" className="section">
          <h2>Education</h2>
          <div className="education-header">
          <div className="education-timeline">
            <div className="education-step">
              <span className="edu-emoji" role="img" aria-label="Graduation Cap">🎓</span>
              <div className="education-step-content">
                <div className="edu-year">2020</div>
                <h3>SSLC</h3>
                <p>Sree Aadhitya Matriculation School, Chennai</p>
                <p><strong>Percentage:</strong> 99.2%</p>
              </div>
            </div>
            <div className="education-step">
              <span className="edu-emoji" role="img" aria-label="Graduation Cap">🎓</span>
              <div className="education-step-content">
                <div className="edu-year">2021-2022</div>
                <h3>HSC</h3>
                <p>Girls Higher Secondary School, Chennai</p>
                <p><strong>Percentage:</strong> 92.63%</p>
              </div>
            </div>
            <div className="education-step">
              <span className="edu-emoji" role="img" aria-label="Graduation Cap">🎓</span>
              <div className="education-step-content">
                <div className="edu-year">2022 - Present</div>
                <h3>B.E. CSE (AI & ML)</h3>
                <p>Sri Sairam Engineering College, Chennai</p>
                <p><strong>CGPA:</strong> 8.56</p>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <h2>Projects</h2>
          <div className="project-grid">
            <div className="project-box">
              <h3>📈 Stock Price Prediction</h3>
              <p style={{ fontFamily: 'Arial, sans-serif' }}>Developed an ML-powered app using LSTM & Linear Regression to forecast stock prices with real-time API data, featuring an interactive Streamlit dashboard for trend visualization and predictions.</p>
              <a href="https://github.com/A-Muthurama/Stock_Price_prediction" target="_blank"><h4>View on GitHub </h4></a>
            </div>
            <div className="project-box">
              <h3>📊 Power BI Dashboard</h3>
              <p style={{ fontFamily: 'Arial, sans-serif' }}>Developed interactive dashboards for HR & Olympics datasets with KPIs, slicers, and drill-through insights; implemented data cleaning and DAX calculations to enable trend analysis and performance tracking.</p>
              <a href="https://github.com/A-Muthurama/Power-bi-Dashboards" target="_blank"> <h4>View on GitHub </h4></a>
            </div>
            <div className="project-box">
              <h3>(🎧 Spotify + Zepto) Data Analysis</h3>
              <p style={{ fontFamily: 'Arial, sans-serif' }}>Designed and executed complex SQL queries on Spotify dataset to analyze song popularity, audio features, and genre-based trends. Performed data extraction, filtering, aggregation, and joins to generate meaningful insights on track performance and user listening behavior.</p>
              <a href="https://github.com/A-Muthurama/Data-Analysis-projects" target="_blank"><h4>View on GitHub </h4></a>
            </div>
            <div className="project-box">
              <h3>🧠 Flashcard Quiz App</h3>
              <p style={{ fontFamily: 'Arial, sans-serif' }}>A full-stack web app for creating, studying, and sharing flashcards. Features include Google authentication, dark mode, background music, flip-card animations, and the ability to create, edit, and delete cards. Users can export/import decks and access them across devices. Built with React, Node.js, MongoDB, and Firebase Auth, and deployed on Vercel.</p>
              <a href="https://github.com/A-Muthurama/Flashcard-app" target="_blank"><h4>View on GitHub </h4></a> | <a href="https://flashcard-app-plum.vercel.app/" target="_blank">Live</a>
            </div>
          </div>
        </section>
                <section id="skills" className="section skills-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Programming Languages</h3>
              <ul className="skill-list">
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"  alt="Python" />Python</li>
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"  alt="C++"/> C++ </li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Frontend</h3>
              <ul className="skill-list">
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="24" alt="HTML" /> HTML</li>
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="24" alt="CSS" /> CSS</li>
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="24" alt="JavaScript" /> JavaScript</li>
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="24" alt="React" /> React.js</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Backend</h3>
              <ul className="skill-list">
                <li><img src="https://www.svgrepo.com/show/508915/flask.svg" width="24" alt="Flask" /> Flask</li>
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"  alt="FastAPI" /> FastAPI</li>
                <li><img src="https://icon.icepanel.io/Technology/svg/Streamlit.svg" alt="Streamlit" /> Streamlit</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Data Analysis & Visualization</h3>
              <ul className="skill-list">
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"  alt="Pandas" /> Pandas</li>
                <li><img src="https://seaborn.pydata.org/_static/logo-wide-lightbg.svg"  alt="Seaborn" /> Seaborn</li>
                <li><img src="https://img.icons8.com/color/48/000000/power-bi.png"  alt="Power BI" /> Power BI</li>
                <li><img src="https://img.icons8.com/color/48/000000/tableau-software.png"  alt="Tableau" /> Tableau</li>
                <li><img src="https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png" alt="Excel" /> Excel</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Databases</h3>
              <ul className="skill-list">
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="24" alt="MySQL" /> MySQL</li>
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="24" alt="PostgreSQL" /> PostgreSQL</li>
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="24" alt="MongoDB" /> MongoDB</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Version Control & Platforms</h3>
              <ul className="skill-list">
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="24" alt="GitHub" /> GitHub</li>
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="24" alt="Git" /> Git</li>
                 <li><img src="https://www.svgrepo.com/show/373595/firebase.svg" width="24" alt="Git" /> Git</li>
                <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="24" alt="VS Code" /> VS Code</li>
                <li><img src="https://img.icons8.com/color/48/000000/google-colab.png" width="24" alt="Google Colab" /> Google Colab</li>
              </ul>
            </div>
            <div className="skill-card">
              <h3>Technologies</h3>
              <ul className="skill-list">
                <li><img src="https://img.icons8.com/fluency/48/000000/artificial-intelligence.png" width="24" alt="ML" /> Machine Learning</li>
                <li><img src="https://www.svgrepo.com/show/530445/data-analysis.svg" width="24" alt="DA" /> Data Analysis</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <h2>Experience / Internships</h2>
          <div className="experience-grid">
            <div className="experience-card">
              <h3>Machine learning Intern</h3>
              <h4>Sri Sairam Techno Incubator Foundation </h4>
              <p className="duration">June 2024 – July 2024</p>
              <p>During my internship, I engineered an AI-driven welding inspection system that achieved 90% accuracy in defect detection automation. I optimized the data acquisition, model training, and inference pipeline, which improved detection efficiency by 20%. Additionally, I enhanced the loss functions, reducing false positives by 20% and significantly boosting the model’s precision.</p>
            </div>
            <div className="experience-card">
              <h3>Web development</h3>
              <h4>Maestrominds</h4>
              <p className="duration">Jan 2025 – Feb 2025</p>
              <p>Event Management Platform – Designed a scalable platform that reduced manual effort by 40% and improved planning efficiency. Integrated interactive features to boost engagement by 25%, and built a responsive web interface with HTML, CSS, and JavaScript within 10 days.</p>
            </div>
            <div className="experience-card">
              <h3>AI & ML Intern</h3>
              <h4>Sri Sairam Techno Incubator Foundation</h4>
              <p className="duration">June 2025 – Present</p>
              <p>Currently working on AI/ML projects, focusing on real-time model training, optimization, and deployment to improve performance and practical applications..</p>
            </div>
          </div>
        </section>

        <section id="profiles" className="section social-section">
          <h2>My Profiles</h2>
          <div className="profile-grid">
            <div className="profile-card">
              <a href="https://github.com/A-Muthurama" target="_blank" rel="noopener noreferrer">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width="66" className="profile-icon" />
                <p>GitHub</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/muthurama-a-307186249/" target="_blank" rel="noopener noreferrer">
                 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" width="66" className="profile-icon" />
                <p>LinkedIn</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://leetcode.com/u/A-Muthurama/" target="_blank" rel="noopener noreferrer">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" width="66" className="profile-icon" />
                <p>LeetCode</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.geeksforgeeks.org/user/iammuthivyk/" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" alt="GeeksforGeeks" width="86" className="profile-icon" />
                <p>Geeksforgeeks</p>
              </a>
            </div>
          </div>
        </section>
         {/* Message Me Button (after Profiles section) */}
<div style={{ textAlign: "center", marginTop: "2rem" }}>
  <button
   onClick={() => setShowContact(prev => !prev)}
    className="message-me-btn"
    id="contactt"
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "8px",
      backgroundColor: "#6366f1",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
    }}
  >
    ✉️ Message Me
  </button>
</div>

        {showContact && (
  <section id="contact" className="section contact-section">
    <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="your@email.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" placeholder="+91 6369XXXXXX" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="4" placeholder="Your message..." required></textarea>
        </div>
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
        {status && <p className="form-status">{status}</p>}
  </section>
)}


        <button onClick={scrollToTop} className="scroll-to-top" title="Go to top">⬆️</button>
        <footer className="footer">
          <p>© {new Date().getFullYear()} A.Muthurama. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;

