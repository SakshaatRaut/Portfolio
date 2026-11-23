import React, { useEffect, useRef } from 'react';
import { HOBBIES, LIFE_INTRO } from '../data/life';

// Parallax speeds for the three photo cells in each hobby (fraction of distance from viewport centre).
const PHOTO_SPEEDS = [-0.06, 0.05, -0.1];

function PhotoSlot({ src, alt, index }) {
  return (
    <div className="life-photo-cell" data-speed={PHOTO_SPEEDS[index % PHOTO_SPEEDS.length]} style={{ '--i': index }}>
      <div className="life-photo-reveal">
        <div className={`life-photo ${src ? (src.endsWith(".svg") ? "is-art" : "") : "empty"}`}>
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
          <div className="life-photo-glare" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  );
}

function useLifeMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups = [];

    // ---- Scroll-driven parallax + velocity marquee (one rAF loop) ----
    const cells = [...root.querySelectorAll('.life-photo-cell')];
    const photos = [...root.querySelectorAll('.life-photo')];
    const nums = [...root.querySelectorAll('.life-hobby-num')];
    const headerTitle = root.querySelector('.life-header h1');
    const tracks = [...root.querySelectorAll('.life-marquee-track')];

    const marquee = tracks.map((el, i) => ({ el, pos: 0, dir: i % 2 ? 1 : -1 }));
    let lastY = window.scrollY;
    let velocity = 0;
    let scrollDir = 1;
    let last = performance.now();
    let raf = null;

    const tick = (now) => {
      const dt = Math.min(now - last, 48);
      last = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy > 0.5) scrollDir = 1;
      else if (dy < -0.5) scrollDir = -1;
      velocity += (Math.min(Math.abs(dy), 80) - velocity) * 0.12;

      const winH = window.innerHeight;
      const mid = winH / 2;

      {
        cells.forEach((cell, i) => {
          const r = cell.getBoundingClientRect();
          if (r.bottom < -200 || r.top > winH + 200) return;
          const offset = r.top + r.height / 2 - mid;
          const speed = parseFloat(cell.dataset.speed) || 0;
          cell.style.transform = `translate3d(0, ${(offset * speed).toFixed(1)}px, 0)`;
          const photo = photos[i];
          if (photo) photo.style.setProperty('--py', `${(offset * -0.04).toFixed(1)}px`);
        });

        nums.forEach((n) => {
          const r = n.parentElement.getBoundingClientRect();
          if (r.bottom < 0 || r.top > winH) return;
          const offset = r.top + r.height / 2 - mid;
          n.style.transform = `translate3d(0, ${(offset * 0.3).toFixed(1)}px, 0)`;
        });

        if (headerTitle) {
          const t = Math.min(y, winH);
          headerTitle.style.transform = `translate3d(0, ${(t * 0.25).toFixed(1)}px, 0)`;
          headerTitle.style.opacity = String(Math.max(0, 1 - t / (winH * 0.8)));
        }
      }

      marquee.forEach((m) => {
        const half = m.el.scrollWidth / 2;
        if (!half) return;
        // Always drifting on its own (like the home hero name); scrolling only speeds it up.
        const base = half / 20000;
        const boost = 1 + velocity * 0.18;
        m.pos += m.dir * scrollDir * base * boost * dt;
        if (m.pos <= -half) m.pos += half;
        if (m.pos > 0) m.pos -= half;
        const skew = Math.max(-8, Math.min(8, velocity * 0.25 * scrollDir * -m.dir));
        m.el.style.transform = `translate3d(${m.pos.toFixed(2)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    cleanups.push(() => cancelAnimationFrame(raf));

    // ---- 3D tilt + glare on photo cards (desktop pointers only) ----
    if (finePointer) {
      photos.forEach((photo) => {
        const onMove = (e) => {
          const r = photo.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          photo.style.setProperty('--ry', `${((px - 0.5) * 16).toFixed(2)}deg`);
          photo.style.setProperty('--rx', `${((0.5 - py) * 12).toFixed(2)}deg`);
          photo.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
          photo.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
        };
        const onEnter = () => photo.classList.add('is-tilting');
        const onLeave = () => {
          photo.classList.remove('is-tilting');
          photo.style.setProperty('--rx', '0deg');
          photo.style.setProperty('--ry', '0deg');
        };
        photo.addEventListener('mouseenter', onEnter);
        photo.addEventListener('mousemove', onMove);
        photo.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          photo.removeEventListener('mouseenter', onEnter);
          photo.removeEventListener('mousemove', onMove);
          photo.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}

export default function Life() {
  const rootRef = useRef(null);
  useLifeMotion(rootRef);

  const marquee = HOBBIES.map((h) => h.title);
  const rows = [marquee, [...marquee].reverse()];

  return (
    <div className="main-wrap" id="life" ref={rootRef}>
      <header className="section default-header life-header">
        <div className="container medium">
          <div className="row">
            <div className="flex-col once-in">
              <h1><span>Life beyond </span><span>the code</span></h1>
            </div>
          </div>
          <div className="row life-intro">
            <div className="flex-col reveal">
              <div className="stripe"></div>
              <p>{LIFE_INTRO}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="section life-marquee" aria-hidden="true">
        {rows.map((row, r) => (
          <div className={`life-marquee-row ${r ? 'outline' : ''}`} key={r}>
            <div className="life-marquee-track">
              {[0, 1].map((k) => (
                <div className="life-marquee-group" key={k}>
                  {row.concat(row).map((t, i) => (
                    <span key={`${k}-${i}`}>{t}<i className="life-marquee-dot"></i></span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {HOBBIES.map((h, idx) => (
        <section key={h.id} className={`section life-hobby ${idx % 2 ? 'flip' : ''}`} style={{ '--accent': h.color }}>
          <span className="life-hobby-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
          <div className="container">
            <div className="row">
              <div className="flex-col life-hobby-text reveal">
                <h5 style={{ '--d': 0 }}>{String(idx + 1).padStart(2, '0')} / {String(HOBBIES.length).padStart(2, '0')}</h5>
                <div className="stripe" style={{ '--d': 1 }}></div>
                <h2 style={{ '--d': 2 }}>{h.title}<span className="life-accent-dot"></span></h2>
                <p className="life-tagline" style={{ '--d': 3 }}>{h.tagline}</p>
                <p className="life-body" style={{ '--d': 4 }}>{h.text}</p>
                <ul className="life-facts" style={{ '--d': 5 }}>
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
