import React from 'react';
import { useTransition } from '../context/TransitionContext';

export default function NotFound() {
  const { navigateTo } = useTransition();

  return (
    <div className="main-wrap" id="not-found">
      <header className="section default-header not-found-header">
        <div className="container medium">
          <div className="row">
            <div className="flex-col once-in">
              <h5 className="not-found-code">Error 404</h5>
              <h1><span>This page wandered </span><span>off the Grand Line</span></h1>
            </div>
          </div>
          <div className="row not-found-body">
            <div className="flex-col reveal">
              <p>The link might be old, or the page never existed. Either way, the crew is back at the home port.</p>
              <div className="btn btn-normal">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/', 'Home');
                  }}
                  className="btn-click magnetic"
                  data-strength="25"
                  data-strength-text="15"
                >
                  <div className="btn-fill"></div>
                  <span className="btn-text">
                    <span className="btn-text-inner">Back to home</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
