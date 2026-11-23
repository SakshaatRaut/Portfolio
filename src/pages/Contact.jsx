import React, { useState } from 'react';
import { SITE, SOCIALS } from '../data/site';

// Sends the contact form to my inbox.
// Default: FormSubmit (no account or key needed; it emails SITE.email).
// Optional: set VITE_FORMSPREE_ID or VITE_WEB3FORMS_KEY in .env to use one of those services instead.
async function sendMessage(fields, subject) {
  const formspreeId = (import.meta.env.VITE_FORMSPREE_ID || '').trim();
  const web3formsKey = (import.meta.env.VITE_WEB3FORMS_KEY || '').trim();
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

  if (web3formsKey) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers,
      body: JSON.stringify({ access_key: web3formsKey, subject, from_name: `${SITE.name} Portfolio`, ...fields }),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: !!data.success, error: data.message };
  }

  if (formspreeId) {
    const url = formspreeId.startsWith('http') ? formspreeId : `https://formspree.io/f/${formspreeId}`;
    const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ _subject: subject, ...fields }) });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, error: data.error };
  }

  const res = await fetch(`https://formsubmit.co/ajax/${SITE.formEmail || SITE.email}`, {
    method: 'POST', headers,
    body: JSON.stringify({
      ...fields,
      _subject: subject,
      _replyto: fields.email,
      _template: 'table',
      _captcha: 'false',
    }),
  });
  const data = await res.json().catch(() => ({}));
  const ok = res.ok && String(data.success) === 'true';
  return { ok, error: data.message };
}

export default function Contact() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const form = e.target;
    const formData = new FormData(form);

    // Spam honeypot: bots fill the hidden field, people never see it.
    if (formData.get('tel')) {
      setStatus('success');
      setFeedback('Thank you, your message is on its way.');
      form.reset();
      return;
    }

    const name = (formData.get('name') || '').trim();
    const fields = {
      name,
      email: (formData.get('email') || '').trim(),
      organization: (formData.get('company') || '').trim(),
      reason: (formData.get('service') || '').trim(),
      message: (formData.get('message') || '').trim(),
    };
    const subject = `New portfolio message from ${name || 'a visitor'}`;

    setStatus('submitting');
    setFeedback('');

    try {
      const sent = await sendMessage(fields, subject);
      if (!sent.ok) throw new Error(sent.error);
      setStatus('success');
      setFeedback(`Thanks${name ? `, ${name.split(' ')[0]}` : ''}! Delivered with 100% recall. I'll be in touch soon.`);
      form.reset();
      setTimeout(() => { setStatus('idle'); setFeedback(''); }, 7000);
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
      setFeedback(`Sorry, the message didn't go through. Please try again, or email me at ${SITE.email}.`);
      setTimeout(() => setStatus('idle'), 7000);
    }
  };

  return (
    <div className="main-wrap" id="contact">
      <header className="section default-header contact-header theme-dark">
        <div className="container medium">
          <div className="row once-in">
            <div className="flex-col">
              <h1>
                <span>
                  <div className="profile-picture"><span>{SITE.initials}</span></div> Let's start a{' '}
                </span>
                <span>project together</span>
              </h1>
            </div>
            <div className="flex-col">
              <div className="profile-picture"><span>{SITE.initials}</span></div>
              <div className="arrow">
                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>arrow-down-right</title>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-1019.000000, -279.000000)" stroke="#FFFFFF" strokeWidth="1.5">
                      <g transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                        <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                        <line x1="12" y1="0" x2="0" y2="12"></line>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="row once-in">
            <div className="flex-col">
              <form className="form" id="contact-form" onSubmit={handleSubmit}>
                <div className="website-field" style={{ display: 'none' }}>
                  <label className="label" htmlFor="form-tel">Phone Number</label>
                  <input className="field" type="text" id="form-tel" name="tel" tabIndex={-1} />
                </div>
                <div className="form-col">
                  <h5>01</h5>
                  <label className="label" htmlFor="form-name">What's your name?</label>
                  <input className="field" type="text" id="form-name" name="name" required placeholder="John Doe *" />
                </div>
                <div className="form-col">
                  <h5>02</h5>
                  <label className="label" htmlFor="form-email">What's your email?</label>
                  <input className="field" type="email" id="form-email" name="email" required placeholder="john@doe.com *" />
                </div>
                <div className="form-col">
                  <h5>03</h5>
                  <label className="label" htmlFor="form-company">What's the name of your organization?</label>
                  <input className="field" type="text" id="form-company" name="company" placeholder="John &amp; Doe ®" />
                </div>
                <div className="form-col">
                  <h5>04</h5>
                  <label className="label" htmlFor="form-service">What are you reaching out about?</label>
                  <input className="field" type="text" id="form-service" name="service" placeholder="ML Engineering, Internship, Research ..." />
                </div>
                <div className="form-col">
                  <h5>05</h5>
                  <label className="label" htmlFor="form-message">Your message</label>
                  <textarea className="field" id="form-message" name="message" rows="8" required placeholder={`Hi ${SITE.first}, I have a role / project / wild idea... *`}></textarea>
                </div>
                <div className="btn-contact-send">
                  <div className="btn btn-round" data-scroll data-scroll-speed="2">
                    <div className="btn-click magnetic" data-strength="100" data-strength-text="50">
                      <div className="btn-fill"></div>
                      <span className="btn-text">
                        <span className="btn-text-inner">
                          {status === 'submitting'
                            ? 'Sending...'
                            : status === 'success'
                            ? 'Thank You'
                            : status === 'error'
                            ? 'Retry'
                            : 'Send it ↗'}
                        </span>
                      </span>
                      <input
                        type="submit"
                        name="submit"
                        value=""
                        className="form-btn"
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>
                </div>
                {feedback && (
                  <div
                    className="contact-feedback"
                    style={{
                      marginTop: '7rem',
                      padding: '0.85rem 1.25rem',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      backgroundColor: status === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(34, 197, 94, 0.12)',
                      border: `1px solid ${status === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                      color: status === 'error' ? '#fca5a5' : '#86efac',
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {feedback}
                  </div>
                )}
              </form>
            </div>
            <div className="flex-col">
              <h5>Contact Details</h5>
              <ul className="links-wrap">
                <li className="btn btn-link btn-link-external">
                  <a href={`mailto:${SITE.email}`} className="btn-click magnetic" data-strength="20" data-strength-text="10">
                    <span className="btn-text">
                      <span className="btn-text-inner">{SITE.email}</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a href={SITE.phoneHref} className="btn-click magnetic" data-strength="20" data-strength-text="10">
                    <span className="btn-text">
                      <span className="btn-text-inner">{SITE.phone}</span>
                    </span>
                  </a>
                </li>
              </ul>
              <h5>Details</h5>
              <ul className="links-wrap">
                <li><p>{SITE.name}</p></li>
                <li><p>Location: {SITE.location}</p></li>
              </ul>
              <h5>Socials</h5>
              <ul className="links-wrap">
                {SOCIALS.map((l) => (
                  <li key={l.label} className="btn btn-link btn-link-external">
                    <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="btn-click magnetic" data-strength="20" data-strength-text="10">
                      <span className="btn-text">
                        <span className="btn-text-inner">{l.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <footer className="section footer footer-contact theme-dark">
        <div className="container no-padding">
          <div className="row bottom-footer">
            <div className="flex-col">
              <div className="credits">
                <h5>Version</h5>
                <p>2026 © Edition</p>
              </div>
              <div className="time">
                <h5>Local time</h5>
                <p><span id="timeSpan">--:--</span></p>
              </div>
            </div>
            <div className="flex-col">
              <div className="socials">
                <h5>Socials</h5>
                <ul>
                    {SOCIALS.map((l) => (
                      <li key={l.label} className="btn btn-link btn-link-external">
                        <a
                          href={l.href}
                          {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="btn-click magnetic"
                          data-strength="20"
                          data-strength-text="10"
                        >
                          <span className="btn-text">
                            <span className="btn-text-inner">{l.label}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
