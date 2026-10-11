import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  ExternalLink,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react'
import './styles.css'

const projects = [
  {
    "id": "waypoint",
    "title": "WAYPOINT",
    "oldTitle": "PASSAGE",
    "type": "Trade compliance platform",
    "category": "Product",
    "description": "A trade-compliance tool that helps African businesses check shipment readiness, resolve blockers, and compile a digital shipment passport.",
    "tags": [
      "React",
      "TypeScript",
      "Supabase",
      "Gemini"
    ],
    "accent": "lime",
    "visual": "waypoint",
    "repository": "salzyff/Waypoint",
    "link": "https://waypointdemo.vercel.app",
    "linkLabel": "Visit Waypoint",
    "details": [
      "Shipment readiness checks",
      "Blocker detection and resolution",
      "Digital shipment passport",
      "Rules explorer and corridor simulator"
    ],
    "number": "01",
    "image": "/images/projects/waypoint.jpg",
    "imageAlt": "WAYPOINT website screenshot"
  },
  {
    "id": "study-ai",
    "title": "Study AI",
    "type": "AI learning platform",
    "category": "Education",
    "description": "A study assistant with AI chat, conversation memory, study plans, quizzes, flashcards, notes, and progress tracking.",
    "tags": [
      "React",
      "Node.js",
      "Supabase",
      "Gemini"
    ],
    "accent": "blue",
    "visual": "study",
    "repository": "salzyff/ai-study-assistant",
    "privateSource": true,
    "link": "https://www.studyai.name.ng",
    "linkLabel": "Visit Study AI",
    "details": [
      "AI chat with conversation memory",
      "Private chat history and user accounts",
      "Study plans, notes, and flashcards",
      "Interactive quizzes and learning progress"
    ],
    "number": "02",
    "image": "/images/projects/study-ai.jpg",
    "imageAlt": "Study AI website screenshot"
  },
  {
    "id": "examora",
    "title": "Examora",
    "type": "Exam management system",
    "category": "Education",
    "description": "An exam application for students, teachers, and administrators, with assessments, question banks, results, and school dashboards.",
    "tags": [
      "React",
      "Supabase",
      "Auth",
      "Vercel"
    ],
    "accent": "violet",
    "visual": "examora",
    "repository": "salzyff/Examora",
    "privateSource": true,
    "link": "https://examora-navy.vercel.app",
    "linkLabel": "Visit Examora",
    "details": [
      "Student, teacher, and admin roles",
      "Timed exams and scoring",
      "Question bank and assessment builder",
      "Report cards and learning resources"
    ],
    "number": "03",
    "image": "/images/projects/examora.jpg",
    "imageAlt": "Examora sign-in page screenshot"
  },
  {
    "id": "blaykik",
    "title": "Blaykik Store",
    "type": "Food brand storefront",
    "category": "Commerce",
    "description": "A product-led website for a Nigerian food brand, showcasing Ijebu garri, palm oil, pantry staples, and custom branded packs.",
    "tags": [
      "React",
      "Vite",
      "Branding",
      "Responsive UI"
    ],
    "accent": "green",
    "visual": "blaykik",
    "repository": "salzyff/blaykik-store",
    "privateSource": true,
    "link": "https://blaykik-preview.vercel.app",
    "linkLabel": "Visit website",
    "details": [
      "Ijebu garri, palm oil, and foodstuffs",
      "Product-led visual storytelling",
      "Custom branded pack enquiries",
      "Responsive brand and contact pages"
    ],
    "number": "04",
    "image": "/images/projects/blaykik.jpg",
    "imageAlt": "Blaykik Store website screenshot"
  },
  {
    "id": "akapsys",
    "title": "Akapsys Consultancy",
    "type": "Service website",
    "category": "Client work",
    "description": "A consultancy website that helps manufacturers, importers, and brand owners understand product registration and prepare their next steps.",
    "tags": [
      "React",
      "CSS",
      "UX writing",
      "Responsive UI"
    ],
    "accent": "teal",
    "visual": "akapsys",
    "repository": "salzyff/project2",
    "link": "https://project267.vercel.app",
    "linkLabel": "Visit website",
    "details": [
      "Product-specific regulatory pathways",
      "Services and process sections",
      "FAQ and contact pathways",
      "Documentation and registration guidance"
    ],
    "number": "05",
    "image": "/images/projects/akapsys.jpg",
    "imageAlt": "Akapsys Consultancy website screenshot"
  },
  {
    "id": "wearayo",
    "title": "WearAyo",
    "type": "Sneaker storefront",
    "category": "Commerce",
    "description": "A sneaker storefront with brand-new and pre-loved collections, a shopping bag, and a sample WhatsApp order flow.",
    "tags": [
      "React",
      "Vite",
      "Storefront",
      "Responsive UI"
    ],
    "accent": "orange",
    "visual": "fashion",
    "repository": "salzyff/wearayo",
    "link": "https://wearayo.vercel.app",
    "linkLabel": "Visit website",
    "details": [
      "Brand-new and pre-loved sneaker filters",
      "Add and remove pairs from the bag",
      "Sample WhatsApp order flow",
      "Responsive navigation and signup feedback"
    ],
    "number": "06",
    "image": "/images/projects/wearayo.jpg",
    "imageAlt": "WearAyo website screenshot"
  },
  {
    "id": "monica",
    "title": "Monica Seafood",
    "type": "Seafood storefront",
    "category": "Commerce",
    "description": "A seafood and Nigerian pantry storefront with product filters, an enquiry basket, and a WhatsApp flow for confirming prices and availability.",
    "tags": [
      "React",
      "Vite",
      "Local storage",
      "WhatsApp"
    ],
    "accent": "teal",
    "visual": "seafood",
    "repository": "salzyff/monica-seafood",
    "link": "https://monica-seafood.vercel.app",
    "linkLabel": "Visit website",
    "details": [
      "Seafood and pantry product filters",
      "Persistent basket and quantity controls",
      "Delivery details and product preferences",
      "WhatsApp availability and price enquiries"
    ],
    "number": "07",
    "image": "/images/projects/monica.jpg",
    "imageAlt": "Monica Seafood website screenshot"
  },
  {
    "id": "ejire",
    "title": "Ejire Onigarri",
    "type": "Food brand website",
    "category": "Commerce",
    "description": "A plum-and-blush website for a Nigerian garri brand, with product collections, serving ideas, souvenir requests, and an enquiry bag.",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "WhatsApp"
    ],
    "accent": "rose",
    "visual": "garri",
    "repository": "salzyff/ejiregarri",
    "link": "https://ejiregarri.vercel.app",
    "linkLabel": "Visit website",
    "details": [
      "Product collections and founder story",
      "Serving-idea tabs and FAQ",
      "Souvenir and bulk enquiry forms",
      "Persistent bag with WhatsApp and email enquiries"
    ],
    "number": "08",
    "image": "/images/projects/ejire.jpg",
    "imageAlt": "Ejire Onigarri website screenshot"
  }
]

const projectCount = String(projects.length).padStart(2, '0')
const filters = ['All', ...new Set(projects.map((project) => project.category))]

function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const visibleProjects = useMemo(() => activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter), [activeFilter])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <div className="grain" />
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('top')} aria-label="Back to top">
          <span className="brand-mark">S<span>.</span></span>
          <span>AKAPO ABDUL SALAM</span>
        </button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
        <button className="header-cta" onClick={() => scrollTo('contact')}>
          Let’s talk <ArrowUpRight size={15} />
        </button>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Independent developer · Nigeria</div>
            <h1>I turn bold ideas into <em>useful</em> digital products.</h1>
            <p className="hero-intro">I’m Akapo Abdul Salam — a React developer building thoughtful interfaces, practical tools, and brand experiences for the web.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo('work')}>Explore my work <ArrowDownRight size={18} /></button>
              <button className="text-button" onClick={() => scrollTo('about')}>A little about me <ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="hero-art hero-portrait">
            <figure className="portrait-frame">
              <img src="/images/akapo-abdul-salam.jpg" alt="Akapo Abdul Salam" width="1080" height="1920" fetchPriority="high" decoding="async" />
              <figcaption><span>AKAPO ABDUL SALAM</span><small>React developer · Nigeria</small></figcaption>
            </figure>
            <div className="portrait-projects"><strong>{projectCount}</strong><span>selected projects</span></div>
          </div>
        </section>

        <section className="marquee" aria-label="Skills">
          <div className="marquee-track"><span>REACT</span><b>✳</b><span>PRODUCT THINKING</span><b>✳</b><span>RESPONSIVE UI</span><b>✳</b><span>BUILD IN PUBLIC</span><b>✳</b><span>REACT</span><b>✳</b><span>PRODUCT THINKING</span><b>✳</b><span>RESPONSIVE UI</span><b>✳</b><span>BUILD IN PUBLIC</span><b>✳</b></div>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <div><p className="kicker">Selected work / 2026</p><h2>Things I’ve <em>built.</em></h2></div>
            <p className="section-note">Web apps, brand websites, and storefronts — all with repositories in my GitHub account.</p>
          </div>
          <div className="filter-row" role="tablist" aria-label="Filter projects">
            {filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter active' : 'filter'} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div className="about-stamp"><span>BUILD<br />WITH<br /><i>intent.</i></span><div className="stamp-ring" /></div>
          <div className="about-copy">
            <p className="kicker">A little context</p>
            <h2>More than just<br /><em>pretty screens.</em></h2>
            <p>I care about the moment a product stops feeling like an idea and starts feeling real. My work usually sits at the intersection of good interface design, clear user journeys, and technology that actually solves something.</p>
            <p>From school systems and AI tools to commerce brands and trade infrastructure, I like building across different worlds — and learning what each one needs.</p>
            <div className="about-facts"><span><strong>{projectCount}</strong> repositories featured</span><span><strong>React</strong> main toolkit</span><span><strong>NG</strong> building from Nigeria</span></div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-inner">
            <div><p className="kicker">Have an idea?</p><h2>Let’s make it<br /><em>worth clicking.</em></h2></div>
            <div className="contact-side"><p>Whether you need a product prototype, a sharp brand website, or help turning a messy idea into a clear experience, I’d love to hear about it.</p><button className="button button-light" onClick={() => window.location.href = 'mailto:?subject=Project%20idea%20for%20Akapo%20Abdul%20Salam'}>Start a conversation <ArrowUpRight size={18} /></button></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>© 2026 AKAPO ABDUL SALAM</span><span>Built with React & curiosity</span><button onClick={() => scrollTo('top')}>Back to top <ArrowUpRight size={14} /></button></footer>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function ProjectCard({ project, onOpen }) {
  return <article className={`project-card accent-${project.accent}`} onClick={() => onOpen(project)} tabIndex="0" onKeyDown={(event) => event.key === 'Enter' && onOpen(project)}>
    <div className="card-visual"><ProjectVisual project={project} /><span className="card-number">{project.number}</span><span className="open-card"><MoveUpRight size={18} /></span></div>
    <div className="card-content"><div className="card-meta"><span>{project.type}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
  </article>
}

function ProjectModal({ project, onClose }) {
  return <div className="modal-backdrop" onClick={onClose}><div className={`modal accent-${project.accent}`} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${project.title} details`}>
    <button className="modal-close" onClick={onClose} aria-label="Close project details"><X size={20} /></button>
    <div className="modal-visual"><ProjectVisual project={project} large /></div>
    <div className="modal-body"><p className="kicker">{project.number} / {project.type}</p><h2>{project.title}</h2>{project.oldTitle && <p className="old-title">Previously called {project.oldTitle}</p>}<p className="modal-description">{project.description}</p><div className="details-list">{project.details.map((detail) => <span key={detail}><Check size={15} />{detail}</span>)}</div><div className="modal-bottom">{project.privateSource ? <p className="source-note">Source code is in a private GitHub repository.</p> : <a className="source-link" href={`https://github.com/${project.repository}`} target="_blank" rel="noreferrer">View GitHub repository <ExternalLink size={14} /></a>}<div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.link ? <a className="button button-primary" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ExternalLink size={16} /></a> : <button className="button button-primary" onClick={onClose}>Close details <X size={16} /></button>}</div></div>
  </div></div>
}

function ProjectVisual({ project, large = false }) {
  return <img className={large ? 'project-screenshot large' : 'project-screenshot'} src={project.image} alt={project.imageAlt} width="1348" height="926" loading={large ? 'eager' : 'lazy'} decoding="async" />
}

createRoot(document.getElementById('root')).render(<App />)
