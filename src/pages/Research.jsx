import React, { useState } from 'react';
import { PAPERS, RESEARCH_INTERESTS } from '../data/research';
import { SITE } from '../data/site';

function PaperButton({ href, label }) {
  if (!href) return null;
  return (
    <div className="btn btn-normal">
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="25" data-strength-text="15">
        <div className="btn-fill"></div>
        <span className="btn-text">
          <span className="btn-text-inner change">{label}</span>
        </span>
      </a>
    </div>
  );
}

export default function Research() {
  const [open, setOpen] = useState(PAPERS[0]?.id || null);

  return (
    <div className="main-wrap" id="research">
      <header className="section default-header research-header">
        <div className="container medium">
          <div className="row">
            <div className="flex-col once-in">
              <h1><span>Research that asks </span><span>why it works </span><span>(and why it doesn't)</span></h1>
            </div>
          </div>
        </div>
      </header>

      <section className="section research-interests once-in">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <h5>Interests</h5>
            </div>
            <div className="flex-col">
              <div className="credential-tags">
                {RESEARCH_INTERESTS.map((r) => <span key={r}>{r}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section research-papers">
        <div className="container">
          <div className="grid-sub-title reveal">
            <div className="flex-col"><h5>Paper</h5></div>
            <div className="flex-col"><h5>Venue</h5></div>
            <div className="flex-col"><h5>Year</h5></div>
          </div>
          <ul className="paper-list">
            {PAPERS.map((p, i) => {
              const isOpen = open === p.id;
              return (
                <li key={p.id} className={`paper reveal ${isOpen ? 'open' : ''}`}>
                  <div className="stripe"></div>
                  <button type="button" className="paper-head" onClick={() => setOpen(isOpen ? null : p.id)} aria-expanded={isOpen}>
                    <span className="paper-index">{String(i + 1).padStart(2, '0')}</span>
                    <h4>{p.title}</h4>
                    <p className="paper-venue">{p.venue}</p>
                    <p className="paper-year">{p.year}</p>
                    <span className="paper-toggle" aria-hidden="true"></span>
                  </button>
                  <div className="paper-body">
                    <div className="paper-body-inner">
                      <div className="paper-meta">
                        <span className="paper-status">{p.status}</span>
                        <span>{p.area}</span>
                      </div>
                      <p className="paper-authors">
                        {p.authors.map((a, j) => (
                          <React.Fragment key={a}>
                            {j > 0 && ', '}
                            {a.includes(SITE.last) ? <strong>{a}</strong> : a}
                          </React.Fragment>
                        ))}
                      </p>
                      <p className="paper-abstract">{p.abstract}</p>
                      <div className="credential-tags">
                        {p.keywords.map((k) => <span key={k}>{k}</span>)}
                      </div>
                      <div className="paper-actions">
                        <PaperButton href={p.pdf} label="Read the PDF" />
                        <PaperButton href={p.link} label="View publication" />
                        <PaperButton href={p.code} label="Code" />
                        {p.placeholder && <p className="paper-note">Details coming soon.</p>}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            <div className="stripe last"></div>
          </ul>
        </div>
      </section>
    </div>
  );
}
