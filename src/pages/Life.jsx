import React from 'react';
import { HOBBIES, LIFE_INTRO } from '../data/life';

function PhotoSlot({ src, alt, index }) {
  return (
    <div className={`life-photo ${src ? '' : 'empty'}`} style={{ '--i': index }}>
      {src ? (
        <div className="overlay overlay-image" role="img" aria-label={alt} style={{ backgroundImage: `url(${src})` }}></div>
      ) : (
        <div className="life-photo-empty">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="10" r="1.6" />
            <path d="M21 16l-5-5-8 8" />
          </svg>
          <span>Add photo</span>
        </div>
      )}
    </div>
  );
}

export default function Life() {
  const marquee = HOBBIES.map((h) => h.title);

  return (
    <div className="main-wrap" id="life">
      <header className="section default-header life-header">
        <div className="container medium">
          <div className="row">
            <div className="flex-col once-in">
              <h1><span>Life beyond </span><span>the code</span></h1>
            </div>
          </div>
          <div className="row life-intro once-in">
            <div className="flex-col">
              <p>{LIFE_INTRO}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="section life-marquee" aria-hidden="true">
        <div className="life-marquee-track">
          {[0, 1].map((k) => (
            <div className="life-marquee-group" key={k}>
              {marquee.concat(marquee).map((t, i) => (
                <span key={`${k}-${i}`}>{t}<i className="life-marquee-dot"></i></span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {HOBBIES.map((h, idx) => (
        <section key={h.id} className={`section life-hobby ${idx % 2 ? 'flip' : ''}`} style={{ '--accent': h.color }}>
          <div className="container">
            <div className="row">
              <div className="flex-col life-hobby-text reveal">
                <h5>{String(idx + 1).padStart(2, '0')}</h5>
                <div className="stripe"></div>
                <h2>{h.title}<span className="life-accent-dot"></span></h2>
                <p className="life-tagline">{h.tagline}</p>
                <p>{h.text}</p>
                <ul className="life-facts">
                  {h.facts.map((f) => (
                    <li key={f.label}>
                      <h5>{f.label}</h5>
                      <p>{f.value}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-col life-hobby-photos reveal">
                <div className={`life-photo-grid ${h.layout === 'portrait' ? 'portrait' : ''}`}>
                  {h.images.map((src, i) => (
                    <PhotoSlot key={i} src={src} alt={`${h.title} photo ${i + 1}`} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
