import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowDownRight, ArrowUpRight, ArrowRight, Plus, X, Menu, Check, Search } from 'lucide-react'
import { projects } from './projects'
import './styles.css'

const whatsapp = 'https://wa.me/2347042785091?text=Hi%20Salam%2C%20I%20saw%20your%20portfolio.%20I%27d%20like%20to%20talk%20about%20a%20project.'
const categories = ['All work', 'Applications', 'Commerce', 'Brand websites', 'Experiments']
const number = (value) => String(value).padStart(2, '0')

function App() {
  const [filter, setFilter] = useState('All work')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const visible = projects.filter((p) => (filter === 'All work' || p.category === filter) && `${p.title} ${p.type} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase().trim()))
  const featured = visible.filter((p) => p.featured)
  const index = visible.filter((p) => !p.featured)
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header page-width">
      <a href="#top" className="wordmark" aria-label="Salam Akapo home">sa<span>↗</span></a>
      <span className="header-note">Independent developer<br />Based in Nigeria</span>
      <nav aria-label="Main navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
        <a href="#work" onClick={() => setMenuOpen(false)}>Work <sup>{number(projects.length)}</sup></a>
        <a href="#about" onClick={() => setMenuOpen(false)}>A little about me</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <main id="main">
      <section className="hero page-width" id="top" aria-labelledby="hero-title">
        <div className="hero-heading">
          <div className="edition"><span className="small-cross" aria-hidden="true">✳</span> A working collection <span>2026 / Vol. 01</span></div>
          <h1 id="hero-title">Salam<br /><em>Akapo.</em><span className="name-period" aria-hidden="true">↗</span></h1>
          <p className="hero-deck">A developer with an eye for the details<br className="desktop-break" /> and a thing for making things work.</p>
          <div className="hero-bottom"><a className="work-jump" href="#work"><ArrowDownRight size={27} /><span>Take a look<br />around.</span></a><span className="hero-specialty">Web experiences.<br />Useful applications.<br />A little experimentation.</span></div>
        </div>
        <div className="hero-collage" aria-label="A few things from my desk">
          <span className="collage-caption">A few things from my desk ↙</span>
          <button className="desk-print print-back" onClick={() => setSelected(projects.find(p => p.id === 'ceeyline'))} aria-label="Explore Ceeyline"><span className="print-header"><span>CEEYLINE</span><ArrowUpRight size={13} /></span><img src="/images/projects/ceeyline.jpg" alt="Ceeyline fashion storefront" width="1348" height="926" fetchPriority="high" /></button>
          <button className="desk-print print-front" onClick={() => setSelected(projects.find(p => p.id === 'atelier'))} aria-label="Explore Jewellery Atelier"><span className="print-header"><span>AN INTERACTIVE LITTLE EXPERIMENT</span><span>03</span></span><img src="/images/projects/atelier.jpg" alt="Interactive jewellery ring designer" width="1363" height="936" fetchPriority="high" /><span className="print-footer">Made to play with. <Plus size={15} /></span></button>
          <figure className="author-stamp"><img src="/images/akapo-abdul-salam.jpg" alt="Salam Akapo" width="1122" height="1402" /><figcaption>Yep, that’s me.<br /><span>THE PERSON BEHIND THE WORK</span></figcaption></figure>
          <span className="round-note" aria-hidden="true">Made with<br /><em>curiosity.</em><span>↗</span></span>
        </div>
      </section>
      <div className="chapter-line page-width"><span>01 / The work</span><span>From everyday problems to the occasional “what if?”</span><ArrowDown size={16} /></div>
      <section className="work page-width" id="work" aria-labelledby="work-title">
        <div className="section-intro"><h2 id="work-title">A few good ideas,<br /><em>put to work.</em></h2><div><p>School tools, storefronts, and things I wanted to try. Every project here has a different job to do.</p><span className="micro">{number(projects.length)} projects / Updated November 2026</span></div></div>
        <div className="work-tools"><div className="filters" role="group" aria-label="Filter projects">{categories.map(c => <button key={c} className={filter === c ? 'filter active' : 'filter'} aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}<sup>{number(c === 'All work' ? projects.length : projects.filter(p => p.category === c).length)}</sup></button>)}</div><label className="search"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a project" aria-label="Find a project" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}</label></div>
        <p className="sr-only" aria-live="polite">{visible.length} projects shown</p>
        {featured.length > 0 && <div className="featured-grid">{featured.map(p => <ProjectCard key={p.id} project={p} onOpen={setSelected} />)}</div>}
        {index.length > 0 && <section className="project-index" aria-labelledby="index-title"><div className="index-heading"><h3 id="index-title">More from the shelf.</h3><span className="micro">{number(index.length)} more things to explore</span></div><div className="index-list">{index.map(p => <button key={p.id} className="index-row" onClick={() => setSelected(p)}><span className="index-number">{p.number}</span><img src={p.image} alt="" width="1348" height="926" loading="lazy" /><span className="index-name"><strong>{p.title}</strong><small>{p.type}</small></span><span className="index-category">{p.category}</span><span className="index-open"><span>Project notes</span><ArrowUpRight size={23} /></span></button>)}</div></section>}
        {visible.length === 0 && <div className="empty-state"><h3>Nothing on this shelf.</h3><p>Try a different name or category.</p><button className="text-link" onClick={() => { setSearch(''); setFilter('All work') }}>Show all projects <ArrowRight size={16} /></button></div>}
      </section>
      <section className="about-section" id="about" aria-labelledby="about-title"><div className="page-width about-inner"><div className="about-label"><span className="micro">02 / The person</span><span className="about-asterisk" aria-hidden="true">✳</span><span className="micro">Curiosity is a useful habit.</span></div><div className="about-main"><div className="about-headline"><h2 id="about-title">I like the bit where<br />an idea starts<br /><em>working.</em></h2><figure className="about-photo"><img src="/images/akapo-abdul-salam.jpg" alt="Salam Akapo, developer" width="1122" height="1402" loading="lazy" /><figcaption>Salam Akapo / Nigeria</figcaption></figure></div><div className="about-copy"><p>I’m Salam, a developer based in Nigeria. I build with React, and I like getting involved in the whole thing: how a page feels, how the data moves, and what happens when someone actually uses it.</p><p>Lately that’s meant a school exam platform that works on a local network, storefronts for growing brands, and tools that use AI for a specific job.</p><p>I care about clear interfaces and the small details that make them easier to use. I’m also happy to follow a curious idea and see where it goes.</p><div className="toolbox"><span className="micro">On my workbench</span><p>React · Next.js · JavaScript · TypeScript<br />Node.js · PostgreSQL · Supabase · Three.js</p></div><a className="about-github" href="https://github.com/salzyff" target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={18} /></a></div></div></div></section>
      <section className="contact page-width" id="contact" aria-labelledby="contact-title"><div className="contact-top"><span className="micro">03 / Your next idea</span><span className="micro">Good conversations start somewhere.</span></div><h2 id="contact-title">What are you<br /><em>thinking?</em></h2><div className="contact-bottom"><p>A website for your business? A tool that should exist?<br />Tell me what you have in mind.</p><a className="contact-link" href={whatsapp} target="_blank" rel="noreferrer">Let’s talk <ArrowUpRight size={42} /></a></div></section>
    </main>
    <footer className="site-footer page-width"><a className="wordmark" href="#top" aria-label="Back to top">sa<span>↗</span></a><span>© {new Date().getFullYear()} Salam Akapo</span><div><a href="https://github.com/salzyff" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a><a href="#top">Back to top <ArrowUpRight size={13} /></a></div></footer>
    {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
  </>
}

function ProjectCard({project:p,onOpen}) {
  return <article className={`project-card project-${p.id}`}>
    <button className="project-art" onClick={() => onOpen(p)} aria-label={`Explore ${p.title}`}><span className="art-topline"><span>PROJECT {p.number}</span><span>{p.year}</span></span><img src={p.image} alt={p.imageAlt} width="1348" height="926" loading="lazy" decoding="async" /><span className="art-footnote"><span>{p.type}</span><span className="project-open"><Plus size={20} /></span></span></button>
    <div className="project-caption"><div><span className="micro">{p.category}</span><h3><button onClick={() => onOpen(p)}>{p.title} <ArrowUpRight size={23} /></button></h3></div><p>{p.description}</p></div>
  </article>
}

function ProjectDialog({project:p,onClose}) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])
  return <dialog ref={ref} className="project-dialog" onCancel={onClose} onClose={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }} aria-labelledby="project-title">
    <div className="dialog-content"><div className="dialog-top"><span className="micro">Project {p.number} / {p.category}</span><button className="dialog-close" onClick={onClose} aria-label="Close project notes"><X size={22} /></button></div><div className="dialog-image"><img src={p.image} alt={p.imageAlt} width="1348" height="926" /></div><div className="dialog-body"><p className="micro">{p.type} / {p.year}</p><h2 id="project-title">{p.title}</h2><p className="dialog-description">{p.description}</p><div className="dialog-detail-grid"><div><h3>What’s in it</h3><ul>{p.details.map(d => <li key={d}><Check size={16} /><span>{d}</span></li>)}</ul></div><div><h3>Made with</h3><div className="project-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div></div></div>{p.note && <p className="project-note">{p.note}</p>}<div className="dialog-actions">{p.link ? <a className="solid-link" href={p.link} target="_blank" rel="noreferrer">Open website <ArrowUpRight size={18} /></a> : <a className="solid-link" href={`https://wa.me/2347042785091?text=${encodeURIComponent(`Hi Salam, I'd love a walkthrough of ${p.title}.`)}`} target="_blank" rel="noreferrer">Ask for a walkthrough <ArrowUpRight size={18} /></a>}{!p.privateSource && <a className="text-link" href={`https://github.com/${p.repository}`} target="_blank" rel="noreferrer">View source <ArrowUpRight size={17} /></a>}</div></div></div>
  </dialog>
}

createRoot(document.getElementById('root')).render(<App />)
