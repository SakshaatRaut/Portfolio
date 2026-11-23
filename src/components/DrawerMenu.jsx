import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';
import { SOCIALS, NAV } from '../data/site';

export default function DrawerMenu({ onClose }) {
  const location = useLocation();
  const { navigateTo } = useTransition();

  const handleNav = (path, label) => {
    onClose();
    navigateTo(path, label);
  };

  const isHome = location.pathname === '/' || location.pathname === '/index.html';

  return (
    <>
      <div className="overlay fixed-nav-back" onClick={onClose}></div>
      <div className="fixed-nav theme-dark">
        <div className="fixed-nav-rounded-div">
          <div className="rounded-div-wrap">
            <div className="rounded-div"></div>
          </div>
        </div>
        <div className="fixed-nav-inner">
          <div className="row nav-row">
            <h5>Navigation</h5>
            <div className="stripe"></div>
            <ul className="links-wrap">
              <li className={`btn btn-link ${isHome ? 'active' : ''}`}>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('/', 'Home');
                  }}
                  className="btn-click magnetic"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Home</span>
                  </span>
                </a>
              </li>
              {NAV.map((item) => (
                <li key={item.path} className={`btn btn-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.path, item.label);
                    }}
                    className="btn-click magnetic"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">{item.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="row social-row">
            <div className="stripe"></div>
            <div className="socials">
              <h5>Socials</h5>
              <ul>
                {SOCIALS.map((l) => (
                  <li key={l.label} className="btn btn-link btn-link-external">
                    <a
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="btn-click magnetic"
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
    </>
  );
}
