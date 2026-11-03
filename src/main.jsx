import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowDownRight, ArrowUpRight, ArrowRight, Check, Menu, Search, X } from 'lucide-react'
import { projects } from './projects'
import './styles.css'

const whatsapp = 'https://wa.me/2347042785091?text=Hi%20Salam%2C%20I%20saw%20your%20portfolio.%20I%27d%20like%20to%20talk%20about%20a%20project.'
const categories = ['All work', 'Applications', 'Commerce', 'Brand websites', 'Experiments']
const pad = (value) => String(value).padStart(2, '0')

function App() {
  const [filter, setFilter] = useState('All work')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const visible = projects.filter((p) =>
    (filter === 'All work' || p.category === filter) &&
    `${p.title} ${p.type} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase().trim()),
  )
  const featured = visible.filter((p) => p.featured)
  const more = visible.filter((p) => !p.featured)

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header page-width" id="top">
      <a className="brand" href="#top" aria-label="Salam Akapo home"><span className="brand-mark">S<span>.</span></span><span className="brand-name">SALAM AKAPO<small>Developer / Nigeria</small></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <a href="#work" onClick={() => setMenuOpen(false)}>Work <sup>{pad(projects.length)}</sup></a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a className="nav-contact" href={whatsapp} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a>
      </nav>
    </header>

    <main id="main">
      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> INDEPENDENT DEVELOPER <span className="eyebrow-slash">/</span> NIGERIA</p>
          <h1 id="hero-title">I like making<br />ideas <span>useful.</span></h1>
          <div className="hero-lower"><p>I build websites, tools, and the in-between bits that make them work. Usually with React. Always with a reason.</p><a className="round-arrow" href="#work" aria-label="See selected work"><ArrowDown /></a></div>
          <div className="hero-rule"><span>PRODUCTS WITH A JOB TO DO</span><span>WEB / 2026</span></div>
        </div>
        <div className="hero-feature" aria-label="Featured work: Ceeyline">
          <div className="hero-feature-top"><span>ON MY SCREEN RIGHT NOW</span><span>01 — 03</span></div>
          <button className="hero-image" onClick={() => setSelected(projects.find((p) => p.id === 'ceeyline'))} aria-label="Explore Ceeyline project">
            <img src="/images/projects/ceeyline.jpg" alt="Ceeyline clothing storefront" width="1348" height="926" fetchPriority="high" />
            <span className="hero-image-mark">C<span>.</span></span>
          </button>
          <div className="hero-feature-bottom"><span><strong>Ceeyline</strong><small>Fashion / Storefront</small></span><button onClick={() => setSelected(projects.find((p) => p.id === 'ceeyline'))} aria-label="Open Ceeyline details"><ArrowUpRight /></button></div>
          <span className="hero-aside-note">A real shop, with a point of view.</span>
        </div>
        <a className="scroll-cue" href="#work"><ArrowDown size={14} /> SCROLL A BIT</a>
      </section>

      <section className="work page-width" id="work" aria-labelledby="work-title">
        <div className="work-heading"><div><p className="eyebrow blue-eyebrow">SELECTED WORK <span>/</span> 2026</p><h2 id="work-title">Different problems.<br /><span>Different kinds<br className="mobile-break" /> of work.</span></h2></div><p className="work-intro">A school platform, a few storefronts, some ideas that started with “what if?” Here’s a mix of things I’ve built and learned from.</p></div>

        <div className="work-controls">
          <div className="filters" role="group" aria-label="Filter projects">{categories.map((category) => <button key={category} className={filter === category ? 'filter active' : 'filter'} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}<sup>{pad(category === 'All work' ? projects.length : projects.filter((p) => p.category === category).length)}</sup></button>)}</div>
          <label className="search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find a project" aria-label="Find a project" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}</label>
        </div>
        <p className="sr-only" aria-live="polite">{visible.length} projects shown</p>

        {featured.length > 0 && <div className="featured-grid">{featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelected} />)}</div>}
        {more.length > 0 && <section className="archive-section" aria-labelledby="more-title"><div className="archive-heading"><div><p className="eyebrow blue-eyebrow">THE PROJECT ARCHIVE <span>/</span> {pad(more.length)}</p><h3 id="more-title">The rest of the work.</h3></div><p>A closer look at the other sites, tools, and experiments I’ve worked on.</p></div><div className="archive-grid">{more.map((project) => <ArchiveCard key={project.id} project={project} onOpen={setSelected} />)}</div></section>}
        {visible.length === 0 && <div className="empty-state"><span>Nothing here yet.</span><p>Try another search or reset the filters.</p><button onClick={() => { setSearch(''); setFilter('All work') }}>Show all projects <ArrowRight size={16} /></button></div>}
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title"><div className="about-inner page-width"><div className="about-photo"><img src="/images/salam-portfolio-portrait.jpg" alt="Salam Akapo" width="1312" height="1199" loading="lazy" /><span>THAT’S ME, BY THE WAY.</span></div><div className="about-copy"><p className="eyebrow">A LITTLE ABOUT ME <span>/</span> 02</p><h2 id="about-title">I care about what happens <span>after the first click.</span></h2><p>I’m Salam, a developer based in Nigeria. I like the whole process: getting a fuzzy idea into focus, making the interface feel right, and figuring out how the parts fit together.</p><p>Recently, that’s meant building a school exam platform for a local network, storefronts for growing brands, and a few useful experiments along the way.</p><div className="toolbox"><span>THINGS I WORK WITH</span><p>React · Next.js · JavaScript · TypeScript<br />Node.js · PostgreSQL · Supabase · Three.js</p></div><a className="github-link" href="https://github.com/salzyff" target="_blank" rel="noreferrer">See what I’m building on GitHub <ArrowUpRight size={17} /></a></div></div></section>

      <section className="contact page-width" id="contact" aria-labelledby="contact-title"><div className="contact-index"><span>03 / YOUR TURN</span><span>OPEN TO A GOOD CHALLENGE</span></div><div className="contact-body"><h2 id="contact-title">Got something<br />in mind<span>?</span></h2><div className="contact-side"><p>A business that needs a website? A tool that should exist? Send me the rough version of the idea. We can figure out the rest.</p><a href={whatsapp} target="_blank" rel="noreferrer">Tell me about it <ArrowUpRight size={20} /></a></div></div></section>
    </main>

    <footer className="site-footer page-width"><a className="brand" href="#top"><span className="brand-mark">S<span>.</span></span><span className="brand-name">SALAM AKAPO<small>Built with curiosity.</small></span></a><span className="copyright">© {new Date().getFullYear()} / IBADAN, NIGERIA</span><div><a href="https://github.com/salzyff" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a></div></footer>
    {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
  </>
}

function ProjectCard({ project, index, onOpen }) {
  return <article className={`project-card project-${project.id}`}>
    <button className="project-image" onClick={() => onOpen(project)} aria-label={`Open ${project.title} project details`}>
      <span className="image-label">{project.number} <i>/</i> {project.category}</span>
      <img src={project.image} alt={project.imageAlt} width="1348" height="926" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
      <span className="image-action"><ArrowUpRight size={20} /></span>
    </button>
    <div className="project-info"><div><p className="project-type">{project.type}</p><h3><button onClick={() => onOpen(project)}>{project.title}</button></h3></div><p className="project-description">{project.description}</p></div>
    <div className="project-meta"><span>{project.tags.slice(0, 3).join(' · ')}</span><button onClick={() => onOpen(project)}>Project details <ArrowRight size={14} /></button></div>
  </article>
}

function ArchiveCard({ project, onOpen }) {
  return <article className={`archive-card project-${project.id}`}>
    <button className="archive-visual" onClick={() => onOpen(project)} aria-label={`Open ${project.title} project details`}>
      <span className="archive-number">{project.number}</span>
      <img src={project.image} alt={project.imageAlt} width="1348" height="926" loading="lazy" decoding="async" />
      <span className="archive-open"><ArrowUpRight size={18} /></span>
    </button>
    <div className="archive-card-copy"><div className="archive-card-label"><span>{project.category}</span><span>{project.type}</span></div><h4>{project.title}</h4><p>{project.description}</p><button className="archive-detail" onClick={() => onOpen(project)}>Project details <ArrowRight size={14} /></button></div>
  </article>
}

function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    const oldOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = oldOverflow }
  }, [])

  return <dialog ref={dialogRef} className="project-dialog" onCancel={onClose} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose() }} aria-labelledby="dialog-title">
    <div className="dialog-shell"><header className="dialog-header"><span>PROJECT NOTES <i>/</i> {project.number}</span><button onClick={onClose} aria-label="Close project details"><X size={20} /></button></header><div className="dialog-visual"><img src={project.image} alt={project.imageAlt} width="1348" height="926" /></div><div className="dialog-main"><p className="dialog-type">{project.type} <i>/</i> {project.year}</p><h2 id="dialog-title">{project.title}</h2><p className="dialog-description">{project.description}</p><div className="dialog-columns"><div><h3>What it does</h3><ul>{project.details.map((detail) => <li key={detail}><Check size={15} /><span>{detail}</span></li>)}</ul></div><div><h3>Built with</h3><div className="dialog-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>{project.note && <p className="dialog-note">{project.note}</p>}<div className="dialog-actions">{project.link ? <a className="primary-link" href={project.link} target="_blank" rel="noreferrer">Open live project <ArrowUpRight size={17} /></a> : <a className="primary-link" href={`https://wa.me/2347042785091?text=${encodeURIComponent(`Hi Salam, I'd love a walkthrough of ${project.title}.`)}`} target="_blank" rel="noreferrer">Ask me about it <ArrowUpRight size={17} /></a>}{!project.privateSource && <a className="source-link" href={`https://github.com/${project.repository}`} target="_blank" rel="noreferrer">View source <ArrowUpRight size={15} /></a>}</div></div></div>
  </dialog>
}

createRoot(document.getElementById('root')).render(<App />)
