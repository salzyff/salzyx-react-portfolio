import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Globe2,
  Layers3,
  Menu,
  MessageCircle,
  MoveUpRight,
  Sparkles,
  X,
} from 'lucide-react'
import './styles.css'

const projects = [
  {
    id: 'waypoint',
    number: '01',
    title: 'WAYPOINT',
    oldTitle: 'PASSAGE',
    type: 'Product prototype',
    status: 'Prototype only',
    category: 'Product',
    year: '2026',
    description: 'A trade-compliance compiler that helps African businesses test whether a shipment is ready before it leaves the warehouse.',
    tags: ['React', 'Supabase', 'Rules engine'],
    accent: 'lime',
    visual: 'waypoint',
    link: null,
    linkLabel: 'Case study',
    details: ['Shipment readiness checks', 'Blocker detection and resolution', 'Digital shipment passport', 'Built around African trade corridors'],
  },
  {
    id: 'study-ai',
    number: '02',
    title: 'Study AI',
    type: 'AI learning platform',
    status: 'MVP built',
    category: 'Product',
    year: '2026',
    description: 'A multi-subject study assistant with AI chat, private history, study plans, quizzes, flashcards, notes, and progress tracking.',
    tags: ['React', 'Node.js', 'Supabase', 'Gemini'],
    accent: 'blue',
    visual: 'study',
    link: 'https://studyaing.vercel.app',
    linkLabel: 'Visit Study AI',
    details: ['Explain, ask, and quiz modes', 'Auth and user-isolated data', 'AI tasks and study plans', 'Interactive quizzes with marking'],
  },
  {
    id: 'examora',
    number: '03',
    title: 'Examora',
    type: 'Exam management system',
    status: 'Complete build',
    category: 'Education',
    year: '2026',
    description: 'A full-stack exam application for students, teachers, and administrators, designed around real school workflows.',
    tags: ['React', 'Supabase', 'Auth', 'Vercel'],
    accent: 'violet',
    visual: 'examora',
    link: null,
    linkLabel: 'Case study',
    details: ['Student, teacher, and admin roles', 'Timed exams and server-side scoring', 'Question bank and assessment builder', 'Results, announcements, and dashboards'],
  },
  {
    id: 'salams-store',
    number: '04',
    title: "Salam’s Store",
    type: 'Commerce storefront',
    status: 'In progress',
    category: 'Commerce',
    year: '2026',
    description: 'A warm, fast storefront for everyday Nigerian groceries with product discovery, categories, cart flows, and delivery messaging.',
    tags: ['React', 'Vite', 'Tailwind', 'E-commerce'],
    accent: 'orange',
    visual: 'store',
    link: null,
    linkLabel: 'View build',
    details: ['Local grocery product catalogue', 'Cart and account experience', 'Responsive storefront shell', 'Nigerian pricing and delivery context'],
  },
  {
    id: 'blaykik',
    number: '05',
    title: 'Blaykik Store',
    type: 'Brand showcase',
    status: 'Complete build',
    category: 'Commerce',
    year: '2026',
    description: 'A cream-and-dark-green product showcase for an authentic Nigerian food brand operating across Abuja and Atlanta.',
    tags: ['React', 'Vite', 'Branding', 'Responsive UI'],
    accent: 'green',
    visual: 'blaykik',
    link: 'https://www.instagram.com/blaykik_store/',
    linkLabel: 'View brand',
    details: ['Premium Ijebu garri and palm oil', 'Product-led visual storytelling', 'Custom branding presentation', 'Instagram-led contact journey'],
  },
  {
    id: 'akapsys',
    number: '06',
    title: 'Akapsys Consultancy',
    type: 'Service website',
    status: 'Shipped',
    category: 'Client work',
    year: '2026',
    description: 'A conversion-focused consultancy website for product registration in Nigeria, built to make the process feel clear and approachable.',
    tags: ['React', 'CSS', 'UX writing', 'NAFDAC'],
    accent: 'teal',
    visual: 'akapsys',
    link: 'https://project2-nine-rho.vercel.app/',
    linkLabel: 'Visit website',
    details: ['Services and process sections', 'FAQ and contact pathways', 'Registration-focused messaging', 'WhatsApp call-to-action'],
  },
  {
    id: 'banking',
    number: '07',
    title: 'Banking App',
    type: 'Fintech interface',
    status: 'Complete demo',
    category: 'Product',
    year: '2026',
    description: 'A polished React banking dashboard exploring balances, transfers, transactions, and the everyday rhythm of a financial app.',
    tags: ['React', 'Vite', 'Tailwind', 'UI systems'],
    accent: 'cyan',
    visual: 'banking',
    link: null,
    linkLabel: 'View build',
    details: ['Dashboard and account views', 'Sample transaction data', 'Responsive fintech layout', 'Local demo mode'],
  },
]

const filters = ['All', 'Product', 'Education', 'Commerce', 'Client work']

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
          <div className="hero-art" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="hero-grid" />
            <div className="code-card">
              <div className="code-card-top"><span /><span /><span /><b>build.js</b></div>
              <div className="code-lines">
                <span><i>01</i> <strong>const</strong> idea = <mark>“worth building”</mark></span>
                <span><i>02</i> <strong>const</strong> stack = [<mark>“react”</mark>, <mark>“care”</mark>]</span>
                <span><i>03</i> </span>
                <span><i>04</i> <strong>return</strong> <mark>ship(idea)</mark></span>
              </div>
            </div>
            <div className="floating-tag tag-one"><Sparkles size={14} /> ideas → interface</div>
            <div className="floating-tag tag-two">01—07 <span>selected projects</span></div>
          </div>
        </section>

        <section className="marquee" aria-label="Skills">
          <div className="marquee-track"><span>REACT</span><b>✳</b><span>PRODUCT THINKING</span><b>✳</b><span>RESPONSIVE UI</span><b>✳</b><span>BUILD IN PUBLIC</span><b>✳</b><span>REACT</span><b>✳</b><span>PRODUCT THINKING</span><b>✳</b><span>RESPONSIVE UI</span><b>✳</b><span>BUILD IN PUBLIC</span><b>✳</b></div>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <div><p className="kicker">Selected work / 2026</p><h2>Things I’ve <em>built.</em></h2></div>
            <p className="section-note">A mix of real products, client-facing websites, and experiments that helped me get better at making the web feel more useful.</p>
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
            <div className="about-facts"><span><strong>07</strong> projects explored</span><span><strong>React</strong> main toolkit</span><span><strong>NG</strong> building from Nigeria</span></div>
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
    <div className="card-visual"><ProjectVisual type={project.visual} /><span className="card-number">{project.number}</span><span className="open-card"><MoveUpRight size={18} /></span></div>
    <div className="card-content"><div className="card-meta"><span>{project.type}</span><span className="status"><i />{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
  </article>
}

function ProjectModal({ project, onClose }) {
  return <div className="modal-backdrop" onClick={onClose}><div className={`modal accent-${project.accent}`} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${project.title} details`}>
    <button className="modal-close" onClick={onClose} aria-label="Close project details"><X size={20} /></button>
    <div className="modal-visual"><ProjectVisual type={project.visual} large /></div>
    <div className="modal-body"><p className="kicker">{project.number} / {project.type}</p><h2>{project.title}</h2>{project.oldTitle && <p className="old-title">Previously called {project.oldTitle}</p>}<p className="modal-description">{project.description}</p><div className="details-list">{project.details.map((detail) => <span key={detail}><Check size={15} />{detail}</span>)}</div><div className="modal-bottom"><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.link ? <a className="button button-primary" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ExternalLink size={16} /></a> : <button className="button button-primary" onClick={onClose}>Close details <X size={16} /></button>}</div></div>
  </div></div>
}

function ProjectVisual({ type, large = false }) {
  if (type === 'waypoint') return <div className={`visual-window waypoint ${large ? 'large' : ''}`}><div className="visual-top"><span>WAYPOINT</span><i>ready to compile</i></div><div className="waypoint-body"><div className="route-line"><b>LAGOS</b><span /><b>ACCRA</b></div><div className="compile-status"><strong>SHIPMENT READY</strong><small>12 checks passed · 0 blockers</small></div><div className="mini-bars"><i /><i /><i /><i /></div></div></div>
  if (type === 'study') return <div className={`visual-window study ${large ? 'large' : ''}`}><div className="study-head"><div className="study-avatar">S</div><span>Good afternoon, Salzy</span><b>92%</b></div><div className="study-tiles"><div><small>STUDY STREAK</small><strong>12 days</strong></div><div><small>AI SESSIONS</small><strong>24</strong></div></div><div className="study-chart"><span /><span /><span /><span /><span /><span /><span /><i /></div></div>
  if (type === 'examora') return <div className={`visual-window examora ${large ? 'large' : ''}`}><div className="exam-head"><span>EXAMORA</span><i>student dashboard</i></div><div className="exam-body"><div className="exam-ring"><strong>78</strong><small>average</small></div><div className="exam-list"><span><i />Mathematics <b>84%</b></span><span><i />English Language <b>76%</b></span><span><i />Physics <b>73%</b></span></div></div></div>
  if (type === 'store') return <div className={`visual-window store ${large ? 'large' : ''}`}><div className="store-head"><span>SALAM’S<br /><b>STORE</b></span><i>fresh picks, local favourites</i></div><div className="store-product"><div className="bag-shape">✦</div><div><small>HOUSE FAVOURITE</small><strong>Golden Penny<br />Pasta</strong><b>₦1,650</b></div></div></div>
  if (type === 'blaykik') return <div className={`visual-window blaykik ${large ? 'large' : ''}`}><div className="blay-top"><small>ABUJA ↔ ATLANTA</small><span>BLAYKIK</span></div><div className="blay-product"><div className="blay-bowl">✽</div><div><strong>AUTHENTIC<br />NIGERIAN<br />FLAVOURS</strong><small>PREMIUM IJEBU GARRI</small></div></div></div>
  if (type === 'akapsys') return <div className={`visual-window akapsys ${large ? 'large' : ''}`}><div className="aka-top"><span>A</span><b>AKAPSYS<br /><small>CONSULTANCY</small></b></div><div className="aka-copy"><small>PRODUCT REGISTRATION</small><strong>Get your product<br />ready for market.</strong><div className="aka-line" /></div></div>
  if (type === 'banking') return <div className={`visual-window banking ${large ? 'large' : ''}`}><div className="bank-head"><span>OVERVIEW</span><b>₦2,840,500</b></div><div className="bank-chart"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="bank-bottom"><span>Money in <b>+₦850k</b></span><span>Money out <b>-₦210k</b></span></div></div>
  return null
}

createRoot(document.getElementById('root')).render(<App />)
