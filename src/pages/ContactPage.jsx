import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { GlobalFloor } from '../components/GlobalFloor';
import '../styles/contact.css';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [budget, setBudget] = useState('PROJECT BUDGET (USD)');
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Ensure body background is pure white on contact page
    document.body.style.backgroundColor = '#ffffff';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const budgetOptions = [
    '< $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !email && !project) {
      alert('Please fill in your name or project details before sending.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setProject('');
      setBudget('PROJECT BUDGET (USD)');
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@haulo.design');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="contact-page">
      {/* Blueprint Grid Mesh Background */}
      <div className="contact-bg-grid" aria-hidden="true" />

      {/* Shared GLOBAL FLOOR: futuristic floor behind all contact content */}
      <GlobalFloor />

      {/* Shared Header Navigation */}
      <Header />

      {/* Main Page Layout Container */}
      <div className="contact-content-wrapper">
        
        {/* Headline Typography */}
        <section className="contact-hero-header">
          <h1 className="contact-title-left">
            LET'S CREATE SOMETHING AMAZING TOGETHER
          </h1>
          <h2 className="contact-title-right">
            JUST SEND US A MESSAGE
          </h2>
        </section>

        {/* Form Submission Success Banner */}
        {submitted && (
          <div className="success-banner">
            ✓ MESSAGE SENT SUCCESSFULLY! WE'LL GET BACK TO YOU SHORTLY.
          </div>
        )}

        {/* 5-Circle Form Bubbles Row */}
        <form onSubmit={handleSubmit} className="contact-circles-container">
          
          {/* Circle 1: Name */}
          <div className="contact-circle">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="[YOUR NAME]"
              className="circle-input"
              aria-label="Your Name"
            />
          </div>

          {/* Circle 2: Email */}
          <div className="contact-circle">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="[YOUR EMAIL]"
              className="circle-input"
              aria-label="Your Email"
            />
          </div>

          {/* Circle 3: Project Description */}
          <div className="contact-circle">
            <textarea
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="[YOUR PROJECT IS ABOUT]"
              className="circle-input circle-textarea"
              aria-label="Your Project Details"
            />
          </div>

          {/* Circle 4: Budget Selector */}
          <div
            className="contact-circle"
            onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
          >
            <div className="budget-select-wrapper">
              <div className="budget-trigger">
                <span>{budget}</span>
                <span className={`budget-arrow-icon ${showBudgetDropdown ? 'open' : ''}`}>
                  ▲
                </span>
              </div>

              {showBudgetDropdown && (
                <div className="budget-dropdown" onClick={(e) => e.stopPropagation()}>
                  {budgetOptions.map((opt) => (
                    <div
                      key={opt}
                      className="budget-option"
                      onClick={() => {
                        setBudget(opt);
                        setShowBudgetDropdown(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Circle 5: Send Button */}
          <button type="submit" className="contact-circle send-circle" aria-label="Send Message">
            <div className="send-content">
              <span className="send-text">SEND</span>
              <span className="send-arrow">→</span>
            </div>
          </button>
        </form>

        {/* Footer Section */}
        <footer className="contact-footer-section">
          {/* Horizontal Divider Line */}
          <div className="contact-divider" />

          {/* Social Links & Label Grid */}
          <div className="contact-footer-grid">
            <div className="social-label-col">
              <span className="social-label">SOCIAL</span>
            </div>

            <div className="social-links-col">
              <nav className="social-list">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-item"
                >
                  LINKEDIN
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-item"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-item"
                >
                  DRIBBBLE
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-item"
                >
                  <span>TWITTER</span>
                  <span className="social-dot" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Email, Privacy */}
          <div className="contact-bottom-bar">
            <span>© ALL RIGHTS RESERVED</span>

            <a
              href="mailto:hello@noomoagency.com"
              onClick={(e) => {
                e.preventDefault();
                handleCopyEmail();
              }}
              className="contact-email-link"
              title="Click to copy email address"
            >
              {copiedEmail ? 'COPIED TO CLIPBOARD!' : 'HELLO@NOOMOAGENCY.COM'}
            </a>

            <a href="#privacy" className="privacy-link">
              PRIVACY POLICY
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}
