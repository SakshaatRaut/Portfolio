import React from 'react';
import { SITE, SERVICES, EXPERIENCE, EDUCATION, SKILLS } from '../data/site';

export default function About() {
  return (
    <div className="main-wrap" id="about">
      <header className="section default-header about-header">
        <div className="container medium">
          <div className="row">
            <div className="flex-col once-in">
              <h1><span>Turning data &amp; models</span><span>into real products</span></h1>
            </div>
          </div>
        </div>
      </header>

      <section className="section no-padding line-globe once-in">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <div className="stripe"></div>
              <div className="digital-ball">
                <div className="overlay"></div>
                <div className="globe">
                  <div className="globe-wrap">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle-hor"></div>
                    <div className="circle-hor-middle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-image once-in">
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <div className="arrow">
                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>arrow-up-right</title>
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-1019.000000, -279.000000)" stroke="currentColor" strokeWidth="1.5">
                      <g transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                        <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                        <line x1="12" y1="0" x2="0" y2="12"></line>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <p>
                I build machine learning systems that leave the notebook: retrieval pipelines, vision models and LLM tools that real people use. I care about the numbers, and about shipping something that holds up outside a demo.
              </p>
              <p>
                <span style={{ opacity: 0.5, display: 'block', paddingTop: '0.5em' }}>
                  Currently at UMD, open to ML roles<span className="animate-dot">.</span><span className="animate-dot">.</span><span className="animate-dot">.</span>
                </span>
              </p>
            </div>
            <div className="flex-col">
              <div className="single-about-image">
                <div
                  className="overlay overlay-image"
                  style={{
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                ></div>
                <div className="overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-services">
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <h2>I can help you with <span className="animate-dot">.</span><span className="animate-dot">.</span><span className="animate-dot">.</span></h2>
            </div>
          </div>
          <div className="row">
            {SERVICES.map((sv, i) => (
              <div className="flex-col" key={sv.title}>
                <h5>{String(i + 1).padStart(2, '0')}</h5>
                <div className="stripe"></div>
                <h4>{sv.title}</h4>
                <p>{sv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-services about-experience">
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <h2>Where I've worked <span className="animate-dot">.</span><span className="animate-dot">.</span><span className="animate-dot">.</span></h2>
            </div>
          </div>
          <div className="row">
            {EXPERIENCE.map((job) => (
              <div className="flex-col" key={job.org}>
                <h5>{job.when}</h5>
                <div className="stripe"></div>
                <h4>{job.role}</h4>
                <p className="experience-org">{job.org} · {job.where}</p>
                <ul className="experience-points">
                  {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="row experience-resume">
            <div className="flex-col" style={{ display: 'flex' }}>
              <div className="btn btn-normal">
                <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="btn-click magnetic" data-strength="25" data-strength-text="15">
                  <div className="btn-fill"></div>
                  <span className="btn-text">
                    <span className="btn-text-inner change">Download resume</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-awwwards">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <div className="single-image">
                <div
                  className="overlay overlay-image"
                  style={{
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                ></div>
                <div className="overlay"></div>
              </div>
            </div>
            <div className="flex-col">
              <div className="awwwards-badge"></div>
              <h2>Education &amp;<br />Background</h2>
              <p>I am an AI and Machine Learning Engineer based in the {SITE.location}, studying Applied Machine Learning at the University of Maryland after a BTech in Information Technology in Mumbai.</p>
              <div className="about-credentials">
                {EDUCATION.map((ed) => (
                  <div className="credential-item" key={ed.degree}>
                    <h5>{ed.label}</h5>
                    <h4>{ed.degree}</h4>
                    <p>{ed.school}</p>
                  </div>
                ))}
                <div className="credential-item">
                  <h5>Core Competencies</h5>
                  <div className="credential-tags">
                    {SKILLS.map((sk) => <span key={sk}>{sk}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
